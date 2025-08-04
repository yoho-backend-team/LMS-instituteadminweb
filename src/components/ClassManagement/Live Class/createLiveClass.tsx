import {
	useEffect,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction,
} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';
import {
	createLiveClass,
	getAllBatches,
	getAllBranches,
	getAllCourses,
} from '../../../features/Class Management/Live Class/services';
import { useDispatch } from 'react-redux';
import { getStaffService } from '../../../features/batchManagement/services';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreateBatchModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	fetchAllLiveClasses?: () => void;
}

interface FormValues {
	className: string;
	branch: string;
	course: string;
	batch: string;
	classDate: string;
	startTime: string;
	endTime: string;
	instructors: string[];
	videoUrl: string;
}

export const CreateLiveClassModal = ({
	isOpen,
	setIsOpen,
	fetchAllLiveClasses,
}: CreateBatchModalProps) => {
	const dispatch = useDispatch<any>();
	const [allCourses, setAllCourses] = useState<any[]>([]);
	const [allBatches, setAllBatches] = useState<any[]>([]);
	const [allBranches, setAllBranches] = useState<any[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [availableInstructors, setAvailableInstructors] = useState<any[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
	const [courseId, setCourseId] = useState<string>('');

	// Initial form values
	const initialValues: FormValues = {
		className: '',
		branch: '',
		course: '',
		batch: '',
		classDate: '',
		startTime: '',
		endTime: '',
		instructors: [],
		videoUrl: '',
	};

	// Validation schema
	const validationSchema = Yup.object().shape({
		className: Yup.string().required('Class name is required'),
		branch: Yup.string().required('Branch selection is required'),
		course: Yup.string().required('Course selection is required'),
		batch: Yup.string().required('Batch selection is required'),
		classDate: Yup.date()
			.required('Class date is required')
			.min(new Date(), 'Class date cannot be in the past'),
		startTime: Yup.string().required('Start time is required'),
		endTime: Yup.string().required('End time is required'),
		instructors: Yup.array()
			.min(1, 'At least one instructor is required')
			.required('Instructor selection is required'),
		videoUrl: Yup.string().required('Video URL is required'),
	});

	// Memoized fetch functions
	const fetchAllCourses = useCallback(async () => {
		try {
			const response = await getAllCourses({});
			if (response?.data) {
				setAllCourses(response.data);
			}
		} catch (error) {
			console.error('Error fetching courses:', error);
			toast.error('Failed to load courses');
		}
	}, []);

	const fetchAllBatches = useCallback(async () => {
		try {
			const response = await getAllBatches({});
			if (response?.data) {
				setAllBatches(response.data);
			}
		} catch (error) {
			console.error('Error fetching batches:', error);
			toast.error('Failed to load batches');
		}
	}, []);

	const fetchAllBranches = useCallback(async () => {
		try {
			const response = await getAllBranches({});
			if (response?.data) {
				setAllBranches(response.data);
			}
		} catch (error) {
			console.error('Error fetching branches:', error);
			toast.error('Failed to load branches');
		}
	}, []);

	const fetchAvailableInstructors = useCallback(
		async (courseId: string, date: string) => {
			try {
				const response = await getStaffService({ uuid: courseId });
				if (response) {
					setAvailableInstructors(response.data);
				}
			} catch (error) {
				console.error('Error fetching instructors:', error);
				toast.error('Failed to load available instructors');
			}
		},
		[]
	);

	// Formik initialization
	const formik = useFormik<FormValues>({
		initialValues,
		validationSchema,
		validateOnBlur: true,
		validateOnChange: true,
		onSubmit: useCallback(
			async (values, { resetForm }) => {
				setIsSubmitting(true);
				try {
					const startDateTime = new Date(
						`${values.classDate}T${values.startTime}`
					);
					const endDateTime = new Date(`${values.classDate}T${values.endTime}`);

					const classData = {
						class_name: values.className,
						branch: values.branch,
						course: values.course,
						batch: values.batch,
						start_date: startDateTime.toISOString(),
						start_time: startDateTime,
						end_time: endDateTime,
						institute: '973195c0-66ed-47c2-b098-d8989d3e4529',
						instructors: values.instructors,
						video_url: values.videoUrl,
						coordinators: [],
					};
					const response = await createLiveClass(classData);
					if (response) {
						toast.success('Live class created successfully!');
						if (fetchAllLiveClasses) {
							fetchAllLiveClasses();
						}
						setIsOpen(false);
						resetForm();
					} else {
						toast.error('Failed to create live class');
					}
				} catch (error) {
					console.error('Error creating live class:', error);
					toast.error('Failed to create live class');
				} finally {
					setIsSubmitting(false);
				}
			},
			[dispatch, setIsOpen]
		),
	});

	// Handler for removing an instructor
	const removeInstructor = useCallback(
		(instructorId: string) => {
			formik.setFieldValue(
				'instructors',
				formik.values.instructors.filter((id) => id !== instructorId)
			);
		},
		[formik.values.instructors, formik.setFieldValue]
	);

	// Memoized handler for closing modal
	const handleCloseModal = useCallback(() => {
		setIsOpen(false);
		formik.resetForm();
	}, [formik, setIsOpen]);

	// Fetch initial data
	useEffect(() => {
		if (isOpen) {
			fetchAllBranches();
			fetchAllCourses();
			fetchAllBatches();
			fetchAvailableInstructors(courseId, 'date');
		}
	}, [isOpen]);

	// Filter courses based on selected branch
	useEffect(() => {
		if (formik.values.branch) {
			const branchCourses = allCourses.filter(
				(course) => course.branch_id === formik.values.branch
			);
			setFilteredCourses(branchCourses);
			formik.setFieldValue('course', '');
		} else {
			setFilteredCourses([]);
			formik.setFieldValue('course', '');
		}
	}, [formik.values.branch, allCourses, formik.setFieldValue]);

	// Reset dependent fields when course changes
	useEffect(() => {
		if (formik.values.course) {
			formik.setFieldValue('batch', '');
		}
	}, [formik.values.course, formik.setFieldValue]);

	// Fetch instructors when course and date are selected
	useEffect(() => {
		if (formik.values.course && formik.values.classDate) {
			fetchAvailableInstructors(formik.values.course, formik.values.classDate);
			formik.setFieldValue('instructors', []);
		}
	}, [
		formik.values.course,
		formik.values.classDate,
		fetchAvailableInstructors,
		formik.setFieldValue,
	]);

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

						<form onSubmit={formik.handleSubmit} noValidate>
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
										{allBranches.map((branch) => (
											<option key={branch._id} value={branch._id}>
												{branch.branch_identity}
											</option>
										))}
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
										onChange={(e) => {
											formik.handleChange(e);
											setCourseId(e.target.value);
										}}
										onBlur={formik.handleBlur}
										disabled={!formik.values.branch}
									>
										<option value=''>Select Course</option>
										{filteredCourses.map((course) => (
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
										{allBatches?.map((batch) => (
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
										Instructors
									</label>

									{/* Selected instructors chips */}
									<div className='flex flex-wrap gap-2 mb-2'>
										{formik.values.instructors.map((instructorId) => {
											const instructor = availableInstructors.find(
												(i) => i._id === instructorId
											);
											return instructor ? (
												<div
													key={instructorId}
													className='flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm'
												>
													<span>{instructor.full_name}</span>
													<button
														type='button'
														onClick={() => removeInstructor(instructorId)}
														className='text-gray-500 hover:text-red-500'
													>
														<X size={14} />
													</button>
												</div>
											) : null;
										})}
									</div>

									<select
										name='instructors'
										className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2'
										multiple
										value={formik.values.instructors}
										onChange={(e) => {
											const options = e.target.options;
											const selectedValues = [];
											for (let i = 0; i < options.length; i++) {
												if (options[i].selected) {
													selectedValues.push(options[i].value);
												}
											}
											formik.setFieldValue('instructors', selectedValues);
										}}
										onBlur={formik.handleBlur}
										disabled={!formik.values.classDate}
									>
										<option value='' disabled>
											Select Instructors
										</option>
										{availableInstructors.map((instructor) => (
											<option key={instructor._id} value={instructor._id}>
												{instructor.full_name}
											</option>
										))}
									</select>

									{formik.touched.instructors && formik.errors.instructors && (
										<p className='mt-1 text-sm text-[#1BBFCA]'>
											{typeof formik.errors.instructors === 'string'
												? formik.errors.instructors
												: 'Please select at least one instructor'}
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
									onClick={handleCloseModal}
									disabled={isSubmitting}
								>
									Cancel
								</Button>
								<Button
									type='submit'
									className='bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]'
									disabled={isSubmitting || !formik.isValid}
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
