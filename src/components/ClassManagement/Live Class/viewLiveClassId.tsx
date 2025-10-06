import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search } from 'lucide-react';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';
import { GetImageUrl } from '../../../utils/helper';

const StudentClassBatch: React.FC = () => {
	const [searchStudent, setSearchStudent] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const { classData } = location.state;

	const filteredStudents = classData?.batch?.student?.filter((student: any) =>
		student?.full_name?.toLowerCase().includes(searchStudent.toLowerCase())
	);

	const formattedTime = (isoTime: string) => {
		const date = new Date(isoTime);
		const time12hr = date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
		return time12hr;
	};

	return (
		<div className='p-3 xs:p-4 sm:p-6 bg-white min-h-screen'>
			{/* Header Navigation */}
			<div className='flex items-center justify-between mb-4 sm:mb-6 lg:mb-8'>
				<Button
					onClick={() => navigate(-1)}
					className='flex items-center gap-1 xs:gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-1 xs:p-2 sm:p-3'
				>
					<ArrowLeft className='w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10' />
				</Button>
			</div>

			{/* Batch Header */}
			<div className='flex flex-col xs:flex-row xs:items-start xs:justify-between gap-3 xs:gap-4 mb-4 sm:mb-6 lg:mb-8'>
				<div className='flex flex-col gap-2 xs:gap-3'>
					<div className='flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3'>
						<Button
							type='button'
							className='!bg-[#1BBFCA] !text-white w-fit text-xs xs:text-sm sm:text-base py-1 xs:py-2'
							style={{ ...FONTS.heading_07 }}
						>
							{classData?.batch?.batch_name}
						</Button>
						<Button
							type='button'
							className='!bg-[#3ABE65] text-center !text-white w-fit text-xs xs:text-sm sm:text-base py-1 xs:py-2'
							style={{ ...FONTS.heading_07 }}
						>
							Offline
						</Button>
					</div>
					<h2
						style={{ ...FONTS.heading_06, color: COLORS.gray_dark_01 }}
						className='text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl'
					>
						Batch {classData?.batch?.id}
					</h2>
				</div>
				<div className='flex flex-col xs:flex-row gap-1 xs:gap-2 sm:gap-3 items-start xs:items-center'>
					<span
						style={{ ...FONTS.heading_08_bold, color: COLORS.gray_dark_02 }}
						className='text-xs xs:text-sm sm:text-base bg-gray-100 px-2 xs:px-3 py-1 xs:py-2 rounded-lg'
					>
						Duration: {classData?.duration} days
					</span>
				</div>
			</div>

			{/* Course Info Grid */}
			<div className='bg-gray-50 mt-4 xs:mt-6 p-3 xs:p-4 sm:p-6 rounded-xl shadow grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 text-sm xs:text-base text-gray-700'>
				<div className='space-y-1 xs:space-y-2'>
					<p className='font-semibold text-gray-500 text-xs xs:text-sm'>
						Course
					</p>
					<p className='font-medium text-gray-800 text-sm xs:text-base break-words line-clamp-2'>
						{classData?.batch?.course?.course_name}
					</p>
				</div>
				<div className='space-y-1 xs:space-y-2'>
					<p className='font-semibold text-gray-500 text-xs xs:text-sm'>
						Started At
					</p>
					<p className='font-medium text-gray-800 text-sm xs:text-base'>
						{formattedTime(classData?.start_time)}
					</p>
				</div>
				<div className='space-y-1 xs:space-y-2'>
					<p className='font-semibold text-gray-500 text-xs xs:text-sm'>
						Ended At
					</p>
					<p className='font-medium text-gray-800 text-sm xs:text-base'>
						{formattedTime(classData?.end_time)}
					</p>
				</div>
				<div className='space-y-1 xs:space-y-2'>
					<p className='font-semibold text-gray-500 text-xs xs:text-sm'>Date</p>
					<p className='font-medium text-gray-800 text-sm xs:text-base'>
						{classData?.start_date?.split('T')[0]}
					</p>
				</div>
			</div>

			{/* Main Content Grid */}
			<div className='grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] 2xl:grid-cols-[1fr_2fr] gap-4 xs:gap-6 mt-4 xs:mt-6 lg:mt-8'>
				{/* Faculty Section */}
				<div className='bg-white p-3 xs:p-4 sm:p-6 rounded-lg shadow-sm border'>
					<h3
						className='text-sm xs:text-base sm:text-lg lg:text-xl font-semibold mb-3 xs:mb-4 sm:mb-6 text-gray-800'
						style={{ ...FONTS.heading_06 }}
					>
						Faculty & Coordinators
					</h3>
					<div className='space-y-3 xs:space-y-4'>
						{classData?.instructors?.map((instr: any) => (
							<div
								key={instr?.id}
								className='flex items-center bg-gray-50 p-2 xs:p-3 sm:p-4 rounded-lg border hover:shadow-sm transition-shadow duration-200'
							>
								<img
									src={GetImageUrl(instr?.image) ?? undefined}
									alt={instr?.full_name}
									className='w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-2 xs:mr-3 sm:mr-4 flex-shrink-0'
								/>
								<div className='min-w-0 flex-1'>
									<p
										className='font-medium text-gray-800 text-xs xs:text-sm sm:text-base truncate'
										style={{ ...FONTS.heading_07_bold }}
									>
										{instr?.full_name}
									</p>
									<p
										className='text-xs text-gray-500'
										style={{ ...FONTS.heading_09 }}
									>
										Instructor
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Enrolled Students Section */}
				<div className='bg-white p-3 xs:p-4 sm:p-6 rounded-lg shadow-sm border'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 xs:mb-4 sm:mb-6'>
						<h3
							className='text-sm xs:text-base sm:text-lg lg:text-xl font-semibold text-gray-800'
							style={{ ...FONTS.heading_06 }}
						>
							Enrolled Students
						</h3>
						<div className='relative w-full sm:w-48 md:w-56 lg:w-64'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
							<input
								type='text'
								placeholder='Search Student'
								value={searchStudent}
								onChange={(e) => setSearchStudent(e.target.value)}
								className='w-full pl-10 pr-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent text-sm xs:text-base'
							/>
						</div>
					</div>

					<div className='space-y-3 xs:space-y-4'>
						{filteredStudents?.length > 0 ? (
							filteredStudents.map((student: any) => (
								<div
									key={student?.id}
									className='bg-gray-50 p-3 xs:p-4 rounded-lg border hover:shadow-sm transition-shadow duration-200'
								>
									<div className='flex flex-col lg:flex-row gap-3 xs:gap-4'>
										{/* Student Image and Basic Info */}
										<div className='flex items-start gap-3 xs:gap-4 flex-1 min-w-0'>
											<img
												src={GetImageUrl(student?.image) ?? undefined}
												alt={student?.full_name}
												className='w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0'
											/>
											<div className='min-w-0 flex-1'>
												<p
													className='font-medium text-gray-800 text-sm xs:text-base sm:text-lg break-words mb-1'
													style={{ ...FONTS.heading_07_bold }}
												>
													{student?.full_name}
												</p>
												<p
													className='text-xs xs:text-sm text-gray-500 truncate'
													style={{ ...FONTS.heading_09 }}
												>
													{student?.email}
												</p>
											</div>
										</div>

										{/* Student Details */}
										<div className='flex flex-col gap-2 xs:gap-3 lg:text-right lg:items-end lg:justify-between'>
											{/* ID and Location Row */}
											<div className='flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 justify-between lg:justify-end'>
												{/* ID Badge */}
												<div
													className='border border-gray-400 px-2 xs:px-3 py-1 rounded-md text-xs xs:text-sm w-fit'
													style={{
														...FONTS.heading_09,
														color: COLORS.gray_dark_02,
													}}
												>
													ID: {student?.id}
												</div>

												{/* Location */}
												<div className='flex items-center gap-1 xs:gap-2'>
													<MapPin
														className='w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0'
														color={COLORS.gray_dark_02}
													/>
													<p
														style={{
															...FONTS.heading_09,
															color: COLORS.gray_dark_02,
														}}
														className='text-xs xs:text-sm truncate'
													>
														{student?.contact_info?.city || 'N/A'}
													</p>
												</div>
											</div>

											{/* Address */}
											<div className='text-left lg:text-right w-full'>
												<p
													style={{
														...FONTS.heading_09,
														color: COLORS.gray_dark_01,
													}}
													className='!text-xs font-medium mb-1'
												>
													Address
												</p>
												<p
													style={{
														...FONTS.heading_09,
														color: COLORS.gray_dark_02,
													}}
													className='text-xs xs:text-sm break-words line-clamp-2 max-w-full'
												>
													{student?.contact_info?.address1 ||
														'No address provided'}
												</p>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<div className='text-center py-8 xs:py-12'>
								<p
									className='text-gray-500 text-sm xs:text-base'
									style={{ ...FONTS.heading_09 }}
								>
									{searchStudent ? 'No students found' : 'No students enrolled'}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentClassBatch;
