import type { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';

interface CreateBatchModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateLiveClassModal = ({
	isOpen,
	setIsOpen,
}: CreateBatchModalProps) => {
	if (!isOpen) return null;

	const validationSchema = Yup.object({
		className: Yup.string().required('Class name is required'),
		branch: Yup.string().required('Branch selection is required'),
		course: Yup.string().required('Course selection is required'),
		classDate: Yup.date().required('Class date is required'),
		startTime: Yup.string().required('Start time is required'),
		endTime: Yup.string().required('End time is required'),
		instructors: Yup.string().required('Instructor selection is required'),
		videoUrl: Yup.string()
			.url('Invalid URL format')
			.required('Video URL is required'),
	});

	const formik = useFormik({
		initialValues: {
			className: '',
			branch: '',
			course: '',
			classDate: '',
			startTime: '',
			endTime: '',
			instructors: '',
			videoUrl: '',
		},
		validationSchema,
		onSubmit: (values) => {
			console.log('Live class created with values:', values);
			setIsOpen(false);
		},
	});

	return (
		<div className='fixed inset-0 z-50 overflow-y-auto'>
			<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				{/* Background overlay */}
				<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
					<div className='absolute inset-0 bg-gray-500 opacity-50'></div>
				</div>

				{/* Modal container */}
				<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all md:ml-65 md:my-20 sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full'>
					<div className='bg-white p-4'>
						<div className='bg-[#1BBFCA] rounded-md p-2'>
							<h2
								style={{
									...FONTS.heading_05_bold,
									color: COLORS.white,
									textAlign: 'center',
								}}
							>
								Add Live Class
							</h2>
						</div>

						<form onSubmit={formik.handleSubmit}>
							<div className='space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto mt-2'>
								<div>
									<label
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										Class Name
									</label>
									<input
										name='className'
										className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
										type='text'
										value={formik.values.className}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.className && formik.errors.className && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{formik.errors.className}
										</p>
									)}
								</div>

								<div>
									<label
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										Select Branch
									</label>
									<select
										name='branch'
										className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
										value={formik.values.branch}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										<option
											value=''
											style={{
												...FONTS.heading_09,
												color: COLORS.gray_dark_02,
											}}
										>
											Select Branch
										</option>
										<option
											value='branch1'
											style={{
												...FONTS.heading_09,
												color: COLORS.gray_dark_02,
											}}
										>
											Branch 1
										</option>
										<option
											value='branch2'
											style={{
												...FONTS.heading_09,
												color: COLORS.gray_dark_02,
											}}
										>
											Branch 2
										</option>
									</select>
									{formik.touched.branch && formik.errors.branch && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{formik.errors.branch}
										</p>
									)}
								</div>

								<div>
									<label
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										Select Course
									</label>
									<select
										name='course'
										className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
										value={formik.values.course}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										disabled={!formik.values.branch}
									>
										<option
											value=''
											style={{
												...FONTS.heading_09,
												color: COLORS.gray_dark_02,
											}}
										>
											Select Course
										</option>
										{formik.values.branch && (
											<>
												<option
													value='course1'
													style={{
														...FONTS.heading_09,
														color: COLORS.gray_dark_02,
													}}
												>
													Course 1
												</option>
												<option
													value='course2'
													style={{
														...FONTS.heading_09,
														color: COLORS.gray_dark_02,
													}}
												>
													Course 2
												</option>
											</>
										)}
									</select>
									{formik.touched.course && formik.errors.course && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{formik.errors.course}
										</p>
									)}
									{!formik.values.branch && (
										<p className='mt-1 text-xs text-gray-500'>
											Please select a branch first to enable course selection
										</p>
									)}
								</div>

								<div className='grid grid-cols-3 gap-4'>
									<div>
										<label
											style={{
												...FONTS.heading_07,
												color: COLORS.gray_dark_02,
											}}
										>
											Class Date
										</label>
										<input
											name='classDate'
											className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
											type='date'
											value={formik.values.classDate}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.classDate && formik.errors.classDate && (
											<p className='mt-1 text-sm text-[#1BBFCA]'>
												{formik.errors.classDate}
											</p>
										)}
									</div>
									<div>
										<label
											style={{
												...FONTS.heading_07,
												color: COLORS.gray_dark_02,
											}}
										>
											Start Time
										</label>
										<input
											name='startTime'
											className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
											type='time'
											value={formik.values.startTime}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.startTime && formik.errors.startTime && (
											<p className='mt-1 text-sm text-[#1BBFCA]'>
												{formik.errors.startTime}
											</p>
										)}
									</div>
									<div>
										<label
											style={{
												...FONTS.heading_07,
												color: COLORS.gray_dark_02,
											}}
										>
											End Time
										</label>
										<input
											name='endTime'
											className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
											type='time'
											value={formik.values.endTime}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.endTime && formik.errors.endTime && (
											<p className='mt-1 text-sm text-[#1BBFCA]'>
												{formik.errors.endTime}
											</p>
										)}
									</div>
								</div>

								<div>
									<label
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										Instructors
									</label>
									<select
										name='instructors'
										className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
										value={formik.values.instructors}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										disabled={!formik.values.classDate}
									>
										<option value=''>Select Instructor</option>
										{formik.values.classDate && (
											<>
												<option value='instructor1'>Instructor 1</option>
												<option value='instructor2'>Instructor 2</option>
											</>
										)}
									</select>
									{formik.touched.instructors && formik.errors.instructors && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{formik.errors.instructors}
										</p>
									)}
									{!formik.values.classDate && (
										<p className='mt-1 text-xs text-gray-500'>
											Please select a Class Date first to enable instructor
											selection
										</p>
									)}
								</div>

								<div>
									<label
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										Video URL
									</label>
									<input
										name='videoUrl'
										className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
										type='url'
										placeholder='https://example.com'
										value={formik.values.videoUrl}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.videoUrl && formik.errors.videoUrl && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{formik.errors.videoUrl}
										</p>
									)}
								</div>
							</div>

							<div className='mt-6 flex justify-end space-x-3'>
								<Button
									type='button'
									variant='outline'
									className='!border-[#1BBFCA] !text-[#1BBFCA] !bg-[#1bbeca15]'
									onClick={() => setIsOpen(false)}
								>
									Cancel
								</Button>
								<Button
									type='submit'
									className='bg-[#1BBFCA] text-white hover:[#1BBFCA]'
								>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
