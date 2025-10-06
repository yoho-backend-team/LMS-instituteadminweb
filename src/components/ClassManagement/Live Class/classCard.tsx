import { Link, MoreVertical } from 'lucide-react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import EditLiveClass from './editLiveClass';
import { GetImageUrl } from '../../../utils/helper';
import { deleteLiveClass } from '../../../features/Class Management/Live Class/services';
import toast from 'react-hot-toast';

interface BatchCardProps {
	title: string;
	data: any;
	fetchAllLiveClasses?: () => void;
}

export const LiveClassCard: React.FC<BatchCardProps> = ({
	title,
	data,
	fetchAllLiveClasses,
}) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const navigate = useNavigate();

	const openEditModal = () => setIsEditModalOpen(true);
	const closeEditModal = () => setIsEditModalOpen(false);
	const openDeleteModal = () => setIsDeleteModalOpen(true);
	const closeDeleteModal = () => setIsDeleteModalOpen(false);

	const handleConfirmDelete = async () => {
		try {
			const response = await deleteLiveClass({ uuid: data?.uuid });
			if (response) {
				toast.success('Live class deleted successfully');
				if (fetchAllLiveClasses) {
					fetchAllLiveClasses();
				}
				closeDeleteModal();
			} else {
				toast.success('Live class deleted successfully');
				closeDeleteModal();
			}
		} catch (error) {
			console.error('Error deleting live class:', error);
		} finally {
			closeDeleteModal();
			if (fetchAllLiveClasses) {
				fetchAllLiveClasses();
			}
		}
	};

	const getFormattedTime = (timeString: string) => {
		const time = new Date(timeString);
		const hours = time.getHours();
		const minutes = time.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
		return `${formattedHour}.${minutes} ${ampm}`;
	};

	const displayTimeRange = `${getFormattedTime(
		data?.start_time
	)} - ${getFormattedTime(data?.end_time)}`;

	return (
		<Card className='rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.08)] w-full bg-white lg:h-[480px] md:h-[440px] xs:h-[390px] flex flex-col'>
			<CardContent className='p-4 xs:p-3 sm:p-4 pb-2 relative flex flex-col flex-1'>
				{/* Header Section - Responsive Height */}
				<div className='flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 xs:gap-2 border-b border-gray-200 pb-2 sm:h-[150px] md:h-[90px] xs:h-[70px]'>
					<div className='flex flex-col sm:flex-col md:flex-row xs:flex-row justify-between gap-3 xs:gap-4 w-full xs:w-auto h-full'>
						<div className='flex flex-col items-left gap-2 min-w-[120px] xs:min-w-[100px] h-full justify-between'>
							<p style={{ ...FONTS.heading_09 }} className='text-sm xs:text-xs'>
								{data?.batch?.student?.length}{' '}
								{data?.batch?.student?.length === 1 ? 'student' : 'students'}
							</p>
							<div className='flex flex-wrap justify-start gap-2 xs:gap-1'>
								{data?.batch?.student?.slice(0, 2)?.map((studentImg: any) => (
									<img
										key={studentImg?._id}
										src={GetImageUrl(studentImg?.image) ?? undefined}
										alt={studentImg?.full_name}
										title={studentImg?.full_name}
										className='w-10 h-10 xs:w-8 xs:h-8 rounded-full object-cover'
									/>
								))}
							</div>
						</div>
						<div className='flex flex-col items-left gap-2 min-w-[120px] xs:min-w-[100px] h-full justify-between'>
							<p
								style={{ ...FONTS.heading_09 }}
								className='flex flex-wrap justify-start gap-2 xs:gap-1'
							>
								{data?.instructors?.length}{' '}
								{data?.instructors?.length === 1 ? 'instructor' : 'instructors'}
							</p>
							<div className='flex gap-1 xs:gap-0.5 sm:gap-1'>
								{data?.instructors?.slice(0, 2)?.map((studentImg: any) => (
									<img
										key={studentImg?._id}
										src={GetImageUrl(studentImg?.image) ?? undefined}
										alt={studentImg?.full_name}
										title={studentImg?.full_name}
										className='w-10 h-10 xs:w-8 xs:h-8 rounded-full object-cover'
									/>
								))}
							</div>
						</div>
					</div>

					{/* Dropdown Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className='absolute top-2 right-2 xs:top-1 xs:right-1 sm:top-2 sm:right-2'
								aria-label='More options'
							>
								<MoreVertical className='w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#1BBFCA]' />
							</button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className='bg-white rounded-lg shadow-xl w-[110px] xs:w-[110px] sm:w-[120px] md:w-[130px] p-2 z-20 space-y-2 border border-gray-200'>
							<DropdownMenuItem
								onClick={() =>
									navigate(`/live-classes/${data?.uuid}`, {
										state: { data },
									})
								}
								className='group border border-gray-300 text-black font-semibold text-xs xs:text-xs sm:text-sm rounded-md px-2 py-1.5 xs:px-2 xs:py-1.5 sm:px-3 sm:py-2 flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#1BBFCA]'
							>
								<Eye className='w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>View</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								className='group border border-gray-300 text-black font-medium text-xs xs:text-xs sm:text-sm rounded-md px-2 py-1.5 xs:px-2 xs:py-1.5 sm:px-3 sm:py-2 flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#1BBFCA]'
								onClick={openEditModal}
							>
								<Pencil className='w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>Edit</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={openDeleteModal}
								className='group border border-gray-300 text-black font-medium text-xs xs:text-xs sm:text-sm rounded-md px-2 py-1.5 xs:px-2 xs:py-1.5 sm:px-3 sm:py-2 flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#1BBFCA]'
							>
								<Trash2 className='w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Content Section - Responsive Height */}
				<div className='pr-0 xs:pr-8 sm:pr-10 md:pr-1 flex-1 flex flex-col justify-between min-h-[210px] xs:min-h-[230px] sm:min-h-[250px] md:min-h-[240px] lg:min-h-[250px] xl:min-h-[260px] 2xl:min-h-[280px]'>
					<div className='space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4'>
						{/* Title */}
						<div className='h-[32px] xs:h-[32px] sm:h-[32px] md:h-[56px] lg:h-[42px] xl:h-[68px] 2xl:h-[72px] flex items-start mt-3'>
							<p
								className='text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-semibold line-clamp-2 xs:line-clamp-2 sm:line-clamp-3'
								style={{ color: COLORS.gray_dark_02 }}
							>
								{title}
							</p>
						</div>

						{/* Student Count */}
						<div className='h-[20px] xs:h-[20px] sm:h-[24px] md:h-[24px] lg:h-[28px] xl:h-[28px] 2xl:h-[32px] flex items-center'>
							<p
								className='text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base font-semibold'
								style={{ color: COLORS.gray_dark_01 }}
							>
								{`${data?.batch?.student?.length} ${
									data?.batch?.student?.length === 1 ? 'student' : 'students'
								} on this Class`}
							</p>
						</div>

						{/* Date and Time */}
						<div className='h-[20px] xs:h-[20px] sm:h-[24px] md:h-[24px] lg:h-[24px] xl:h-[24px] 2xl:h-[28px] flex gap-1 xs:gap-1 sm:gap-2 items-center'>
							<CalendarDays
								color={COLORS.gray_light}
								className='w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5'
							/>
							<p
								className='text-xs xs:text-xs sm:text-sm md:text-sm font-medium line-clamp-1'
								style={{ color: COLORS.gray_light }}
							>
								{data?.start_date?.split('T')[0]} | {displayTimeRange}
							</p>
						</div>

						{/* Video Link */}
						<div className='h-[20px] xs:h-[20px] sm:h-[24px] md:h-[24px] lg:h-[24px] xl:h-[24px] 2xl:h-[28px] flex gap-1 xs:gap-1 sm:gap-2 items-center'>
							<Link
								color={COLORS.blue}
								className='w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5'
							/>
							<a
								href={data?.video_url}
								style={{ color: COLORS.blue }}
								className='cursor-pointer underline text-xs xs:text-xs sm:text-sm md:text-sm line-clamp-1'
								target='_blank'
								rel='noopener noreferrer'
							>
								{data?.video_url}
							</a>
						</div>
					</div>

					{/* View More Button - Responsive Height */}
					<div className='mt-4 xs:mt-3 flex justify-end h-[40px] xs:h-[36px]'>
						<Button
							onClick={() =>
								navigate(`/live-classes/${data?.uuid}`, {
									state: { data },
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
			<EditLiveClass
				data={data}
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				fetchAllLiveClasses={fetchAllLiveClasses}
			/>

			<DeleteConfirmationModal
				open={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirmDelete={handleConfirmDelete}
			/>
		</Card>
	);
};
