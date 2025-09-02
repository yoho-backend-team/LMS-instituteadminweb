import { MoreVertical, Eye, Pencil, Trash2, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetImageUrl } from '../../../utils/helper';

// import profileImg1 from '../../../assets/Frame 427321451.png';
// import profileImg2 from '../../../assets/Frame 427321452.png';

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
import toast from 'react-hot-toast';
import { deleteOfflineClass } from '../../../features/Class Management/offlineClass/services';

interface BatchCardProps {
	title: string;
	students: any;
	startDate: string;
	endTime: string;
	startTime: string;
	classData: any;
	fetchAllofflineClasses?: () => void;
}

const offlineClassCard: React.FC<BatchCardProps> = ({
	title,
	startDate,
	endTime,
	startTime,
	classData,
	fetchAllofflineClasses,
}) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const openEditModal = () => setIsEditModalOpen(true);
	const closeEditModal = () => setIsEditModalOpen(false);
	const openDeleteModal = () => setIsDeleteModalOpen(true);
	const closeDeleteModal = () => setIsDeleteModalOpen(false);

	const handleConfirmDelete = async () => {
		try {
			const response = await deleteOfflineClass({ uuid: classData?.uuid });
			if (response) {
				toast.success('Offline class deleted successfully');
				if (fetchAllofflineClasses) {
					fetchAllofflineClasses();
				}
				closeDeleteModal();
			} else {
				toast.success('Offline class deleted successfully');
				closeDeleteModal();
			}
		} catch (error) {
			console.error('Error deleting Offline class:', error);
		} finally {
			closeDeleteModal();
			if (fetchAllofflineClasses) {
				fetchAllofflineClasses();
			}
		}
	};

	const navigate = useNavigate();

	// Format date as DD/MM/YYYY
	const formattedDate = new Date(startDate);
	const displayDate = `${formattedDate.getDate()}/${
		formattedDate.getMonth() + 1
	}/${formattedDate.getFullYear()}`;

	// Function to format time as 1.00 AM/PM
	const getFormattedTime = (timeString: string) => {
		const time = new Date(timeString);
		const hours = time.getHours();
		const minutes = time.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
		return `${formattedHour}.${minutes} ${ampm}`;
	};

	const displayTimeRange = `${getFormattedTime(startTime)} - ${getFormattedTime(
		endTime
	)}`;

	return (
		<Card className='rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.08)] w-2/5 bg-white'>
			<CardContent className='p-4 pb-2 relative'>
				<div className='flex justify-between items-start border-b border-gray-200 pb-2'>
					<div className='flex justify-between gap-35'>
						<div className='flex flex-col items-center gap-2'>
							<p style={{ ...FONTS.heading_09 }}>
								{classData?.batch?.student?.length}{' '}
								{classData?.batch?.student?.length === 1
									? 'student'
									: 'students'}
							</p>
							<div className='flex'>
								{classData?.batch?.student
									?.slice(0, 3)
									?.map((studentImg: any) => (
										<img
											key={studentImg?._id}
											src={GetImageUrl(studentImg?.image) ?? undefined}
											alt={studentImg?.full_name}
											title={studentImg?.full_name}
											className='w-12 h-12 rounded-full '
										/>
									))}
							</div>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<p style={{ ...FONTS.heading_09 }}>
								{classData?.instructors?.length}{' '}
								{classData?.instructors?.length === 1
									? 'instructor'
									: 'instructors'}
							</p>
							<div className='flex'>
								{classData?.instructors?.slice(0, 3)?.map((studentImg: any) => (
									<img
										key={studentImg?._id}
										src={GetImageUrl(studentImg?.image) ?? undefined}
										alt={studentImg?.full_name}
										title={studentImg?.full_name}
										className='w-12 h-12 rounded-full '
									/>
								))}
							</div>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className='absolute top-2 right-2'
								aria-label='More options'
							>
								<MoreVertical className='w-5 h-5 text-[#1BBFCA]' />
							</button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className='bg-white rounded-lg shadow-xl w-[120px] p-2 z-20 space-y-2'>
							<DropdownMenuItem
								onClick={() =>
									navigate(`/view-student/${classData?.uuid}`, {
										state: { classData },
									})
								}
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
								onClick={openEditModal}
								className='group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer'
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
					<p
						className='mt-4'
						style={{ ...FONTS.heading_05_bold, color: COLORS.gray_dark_02 }}
					>
						{title}
					</p>

					<div className='flex items-center justify-between mt-3'>
						<p style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}>
							{classData?.batch?.student?.length == 0
								? 'No students in this class'
								: `${classData?.batch?.student?.length} students on this class`}
						</p>
					</div>

					<div className='mt-2 flex gap-2'>
						<CalendarDays color={COLORS.gray_light} />
						<p style={{ ...FONTS.heading_08_bold, color: COLORS.gray_light }}>
							{displayDate} | {displayTimeRange}
						</p>
					</div>
				</div>

				<div className='mt-5 flex justify-end'>
					<Button
						onClick={() =>
							navigate(`/view-student/${classData?.uuid}`, {
								state: { classData },
							})
						}
						className='bg-[#3ABE65] p-3 text-white hover:bg-[#3ABE65]'
						style={{ ...FONTS.heading_07 }}
					>
						View More
					</Button>
				</div>
			</CardContent>

			<EditOfflineClass
				classData={classData}
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				fetchAllofflineClasses={fetchAllofflineClasses}
			/>
			<DeleteConfirmationModal
				open={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirmDelete={handleConfirmDelete}
			/>
		</Card>
	);
};

export default offlineClassCard;
