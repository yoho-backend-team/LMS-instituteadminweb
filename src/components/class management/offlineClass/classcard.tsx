import { Link, MoreVertical } from 'lucide-react';

import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import profileImg1 from '../../../assets/Frame 427321451.png';
import profileImg2 from '../../../assets/Frame 427321452.png';
import { CalendarDays } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

import { Card, CardContent } from '../../ui/card';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import DeleteConfirmationModal from '../../BatchManagement/deleteModal';
import { Button } from '../../ui/button';
import EditOfflineClass from './editOfflineClass';

interface BatchCardProps {
	title: string;
	students: number;
	startDate: string;
}

 const offlineClassCard: React.FC<BatchCardProps> = ({
	title,
	students,
	startDate,
}) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const openEditModal = () => setIsEditModalOpen(true);
	const closeEditModal = () => setIsEditModalOpen(false);
	const openDeleteModal = () => setIsDeleteModalOpen(true);
	const closeDeleteModal = () => setIsDeleteModalOpen(false);

	const handleConfirmDelete = () => {
		console.log('Deleted');
	};

	const navigate = useNavigate();

	const data = { title, students, startDate };

	return (
		<Card className='rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.08)] w-2/5 bg-white'>
			<CardContent className='p-4 pb-2 relative'>
				<div className='flex justify-between items-start border-b border-gray-200 pb-2'>
					<div>
						{/* <img src={profileImg1} alt='dummy-image' /> */}
						<img
							src={students === 1 ? profileImg1 : profileImg2}
							alt='student profile'
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className='absolute top-2 right-2  '
								aria-label='More options'
							>
								<MoreVertical className='w-5 h-5 text-[#1BBFCA]' />
							</button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className='bg-white rounded-lg shadow-xl w-[120px] p-2 z-20 space-y-2'>
							<DropdownMenuItem
								 onClick={() => navigate("/view-student")}
								className='group border border-gray-300 text-black font-semibold text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer'
								onMouseEnter={(e: any) =>
									(e.currentTarget.style.backgroundColor = '#1BBFCA')
								}
								onMouseLeave={(e: any) =>
									(e.currentTarget.style.backgroundColor = '')
								}
							>
								<Eye className='w-4 h-4 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>View</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								className='group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer'
								onClick={openEditModal}
								onMouseEnter={(e: any) =>
									(e.currentTarget.style.backgroundColor = '#1BBFCA')
								}
								onMouseLeave={(e: any) =>
									(e.currentTarget.style.backgroundColor = '')
								}
							>
								<Pencil className='w-4 h-4 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>Edit</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={openDeleteModal}
								className='group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#1BBFCA]'
								onMouseEnter={(e: any) =>
									(e.currentTarget.style.backgroundColor = '#1BBFCA')
								}
								onMouseLeave={(e: any) =>
									(e.currentTarget.style.backgroundColor = '')
								}
							>
								<Trash2 className='w-4 h-4 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className='pr-12'>
					<div>
						<p
							className=' mt-4'
							style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_02 }}
						>
							{title}
						</p>
					</div>

					<div className='flex items-center justify-between mt-3'>
						<p
							className=''
							style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}
						>
							{`${students} students on this Class`}
						</p>
					</div>

					<div className='mt-2 flex gap-2'>
						<div>
							<CalendarDays color={COLORS.gray_light} />
						</div>
						<p style={{ ...FONTS.heading_08_bold, color: COLORS.gray_light }}>
							{startDate}
						</p>
					</div>

					<div className='mt-3 flex gap-2'>
						<div>
							<Link color={COLORS.blue} />
						</div>
						<p
							style={{ ...FONTS.heading_08_bold, color: COLORS.blue }}
							className='cursor-pointer underline'
						>
							{startDate}
						</p>
					</div>
				</div>
				<div className='mt-5 flex justify-end'>
					<Button
					 onClick={() => navigate("/view-student")}
						className='bg-[#3ABE65] p-3 text-white hover:bg-[#3ABE65]'
						style={{ ...FONTS.heading_07 }}
					>
						View More
					</Button>
				</div>
			</CardContent>
			<EditOfflineClass isOpen={isEditModalOpen} onClose={closeEditModal} />

			<DeleteConfirmationModal
				open={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirmDelete={handleConfirmDelete}
			/>
		</Card>
	);
};
export default offlineClassCard