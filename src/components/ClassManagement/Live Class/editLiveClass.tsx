import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';
import { X } from 'lucide-react';
import { updateLiveClass } from '../../../features/Class Management/Live Class/services';
import toast from 'react-hot-toast';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface EditBatchModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: any;
	refreshData?: () => void; // Add refreshData prop
}

interface FormValues {
	className: string;
	startTime: string;
	endTime: string;
	classDate: string;
	instructors: string[];
	liveLink: string;
}

interface InstructorOption {
	value: string;
	label: string;
}

const animatedComponents = makeAnimated();

const EditLiveClass: React.FC<EditBatchModalProps> = ({
	isOpen,
	onClose,
	data,
	refreshData,
}) => {
	const [instructorOptions, setInstructorOptions] = useState<
		InstructorOption[]
	>([]);
	const [selectedInstructors, setSelectedInstructors] = useState<
		InstructorOption[]
	>([]);

	// Format time to 12-hour format with AM/PM
	const formatTimeTo12Hour = (timeString: string) => {
		if (!timeString || !timeString.includes('T')) return '';
		const timePart = timeString.split('T')[1].split(':');
		let hours = parseInt(timePart[0], 10);
		const minutes = timePart[1];
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		return `${hours}:${minutes} ${ampm}`;
	};

	// Convert 12-hour format back to 24-hour format for submission
	const convertTo24Hour = (time12h: string) => {
		if (!time12h) return '';
		const [time, modifier] = time12h.split(' ');
		let [hours, minutes] = time.split(':');

		if (hours === '12') {
			hours = '00';
		}

		if (modifier === 'PM') {
			hours = String(parseInt(hours, 10) + 12);
		}

		return `${hours.padStart(2, '0')}:${minutes}`;
	};

	// Initialize form values and instructor options
	useEffect(() => {
		if (data && data.instructors) {
			const options = data.instructors.map((instructor: any) => ({
				value: instructor._id,
				label: instructor.full_name,
			}));

			setInstructorOptions(options);
			setSelectedInstructors(options);

			formik.setValues({
				className: data?.class_name || '',
				startTime: formatTimeTo12Hour(data?.start_time) || '',
				endTime: formatTimeTo12Hour(data?.end_time) || '',
				classDate: data?.start_date?.split('T')[0] || '',
				instructors: data.instructors.map((i: any) => i._id) || [],
				liveLink: data?.video_url || '',
			});
		}
	}, [data]);

	const formik = useFormik<FormValues>({
		initialValues: {
			className: '',
			startTime: '',
			endTime: '',
			classDate: '',
			instructors: [],
			liveLink: '',
		},
		validationSchema: Yup.object({
			className: Yup.string().required('Class Name is required'),
			classDate: Yup.string().required('Class Date is required'),
			startTime: Yup.string()
				.required('Start Time is required')
				.matches(
					/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i,
					'Time must be in HH:MM AM/PM format'
				),
			liveLink: Yup.string()
				.required('Live Link is required')
				.url('Must be a valid URL'),
			instructors: Yup.array()
				.min(1, 'At least one instructor is required')
				.required('Instructor is required'),
			endTime: Yup.string()
				.required('End Time is required')
				.matches(
					/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i,
					'Time must be in HH:MM AM/PM format'
				)
				.test(
					'is-after-start',
					'End Time must be after Start time',
					function (value) {
						const { startTime } = this.parent;
						if (!startTime || !value) return true;

						try {
							const start24 = convertTo24Hour(startTime);
							const end24 = convertTo24Hour(value);

							return (
								new Date(`1970-01-01T${end24}`) >
								new Date(`1970-01-01T${start24}`)
							);
						} catch (e) {
							return false;
						}
					}
				),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const params_data = {
					class_name: values.className,
					start_date: `${values.classDate}T00:00:00.000Z`,
					start_time: `${values.classDate}T${convertTo24Hour(
						values.startTime
					)}:00`,
					end_time: `${values.classDate}T${convertTo24Hour(values.endTime)}:00`,
					instructors: values.instructors,
					video_url: values.liveLink,
					branch_id: data.branch,
					course_id: data.course,
					batch_id: data.batch?._id,
					uuid: data.uuid,
				};

				const response = await updateLiveClass(params_data);
				if (response) {
					toast.success('Live Class updated successfully');
					if (refreshData) refreshData(); // Refresh parent data if callback provided
					onClose();
				}
			} catch (error) {
				console.error('Update error:', error);
				toast.error('Failed to update live class');
			} finally {
				setSubmitting(false);
			}
		},
	});

	// Handle instructor selection change
	const handleInstructorChange = (selectedOptions: any) => {
		setSelectedInstructors(selectedOptions);
		formik.setFieldValue(
			'instructors',
			selectedOptions.map((option: any) => option.value)
		);
	};

	// Handle time input change with proper formatting
	const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
		// Allow empty value
		if (value === '') {
			formik.setFieldValue(field, '');
			return;
		}

		// Basic validation for partial input
		const partialTimeRegex =
			/^([0-9]|0[0-9]|1[0-2]):?([0-5][0-9])? ?([AP]M)?$/i;
		if (!partialTimeRegex.test(value)) return;

		// Format the value as user types
		let formattedValue = value.toUpperCase();

		// Add colon after 2 digits if not present
		if (/^\d{2}[^:]/.test(formattedValue)) {
			formattedValue = `${formattedValue.substring(
				0,
				2
			)}:${formattedValue.substring(2)}`;
		}

		// Add space before AM/PM if not present
		if (/\d[AP]M$/i.test(formattedValue)) {
			formattedValue = `${formattedValue.substring(
				0,
				formattedValue.length - 2
			)} ${formattedValue.substring(formattedValue.length - 2)}`;
		}

		formik.setFieldValue(field, formattedValue);
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 overflow-y-auto'>
			<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				{/* Background overlay */}
				<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
					<div className='absolute inset-0 bg-gray-500 opacity-50'></div>
				</div>

				<div className='inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full'>
					<div className='bg-[#1BBFCA] text-white rounded-t-xl py-3 px-6 flex justify-between items-center'>
						<h2
							className='text-center flex-1'
							style={{ ...FONTS.heading_05_bold }}
						>
							Edit Live Class
						</h2>
						<button
							onClick={onClose}
							className='p-1 rounded-full hover:bg-white/20 transition-colors'
							aria-label='Close modal'
						>
							<X className='w-5 h-5' />
						</button>
					</div>

					<div className='overflow-y-auto max-h-[70vh] p-6'>
						<form onSubmit={formik.handleSubmit} className='space-y-4'>
							{/* Class Name */}
							<div>
								<label
									className='block mb-1'
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.gray_dark_02,
									}}
								>
									Class Name
								</label>
								<input
									type='text'
									name='className'
									value={formik.values.className}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className='w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
									style={{
										...FONTS.heading_08_bold,
										color: COLORS.gray_dark_01,
									}}
									placeholder='Enter Class Name'
								/>
								{formik.touched.className && formik.errors.className && (
									<p className='text-[#1BBFCA] text-sm mt-1'>
										{formik.errors.className}
									</p>
								)}
							</div>

							{/* Class Date and Times */}
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div>
									<label
										className='block mb-1'
										style={{
											...FONTS.heading_07_bold,
											color: COLORS.gray_dark_02,
										}}
									>
										Class Date
									</label>
									<input
										type='date'
										name='classDate'
										value={formik.values.classDate}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className='w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
										style={{
											...FONTS.heading_08_bold,
											color: COLORS.gray_dark_01,
										}}
									/>
									{formik.touched.classDate && formik.errors.classDate && (
										<p className='text-[#1BBFCA] text-sm mt-1'>
											{formik.errors.classDate}
										</p>
									)}
								</div>

								<div>
									<label
										className='block mb-1'
										style={{
											...FONTS.heading_07_bold,
											color: COLORS.gray_dark_02,
										}}
									>
										Start Time
									</label>
									<input
										type='text'
										name='startTime'
										value={formik.values.startTime}
										onChange={(e) =>
											handleTimeChange('startTime', e.target.value)
										}
										onBlur={formik.handleBlur}
										className='w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
										style={{
											...FONTS.heading_08_bold,
											color: COLORS.gray_dark_01,
										}}
										placeholder='HH:MM AM/PM'
									/>
									{formik.touched.startTime && formik.errors.startTime && (
										<p className='text-[#1BBFCA] text-sm mt-1'>
											{formik.errors.startTime}
										</p>
									)}
								</div>

								<div>
									<label
										className='block mb-1'
										style={{
											...FONTS.heading_07_bold,
											color: COLORS.gray_dark_02,
										}}
									>
										End Time
									</label>
									<input
										type='text'
										name='endTime'
										value={formik.values.endTime}
										onChange={(e) =>
											handleTimeChange('endTime', e.target.value)
										}
										onBlur={formik.handleBlur}
										className='w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
										style={{
											...FONTS.heading_08_bold,
											color: COLORS.gray_dark_01,
										}}
										placeholder='HH:MM AM/PM'
									/>
									{formik.touched.endTime && formik.errors.endTime && (
										<p className='text-[#1BBFCA] text-sm mt-1'>
											{formik.errors.endTime}
										</p>
									)}
								</div>
							</div>

							{/* Instructors - Multi-select */}
							<div>
								<label
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.gray_dark_02,
									}}
								>
									Instructors
								</label>
								<Select
									isMulti
									name='instructors'
									options={instructorOptions}
									components={animatedComponents}
									className='mt-1'
									classNamePrefix='select'
									value={selectedInstructors}
									onChange={handleInstructorChange}
									onBlur={() => formik.setFieldTouched('instructors', true)}
								/>
								{formik.touched.instructors && formik.errors.instructors && (
									<p className='text-[#1BBFCA] text-sm mt-1'>
										{Array.isArray(formik.errors.instructors)
											? formik.errors.instructors.join(', ')
											: formik.errors.instructors}
									</p>
								)}
							</div>

							{/* Live Link */}
							<div>
								<label
									className='block mb-1'
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.gray_dark_02,
									}}
								>
									Live Link
								</label>
								<input
									type='url'
									name='liveLink'
									value={formik.values.liveLink}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className='w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
									style={{
										...FONTS.heading_08_bold,
										color: COLORS.gray_dark_01,
									}}
									placeholder='Enter live class link'
								/>
								{formik.touched.liveLink && formik.errors.liveLink && (
									<p className='text-[#1BBFCA] text-sm mt-1'>
										{formik.errors.liveLink}
									</p>
								)}
							</div>

							{/* Action Buttons */}
							<div className='flex justify-end items-center gap-4 mt-6'>
								<Button
									type='button'
									onClick={onClose}
									variant='outline'
									className='!border-[#1BBFCA] bg-white !text-[#1BBFCA] hover:bg-[#1bbeca15]'
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.gray_dark_02,
									}}
								>
									Cancel
								</Button>
								<Button
									type='submit'
									className='bg-[#1BBFCA] text-white hover:bg-[#1BBFCA] hover:opacity-90'
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.white,
									}}
									disabled={formik.isSubmitting}
								>
									{formik.isSubmitting ? 'Updating...' : 'Update'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditLiveClass;
