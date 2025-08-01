import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';
import instructorImg from '../../../assets/image 108.png';
import studentImg from '../../../assets/image 109.png';

interface Student {
	id: number;
	name: string;
	email: string;
	avatar: string;
	address: string;
	location: string;
}

interface Instructor {
	id: number;
	name: string;
	avatar: string;
}

const StudentClassBatch: React.FC = () => {
	const [searchStudent, setSearchStudent] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const { data } = location.state;

	const instructors: Instructor[] = [
		{ id: 1, name: 'Abdul Kalam', avatar: instructorImg },
		{ id: 2, name: 'Albert Einstein', avatar: instructorImg },
		{ id: 3, name: 'MS Dhoni', avatar: instructorImg },
	];

	const students: Student[] = [
		{
			id: 1,
			name: 'Vijay',
			email: 'vijay.yoho@gmail.com',
			avatar: studentImg,
			address: 'Ambal Nagar, Echankadu',
			location: 'Chennai',
		},
		{
			id: 2,
			name: 'Ajith Kumar',
			email: 'ajith.yoho@gmail.com',
			avatar: studentImg,
			address: 'Ambal Nagar, Echankadu',
			location: 'Chennai',
		},
		{
			id: 3,
			name: 'Suriya',
			email: 'suriya.yoho@gmail.com',
			avatar: studentImg,
			address: 'Ambal Nagar, Echankadu',
			location: 'Chennai',
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
				{/* <span className="font-medium text-base">Back</span> */}
			</button>
			<Button
				type='button'
				className='!bg-[#1BBFCA] !text-white'
				style={{ ...FONTS.heading_07 }}
			>
				{data?.title}
			</Button>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<h2
					style={{ ...FONTS.heading_06, color: COLORS.gray_dark_01 }}
					className='mt-2'
				>
					Batch 21
				</h2>
				<div className='flex gap-4 items-center'>
					<span
						style={{ ...FONTS.heading_08_bold, color: COLORS.gray_dark_02 }}
					>
						Duration: 6 Months
					</span>
					<Button
						type='button'
						className='!bg-[#3ABE65] text-center !text-white'
						style={{ ...FONTS.heading_07 }}
					>
						Offline
					</Button>
				</div>
			</div>

			{/* Course Info */}
			<div className='bg-gray-50 mt-6 p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700'>
				<div>
					<p className='font-semibold text-gray-500'>Course</p>
					<p className='font-medium text-gray-800'>MEAN STACK 2024</p>
				</div>
				<div>
					<p className='font-semibold text-gray-500'>Started At</p>
					<p className='font-medium text-gray-800'>2025-05-10</p>
				</div>
				<div>
					<p className='font-semibold text-gray-500'>Ended At</p>
					<p className='font-medium text-gray-800'>2025-05-12</p>
				</div>
				<div>
					<p className='font-semibold text-gray-500'>Date</p>
					<p className='font-medium text-gray-800'>2025-06-12</p>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
				{/* Faculty Section */}
				<div>
					<h3 className='text-lg font-semibold mb-2'>Faculty & Coordinators</h3>
					{instructors.map((instr) => (
						<div
							key={instr.id}
							className='flex items-center bg-white p-4 mb-3 shadow rounded-md'
						>
							<img
								src={instr.avatar}
								alt={instr.name}
								className='w-12 h-12 rounded-full mr-4'
							/>
							<div>
								<p className='font-medium'>{instr.name}</p>
								<p className='text-sm text-gray-500'>Instructor</p>
							</div>
						</div>
					))}
				</div>

				{/* Enrolled Students Section */}
				<div>
					<h3 className='text-lg font-semibold mb-2'>Enrolled Students</h3>
					<input
						type='text'
						placeholder='Search Student'
						value={searchStudent}
						onChange={(e) => setSearchStudent(e.target.value)}
						className='mb-4 w-full px-3 py-2 border rounded focus:outline-none'
					/>
					{filteredStudents.map((student) => (
						<div
							key={student.id}
							className='flex items-center justify-between bg-white p-4 mb-3 shadow rounded-md'
						>
							<img
								src={student.avatar}
								alt={student.name}
								className='w-12 h-12 rounded-full mr-4'
							/>
							<div>
								<p className='font-medium'>{student.name}</p>
								<p className='text-sm text-gray-500'>{student.email}</p>
							</div>
							<div className='flex flex-col gap-2'>
								<p
									className='border-2 border-gray-500 max-w-15 text-center px-2 py-0.5 rounded-md'
									style={{ ...FONTS.heading_09, color: COLORS.gray_dark_02 }}
								>
									ID: {student.id}
								</p>
								<div className='flex gap-1 items-center'>
									<MapPin className='w-4 h-4' color={COLORS.gray_dark_02} />
									<p
										style={{ ...FONTS.heading_09, color: COLORS.gray_dark_02 }}
									>
										{student.location}
									</p>
								</div>
								<div>
									<p
										style={{ ...FONTS.heading_09, color: COLORS.gray_dark_01 }}
									>
										Address
									</p>
									<p
										style={{ ...FONTS.heading_09, color: COLORS.gray_dark_02 }}
									>
										{student.address}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StudentClassBatch;
