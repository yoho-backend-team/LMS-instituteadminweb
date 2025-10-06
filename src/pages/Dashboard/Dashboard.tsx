/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COLORS, FONTS } from '../../constants/uiConstants';
import Earnings from '../../assets/Dashboard/Earnings.png';
import Projects from '../../assets/Dashboard/Projects.png';
import Instructor from '../../assets/Dashboard/Instructor.png';
import Students from '../../assets/Dashboard/Students.png';
import Course from '../../assets/Dashboard/Course.png';
import Barchart from '../../components/Dashboard/barchart';
import {
	getActivitythunks,
	getDashboardthunks,
} from '../../features/Dashboard/reducers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectActivityData,
	selectDashboardData,
} from '../../features/Dashboard/reducers/selectors';
import { GetImageUrl } from '../../utils/helper';
import { selectBranches } from '../../features/Auth/reducer/selector';
import {
	GetLocalStorage,
	RemoveLocalStorage,
	StoreLocalStorage,
} from '../../utils/localStorage';
import { getDashboard } from '../../features/Dashboard/services';
import { useLoader } from '../../context/LoadingContext/Loader';

export default function Component() {
	const [periodOpen, setPeriodOpen] = useState(false);
	const options = ['Trending', 'Price - Low to High', 'Price - High to Low'];
	const [trendingOpen, setTrendingOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [selectedMonth, setSelectedMonth] = useState('July');
	const [selectedYear, setSelectedYear] = useState('2025');
	const dispatch = useDispatch<any>();
	const DashboardData = useSelector(selectDashboardData);
	const ActivityData = useSelector(selectActivityData);
	const BranchData: any = useSelector(selectBranches);
	const [selectedBranch, setSelectedBranch] = useState('');
	const localBranch = GetLocalStorage('selectedBranchId');
	const [selectedBranchID, setSelectedBranchID] = useState(localBranch);
	const BranchOptions = BranchData?.map((branch: any) => {
		return branch?.branch_identity;
	});
	const branchList = BranchOptions;
	const [branchMenuOpen, setBranchMenuOpen] = useState(false);
	const { showLoader, hideLoader } = useLoader()

	const handleSelect = (option: any) => {
		setSelectedOption(option);
		setTrendingOpen(false);
	};

	const handleBranchChange = (branch: string) => {
		BranchData.map((branchID: any) => {
			if (branchID?.branch_identity === branch) {
				RemoveLocalStorage('selectedBranchId');
				setSelectedBranch(branchID?.branch_identity);
				StoreLocalStorage('selectedBranchId', branchID.uuid);
				setSelectedBranchID(branchID.uuid)
			}
		});

		setSelectedBranch(branch);
		setBranchMenuOpen(false);
	};

	useEffect(() => {
		const paramsData = { branch: GetLocalStorage('selectedBranchId') };
		(async () => {
			showLoader()
			const response = await dispatch(getDashboardthunks(paramsData));
			const responsse2 = await dispatch(getActivitythunks({ page: 1 }));
			if (response && responsse2) {
				hideLoader()
			}
			if (localBranch) {
				console.log("local found", localBranch)
				BranchData?.forEach((item: any) => {
					if (item?.uuid == localBranch) {
						console.log(item?.branch_identity, "branch")
						return setSelectedBranch(item?.branch_identity);
					}
				})
			} else {
				const foundBranch = BranchData?.find(
					(item: any) => item.uuid === localBranch
				);
				setSelectedBranch(foundBranch?.branch_identity);
			}
		})();
	}, [BranchData, dispatch, hideLoader, localBranch, showLoader]);
	
	const monthMap: { [key: string]: number } = {
		January: 1,
		February: 2,
		March: 3,
		April: 4,
		May: 5,
		June: 6,
		July: 7,
		August: 8,
		September: 9,
		October: 10,
		November: 11,
		December: 12,
	};
	
	const handleApply = async () => {
		try {
			const monthNumber = monthMap[selectedMonth];

			const params = {
				branch: selectedBranchID,
				month: monthNumber,
				year: selectedYear,
			};

			const data = await getDashboard(params);
			console.log("API Response:", data);

			setPeriodOpen(false);
		} catch (error) {
			console.error("Error fetching dashboard:", error);
		}
	};

	return (
		<div className='h-[86vh] p-2 sm:p-4 overflow-y-scroll overflow-x-hidden scrollbar-hide'>
			{/* SearchBAr */}
			<div className='mx-auto space-y-4 sm:space-y-6'>
				{/* Header */}
				<div className='grid grid-rows-2 gap-3 sm:flex sm:justify-between sm:items-center'>
					<div className='relative'>
						{/* Trigger Button */}
						<button
							onClick={() => setBranchMenuOpen(!branchMenuOpen)}
							className='flex items-center justify-between w-full sm:w-96 px-3 sm:px-4 py-2 rounded-full'
							style={{
								background: 'white',
								border: `2px solid ${COLORS.primary}`,
								...FONTS.heading_07,
								color: '#716F6F',
							}}
						>
							<span className='truncate mr-2'>{selectedBranch}</span>
							<ChevronDown className='h-4 w-4 flex-shrink-0 text-[#716F6F]' />
						</button>

						{/* Dropdown Options */}
						{branchMenuOpen && (
							<div className='absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full sm:w-96 max-h-60 overflow-y-auto'>
								<div className='space-y-2 p-2'>
									{branchList.map((branch: any) => (
										<button
											key={branch}
											onClick={() => handleBranchChange(branch)}
											className='w-full text-left p-2 rounded-md'
											style={{
												...FONTS.heading_08,
												backgroundColor:
													selectedBranch === branch
														? COLORS.primary
														: 'transparent',
												color: selectedBranch === branch ? '#fff' : '#716F6F',
												border: '1px solid #ddd',
											}}
										>
											{branch}
										</button>
									))}
								</div>
							</div>
						)}
					</div>
					<div className='relative'>
						<button
							onClick={() => setPeriodOpen(!periodOpen)}
							className='flex items-center justify-between w-full sm:w-44 px-3 sm:px-4 py-2 text-white rounded-full'
							style={{ background: COLORS.button }}
						>
							<span className='text-sm sm:text-base'>Choose Period</span>
							<ChevronDown className='h-4 w-4 ml-2 flex-shrink-0' />
						</button>
						{periodOpen && (
							<div className='absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3 sm:p-4 w-full sm:w-64'>
								<div className='space-y-3 sm:space-y-4'>
									{/* Month Selector */}
									<div>
										<label className='block text-sm font-medium text-[#716F6F] mb-1'>
											Month
										</label>
										<div className='relative'>
											<select
												title='Months'
												className='w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-[#716F6F] text-sm sm:text-base'
												value={selectedMonth}
												onChange={(e) => setSelectedMonth(e.target.value)}
												style={{ ...FONTS.heading_08 }}
											>
												{[
													'January',
													'February',
													'March',
													'April',
													'May',
													'June',
													'July',
													'August',
													'September',
													'October',
													'November',
													'December',
												].map((month) => (
													<option key={month} value={month}>
														{month}
													</option>
												))}
											</select>
											<ChevronDown className='h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-[#716F6F]' />
										</div>
									</div>

									{/* Year Selector */}
									<div>
										<label className='block text-sm font-medium text-[#716F6F] mb-1'>
											Year
										</label>
										<div className='relative'>
											<select
												title='Years'
												className='w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-[#716F6F] text-sm sm:text-base'
												value={selectedYear}
												onChange={(e) => setSelectedYear(e.target.value)}
												style={{ ...FONTS.heading_08 }}
											>
												{['2023', '2024', '2025', '2026'].map((year) => (
													<option key={year} value={year}>
														{year}
													</option>
												))}
											</select>
											<ChevronDown className='h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-[#716F6F]' />
										</div>
									</div>

									<button
										className='w-full py-2 px-4 text-white rounded-md border-0 text-sm sm:text-base'
										onClick={handleApply}
										style={{ background: COLORS.primary, ...FONTS.heading_08 }}
									>
										Apply
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* content section */}
			<div className='mt-6 sm:mt-8 gap-4 sm:gap-5 flex flex-col lg:flex-row'>
				{/* Left section  */}
				<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-6 lg:w-[25%]'>
					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-3 sm:p-4 grid gap-3 sm:gap-4'>
						<div className='flex items-center gap-3 sm:gap-4'>
							<div className='rounded-lg text-white'>
								<img
									src={Earnings}
									alt='Earnings'
									className='w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px]'
								/>
							</div>
							<div className='flex flex-col gap-1 sm:gap-2'>
								<span className='text-[#716F6F] text-xs sm:text-sm' style={{ ...FONTS.heading_08 }}>
									Total Earnings
								</span>
								<span className='text-lg sm:text-xl font-semibold text-[#7D7D7D]'>
									{DashboardData?.totalBalance}
								</span>
							</div>
						</div>
						<div className='w-full bg-gray-200 h-[3px] sm:h-[4px] rounded-full'>
							<div className='bg-[#6150E9] h-full w-[60%] rounded-full'></div>
						</div>
					</div>

					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-3 sm:p-4 grid gap-3 sm:gap-4'>
						<div className='flex items-center gap-3 sm:gap-4'>
							<div className='rounded-lg text-white'>
								<img src={Projects} alt='Projects' className='w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px]' />
							</div>
							<div className='flex flex-col gap-1 sm:gap-2'>
								<span className='text-[#716F6F] text-xs sm:text-sm' style={{ ...FONTS.heading_08 }}>
									Payouts
								</span>
								<span className='text-lg sm:text-xl font-semibold text-[#7D7D7D]'>
									{DashboardData?.totalPaidAmount}
								</span>
							</div>
						</div>
						<div className='w-full bg-gray-200 h-[3px] sm:h-[4px] rounded-full'>
							<div className='bg-[#18BABA] h-full w-[60%] rounded-full'></div>
						</div>
					</div>

					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-3 sm:p-4 grid gap-3 sm:gap-4'>
						<div className='flex items-center gap-3 sm:gap-4'>
							<div className='rounded-lg text-white'>
								<img src={Instructor} alt='Instructor' className='w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px]' />
							</div>
							<div className='flex flex-col gap-1 sm:gap-2'>
								<span className='text-[#716F6F] text-xs sm:text-sm' style={{ ...FONTS.heading_08 }}>
									Instructor
								</span>
								<span className='text-lg sm:text-xl font-semibold text-[#7D7D7D]'>
									{DashboardData?.TeachingstaffCount}
								</span>
							</div>
						</div>
						<div className='w-full bg-gray-200 h-[3px] sm:h-[4px] rounded-full'>
							<div className='bg-[#E67123] h-full w-[60%] rounded-full'></div>
						</div>
					</div>

					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-3 sm:p-4 grid gap-3 sm:gap-4'>
						<div className='flex items-center gap-3 sm:gap-4'>
							<div className='rounded-lg text-white'>
								<img src={Students} alt='Students' className='w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px]' />
							</div>
							<div className='flex flex-col gap-1 sm:gap-2'>
								<span className='text-[#716F6F] text-xs sm:text-sm' style={{ ...FONTS.heading_08 }}>
									Students
								</span>
								<span className='text-lg sm:text-xl font-semibold text-[#7D7D7D]'>
									{DashboardData?.studentCount}
								</span>
							</div>
						</div>
						<div className='w-full bg-gray-200 h-[3px] sm:h-[4px] rounded-full'>
							<div className='bg-[#B200FF] h-full w-[60%] rounded-full'></div>
						</div>
					</div>

					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-3 sm:p-4 grid gap-3 sm:gap-4'>
						<div className='flex items-center gap-3 sm:gap-4'>
							<div className='rounded-lg text-white'>
								<img src={Course} alt='Course' className='w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px]' />
							</div>
							<div className='flex flex-col gap-1 sm:gap-2'>
								<span className='text-[#716F6F] text-xs sm:text-sm' style={{ ...FONTS.heading_08 }}>
									Course
								</span>
								<span className='text-lg sm:text-xl font-semibold text-[#7D7D7D]'>
									{DashboardData?.courseCount}
								</span>
							</div>
						</div>
						<div className='w-full bg-gray-200 h-[3px] sm:h-[4px] rounded-full'>
							<div className='bg-[#DD0031] h-full w-[60%] rounded-full'></div>
						</div>
					</div>
				</section>

				{/* Right Section  */}
				<section className='lg:w-[75%]'>
					{/* Bar Chart  */}
					{/* Bar Chart  */}
<div className='w-full bg-white rounded-xl shadow-[4px_4px_24px_0px_#0000001A] p-3 sm:p-4'>
  {/* Scrollable container for mobile */}
  <div className='sm:hidden overflow-x-auto'>
    <div className='min-w-[600px]'> {/* Minimum width to ensure content doesn't get too squeezed */}
      <Barchart />
    </div>
  </div>
  
  {/* Default view for larger screens */}
  <div className='hidden sm:block'>
    <Barchart />
  </div>
</div>

					{/* Popular Course  */}
					<div className='bg-white rounded-xl mt-4 sm:mt-6 shadow-[4px_4px_24px_0px_#0000001A] p-3 sm:p-4'>
						{/* Header  */}
						<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 w-full'>
							<h1 className='text-lg sm:text-xl' style={{ ...FONTS.bold_heading, color: COLORS.gray_dark_01 }}>
								Popular Course
							</h1>

							<div className='relative w-full sm:w-auto'>
								<button
									onClick={() => setTrendingOpen(!trendingOpen)}
									className='flex items-center justify-between w-full sm:w-fit px-3 sm:px-4 py-2 text-white rounded-full text-sm sm:text-base'
									style={{ background: COLORS.button }}
								>
									<span className='truncate'>{selectedOption}</span>
									<ChevronDown className='h-4 w-4 ml-2 flex-shrink-0' />
								</button>

								{trendingOpen && (
									<div className='absolute top-full left-0 sm:right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3 w-full sm:w-64'>
										<div className='space-y-2 sm:space-y-3'>
											{options.map((option) => (
												<button
													key={option}
													onClick={() => handleSelect(option)}
													className={`w-full p-2 border border-gray-300 rounded-md text-left text-sm sm:text-base`}
													style={{
														...FONTS.heading_08,
														background:
															selectedOption === option
																? COLORS.primary
																: 'transparent',
														color:
															selectedOption === option ? 'white' : '#716F6F',
													}}
												>
													{option}
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Courses  */}
						<div className='mt-3 sm:mt-4 w-full py-3 sm:py-4'>
							{DashboardData?.popularCourses?.length > 0 ? (
								<div className='flex gap-3 sm:gap-4 overflow-x-scroll scrollbar-hide pb-2'>
									{DashboardData.popularCourses.map(
										(item: any, index: number) => (
											<section
												key={index}
												className={`min-w-[280px] sm:w-[330px] rounded-xl p-3 sm:p-4 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-2 sm:space-x-3 ${index === 0
													? 'bg-[linear-gradient(101.51deg,_#1BBFCA_0%,_#0AA2AC_100%)]'
													: 'bg-white'
													}`}
											>
												<img
													src={GetImageUrl(item?.image) ?? undefined}
													className='w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px] bg-white rounded-full object-cover flex-shrink-0'
													alt='course img'
												/>
												<div className='flex-grow min-w-0'>
													<h2
														className={`${index === 0 ? 'text-white' : 'text-[#716F6F]'
															} mb-1 text-sm sm:text-base line-clamp-2`}
														style={{ ...FONTS.bold_heading }}
													>
														{item?.course_name}
													</h2>
													<p
														className={`${index === 0 ? 'text-white' : 'text-[#716F6F]'
															} text-xs sm:text-sm mb-3 sm:mb-4 leading-tight line-clamp-2`}
														style={{ ...FONTS.description }}
													>
														{item?.description}
													</p>
													<p
														className={`w-fit rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm ${index === 0
															? 'bg-white text-[#6C6C6C]'
															: 'bg-white border-2 border-[#1A846C] text-[#1A846C]'
															}`}
														style={{ ...FONTS.heading_08 }}
													>
														{item?.coursemodules.length} Modules
													</p>
												</div>
											</section>
										)
									)}
								</div>
							) : (
								<div
									className='text-center text-[#999] text-sm sm:text-base py-4'
									style={{ ...FONTS.heading_08 }}
								>
									No Courses Found
								</div>
							)}
						</div>
					</div>
				</section>
			</div>

			{/* Recent Activities  */}
			<div className='my-6 sm:my-8 p-3 sm:p-4 bg-white rounded-xl shadow-[4px_4px_24px_0px_#0000001A]'>
				<h1 className='text-lg sm:text-xl mb-3 sm:mb-4' style={{ ...FONTS.bold_heading, color: COLORS.gray_dark_01 }}>
					Recent Activities
				</h1>
				{ActivityData?.length != 0 ? (
					<div className='py-3 sm:py-4 px-1 sm:px-2 flex gap-3 sm:gap-4 w-full overflow-x-scroll scrollbar-hide pb-2'>
						{ActivityData?.map((item: any, index: any) => (
							<section
								key={index}
								className={`min-w-[260px] sm:min-w-[300px] rounded-xl p-3 sm:p-4 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-3 sm:space-x-4 ${index === 0
									? 'bg-[linear-gradient(101.51deg,_#1BBFCA_0%,_#0AA2AC_100%)]'
									: 'bg-white'
									}`}
							>
								<img
									src={item?.image ?? undefined}
									className='w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex-shrink-0'
									alt='Notes Image'
								/>
								<div className='flex-grow min-w-0'>
									<h2
										className={`mb-1 text-sm sm:text-base ${index === 0 ? 'text-white' : ''}`}
										style={{ ...FONTS.notes_head }}
									>
										{item?.title}
									</h2>
									<p
										className={`${index === 0 ? 'text-white' : ''
											} text-xs sm:text-sm leading-tight line-clamp-2`}
										style={{ ...FONTS.description }}
									>
										{item?.details}
									</p>
								</div>
							</section>
						))}
					</div>
				) : (
					<div
						className='text-center text-[#999] text-sm sm:text-base py-4'
						style={{ ...FONTS.heading_08 }}
					>
						No Activities Found
					</div>
				)}
			</div>
		</div>
	);
}