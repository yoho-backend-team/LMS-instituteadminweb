import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';

interface EditBatchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface FormValues {
	className: string;
	startTime: string;
	endTime: string;
	classDate: string;
	instructors: string;
	liveLink: string;
}

const EditLiveClass: React.FC<EditBatchModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const formik = useFormik<FormValues>({
		initialValues: {
			className: '',
			startTime: '',
			endTime: '',
			classDate: '',
			instructors: '',
			liveLink: '',
		},
		validationSchema: Yup.object({
			ClassName: Yup.string().required('class Name is required'),
			ClassDate: Yup.string().required('class Date is required'),
			startTime: Yup.string().required('Start Time is required'),
			liveLink: Yup.string().required('Start Time is required'),
			endTime: Yup.string()
				.required('End Time is required')
				.test(
					'is-after-start',
					'End Time must be after Start time',
					function (value: any) {
						return (
							!value || !this.parent.startDate || value >= this.parent.startDate
						);
					}
				),
		}),
		onSubmit: (values) => {
			console.log('Form Data', values);
			onClose();
		},
	});

	return (
		<div className='fixed inset-0 z-50 overflow-y-auto'>
			<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				{/* Background overlay */}
				<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
					<div className='absolute inset-0 bg-gray-500 opacity-50'></div>
				</div>

				<div className='inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all md:ml-65 md:my-20 sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full'>
					<div className='bg-[#1BBFCA] text-white rounded-t-xl py-3 px-6'>
						<h2 className='text-center' style={{ ...FONTS.heading_04_bold }}>
							Edit Live Class
						</h2>
					</div>

					<div className='space-y-4 min-h-[calc(100vh-170px)] overflow-y-auto mt-2'>
						<form
							onSubmit={formik.handleSubmit}
							className='mt-6 px-6 space-y-4'
						>
							{/* Batch Name */}
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
									name='batchName'
									value={formik.values.className}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className='w-full border rounded-md px-4 py-2'
									style={{
										...FONTS.heading_08_bold,
										color: COLORS.gray_dark_01,
									}}
									placeholder='Enter Batch Name'
								/>
								{formik.touched.className && formik.errors.className && (
									<p className='text-[#1BBFCA] text-sm mt-1'>
										{formik.errors.className}
									</p>
								)}
							</div>

							{/* Dates */}
							<div className='flex flex-col md:flex-row gap-4'>
								<div className='flex-1'>
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
										type='text'
										name='batchName'
										value={formik.values.classDate}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className='w-full border rounded-md px-4 py-2'
										style={{
											...FONTS.heading_08_bold,
											color: COLORS.gray_dark_01,
										}}
										placeholder='Enter Batch Name'
									/>
									{formik.touched.classDate && formik.errors.classDate && (
										<p className='text-[#1BBFCA] text-sm mt-1'>
											{formik.errors.classDate}
										</p>
									)}
								</div>

								<div className='flex-1'>
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
										type='time'
										name='startDate'
										value={formik.values.startTime}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className='w-full border rounded-md px-4 py-2'
										style={{
											...FONTS.heading_08_bold,
											color: COLORS.gray_dark_01,
										}}
									/>
									{formik.touched.startTime && formik.errors.startTime && (
										<p className='text-[#1BBFCA] text-sm mt-1'>
											{formik.errors.startTime}
										</p>
									)}
								</div>

								<div className='flex-1'>
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
										type='time'
										name='endDate'
										value={formik.values.endTime}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className='w-full border rounded-md px-4 py-2'
										style={{
											...FONTS.heading_08_bold,
											color: COLORS.gray_dark_01,
										}}
									/>
									{formik.touched.endTime && formik.errors.endTime && (
										<p className='text-[#1BBFCA] text-sm mt-1'>
											{formik.errors.endTime}
										</p>
									)}
								</div>
							</div>

							<div>
								<label
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.gray_dark_02,
									}}
								>
									{' '}
									Instructors
								</label>
								<select
									name='course'
									className='w-full border rounded-md px-4 py-2 mt-2'
									style={{
										...FONTS.heading_08_bold,
										color: COLORS.gray_dark_01,
									}}
									value={formik.values.instructors}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								>
									<option value=''>Select Instructors</option>
									<option value='course1'>Kamal</option>
									<option value='course2'>Elan Mask </option>
								</select>
								{formik.touched.instructors && formik.errors.instructors && (
									<p className='text-[#1BBFCA] text-sm mt-1'>
										{formik.errors.instructors}
										Please select a branch first to enable course selection.
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
									Link
								</label>
								<input
									type='text'
									name='batchName'
									value={formik.values.liveLink}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className='w-full border rounded-md px-4 py-2'
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
							<div className='flex justify-end items-center gap-4 mt-6 mb-8'>
								<Button
									type='button'
									onClick={onClose}
									variant='outline'
									className='!border-[#1BBFCA] !text-[#1BBFCA]'
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.gray_dark_02,
									}}
								>
									Cancel
								</Button>
								<Button
									type='submit'
									className='bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]'
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.white,
									}}
								>
									Update
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
