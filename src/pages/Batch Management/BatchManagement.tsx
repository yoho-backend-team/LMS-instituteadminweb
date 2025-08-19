import { useEffect, useState, useCallback } from 'react';
import filter from '../../assets/icons/filter.png';
import plus from '../../assets/Add.png';
import { Button } from '../../components/ui/button';
import { BatchCard } from '../../components/BatchManagement/batchCard';
import { COLORS, FONTS } from '../../constants/uiConstants';
import { CreateBatchModal } from '../../components/BatchManagement/createBatch';
import { useDispatch, useSelector } from 'react-redux';
import { getwithIdBatches } from '../../features/batchManagement/reducers/thunks';
import { selectBatch, selectLoading } from '../../features/batchManagement/reducers/selectors';
import { getCourseService } from '../../features/batchManagement/services';
import ContentLoader from 'react-content-loader';

export default function BatchManagement() {
	const [showFilter, setShowFilter] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const dispatch = useDispatch<any>();
	const batchData = useSelector(selectBatch);
	const [courses, setCourses] = useState([]);
	const [searchterms, setSearchTerms] = useState({
		status: '',
		date: '',
		course: '',
		batch: '',
	});
	const loading = useSelector(selectLoading);
	

	const fetchBatchData = useCallback(async () => {
		try {
			const params_data = {
				branch_id: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
				page: 1,
			};
			dispatch(getwithIdBatches(params_data));
		} catch (error) {
			console.log('Error fetching batch data:', error);
		}
	}, [dispatch]);

	const fetchAllCourses = async () => {
		try {
			const response = await getCourseService({});
			if (response) {
				setCourses(response?.data);
			} else {
				console.log('No courses found');
			}
		} catch (error) {
			console.log('Error fetching course data:', error);
		}
	};

	useEffect(() => {
		fetchBatchData();
		fetchAllCourses();
	}, [dispatch]);

	const filteredBatches = batchData?.data?.filter((batch: any) => {
		const matchesStatus = searchterms.status
			? batch.is_active === (searchterms.status === 'active')
			: true;

		const matchesDate = searchterms.date
			? new Date(batch.start_date) >= new Date(searchterms.date)
			: true;

		const matchesCourse = searchterms.course
			? batch.course?.course_name
					.toLowerCase()
					.includes(searchterms.course.toLowerCase())
			: true;

		const matchesBatch = searchterms.batch
			? batch.batch_name.toLowerCase().includes(searchterms.batch.toLowerCase())
			: true;

		return matchesStatus && matchesDate && matchesCourse && matchesBatch;
	});


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
		<div className='min-h-screen bg-cover bg-no-repeat bg-center p-4 overflow-y-auto'>
			<div className='mb-8'>
				<h2
					className='mb-6'
					style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}
				>
					Student
				</h2>

				<div className='flex justify-between items-center'>
					<Button
						onClick={() => setShowFilter(!showFilter)}
						className='bg-[#1BBFCA] hover:bg-[#1BBFCA] px-4 flex items-center gap-2'
						style={{ ...FONTS.heading_07, color: COLORS.white }}
					>
						<img src={filter} className='w-4 h-4' alt='Filter' />
						{showFilter ? 'Hide Filter' : 'Show Filter'}
					</Button>

					<Button
						className='bg-[#1BBFCA] hover:bg-[#1BBFCA] px-4 flex items-center gap-2'
						style={{ ...FONTS.heading_07, color: COLORS.white }}
						onClick={() => setShowCreateModal(true)}
					>
						<img src={plus} className='w-4 h-4' alt='Add' />
						Add New Batch
					</Button>
				</div>
			</div>

			{showFilter && (
				<div className='bg-white p-6 rounded-2xl shadow mb-8'>
					<div className='flex justify-between items-center mb-4'>
						<h3
							style={{ ...FONTS.heading_05_bold, color: COLORS.gray_dark_02 }}
						>
							Batches
						</h3>

						<Button
							variant='outline'
							className='border border-gray-300 text-sm px-3 py-1 rounded-md bg-[#1BBFCA] hover:bg-[#1BBFCA]'
							style={{ ...FONTS.heading_07, color: COLORS.white }}
							onClick={() =>
								setSearchTerms({
									status: '',
									date: '',
									course: '',
									batch: '',
								})
							}
						>
							Reset Filters
						</Button>
					</div>

					<div className='grid grid-cols md:grid-cols-2 gap-6'>
						<div>
							<label
								className='block mb-1'
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Search by Status
							</label>
							<select
								className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
								value={searchterms.status}
								onChange={(e) =>
									setSearchTerms({ ...searchterms, status: e.target.value })
								}
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
								Search Between Dates
							</label>
							<input
								type='date'
								className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
								value={searchterms.date}
								onChange={(e) =>
									setSearchTerms({ ...searchterms, date: e.target.value })
								}
							/>
						</div>

						<div>
							<label
								className='block mb-1'
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Search by Course
							</label>
							<select
								className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
								value={searchterms.course}
								onChange={(e) =>
									setSearchTerms({ ...searchterms, course: e.target.value })
								}
							>
								<option value=''>Select Course</option>
								{courses?.map((course: any) => (
									<option key={course?._id} value={course?.course_name}>
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
								Search Batch
							</label>
							<input
								type='text'
								placeholder='search batch'
								className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
								value={searchterms.batch}
								onChange={(e) =>
									setSearchTerms({ ...searchterms, batch: e.target.value })
								}
							/>
						</div>
					</div>
				</div>
			)}

			<div className='flex flex-col-3 gap-3 flex-wrap'>
				{filteredBatches?.length ? (
					filteredBatches?.map((batch: any) => (
						<BatchCard
							key={batch?._id}
							title={batch?.batch_name}
							subtitle={batch?.course?.course_name}
							students={batch?.student?.length}
							duration={batch?.course?.duration}
							startDate={batch?.start_date}
							endDate={batch?.end_date}
							isActive={batch?.is_active}
							data={batch}
							fetchBatchData={fetchBatchData}
						/>
					))
				) : (
					<div className='flex flex-1 justify-center mt-20'>
						<p>No batches available</p>
					</div>
				)}
			</div>

			<CreateBatchModal
				isOpen={showCreateModal}
				setIsOpen={setShowCreateModal}
			/>
		</div>
	);
}
