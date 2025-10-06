import { MoreVertical, Eye, Pencil, Trash2, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetImageUrl } from '../../../utils/helper';

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

const OfflineClassCard: React.FC<BatchCardProps> = ({
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
		<Card className='rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.08)] w-full bg-white md:h-[420px] xs:h-[390px] flex flex-col'>
			<CardContent className='p-4 xs:p-3 pb-2 relative flex flex-col flex-1'>
				{/* Header Section with Student/Instructor Counts and Dropdown - Fixed Height */}
				<div className='flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 xs:gap-2 border-b border-gray-200 pb-2 md:h-[150px] xs:h-[70px]'>
					<div className='flex flex-col sm:flex-col xs:flex-row justify-between gap-3 xs:gap-4 w-full xs:w-auto h-full'>
						{/* Students Section */}
						<div className='flex flex-col items-left gap-2 min-w-[120px] xs:min-w-[100px] h-full justify-between'>
							<p style={{ ...FONTS.heading_09 }} className='text-sm xs:text-xs'>
								{classData?.batch?.student?.length}{' '}
								{classData?.batch?.student?.length === 1
									? 'student'
									: 'students'}
							</p>
							<div className='flex flex-wrap justify-start gap-2 xs:gap-1'>
								{classData?.batch?.student
									?.slice(0, 3)
									?.map((studentImg: any) => (
										<img
											key={studentImg?._id}
											src={GetImageUrl(studentImg?.image) ?? undefined}
											className='w-10 h-10 xs:w-8 xs:h-8 rounded-full object-cover'
											alt='Student'
										/>
									))}
							</div>
						</div>

						{/* Instructors Section */}
						<div className='flex flex-col items-left gap-2 min-w-[120px] xs:min-w-[100px] h-full justify-between'>
							<p style={{ ...FONTS.heading_09 }} className='text-sm xs:text-xs'>
								{classData?.instructors?.length}{' '}
								{classData?.instructors?.length === 1
									? 'instructor'
									: 'instructors'}
							</p>
							<div className='flex flex-wrap justify-start gap-2 xs:gap-1'>
								{classData?.instructors
									?.slice(0, 3)
									?.map((instructorImg: any) => (
										<img
											key={instructorImg?._id}
											src={GetImageUrl(instructorImg?.image) ?? undefined}
											className='w-10 h-10 xs:w-8 xs:h-8 rounded-full object-cover'
											alt='Instructor'
										/>
									))}
							</div>
						</div>
					</div>

					{/* Dropdown Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className='absolute top-2 right-2 xs:relative xs:top-0 xs:right-0'
								aria-label='More options'
							>
								<MoreVertical className='w-5 h-5 xs:w-4 xs:h-4 text-[#1BBFCA]' />
							</button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className='bg-white rounded-lg shadow-xl w-[120px] xs:w-[110px] p-2 z-20 space-y-2 border border-gray-200'>
							<DropdownMenuItem
								onClick={() =>
									navigate(`/view-student/${classData?.uuid}`, {
										state: { classData },
									})
								}
								className='group border border-gray-300 text-black font-semibold text-sm xs:text-xs rounded-md px-3 py-2 xs:px-2 xs:py-1.5 flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#1BBFCA]'
							>
								<Eye className='w-4 h-4 xs:w-3 xs:h-3 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>View</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={openEditModal}
								className='group border border-gray-300 text-black font-medium text-sm xs:text-xs rounded-md px-3 py-2 xs:px-2 xs:py-1.5 flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#1BBFCA]'
							>
								<Pencil className='w-4 h-4 xs:w-3 xs:h-3 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>Edit</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={openDeleteModal}
								className='group border border-gray-300 text-black font-medium text-sm xs:text-xs rounded-md px-3 py-2 xs:px-2 xs:py-1.5 flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#1BBFCA]'
							>
								<Trash2 className='w-4 h-4 xs:w-3 xs:h-3 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Class Details Section - Fixed Height */}
				<div className='pr-0 xs:pr-12 mt-3 xs:mt-4 flex-1 flex flex-col justify-between min-h-[140px] xs:min-h-[130px]'>
					<div>
						{/* Class Title */}
						<p
							className='text-lg xs:text-base font-semibold line-clamp-2 md:h-[52px] xs:h-[44px] flex items-start'
							style={{ color: COLORS.gray_dark_02 }}
						>
							{title}
						</p>

						{/* Student Count */}
						<div className='flex items-center justify-between mt-3 xs:mt-2 h-[24px] xs:h-[20px]'>
							<p
								className='text-sm xs:text-xs font-semibold'
								style={{ color: COLORS.gray_dark_02 }}
							>
								{classData?.batch?.student?.length == 0
									? 'No students in this class'
									: `${classData?.batch?.student?.length} students in this class`}
							</p>
						</div>

						{/* Date and Time */}
						<div className='mt-2 xs:mt-1 flex gap-2 xs:gap-1 items-center h-[24px] xs:h-[20px]'>
							<CalendarDays
								color={COLORS.gray_light}
								className='w-4 h-4 xs:w-3 xs:h-3'
							/>
							<p
								className='text-sm xs:text-xs font-medium line-clamp-1'
								style={{ color: COLORS.gray_light }}
							>
								{displayDate} | {displayTimeRange}
							</p>
						</div>
					</div>

					{/* View More Button - Fixed Height */}
					<div className='mt-4 xs:mt-3 flex justify-end h-[40px] xs:h-[36px]'>
						<Button
							onClick={() =>
								navigate(`/view-student/${classData?.uuid}`, {
									state: { classData },
								})
							}
							className='bg-[#3ABE65] p-3 xs:p-2 text-white hover:bg-[#3ABE65] text-sm xs:text-xs w-full xs:w-auto justify-center h-full'
							style={{ ...FONTS.heading_07 }}
						>
							View More
						</Button>
					</div>
				</div>
			</CardContent>

			{/* Modals */}
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

export default OfflineClassCard;
