import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';
import {
	getAllBatches,
	getAllCourses,
} from '../../../features/Class Management/Live Class/services';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllLiveClasses } from '../../../features/Class Management/Live Class/reducers/thunks';

interface CreateBatchModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateLiveClassModal = ({
	isOpen,
	setIsOpen,
}: CreateBatchModalProps) => {
	const dispatch = useDispatch<any>();
	const [allCourses, setAllCourses] = useState<any[]>([]);
	const [allBatches, setAllBatches] = useState<any[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [availableInstructors, setAvailableInstructors] = useState<any[]>([]);

	// Fetch initial data
	useEffect(() => {
		if (isOpen) {
			fetchAllCourses();
			fetchAllBatches();
		}
	}, [isOpen]);

	const fetchAllCourses = async () => {
		try {
			const response = await getAllCourses({});
			if (response?.data) {
				setAllCourses(response.data);
			}
		} catch (error) {
			console.error('Error fetching courses:', error);
			toast.error('Failed to load courses');
		}
	};

	const fetchAllBatches = async () => {
		try {
			const response = await getAllBatches({});
			if (response?.data) {
				setAllBatches(response.data);
			}
		} catch (error) {
			console.error('Error fetching batches:', error);
			toast.error('Failed to load batches');
		}
	};

	const fetchAvailableInstructors = async (courseId: string, date: string) => {
		try {
			// This would be your actual API call to get instructors available for the selected course and date
			// For now, we'll mock it
			const mockInstructors = [
				{ id: 'instructor1', name: 'Instructor 1' },
				{ id: 'instructor2', name: 'Instructor 2' },
			];
			setAvailableInstructors(mockInstructors);
		} catch (error) {
			console.error('Error fetching instructors:', error);
			toast.error('Failed to load available instructors');
		}
	};

	

	const validationSchema = Yup.object({
		className: Yup.string().required('Class name is required'),
		branch: Yup.string().required('Branch selection is required'),
		course: Yup.string().required('Course selection is required'),
		batch: Yup.string().required('Batch selection is required'),
		classDate: Yup.date()
			.required('Class date is required')
			.min(new Date(), 'Class date cannot be in the past'),
		startTime: Yup.string().required('Start time is required'),
		endTime: Yup.string()
			.required('End time is required')
			.test(
				'is-after-start',
				'End time must be after start time',
				function (endTime) {
					const { startTime } = this.parent;
					if (!startTime || !endTime) return true;
					return (
						new Date(`1970-01-01T${endTime}`) >
						new Date(`1970-01-01T${startTime}`)
					);
				}
			),
		instructor: Yup.string().required('Instructor selection is required'),
		videoUrl: Yup.string()
			.url('Invalid URL format')
			.required('Video URL is required'),
	});

	const formik = useFormik({
		initialValues: {
			className: '',
			branch: '',
			course: '',
			batch: '',
			classDate: '',
			startTime: '',
			endTime: '',
			instructor: '',
			videoUrl: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			setIsSubmitting(true);
			try {
				// Format the data for API
				const classData = {
					class_name: values.className,
					branch_id: values.branch,
					course_id: values.course,
					batch_id: values.batch,
					start_date: `${values.classDate}T00:00:00.000Z`,
					start_time: values.startTime,
					end_time: values.endTime,
					instructor_id: values.instructor,
					video_url: values.videoUrl,
				};

				console.log(classData, 'class data');

				// const response = await createLiveClass(classData);

				// if (response.success) {
				// 	toast.success('Live class created successfully!');
				// 	setIsOpen(false);
				// 	// Refresh the live classes list
				// 	dispatch(
				// 		getAllLiveClasses({
				// 			branch: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
				// 			institute: '973195c0-66ed-47c2-b098-d8989d3e4529',
				// 			page: 1,
				// 		})
				// 	);
				// } else {
				// 	toast.error(response.message || 'Failed to create live class');
				// }
			} catch (error) {
				console.error('Error creating live class:', error);
				toast.error('Failed to create live class');
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	// Update available batches when course changes
	useEffect(() => {
		if (formik.values.course) {
			const courseBatches = allBatches.filter(
				(batch) => batch.course === formik.values.course
			);
			setAllBatches(courseBatches);
			formik.setFieldValue('batch', '');
		}
	}, [formik.values.course]);

	// Update available instructors when course and date are selected
	useEffect(() => {
		if (formik.values.course && formik.values.classDate) {
			fetchAvailableInstructors(formik.values.course, formik.values.classDate);
			formik.setFieldValue('instructor', '');
		}
	}, [formik.values.course, formik.values.classDate]);

	if (!isOpen) return null;

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
							<div className='space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto mt-2 p-2'>
								{/* Class Name */}
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

								{/* Branch Selection */}
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
										<option value=''>Select Branch</option>
										<option value='branch1'>Branch 1</option>
										<option value='branch2'>Branch 2</option>
									</select>
									{formik.touched.branch && formik.errors.branch && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{formik.errors.branch}
										</p>
									)}
								</div>

								{/* Course Selection */}
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
										<option value=''>Select Course</option>
										{allCourses.map((course) => (
											<option key={course._id} value={course._id}>
												{course.course_name}
											</option>
										))}
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

								{/* Batch Selection */}
								<div>
									<label
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										Select Batch
									</label>
									<select
										name='batch'
										className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
										value={formik.values.batch}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										disabled={!formik.values.course}
									>
										<option value=''>Select Batch</option>
										{allBatches.map((batch) => (
											<option key={batch._id} value={batch._id}>
												{batch.batch_name}
											</option>
										))}
									</select>
									{formik.touched.batch && formik.errors.batch && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{formik.errors.batch}
										</p>
									)}
									{!formik.values.course && (
										<p className='mt-1 text-xs text-gray-500'>
											Please select a course first to enable batch selection
										</p>
									)}
								</div>

								{/* Date and Time */}
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
											min={new Date().toISOString().split('T')[0]}
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

								{/* Instructor Selection */}
								<div>
									<label
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										Instructor
									</label>
									<select
										name='instructor'
										className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
										value={formik.values.instructor}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										disabled={!formik.values.classDate}
									>
										<option value=''>Select Instructor</option>
										{availableInstructors.map((instructor) => (
											<option key={instructor.id} value={instructor.id}>
												{instructor.name}
											</option>
										))}
									</select>
									{formik.touched.instructor && formik.errors.instructor && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{formik.errors.instructor}
										</p>
									)}
									{!formik.values.classDate && (
										<p className='mt-1 text-xs text-gray-500'>
											Please select a class date first to enable instructor
											selection
										</p>
									)}
								</div>

								{/* Video URL */}
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

							<div className='mt-6 flex justify-end space-x-3 p-4'>
								<Button
									type='button'
									variant='outline'
									className='!border-[#1BBFCA] !text-[#1BBFCA] !bg-[#1bbeca15]'
									onClick={() => setIsOpen(false)}
									disabled={isSubmitting}
								>
									Cancel
								</Button>
								<Button
									type='submit'
									className='bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Creating...' : 'Submit'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
