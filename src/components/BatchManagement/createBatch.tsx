import type { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS, FONTS } from '../../constants/uiConstants';
import { Button } from '../ui/button';

interface CreateBatchModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateBatchModal = ({
	isOpen,
	setIsOpen,
}: CreateBatchModalProps) => {
	if (!isOpen) return null;

	const validationSchema = Yup.object({
		batchName: Yup.string().required('Batch name is required'),
		startDate: Yup.date().required('Start date is required'),
		endDate: Yup.date()
			.required('End date is required')
			.min(Yup.ref('startDate'), 'End date must be after start date'),
		branch: Yup.string().required('Branch selection is required'),
		course: Yup.string().required('Course selection is required'),
		students: Yup.string().required('Student selection is required'),
		teacher: Yup.string().required('Teacher selection is required'),
	});

	const formik = useFormik({
		initialValues: {
			batchName: '',
			startDate: '',
			endDate: '',
			branch: '',
			course: '',
			students: '',
			teacher: '',
		},
		validationSchema,
		onSubmit: (values) => {
			console.log('Batch created with values:', values);
			setIsOpen(false);
		},
	});

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div className='bg-white w-full max-w-4xl rounded-2xl shadow-2xl'>
				<h2
					className='!text-white  bg-[#1BBFCA] px-6 py-4 rounded-t-2xl mb-6'
					style={{ ...FONTS.heading_04_bold }}
				>
					Create New Batch
				</h2>

				<form onSubmit={formik.handleSubmit}>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-4'>
						<div className='md:col-span-2'>
							<label
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Batch Name
							</label>
							<input
								name='batchName'
								className='w-full border rounded-md px-4 py-2'
								type='text'
								value={formik.values.batchName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.batchName && formik.errors.batchName && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.batchName}
								</p>
							)}
						</div>

						<div>
							<label
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Start Date
							</label>
							<input
								name='startDate'
								className='w-full border rounded-md px-4 py-2'
								type='date'
								value={formik.values.startDate}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.startDate && formik.errors.startDate && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.startDate}
								</p>
							)}
						</div>

						<div>
							<label
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								End Date
							</label>
							<input
								name='endDate'
								className='w-full border rounded-md px-4 py-2'
								type='date'
								value={formik.values.endDate}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.endDate && formik.errors.endDate && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.endDate}
								</p>
							)}
						</div>

						<div>
							<label
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Branch
							</label>
							<select
								name='branch'
								className='w-full border rounded-md px-4 py-2'
								value={formik.values.branch}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								<option value=''>Select Branch</option>
								<option value='branch1'>Branch 1</option>
								<option value='branch2'>Branch 2</option>
							</select>
							{formik.touched.branch && formik.errors.branch && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.branch}
								</p>
							)}
							<p
								className='text-xs text-gray-500 mt-1'
								style={{ ...FONTS.heading_10, color: COLORS.gray_dark_02 }}
							>
								Select a branch to see available courses.
							</p>
						</div>

						<div>
							<label
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Course
							</label>
							<select
								name='course'
								className='w-full border rounded-md px-4 py-2'
								value={formik.values.course}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								<option value=''>Select Course</option>
								<option value='course1'>Course 1</option>
								<option value='course2'>Course 2</option>
							</select>
							{formik.touched.course && formik.errors.course && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.course}
								</p>
							)}
							<p
								className='text-xs text-gray-500 mt-1'
								style={{ ...FONTS.heading_10, color: COLORS.gray_dark_02 }}
							>
								Please select a branch first to enable course selection.
							</p>
						</div>

						<div>
							<label
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Students
							</label>
							<select
								name='students'
								className='w-full border rounded-md px-4 py-2'
								value={formik.values.students}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								<option value=''>Select Students</option>
								<option value='student1'>Student 1</option>
							</select>
							{formik.touched.students && formik.errors.students && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.students}
								</p>
							)}
							<p
								className='text-xs text-gray-500 mt-1'
								style={{ ...FONTS.heading_10, color: COLORS.gray_dark_02 }}
							>
								Please select a course to view and select students.
							</p>
						</div>

						<div>
							<label
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Teacher
							</label>
							<select
								name='teacher'
								className='w-full border rounded-md px-4 py-2'
								value={formik.values.teacher}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								<option value=''>Select Teacher</option>
								<option value='teacher1'>Teacher 1</option>
							</select>
							{formik.touched.teacher && formik.errors.teacher && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.teacher}
								</p>
							)}
							<p
								className='text-xs text-gray-500 mt-1'
								style={{ ...FONTS.heading_10, color: COLORS.gray_dark_02 }}
							>
								Please select a course to view and select Teacher.
							</p>
						</div>
					</div>

					<div className='flex justify-end gap-4 mt-8 mb-4 px-4'>
						<Button
							type='button'
							variant='outline'
							className='!border-[#1BBFCA] !text-[#1BBFCA] bg-[#1bbeca15] '
							onClick={() => setIsOpen(false)}
							style={{ ...FONTS.heading_07_bold }}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							className='bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]'
							style={{ ...FONTS.heading_07_bold }}
						>
							Create Batch
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
