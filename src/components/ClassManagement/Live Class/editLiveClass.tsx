import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';
import { X } from 'lucide-react';

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
			className: Yup.string().required('Class Name is required'),
			classDate: Yup.string().required('Class Date is required'),
			startTime: Yup.string().required('Start Time is required'),
			liveLink: Yup.string().required('Live Link is required'),
			instructors: Yup.string().required('Instructor is required'),
			endTime: Yup.string()
				.required('End Time is required')
				.test(
					'is-after-start',
					'End Time must be after Start time',
					function (value: any) {
						const { startTime } = this.parent as { startTime?: string };
						if (!startTime || !value) return true;
						return (
							new Date(`1970-01-01T${value}`) >=
							new Date(`1970-01-01T${startTime}`)
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
										type='time'
										name='startTime'
										value={formik.values.startTime}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className='w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
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
										type='time'
										name='endTime'
										value={formik.values.endTime}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className='w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
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

							{/* Instructors */}
							<div>
								<label
									style={{
										...FONTS.heading_07_bold,
										color: COLORS.gray_dark_02,
									}}
								>
									Instructors
								</label>
								<select
									name='instructors'
									className='w-full border rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
									style={{
										...FONTS.heading_08_bold,
										color: COLORS.gray_dark_01,
									}}
									value={formik.values.instructors}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								>
									<option value=''>Select Instructors</option>
									<option value='Kamal'>Kamal</option>
									<option value='Elan Mask'>Elan Mask</option>
								</select>
								{formik.touched.instructors && formik.errors.instructors && (
									<p className='text-[#1BBFCA] text-sm mt-1'>
										{formik.errors.instructors}
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
									type='text'
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
