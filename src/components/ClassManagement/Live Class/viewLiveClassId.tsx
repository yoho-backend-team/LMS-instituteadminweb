import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import avatarImg from '../../../assets/image 109.png';
import { Card } from '../../ui/card';
interface Student {
	id: number;
	name: string;
	email: string;
	avatar: string;
	city: string;
	address: string;
}

const ViewLiveClassId: React.FC = () => {
	const [searchStudent, setSearchStudent] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const { data } = location.state;

	const students: Student[] = [
		{
			id: 1,
			name: 'Vijay',
			email: 'vijay.yoho@gmail.com',
			avatar: avatarImg,
			city: 'Chennai',
			address: 'K.K. Nagar, Chennai',
		},
		{
			id: 2,
			name: 'Ajith',
			email: 'ajith.yoho@gmail.com',
			avatar: avatarImg,
			city: 'Chennai',
			address: 'K.K. Nagar, Chennai',
		},
		{
			id: 3,
			name: 'Suriya',
			email: 'suriya.yoho@gmail.com',
			avatar: avatarImg,
			city: 'Chennai',
			address: 'K.K. Nagar, Chennai',
		},
	];

	const filteredStudents = students.filter((student) =>
		student.name.toLowerCase().includes(searchStudent.toLowerCase())
	);

	return (
		<div className='p-6 bg-white min-h-screen'>
			<button
				onClick={() => navigate(-1)}
				className='flex items-center gap-2 text-[#1BBFCA] hover:text-[#1BBFCA] transition-all mb-4'
			>
				<ArrowLeft className='w-7 h-7' />
			</button>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<h2
					style={{ ...FONTS.heading_05_bold }}
					className='bg-[#1BBFCA] p-1 px-3 text-white rounded-xl'
				>
					{data?.title}
				</h2>
				<div className='flex gap-4 items-center'>
					<span
						style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}
					>
						Duration: 6 Months
					</span>
					<button
						style={{ ...FONTS.heading_08_bold }}
						className='bg-[#3ABE65] p-2 px-3 text-white rounded-xl'
					>
						Offline
					</button>
				</div>
			</div>

			{/* Course Info 1 */}
			<div className='bg-gray-50 mt-6 p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700'>
				<div className='flex flex-col gap-1 break-words'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
						Course
					</p>
					<p style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>
						MEAN STACK 2025
					</p>
				</div>
				<div className='flex flex-col gap-1 break-words'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
						Batch
					</p>
					<p style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>
						MERN BATCH 1
					</p>
				</div>
				<div className='flex flex-col gap-1 break-words'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
						Duration
					</p>
					<p style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>
						8 Hrs 30 Min
					</p>
				</div>
				<div className='flex flex-col gap-1 break-words'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
						Date
					</p>
					<p style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>
						2025-06-12
					</p>
				</div>
			</div>

			{/* Course Info 2 */}
			<div className='bg-gray-50 mt-6 p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700'>
				<div className='flex flex-col gap-1 break-words'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
						Started At
					</p>
					<p style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>
						2025-05-18
					</p>
				</div>
				<div className='flex flex-col gap-1 break-words'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
						Ended At
					</p>
					<p style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>
						2025-08-31
					</p>
				</div>
				<div className='flex flex-col gap-1 break-words'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
						Instructor
					</p>
					<p style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>
						Abdul Kalam
					</p>
				</div>
				<div className='flex flex-col gap-1 break-words'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
						Class Link
					</p>
					<p style={{ ...FONTS.heading_07_bold, color: COLORS.blue }}>
						https://www.mernstack2025.com
					</p>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-1 mt-6'>
				{/* Enrolled Students Section */}
				<Card className='p-2'>
					<input
						type='text'
						placeholder='Search Student'
						value={searchStudent}
						style={{ ...FONTS.heading_08_bold }}
						onChange={(e) => setSearchStudent(e.target.value)}
						className='mt-2 w-2/5 px-3 py-2 border rounded focus:outline-none'
					/>
					<div className='flex items-center gap-30 bg-white p-4  shadow rounded-md'>
						<p
							style={{
								...FONTS.heading_06_bold,
								color: COLORS.gray_dark_02,
								width: '20%',
							}}
						>
							Student ID
						</p>
						<p
							style={{
								...FONTS.heading_06_bold,
								color: COLORS.gray_dark_02,
								width: '35%',
							}}
						>
							Student Name
						</p>
						<p
							style={{
								...FONTS.heading_06_bold,
								color: COLORS.gray_dark_02,
								width: '20%',
							}}
							className='ml-16'
						>
							City
						</p>
						<p
							style={{
								...FONTS.heading_06_bold,
								color: COLORS.gray_dark_02,
								width: '20%',
							}}
							className='ml-16'
						>
							Address
						</p>
					</div>
					{filteredStudents.map((student) => (
						<div
							key={student.id}
							className='flex items-center justify-between bg-white p-4 mb-3 shadow rounded-md'
						>
							<p
								style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}
							>
								{student.id}
							</p>
							<div className='flex'>
								<img
									src={student.avatar}
									alt={student.name}
									className='w-12 h-12 rounded-full mr-4'
								/>
								<div>
									<p
										style={{
											...FONTS.heading_07_bold,
											color: COLORS.gray_dark_02,
										}}
									>
										{student.name}
									</p>
									<p
										style={{
											...FONTS.heading_08_bold,
											color: COLORS.gray_dark_01,
										}}
									>
										{student.email}
									</p>
								</div>
							</div>
							<p
								style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}
							>
								{student.city}
							</p>
							<p
								style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}
							>
								{student.address}
							</p>
						</div>
					))}
				</Card>
			</div>
		</div>
	);
};

export default ViewLiveClassId;
