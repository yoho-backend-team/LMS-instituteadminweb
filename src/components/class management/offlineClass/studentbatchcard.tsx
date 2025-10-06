import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
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
			<div className='flex items-center justify-between mb-6 sm:mb-8'>
				<Button
					onClick={() => navigate(-1)}
					className='flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-2'
				>
					<ArrowLeft
						size={24}
						className='w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10'
					/>
				</Button>
			</div>

			{/* Batch Header */}
			<div className='flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4 mb-4 sm:mb-6'>
				<div className='flex flex-col gap-2'>
					<Button
						type='button'
						className='!bg-[#1BBFCA] !text-white w-fit text-sm xs:text-base'
						style={{ ...FONTS.heading_07 }}
					>
						{classData?.batch?.batch_name}
					</Button>
					<h2
						style={{ ...FONTS.heading_06, color: COLORS.gray_dark_01 }}
						className='text-lg xs:text-xl sm:text-2xl'
					>
						Batch {classData?.batch?.id}
					</h2>
				</div>
				<div className='flex flex-col xs:flex-row gap-2 xs:gap-4 items-start xs:items-center'>
					<span
						style={{ ...FONTS.heading_08_bold, color: COLORS.gray_dark_02 }}
						className='text-sm xs:text-base'
					>
						Duration: {classData?.duration} days
					</span>
					<Button
						type='button'
						className='!bg-[#3ABE65] text-center !text-white text-sm xs:text-base'
						style={{ ...FONTS.heading_07 }}
					>
						Offline
					</Button>
				</div>
			</div>

			{/* Course Info Grid */}
			<div className='bg-gray-50 mt-4 xs:mt-6 p-4 xs:p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 text-sm xs:text-base text-gray-700'>
				<div>
					<p className='font-semibold text-gray-500 text-xs xs:text-sm'>
						Course
					</p>
					<p className='font-medium text-gray-800 text-sm xs:text-base break-words'>
						{classData?.batch?.course?.course_name}
					</p>
				</div>
				<div>
					<p className='font-semibold text-gray-500 text-xs xs:text-sm'>
						Started At
					</p>
					<p className='font-medium text-gray-800 text-sm xs:text-base'>
						{formattedTime(classData?.start_time)}
					</p>
				</div>
				<div>
					<p className='font-semibold text-gray-500 text-xs xs:text-sm'>
						Ended At
					</p>
					<p className='font-medium text-gray-800 text-sm xs:text-base'>
						{formattedTime(classData?.end_time)}
					</p>
				</div>
				<div>
					<p className='font-semibold text-gray-500 text-xs xs:text-sm'>Date</p>
					<p className='font-medium text-gray-800 text-sm xs:text-base'>
						{classData?.start_date?.split('T')[0]}
					</p>
				</div>
			</div>

			{/* Main Content Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] xl:grid-cols-[1fr_2fr] gap-4 xs:gap-6 mt-4 xs:mt-6'>
				{/* Faculty Section */}
				<div className='bg-white p-3 xs:p-4 rounded-lg shadow-sm border'>
					<h3 className='text-base xs:text-lg font-semibold mb-3 xs:mb-4 text-gray-800'>
						Faculty & Coordinators
					</h3>
					<div className='space-y-3 xs:space-y-4'>
						{classData?.instructors?.map((instr: any) => (
							<div
								key={instr?.id}
								className='flex items-center bg-gray-50 p-3 xs:p-4 rounded-lg border'
							>
								<img
									src={GetImageUrl(instr?.image) ?? undefined}
									alt={instr?.full_name}
									className='w-10 h-10 xs:w-12 xs:h-12 rounded-full object-cover mr-3 xs:mr-4 flex-shrink-0'
								/>
								<div className='min-w-0 flex-1'>
									<p className='font-medium text-gray-800 text-sm xs:text-base truncate'>
										{instr?.full_name}
									</p>
									<p className='text-xs xs:text-sm text-gray-500'>Instructor</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Enrolled Students Section */}
				<div className='bg-white p-3 xs:p-4 rounded-lg shadow-sm border'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 xs:mb-4'>
						<h3 className='text-base xs:text-lg font-semibold text-gray-800'>
							Enrolled Students
						</h3>
						<div className='w-full sm:w-64'>
							<input
								type='text'
								placeholder='Search Student'
								value={searchStudent}
								onChange={(e) => setSearchStudent(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent text-sm xs:text-base'
							/>
						</div>
					</div>

					<div className='space-y-3 xs:space-y-4'>
						{filteredStudents?.map((student: any) => (
							<div
								key={student?.id}
								className='bg-gray-50 p-3 xs:p-4 rounded-lg border'
							>
								<div className='flex flex-col sm:flex-row gap-3 xs:gap-4'>
									{/* Student Image and Basic Info */}
									<div className='flex items-start gap-3 xs:gap-4 flex-1 min-w-0'>
										<img
											src={GetImageUrl(student?.image) ?? undefined}
											alt={student?.full_name}
											className='w-10 h-10 xs:w-12 xs:h-12 rounded-full object-cover flex-shrink-0'
										/>
										<div className='min-w-0 flex-1'>
											<p className='font-medium text-gray-800 text-sm xs:text-base break-words'>
												{student?.full_name}
											</p>
											<p className='text-xs xs:text-sm text-gray-500 truncate'>
												{student?.email}
											</p>
										</div>
									</div>

									{/* Student Details */}
									<div className='flex flex-col gap-2 xs:gap-3 sm:text-right sm:items-end'>
										{/* ID Badge */}
										<div className='flex flex-col xs:flex-row xs:items-center gap-2'>
											<p
												className='border border-gray-400 text-center px-2 py-1 rounded-md text-xs xs:text-sm'
												style={{
													...FONTS.heading_09,
													color: COLORS.gray_dark_02,
												}}
											>
												ID: {student?.id}
											</p>

											{/* Location */}
											<div className='flex items-center gap-1'>
												<MapPin
													className='w-3 h-3 xs:w-4 xs:h-4'
													color={COLORS.gray_dark_02}
												/>
												<p
													style={{
														...FONTS.heading_09,
														color: COLORS.gray_dark_02,
													}}
													className='text-xs xs:text-sm'
												>
													{student?.contact_info?.city}
												</p>
											</div>
										</div>

										{/* Address */}
										<div className='text-left sm:text-right'>
											<p
												style={{
													...FONTS.heading_09,
													color: COLORS.gray_dark_01,
												}}
												className='!text-xs !xs:text-sm font-medium'
											>
												Address
											</p>
											<p
												style={{
													...FONTS.heading_09,
													color: COLORS.gray_dark_02,
												}}
												className='text-xs xs:text-sm break-words max-w-full line-clamp-2'
											>
												{`${student?.contact_info?.address1 || ''}`}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentClassBatch;
