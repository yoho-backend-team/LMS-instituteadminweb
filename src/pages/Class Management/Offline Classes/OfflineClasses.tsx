/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import plus from '../../../assets/Add.png';
import filter from '../../../assets/Filter.png';
import { CreateOfflineClassModal } from '../../../components/class management/offlineClass/createOfflineClass';
import OfflineClassCard from '../../../components/class management/offlineClass/classcard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOffline } from '../../../features/Class Management/offlineClass/redures/thunks';
import {
	selectLoading,
	selectOfflineClass,
} from '../../../features/Class Management/offlineClass/redures/selectors';
import { getAllBatches } from '../../../features/Class Management/offlineClass/services';
import ContentLoader from 'react-content-loader';
import { GetLocalStorage } from '../../../utils/localStorage';

const OfflineClasses = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const dispatch = useDispatch<any>();
	const offlineClassData = useSelector(selectOfflineClass);
	const [, setAllBatches] = useState([]);
	const [filteredClasses, setFilteredClasses] = useState([]);
	const [searchTerms, setSearchTerms] = useState({
		status: '',
		batch: '',
		searchText: '',
	});
	const loading = useSelector(selectLoading);

	const fetchAllofflineClasses = async () => {
		try {
			const params_data = {
				branch: GetLocalStorage('selectedBranchId'),
				institute: GetLocalStorage('instituteId'),
				page: 1,
			};
			dispatch(getAllOffline(params_data));
		} catch (error) {
			console.log(error);
		}
	};

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
			batch: '',
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
		if (offlineClassData?.data) {
			const filtered = offlineClassData.data.filter((liveClass: any) => {
				if (
					searchTerms.searchText &&
					!liveClass.class_name
						?.toLowerCase()
						.includes(searchTerms.searchText.toLowerCase())
				) {
					return false;
				}
				return true;
			});
			setFilteredClasses(filtered);
		}
	}, [searchTerms.searchText, offlineClassData]);

	useEffect(() => {
		if (offlineClassData?.data) {
			setFilteredClasses(offlineClassData.data);
		}
	}, [offlineClassData]);

	useEffect(() => {
		const fetchAllofflineClasses = async () => {
			try {
				const params_data = {
					branch: GetLocalStorage('selectedBranchId'),
					institute: GetLocalStorage('instituteId'),
					page: 1,
				};
				dispatch(getAllOffline(params_data));
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllofflineClasses();
		fetchAllBatches();
	}, [dispatch, fetchAllBatches]);

	return (
		<div className='min-h-screen bg-cover bg-no-repeat bg-center p-4'>
			<div className='mb-8'>
				<h2
					className='mb-6'
					style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}
				>
					Offline Class
				</h2>

				<div className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-3'>
					<Button
						onClick={toggleFilter}
						className='bg-[#1BBFCA] hover:bg-[#1BBFCA] px-4 py-2 flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base transition-colors'
						style={{ ...FONTS.heading_07, color: COLORS.white }}
					>
						<img src={filter} className='w-4 h-4' alt='Filter Icon' />
						<span className='whitespace-nowrap'>
							{showFilter ? 'Hide Filter' : 'Show Filter'}
						</span>
					</Button>

					<Button
						className='bg-[#1BBFCA] hover:bg-[#1BBFCA] px-4 py-2 flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base transition-colors'
						style={{ ...FONTS.heading_07, color: COLORS.white }}
						onClick={toggleCreateModal}
					>
						<img src={plus} className='w-4 h-4' alt='Add Icon' />
						<span className='whitespace-nowrap'>Add Offline Class</span>
					</Button>
				</div>
			</div>

			{showFilter && (
				<div className='bg-white p-6 rounded-2xl shadow mb-8'>
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

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
				{loading ? (
					[...Array(6)].map((_, index) => (
						<ContentLoader
							key={index}
							speed={1}
							width='100%'
							height={310}
							backgroundColor='#f3f3f3'
							foregroundColor='#ecebeb'
							className='w-full h-[310px] p-4 rounded-2xl border shadow-md'
						>
							{/* Title */}
							<rect x='0' y='0' rx='6' ry='6' width='70%' height='20' />
							{/* Badge/Status */}
							<rect x='75%' y='0' rx='6' ry='6' width='20%' height='20' />

							{/* Image / Card main content */}
							<rect x='0' y='36' rx='10' ry='10' width='100%' height='120' />

							{/* Class Name */}
							<rect x='0' y='165' rx='6' ry='6' width='60%' height='20' />

							{/* Date / Time */}
							<rect x='0' y='195' rx='4' ry='4' width='50%' height='16' />
							<rect x='55%' y='195' rx='4' ry='4' width='40%' height='16' />

							{/* Footer Buttons */}
							<rect x='0' y='230' rx='6' ry='6' width='45%' height='32' />
							<rect x='50%' y='230' rx='6' ry='6' width='45%' height='32' />
						</ContentLoader>
					))
				) : filteredClasses?.length > 0 ? (
					filteredClasses.map((offlineClass: any) => (
						<OfflineClassCard
							key={offlineClass?._id}
							title={offlineClass?.class_name}
							students={offlineClass?.students ?? '0'}
							startDate={offlineClass?.createdAt}
							endTime={offlineClass?.end_time}
							startTime={offlineClass?.start_time}
							classData={offlineClass}
							fetchAllofflineClasses={fetchAllofflineClasses}
						/>
					))
				) : (
					<div className='w-full text-center py-8'>
						<p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
							No offline classes found
						</p>
					</div>
				)}
			</div>

			<CreateOfflineClassModal
				fetchAllOfflineClasses={fetchAllofflineClasses}
				isOpen={showCreateModal}
				setIsOpen={setShowCreateModal}
			/>
		</div>
	);
};

export default OfflineClasses;
