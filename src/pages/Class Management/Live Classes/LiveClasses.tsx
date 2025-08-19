import { useEffect, useState, useCallback } from 'react';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../../components/ui/button';
import filter from '../../../assets/Filter.png';
import plus from '../../../assets/Add.png';
import { CreateLiveClassModal } from '../../../components/ClassManagement/Live Class/createLiveClass';
import { LiveClassCard } from '../../../components/ClassManagement/Live Class/classCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLiveClasses } from '../../../features/Class Management/Live Class/reducers/thunks';
import { selectLiveClass, selectLoading } from '../../../features/Class Management/Live Class/reducers/selectors';
import {
	getAllBatches,
	getAllCourses,
} from '../../../features/Class Management/Live Class/services';
import ContentLoader from 'react-content-loader';

const LiveClasses = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const dispatch = useDispatch<any>();
	const liveClassData = useSelector(selectLiveClass);
	const [allCourses, setAllCourses] = useState([]);
	const [allBatches, setAllBatches] = useState([]);
	const [filteredClasses, setFilteredClasses] = useState([]);
	const [searchTerms, setSearchTerms] = useState({
		status: '',
		course: '',
		batch: '',
		startDate: '',
		endDate: '',
		searchText: '',
	});
	const loading = useSelector(selectLoading);

	const fetchAllLiveClasses = useCallback(async () => {
		try {
			const params_data = {
				branch: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
				institute: '973195c0-66ed-47c2-b098-d8989d3e4529',
				page: 1,
			};
			dispatch(getAllLiveClasses(params_data));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	const fetchAllCourses = useCallback(async () => {
		try {
			const response = await getAllCourses({});
			if (response) {
				setAllCourses(response?.data);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	const fetchAllBatches = useCallback(async () => {
		try {
			const response = await getAllBatches({});
			if (response) {
				setAllBatches(response?.data);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleFilterChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			const { name, value } = e.target;
			setSearchTerms((prev) => ({
				...prev,
				[name]: value,
			}));
		},
		[]
	);

	const resetFilters = useCallback(() => {
		setSearchTerms({
			status: '',
			course: '',
			batch: '',
			startDate: '',
			endDate: '',
			searchText: '',
		});
	}, []);

	const toggleFilter = useCallback(() => {
		setShowFilter((prev) => !prev);
	}, []);

	const toggleCreateModal = useCallback(() => {
		setShowCreateModal((prev) => !prev);
	}, []);

	useEffect(() => {
		if (liveClassData?.data) {
			const filtered = liveClassData.data.filter((liveClass: any) => {
				if (searchTerms.status === 'active' && !liveClass.is_active)
					return false;
				if (searchTerms.status === 'inactive' && liveClass.is_active)
					return false;

				if (searchTerms.course && liveClass.course !== searchTerms.course)
					return false;

				if (searchTerms.batch && liveClass.batch?._id !== searchTerms.batch)
					return false;

				if (
					searchTerms.startDate &&
					new Date(liveClass.start_date) < new Date(searchTerms.startDate)
				)
					return false;
				if (
					searchTerms.endDate &&
					new Date(liveClass.start_date) > new Date(searchTerms.endDate)
				)
					return false;

				if (
					searchTerms.searchText &&
					!liveClass.class_name
						.toLowerCase()
						.includes(searchTerms.searchText.toLowerCase())
				) {
					return false;
				}

				return true;
			});
			setFilteredClasses(filtered);
		}
	}, [searchTerms, liveClassData]);

	useEffect(() => {
		if (liveClassData?.data) {
			setFilteredClasses(liveClassData.data);
		}
	}, [liveClassData]);

	useEffect(() => {
		fetchAllLiveClasses();
		fetchAllCourses();
		fetchAllBatches();
	}, [dispatch]);



	if (loading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-5'>
				{[...Array(6)].map((_, index) => (
					<ContentLoader
						speed={1}
						width='100%'
						height='100%'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
						className='w-full h-[310px] p-4 rounded-2xl border shadow-md'
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
			</div>
		);
	}
	return (
		<>
			<div className='min-h-screen bg-cover bg-no-repeat bg-center p-4'>
				<div className='mb-8'>
					<h2
						className=' mb-6'
						style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}
					>
						Live Classes
					</h2>

					<div className='flex justify-between items-center'>
						<Button
							onClick={toggleFilter}
							className='bg-[#1BBFCA] hover:bg-[#1BBFCA]  px-4 flex items-center gap-2'
							style={{ ...FONTS.heading_07, color: COLORS.white }}
						>
							<img src={filter} className='w-4 h-4' />
							{showFilter ? 'Hide Filter' : 'Show Filter'}
						</Button>

						<Button
							className='bg-[#1BBFCA] hover:bg-[#1BBFCA]  px-4 flex items-center gap-2'
							style={{ ...FONTS.heading_07, color: COLORS.white }}
							onClick={toggleCreateModal}
						>
							<img src={plus} className='w-4 h-4' />
							Add Live Class
						</Button>
					</div>
				</div>

				{showFilter && (
					<div className='bg-[white] p-6 rounded-2xl shadow mb-8'>
						<div className='flex justify-between items-center mb-4'>
							<h3
								style={{ ...FONTS.heading_05_bold, color: COLORS.gray_dark_02 }}
							>
								Filters
							</h3>
							<button
								onClick={resetFilters}
								className='bg-[#1BBFCA] text-white p-2 rounded-md'
								style={{ ...FONTS.heading_08 }}
							>
								Reset Filters
							</button>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Status
								</label>
								<select
									name='status'
									value={searchTerms.status}
									onChange={handleFilterChange}
									className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer'
								>
									<option value=''>Select Status</option>
									<option value='active'>Active</option>
									<option value='inactive'>Inactive</option>
								</select>
							</div>

							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Course
								</label>
								<select
									name='course'
									value={searchTerms.course}
									onChange={handleFilterChange}
									className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer'
								>
									<option value=''>Select Course</option>
									{allCourses?.map((course: any) => (
										<option key={course?._id} value={course?._id}>
											{course?.course_name}
										</option>
									))}
								</select>
							</div>

							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Batches
								</label>
								<select
									name='batch'
									value={searchTerms.batch}
									onChange={handleFilterChange}
									className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer'
								>
									<option value=''>Select Batch</option>
									{allBatches?.map((batch: any) => (
										<option key={batch?._id} value={batch?._id}>
											{batch?.batch_name}
										</option>
									))}
								</select>
							</div>

							<div className='flex justify-between w-full'>
								<div>
									<label
										className='block mb-1'
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										Start Date
									</label>
									<input
										type='date'
										name='startDate'
										value={searchTerms.startDate}
										onChange={handleFilterChange}
										className='w-[220px] border border-gray-300 rounded-md px-3 py-2 text-sm'
									/>
								</div>
								<div>
									<label
										className='block mb-1'
										style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
									>
										End Date
									</label>
									<input
										type='date'
										name='endDate'
										value={searchTerms.endDate}
										onChange={handleFilterChange}
										className='w-[220px] border border-gray-300 rounded-md px-3 py-2 text-sm'
									/>
								</div>
							</div>

							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Search Class
								</label>
								<input
									type='text'
									name='searchText'
									value={searchTerms.searchText}
									onChange={handleFilterChange}
									placeholder='Search Class'
									className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
								/>
							</div>
						</div>
					</div>
				)}

				<div className='flex gap-6 flex-wrap'>
					{filteredClasses?.length > 0 ? (
						filteredClasses?.map((liveClass: any, index: any) => (
							<LiveClassCard
								key={index}
								fetchAllLiveClasses={fetchAllLiveClasses}
								title={liveClass?.class_name}
								data={liveClass}
							/>
						))
					) : (
						<div className='w-full text-center py-8'>
							<p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
								No live classes found
							</p>
						</div>
					)}
				</div>

				<CreateLiveClassModal
					fetchAllLiveClasses={fetchAllLiveClasses}
					isOpen={showCreateModal}
					setIsOpen={setShowCreateModal}
				/>
			</div>
		</>
	);
};

export default LiveClasses;
