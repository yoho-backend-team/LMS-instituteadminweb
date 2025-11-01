import React, { useEffect, useState } from 'react';
import CourseCard from '../../../components/Coursemanagement/CourseCard';
import AddNewCourseForm from '../../../components/Coursemanagement/AddNewCourseForm';
import CourseDetailView from '../../../components/Coursemanagement/CourseDetailView';
import showfilter from '../../../assets/navbar/showfilter.png';
import ContentLoader from 'react-content-loader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createCourse } from '../../../features/CourseManagement/Course/service';
import { selectBranches } from '../../../features/StudyMaterials/selector';
import { GetBranchThunks } from '../../../features/StudyMaterials/thunk';
import { selectCoursesData } from '../../../features/CourseManagement/Course/selector';
import { GetAllCoursesThunk } from '../../../features/CourseManagement/Course/thunks';
import { getCategories } from '../../../features/Category/selector';
import { GetAllCategoryThunk } from '../../../features/Category/thunks';
import { Card } from '../../../components/ui/card';
import { GetLocalStorage } from '../../../utils/localStorage';
import { addCourse } from '../../../features/CourseManagement/Course/slice';
import toast from 'react-hot-toast';

const Courses: React.FC = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [addingCourse, setAddingCourse] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
	const [isLoad, setisLoad] = useState(true);

	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const dispatch = useDispatch<any>();
	const course = useSelector(selectCoursesData);
	const category = useSelector(getCategories);
	const branch = useSelector(selectBranches);

	useEffect(() => {
		dispatch(GetAllCategoryThunk());
	}, [dispatch]);

	useEffect(() => {
		const params = {
			branch: GetLocalStorage('selectedBranchId'),
		};
		dispatch(GetBranchThunks(params));
	}, [dispatch]);

	const fetchAllCourses = async () => {
		try {
			const params = {
				id: GetLocalStorage('selectedBranchId'),
				page: 1,
			};

			dispatch(GetAllCoursesThunk(params));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAllCourses();
	}, [dispatch]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setisLoad(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	const handleToggleFilter = () => setShowFilter((prev) => !prev);
	const handleAddNewCourse = () => setAddingCourse(true);
	const handleBack = () => {
		fetchAllCourses();
		setAddingCourse(false);
		setSelectedCourse(null);
	};

	const handleViewCourse = (course: any) => {
		setSelectedCourse(course);
	};

	const handleAddCourse = async (formValues: any) => {
		const payload = {
			course_name: formValues.title,
			description: formValues.description,
			overview: formValues.overview,
			duration: formValues.duration,
			actual_price: formValues.actualPrice,
			current_price: formValues.price,
			rating: parseInt(formValues.rating),
			reviews: formValues.review,
			image: `staticfiles/lms/${formValues.image}`,
			thumbnail: `staticfiles/lms/${formValues.thumbnail}`,
			class_type: [formValues.format.toLowerCase()],
			category: formValues.category,
			branch_ids: [formValues.branch],
			institute_id: GetLocalStorage('instituteId'),
			branch_id: GetLocalStorage('selectedBranchId'),
		};

		try {
			const response = await createCourse(payload);
			if (response) {
				dispatch(addCourse(response?.data));
				fetchAllCourses();
				setAddingCourse(false);
				toast.success('Course added successfully');
			}
		} catch (error: any) {
			console.error('Error creating course:', error.message);
			toast.error('Failed to add the course');
		}
	};

	const filteredCourses = course.filter((c: any) => {
		const matchesName = c.course_name
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());

		const matchesStatus =
			statusFilter === ''
				? true
				: statusFilter === 'active'
				? c.is_active === true
				: c.is_active === false;

		return matchesName && matchesStatus;
	});

	if (addingCourse)
		return (
			<AddNewCourseForm
				onBack={handleBack}
				onSubmit={handleAddCourse}
				branches={branch}
				categories={category}
			/>
		);

	if (selectedCourse)
		return (
			<CourseDetailView
				course={selectedCourse}
				onBack={handleBack}
				courses={course}
				categories={category}
			/>
		);

	return (
		<div className='p-3 sm:p-4 md:p-5 lg:p-6'>
			<div className='flex justify-between items-center mb-4 sm:mb-5 md:mb-6'>
				<h1 className='text-lg sm:text-xl md:text-2xl text-[#3B3939] font-bold'>
					Courses
				</h1>
			</div>
			<div className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-4 gap-3'>
				<button
					className='bg-[#1BBFCA] text-white px-3 sm:px-4 py-2 rounded-md text-sm inline-flex items-center justify-center sm:justify-start'
					onClick={handleToggleFilter}
				>
					<span className='inline-flex items-center'>
						<img src={showfilter} alt='Filter' className='w-4 h-4 mr-2' />
					</span>
					<span>{showFilter ? 'Hide Filter' : 'Show Filter'}</span>
				</button>

				<button
					className='bg-[#1BBFCA] text-white px-3 sm:px-4 py-2 rounded-md text-sm'
					onClick={handleAddNewCourse}
				>
					+ Add New Course
				</button>
			</div>

			{showFilter && (
				<div className='w-full flex flex-col gap-4 mb-4'>
					<div className='bg-white p-3 sm:p-4 md:p-5 rounded-lg shadow-md border-2 w-full'>
						<div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
							<div className='flex flex-col w-full sm:flex-1'>
								<label className='pb-2 font-medium text-gray-700 text-sm sm:text-base'>
									Course
								</label>
								<input
									type='text'
									placeholder='Search Course'
									className='border border-[#1BBFCA] px-3 sm:px-4 py-2 w-full rounded-md text-sm sm:text-base'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>

							<div className='flex flex-col w-full sm:flex-1'>
								<label className='pb-2 font-medium text-gray-700 text-sm sm:text-base'>
									Status
								</label>
								<select
									className='border border-gray-300 px-3 sm:px-4 py-2 rounded-md hover:border-[#1BBFCA] text-sm sm:text-base'
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
								>
									<option value=''>All</option>
									<option value='active'>Active</option>
									<option value='inactive'>Inactive</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-4 sm:gap-5'>
				{isLoad &&
					Array(6)
						.fill(null)
						.map((_, index) => (
							<ContentLoader
								speed={1}
								width='100%'
								height='100%'
								backgroundColor='#f3f3f3'
								foregroundColor='#ecebeb'
								className='w-full h-[280px] sm:h-[300px] md:h-[310px] p-3 sm:p-4 rounded-2xl border shadow-md'
								key={index}
							>
								<rect x='0' y='0' rx='6' ry='6' width='100' height='24' />
								<rect x='270' y='0' rx='6' ry='6' width='80' height='24' />

								<rect x='0' y='36' rx='10' ry='10' width='100%' height='120' />

								<rect x='0' y='170' rx='6' ry='6' width='60%' height='20' />

								<rect x='0' y='200' rx='4' ry='4' width='80' height='16' />
								<rect x='280' y='200' rx='4' ry='4' width='60' height='20' />

								<rect x='0' y='240' rx='6' ry='6' width='100' height='32' />

								<rect x='260' y='240' rx='6' ry='6' width='80' height='32' />
							</ContentLoader>
						))}
				{filteredCourses.length ? (
					filteredCourses.map((course: any, index: any) => (
						<CourseCard
							key={index}
							{...course}
							courseStatus={course?.is_active}
							courseuuid={course?.uuid}
							category_name={course?.category?.category_name}
							categoryUuid={course?.category?.uuid}
							image={course?.image}
							onView={() => handleViewCourse(course)}
						/>
					))
				) : (
					<Card className='col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-5 mt-8 p-6'>
						<p className='text-base sm:text-lg text-gray-900 text-center'>
							No Courses available
						</p>
					</Card>
				)}
			</div>
		</div>
	);
};

export default Courses;
