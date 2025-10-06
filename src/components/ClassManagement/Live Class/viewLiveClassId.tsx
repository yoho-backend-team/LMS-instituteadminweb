import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Card } from '../../ui/card';
import { GetImageUrl } from '../../../utils/helper';
import { Button } from '../../ui/button';

const ViewLiveClassId: React.FC = () => {
	const [searchStudent, setSearchStudent] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const { data } = location.state;

	const filteredStudents = data?.batch?.student?.filter((student: any) =>
		student.full_name.toLowerCase().includes(searchStudent.toLowerCase())
	);

	const formattedTime = (isoTime: string) => {
		const date = new Date(isoTime);
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
	};

	return (
		<div className='p-4 sm:p-6 bg-white min-h-screen max-w-[2500px] mx-auto'>
			{/* Back Button */}
			<div className='flex items-center justify-between mb-6 sm:mb-8'>
				<Button
					onClick={() => navigate(-1)}
					className='flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-2 rounded-full'
				>
					<ArrowLeft size={30} className='sm:size-8' />
				</Button>
			</div>

			{/* Header Section */}
			<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 mb-6'>
				<h2
					style={{ ...FONTS.heading_05_bold }}
					className='bg-[#1BBFCA] px-4 py-2 text-white rounded-xl text-lg sm:text-xl md:text-2xl'
				>
					{data?.class_name}
				</h2>
				<div className='flex flex-wrap gap-3 sm:gap-6 items-center'>
					<span
						style={{ ...FONTS.heading_07_bold }}
						className='text-gray-700 text-sm sm:text-base'
					>
						Duration: {data?.duration} days
					</span>
					<button
						style={{ ...FONTS.heading_08_bold }}
						className='bg-[#3ABE65] py-2 px-4 text-white rounded-xl text-sm sm:text-base'
					>
						Live
					</button>
				</div>
			</div>

			{/* Course Info Section 1 */}
			<div className='bg-gray-50 mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
				{[
					{ label: 'Course', value: data?.course?.course_name ?? 'N/A' },
					{ label: 'Batch', value: data?.batch?.batch_name },
					{ label: 'Duration', value: `${data?.duration} days` },
					{ label: 'Date', value: data?.start_date.split('T')[0] },
				].map((item, index) => (
					<div key={index} className='flex flex-col gap-1 break-words'>
						<p className='text-gray-600 text-sm sm:text-base'>{item.label}</p>
						<p className='font-semibold text-gray-800 text-sm sm:text-base'>
							{item.value}
						</p>
					</div>
				))}
			</div>

			{/* Course Info Section 2 */}
			<div className='bg-gray-50 mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
				<div>
					<p className='text-gray-600 text-sm sm:text-base'>Started At</p>
					<p className='font-semibold text-gray-800 text-sm sm:text-base'>
						{formattedTime(data?.start_time)}
					</p>
				</div>
				<div>
					<p className='text-gray-600 text-sm sm:text-base'>Ended At</p>
					<p className='font-semibold text-gray-800 text-sm sm:text-base'>
						{formattedTime(data?.end_time)}
					</p>
				</div>
				<div>
					<p className='text-gray-600 text-sm sm:text-base'>Instructor</p>
					<p className='font-semibold text-gray-800 text-sm sm:text-base'>
						{data?.instructors[0]?.full_name}
					</p>
				</div>
				<div>
					<p className='text-gray-600 text-sm sm:text-base'>Class Link</p>
					<a
						href={data?.video_url}
						target='_blank'
						className='text-blue-600 break-words text-xs sm:text-sm hover:underline'
					>
						{data?.video_url}
					</a>
				</div>
			</div>

			{/* Student List */}
			<div className='mt-6'>
				<Card className='p-4 sm:p-6'>
					{/* Search Box */}
					<input
						type='text'
						placeholder='Search Student'
						value={searchStudent}
						onChange={(e) => setSearchStudent(e.target.value)}
						className='w-full sm:w-2/3 lg:w-1/3 px-4 py-2 border rounded-md focus:outline-none text-sm sm:text-base mb-4'
						style={{ ...FONTS.heading_08_bold }}
					/>

					{/* Table Header (hidden on mobile) */}
					<div className='hidden sm:flex items-center bg-white p-4 shadow rounded-md'>
						<p className='w-1/5 font-semibold text-gray-700 text-sm sm:text-base'>
							Student ID
						</p>
						<p className='w-2/5 font-semibold text-gray-700 text-sm sm:text-base'>
							Student Name
						</p>
						<p className='w-1/5 font-semibold text-gray-700 text-sm sm:text-base text-center'>
							City
						</p>
						<p className='w-1/5 font-semibold text-gray-700 text-sm sm:text-base text-center'>
							Address
						</p>
					</div>

					{/* Table Rows */}
					<div className='mt-4 space-y-4'>
						{filteredStudents?.map((student: any) => (
							<div
								key={student._id}
								className='bg-white p-4 rounded-md shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0'
							>
								{/* --- MOBILE CARD LAYOUT --- */}
								<div className='flex flex-col sm:hidden space-y-2'>
									<div className='flex items-center gap-4'>
										<img
											src={GetImageUrl(student?.image) ?? undefined}
											alt={student?.full_name}
											className='w-12 h-12 rounded-full object-cover'
										/>
										<div>
											<p className='font-semibold text-gray-800 text-sm'>
												{student?.full_name}
											</p>
											<p className='text-gray-600 text-xs'>{student?.email}</p>
										</div>
									</div>
									<div className='grid grid-cols-2 gap-y-1 text-sm text-gray-700 mt-2'>
										<p className='font-semibold'>ID:</p>
										<p>{student?.id}</p>
										<p className='font-semibold'>City:</p>
										<p>{student?.contact_info?.city || '-'}</p>
										<p className='font-semibold'>Address:</p>
										<p className='break-words'>
											{`${student?.contact_info?.address1 || ''}`.trim() || '-'}
										</p>
									</div>
								</div>

								{/* --- DESKTOP / TABLE LAYOUT --- */}
								<div className='hidden sm:flex sm:items-center sm:justify-between w-full'>
									<p className='text-gray-700 font-semibold text-sm sm:text-base w-1/5 truncate'>
										{student?.id}
									</p>

									<div className='flex items-center gap-4 w-2/5'>
										<img
											src={GetImageUrl(student?.image) ?? undefined}
											alt={student?.full_name}
											className='w-12 h-12 rounded-full object-cover'
										/>
										<div>
											<p className='font-semibold text-gray-800 text-sm sm:text-base'>
												{student?.full_name}
											</p>
											<p className='text-gray-600 text-xs sm:text-sm'>
												{student?.email}
											</p>
										</div>
									</div>

									<p className='text-gray-700 font-semibold text-sm sm:text-base text-center w-1/5'>
										{student?.contact_info?.city || '-'}
									</p>

									<p className='text-gray-700 font-semibold text-sm sm:text-base text-center w-1/5 break-words'>
										{`${student?.contact_info?.address1 || ''} `.trim() || '-'}
									</p>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default ViewLiveClassId;
