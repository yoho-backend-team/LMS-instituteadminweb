import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COLORS, FONTS } from '../../constants/uiConstants';
import Earnings from '../../assets/Dashboard/Earnings.png';
import Projects from '../../assets/Dashboard/Projects.png';
import Instructor from '../../assets/Dashboard/Instructor.png';
import Students from '../../assets/Dashboard/Students.png';
import Course from '../../assets/Dashboard/Course.png';
import Barchart from '../../components/Dashboard/barchart';
import { getDashboardthunks } from '../../features/Dashboard/reducers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectDashboardData } from '../../features/Dashboard/reducers/selectors';

export default function Component() {
	const [periodOpen, setPeriodOpen] = useState(false);
	const [trendingOpen, setTrendingOpen] = useState(false);

	const [selectedMonth, setSelectedMonth] = useState('July');
	const [selectedYear, setSelectedYear] = useState('2025');

	const handleApply = () => {
		console.log('Selected Month:', selectedMonth);
		console.log('Selected Year:', selectedYear);
		setPeriodOpen(false);
	};





	const dispatch = useDispatch<any>()
	
		const DashboardData = useSelector(selectDashboardData)
	
		useEffect(() => {
			const paramsData = {branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4"}
			dispatch(getDashboardthunks(paramsData));
			console.log(DashboardData, "Dashboard Details")
		}, [dispatch]);




	return (
		<div className=' h-[86vh] p-4  overflow-y-scroll overflow-x-hidden scrollbar-hide'>
			{/* SearchBAr */}
			<div className=' mx-auto space-y-6'>
				{/* Header */}
				<div className='flex justify-between items-center'>
					<div className='relative'>
						<input
							style={{
								...FONTS.heading_07,
								border: `2px solid ${COLORS.primary}`,
							}}
							placeholder='Branch'
							className='w-96 p-2 pl-4 rounded-full'
						/>
					</div>
					<div className='relative'>
						<button
							onClick={() => setPeriodOpen(!periodOpen)}
							className='flex items-center justify-between w-44 px-4 py-2 text-white rounded-full'
							style={{ background: COLORS.button }}
						>
							<span>Choose Period</span>
							<ChevronDown className='h-4 w-4 ml-2' />
						</button>
						{periodOpen && (
							<div className='absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 w-64'>
								<div className='space-y-4'>
									{/* Month Selector */}
									<div>
										<label className='block text-sm font-medium text-[#716F6F] mb-1'>
											Month
										</label>
										<div className='relative'>
											<select
												title='Months'
												className='w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-[#716F6F]'
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
											<ChevronDown className='h-4 w-4 absolute right-3 top-7 transform -translate-y-1/2 text-[#716F6F]' />
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
												className='w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-[#716F6F]'
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
											<ChevronDown className='h-4 w-4 absolute right-3 top-7 transform -translate-y-1/2 text-[#716F6F]' />
										</div>
									</div>

									{/* Apply Button */}
									<button
										className='w-full py-2 px-4 text-white rounded-md border-0'
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

			<div className='flex mt-8 gap-5'>
				{/* Left section  */}
				<section className=' w-[25%] flex flex-col gap-7'>
					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-4 px-5 grid gap-5'>
						<div className='flex items-center gap-6'>
							{/* Icon */}

							<div className=' rounded-lg text-white'>
								<img src={Earnings} alt='' className='w-[70px]' />
							</div>

							{/* Text Info */}
							<div className='flex flex-col gap-2 '>
								<span
									className='text-[#716F6F]'
									style={{ ...FONTS.heading_08 }}
								>
									Total Earnings
								</span>
								<span className='text-xl font-semibold text-[#7D7D7D]'>
									21440
								</span>
								{/* Progress bar */}
							</div>
						</div>

						<div className=' w-full bg-gray-200 h-[4px] rounded-full'>
							<div className='bg-[#6150E9] h-[4px] w-[60%] rounded-full'></div>
						</div>
					</div>

					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-4 px-5 grid gap-5'>
						<div className='flex items-center gap-6'>
							{/* Icon */}

							<div className=' rounded-lg text-white'>
								<img src={Projects} alt='' className='w-[70px]' />
							</div>

							{/* Text Info */}
							<div className='flex flex-col gap-2 '>
								<span
									className='text-[#716F6F]'
									style={{ ...FONTS.heading_08 }}
								>
									Projects
								</span>
								<span className='text-xl font-semibold text-[#7D7D7D]'>
									1000
								</span>
								{/* Progress bar */}
							</div>
						</div>

						<div className=' w-full bg-gray-200 h-[4px] rounded-full'>
							<div className='bg-[#18BABA] h-[4px] w-[60%] rounded-full'></div>
						</div>
					</div>

					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-4 px-5 grid gap-5'>
						<div className='flex items-center gap-6'>
							{/* Icon */}

							<div className=' rounded-lg text-white'>
								<img src={Instructor} alt='' className='w-[70px]' />
							</div>

							{/* Text Info */}
							<div className='flex flex-col gap-2 '>
								<span
									className='text-[#716F6F]'
									style={{ ...FONTS.heading_08 }}
								>
									Instructor
								</span>
								<span className='text-xl font-semibold text-[#7D7D7D]'>
									256
								</span>
								{/* Progress bar */}
							</div>
						</div>

						<div className=' w-full bg-gray-200 h-[4px] rounded-full'>
							<div className='bg-[#E67123] h-[4px] w-[60%] rounded-full'></div>
						</div>
					</div>

					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-4 px-5 grid gap-5'>
						<div className='flex items-center gap-6'>
							{/* Icon */}

							<div className=' rounded-lg text-white'>
								<img src={Students} alt='' className='w-[70px]' />
							</div>

							{/* Text Info */}
							<div className='flex flex-col gap-2 '>
								<span
									className='text-[#716F6F]'
									style={{ ...FONTS.heading_08 }}
								>
									students
								</span>
								<span className='text-xl font-semibold text-[#7D7D7D]'>
									876
								</span>
								{/* Progress bar */}
							</div>
						</div>

						<div className=' w-full bg-gray-200 h-[4px] rounded-full'>
							<div className='bg-[#B200FF] h-[4px] w-[60%] rounded-full'></div>
						</div>
					</div>

					<div className='bg-white shadow-[4px_4px_24px_0px_#0000001A] rounded-xl p-4 px-5 grid gap-5'>
						<div className='flex items-center gap-6'>
							{/* Icon */}

							<div className=' rounded-lg text-white'>
								<img src={Course} alt='' className='w-[70px]' />
							</div>

							{/* Text Info */}
							<div className='flex flex-col gap-2 '>
								<span
									className='text-[#716F6F]'
									style={{ ...FONTS.heading_08 }}
								>
									Course
								</span>
								<span className='text-xl font-semibold text-[#7D7D7D]'>
									365
								</span>
								{/* Progress bar */}
							</div>
						</div>

						<div className=' w-full bg-gray-200 h-[4px] rounded-full'>
							<div className='bg-[#DD0031] h-[4px] w-[60%] rounded-full'></div>
						</div>
					</div>
				</section>

				{/* Right Section  */}
				<section className='w-[75%]'>
					{/* Bar Chart  */}

					<div className='flex w-full gap-6 bg-white rounded-xl shadow-[4px_4px_24px_0px_#0000001A]'>
						<Barchart />
					</div>

					{/* Popular Course  */}

					<div className=' bg-white rounded-xl mt-6 shadow-[4px_4px_24px_0px_#0000001A] p-4'>
						{/* Header  */}
						<div className='flex  justify-between items-center w-full'>
							<h1 style={{ ...FONTS.bold_heading, color: COLORS.gray_dark_01 }}>
								Popular Course
							</h1>

							<div className='relative'>
								<button
									onClick={() => setTrendingOpen(!trendingOpen)}
									className='flex items-center justify-between w-36 px-4 py-2 text-white rounded-full'
									style={{ background: COLORS.button }}
								>
									<span>Trending</span>
									<ChevronDown className='h-4 w-4 ml-2' />
								</button>
								{trendingOpen && (
									<div className='absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 w-64'>
										<div className='space-y-4'>
											{/* Month Selector */}
											<button
												title='Low-High'
												// oncl
												className='w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-[#716F6F]'
												style={{ ...FONTS.heading_08 }}
											>
												Price - Low to High
											</button>

											<button
												title='High-Low'
												className='w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-[#716F6F]'
												style={{ ...FONTS.heading_08 }}
											>
												Price - High to Low
											</button>

											{/* Apply Button */}
											<button
												onClick={() => {
													setTrendingOpen(false);
												}}
												className='w-full py-2 px-4 text-white rounded-md border-0'
												style={{
													background: COLORS.primary,
													...FONTS.heading_08,
												}}
											>
												Trending
											</button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Courses  */}

						<div className='mt-4 flex gap-4 w-full overflow-x-scroll scrollbar-hide py-3'>
							<section className=' min-w-[320px]  rounded-xl p-5 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-2  bg-[linear-gradient(101.51deg,_#1BBFCA_0%,_#0AA2AC_100%)]'>
								<img
									src={Students}
									className='w-15 h-15 bg-white rounded-full'
									alt=''
								/>
								<div className='flex-grow'>
									<h2
										className=' text-white mb-1'
										style={{ ...FONTS.bold_heading }}
									>
										MEAN STACK 2024
									</h2>
									<p
										className='text-white text-sm mb-4 leading-tight'
										style={{ ...FONTS.description }}
									>
										The MERN Stack Is A Collection Of Technologies For Building
									</p>
									<p
										className='bg-white w-fit rounded-lg text-[#6C6C6C] px-4.5 py-2.5'
										style={{ ...FONTS.heading_08 }}
									>
										1 Modules
									</p>
								</div>
							</section>

							<section className=' min-w-[320px] rounded-xl bg-white p-5 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-2'>
								<img
									src={Students}
									className='w-15 h-15 bg-white rounded-full'
									alt=''
								/>
								<div className='flex-grow'>
									<h2
										className=' text-[#716F6F] mb-1'
										style={{ ...FONTS.bold_heading }}
									>
										MEAN STACK 2024
									</h2>
									<p
										className='text-[#716F6F] text-sm mb-4 leading-tight'
										style={{ ...FONTS.description }}
									>
										The MERN Stack Is A Collection Of Technologies For Building
									</p>
									<p
										className='bg-white w-fit border-2 rounded-lg border-[#1A846C] text-[#1A846C] px-4 py-2'
										style={{ ...FONTS.heading_08 }}
									>
										1 Modules
									</p>
								</div>
							</section>

							<section className=' min-w-[320px] rounded-xl bg-white p-5 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-2'>
								<img
									src={Students}
									className='w-15 h-15 bg-white rounded-full'
									alt=''
								/>
								<div className='flex-grow'>
									<h2
										className=' text-[#716F6F] mb-1'
										style={{ ...FONTS.bold_heading }}
									>
										MEAN STACK 2024
									</h2>
									<p
										className='text-[#716F6F] text-sm mb-4 leading-tight'
										style={{ ...FONTS.description }}
									>
										The MERN Stack Is A Collection Of Technologies For Building
									</p>
									<p
										className='bg-white w-fit border-2 rounded-lg border-[#1A846C] text-[#1A846C] px-4 py-2'
										style={{ ...FONTS.heading_08 }}
									>
										1 Modules
									</p>
								</div>
							</section>
						</div>
					</div>
				</section>
			</div>
			{/* Recent Activities  */}

			<div className='my-8 p-4 bg-white rounded-xl shadow-[4px_4px_24px_0px_#0000001A]'>
				<h1 style={{ ...FONTS.bold_heading, color: COLORS.gray_dark_01 }}>
					Recent Activities
				</h1>

				<div className=' py-4 px-2 flex gap-4 w-full overflow-x-scroll scrollbar-hide'>
					<section className=' min-w-[300px]  rounded-xl p-5 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-4  bg-[linear-gradient(101.51deg,_#1BBFCA_0%,_#0AA2AC_100%)]'>
						<img
							src={Instructor}
							className='w-12 h-12 bg-white rounded-full'
							alt=''
						/>
						<div className='flex-grow'>
							<h2 className=' text-white mb-1' style={{ ...FONTS.notes_head }}>
								Notes Created
							</h2>
							<p
								className='text-white leading-tight'
								style={{ ...FONTS.description }}
							>
								| create | rvr - study material created
							</p>
						</div>
					</section>

					<section className=' min-w-[300px] rounded-xl bg-white p-5 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-4'>
						<img
							src={Instructor}
							className='w-12 h-12 bg-white rounded-full'
							alt=''
						/>
						<div className='flex-grow'>
							<h2 className=' mb-1' style={{ ...FONTS.notes_head }}>
								Notes Created
							</h2>
							<p className=' leading-tight' style={{ ...FONTS.description }}>
								| create | rvr - study material created
							</p>
						</div>
					</section>

					<section className=' min-w-[300px] rounded-xl bg-white p-5 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-4'>
						<img
							src={Instructor}
							className='w-12 h-12 bg-white rounded-full'
							alt=''
						/>
						<div className='flex-grow'>
							<h2 className=' mb-1' style={{ ...FONTS.notes_head }}>
								Notes Created
							</h2>
							<p className=' leading-tight' style={{ ...FONTS.description }}>
								| create | rvr - study material created
							</p>
						</div>
					</section>

					<section className=' min-w-[300px] rounded-xl bg-white p-5 shadow-[4px_4px_24px_0px_#0000001A] flex items-start space-x-4'>
						<img
							src={Instructor}
							className='w-12 h-12 bg-white rounded-full'
							alt=''
						/>
						<div className='flex-grow'>
							<h2 className=' mb-1' style={{ ...FONTS.notes_head }}>
								Notes Created
							</h2>
							<p className=' leading-tight' style={{ ...FONTS.description }}>
								| create | rvr - study material created
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
