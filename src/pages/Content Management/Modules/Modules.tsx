/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoPlus } from 'react-icons/go';
import { BsSliders } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import AddModule from '../../../components/contentmanagement/addmodule/addmodule';
import EditModule from '../../../components/contentmanagement/editmodule/editmodule';
import { FaFileAlt, FaGraduationCap, FaEllipsisV } from 'react-icons/fa';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ViewModule from '../../../components/contentmanagement/viewmodule/viewmodule';
import { useDispatch, useSelector } from 'react-redux';
import {
	GetModule,
	selectLoading,
} from '../../../features/Content_Management/reducers/selectors';
import {
	DeletemoduleThunks,
	GetallModuleThunks,
	UpdateModuleStatusThunk,
} from '../../../features/Content_Management/reducers/thunks';
import ContentLoader from 'react-content-loader';
import { GetLocalStorage } from '../../../utils/localStorage';

interface ModuleCardProps {
	id: string;
	uuid: string;
	title: string;
	courseName?: string;
	description?: string;
	isActive: boolean;
	fileUrl?: string;
	fileName: string;
	branch?: string;
	course?: {
		course_name: string;
	};
	video: any;
	file?: File | null;
}

const Modules = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showPanel, setShowPanel] = useState(false);
	const [showEditPanel, setShowEditPanel] = useState(false);
	const [openCardId, setOpenCardId] = useState<number | string | null>(null);
	const [showViewModule, setShowViewModule] = useState(false);
	const [selectedModule, setSelectedModule] = useState<ModuleCardProps | null>(
		null
	);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [toggleStatusMap, setToggleStatusMap] = useState<{
		[key: string]: boolean;
	}>({});
	const [statusFilter, setStatusFilter] = useState<string>('');

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpenCardId(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	const dispatch = useDispatch<any>();
	const Module = useSelector(GetModule);
	const loading = useSelector(selectLoading);
	useEffect(() => {
		const paramsData = {
			branch_id: GetLocalStorage('selectedBranchId'),
			institute_id: GetLocalStorage('instituteId'),
			page: 1,
		};
		dispatch(GetallModuleThunks(paramsData));
	}, [dispatch]);

	const handleViewClick = (card: any) => {
		setSelectedModule(card);
		setShowViewModule(true);
	};

	const handleDelete = (id: string, uuid: string) => {
		if (selectedModule?.id === id) {
			setShowViewModule(false);
			setSelectedModule(null);
		}
		dispatch(DeletemoduleThunks({ id, uuid }));
		setOpenCardId(null);
	};

	const handleToggle = (module: any) => {
		const currentLocal = toggleStatusMap[module.module_id];
		const currentStatus =
			currentLocal !== undefined
				? currentLocal
				: module.status === 'active' || module.status === true;

		const updatedStatus = !currentStatus;

		setToggleStatusMap((prev) => ({
			...prev,
			[module.module_id]: updatedStatus,
		}));

		const payload = {
			module_id: module.module_id,
			is_active: updatedStatus ? true : false,
		};

		dispatch(UpdateModuleStatusThunk(payload));
	};

	return (
		<div className='relative flex flex-col h-fit max-h-fit w-full gap-4 xs:gap-5 sm:gap-6 p-3 xs:p-4 sm:p-6'>
			{/* Add Module Panel */}
			{showPanel && (
				<div
					className='fixed inset-0 z-40 flex justify-end backdrop-blur-sm bg-black/20'
					onClick={() => setShowPanel(false)}
				>
					<div
						className='h-[95%] mt-4 w-full xs:w-4/5 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 bg-white shadow-xl rounded-xl z-50 mx-2 xs:mx-4'
						onClick={(e) => e.stopPropagation()}
					>
						<AddModule
							onClose={() => setShowPanel(false)}
							onSubmit={(newModule) => {
								setShowPanel(false);
								console.log(newModule, 'new module added successfully');
							}}
						/>
					</div>
				</div>
			)}

			{/* Edit Module Panel */}
			{showEditPanel && selectedModule && (
				<div
					className='fixed inset-0 z-40 flex justify-end backdrop-blur-sm bg-black/20'
					onClick={() => setShowEditPanel(false)}
				>
					<div
						className='h-[95%] mt-4 w-full xs:w-4/5 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 bg-white shadow-xl rounded-xl z-50 mx-2 xs:mx-4'
						onClick={(e) => e.stopPropagation()}
					>
						<EditModule
							onClose={() => setShowEditPanel(false)}
							existingModule={selectedModule}
						/>
					</div>
				</div>
			)}

			{/* Header Section */}
			<div className='flex flex-col gap-3 xs:gap-4'>
				<h3 className='text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800'>
					Module
				</h3>

				{/* Buttons Container - COLUMN below 640px, ROW above 640px */}
				<div className='w-full flex flex-col justify-between gap-3 xs:gap-4 items-stretch sm:flex-row sm:items-center text-base xs:text-lg font-semibold'>
					{/* Filter Button */}
					<div className='bg-[#1BBFCA] text-white p-2 xs:p-3 rounded-lg xs:rounded-xl flex gap-2 xs:gap-3 justify-center items-center w-full sm:w-auto'>
						<BsSliders size={18} className='xs:w-5 xs:h-5' />
						<button
							onClick={() => setShowFilter((prev) => !prev)}
							className='bg-transparent focus:outline-none text-sm xs:text-base'
						>
							{showFilter ? 'Hide Filter' : 'Show Filter'}
						</button>
					</div>

					{/* Add Module Button */}
					<div className='bg-[#1BBFCA] text-white flex items-center justify-center p-2 xs:p-3 rounded-lg xs:rounded-xl w-full sm:w-auto'>
						<button
							className='flex items-center gap-2 xs:gap-3 bg-transparent focus:outline-none text-sm xs:text-base w-full justify-center'
							onClick={() => setShowPanel(true)}
						>
							<GoPlus size={18} className='xs:w-5 xs:h-5' />
							Add Modules
						</button>
					</div>
				</div>
			</div>

			{/* Filter Section */}
			{showFilter && (
				<div className='flex flex-col xs:flex-col gap-3 xs:gap-4 sm:flex-row sm:gap-5 bg-white p-3 xs:p-4 shadow-[4px_4px_24px_0px_#0000001A] rounded-lg xs:rounded-xl'>
					<div className='flex-1 p-1 flex flex-col gap-2'>
						<label
							htmlFor='status1'
							className='text-sm xs:text-base text-gray-700'
						>
							Status
						</label>
						<select
							id='status1'
							className='border border-gray-300 h-9 xs:h-10 rounded-lg px-2 xs:px-3 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]'
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
						>
							<option value=''>All</option>
							<option value='active'>Active</option>
							<option value='inactive'>Inactive</option>
						</select>
					</div>

					<div className='flex-1 p-1 flex flex-col gap-2'>
						<label
							htmlFor='status2'
							className='text-sm xs:text-base text-gray-700'
						>
							Courses
						</label>
						<select
							id='status2'
							className='border border-gray-300 h-9 xs:h-10 rounded-lg px-2 xs:px-3 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]'
						>
							<option value=''>Select Course</option>
							<option value='dummy'>Dummy</option>
						</select>
					</div>
				</div>
			)}

			{/* View Module Modal */}
			{showViewModule && selectedModule?.title && (
				<div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-3 xs:p-4 sm:p-6'>
					<div className='bg-white rounded-lg xs:rounded-xl p-4 xs:p-6 w-full max-w-2xl xl:max-w-3xl relative max-h-[90vh] overflow-y-auto'>
						<button
							onClick={() => setShowViewModule(false)}
							className='absolute top-2 xs:top-3 right-2 xs:right-3 text-gray-600 hover:text-black text-lg xs:text-xl z-100'
						>
							✕
						</button>

						<ViewModule
							title={selectedModule.title}
							courseName={selectedModule.course?.course_name ?? ''}
							description={selectedModule.description ?? ''}
							isActive={
								toggleStatusMap[selectedModule.id] !== undefined
									? toggleStatusMap[selectedModule.id]
									: selectedModule.isActive
							}
							fileUrl={selectedModule.fileUrl}
							fileName={selectedModule.fileName ? '' : ''}
							branch={selectedModule.branch ?? ''}
							video={selectedModule.video}
							onStatusChange={() =>
								handleToggle({
									module_id: selectedModule.id,
									status: selectedModule.isActive,
								})
							}
						/>
					</div>
				</div>
			)}

			{/* Modules Grid */}
			<div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6'>
				{loading ? (
					<div className='col-span-full grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6'>
						{[...Array(8)].map((_, index) => (
							<ContentLoader
								key={index}
								speed={1}
								width='100%'
								height='100%'
								backgroundColor='#f3f3f3'
								foregroundColor='#ecebeb'
								className='w-full h-[200px] xs:h-[220px] sm:h-[240px] p-3 xs:p-4 rounded-xl xs:rounded-2xl border shadow-md'
							>
								<rect x='0' y='0' rx='6' ry='6' width='80' height='20' />
								<rect x='200' y='0' rx='6' ry='6' width='60' height='20' />

								<rect x='0' y='32' rx='8' ry='8' width='100%' height='100' />

								<rect x='0' y='148' rx='6' ry='6' width='60%' height='18' />

								<rect x='0' y='178' rx='4' ry='4' width='70' height='14' />
								<rect x='200' y='178' rx='4' ry='4' width='50' height='16' />
							</ContentLoader>
						))}
					</div>
				) : (
					Module?.filter((card: ModuleCardProps) => {
						const statusFromToggle = toggleStatusMap[card.id];
						const isActive =
							statusFromToggle !== undefined ? statusFromToggle : card.isActive;

						if (statusFilter === '') return true;
						if (statusFilter === 'active') return isActive;
						if (statusFilter === 'inactive') return !isActive;
						return true;
					}).map((card: ModuleCardProps) => (
						<div
							key={card.id}
							className='relative p-3 xs:p-4 border border-gray-200 rounded-lg xs:rounded-xl shadow-[4px_4px_24px_0px_#0000001A] bg-white hover:shadow-lg transition-shadow duration-200'
						>
							{/* Dropdown Menu */}
							<div className='flex justify-end text-gray-400 cursor-pointer'>
								<FaEllipsisV
									onClick={() =>
										setOpenCardId(openCardId === card.id ? null : card.id)
									}
									className='hover:text-gray-600 transition-colors'
								/>
							</div>

							{/* Title Section */}
							<div className='flex items-center gap-2 bg-gray-100 p-2 xs:p-3 rounded mt-3 xs:mt-4'>
								<FaFileAlt className='text-gray-600 text-base xs:text-lg' />
								<span className='text-sm xs:text-base font-medium text-gray-700 line-clamp-1'>
									{card?.title}
								</span>
							</div>

							{/* Course Name */}
							<div className='mt-3 xs:mt-4 flex items-center gap-2'>
								<FaGraduationCap className='text-gray-600 text-lg xs:text-xl' />
								<span className='text-sm xs:text-base font-semibold text-gray-700 line-clamp-1'>
									{card.course?.course_name || 'No Course'}
								</span>
							</div>

							{/* Status and Toggle */}
							<div className='mt-3 xs:mt-4 flex justify-between items-center'>
								<div
									className={`flex items-center gap-1 font-medium text-sm xs:text-base ${
										toggleStatusMap[card.id] !== undefined
											? toggleStatusMap[card.id]
												? 'text-green-500'
												: 'text-red-500'
											: card.isActive
											? 'text-green-500'
											: 'text-red-500'
									}`}
								>
									<span>
										{toggleStatusMap[card.id] !== undefined
											? toggleStatusMap[card.id]
												? 'Active'
												: 'Inactive'
											: card.isActive
											? 'Active'
											: 'Inactive'}
									</span>
									<span
										className={`w-2 h-2 rounded-full ${
											toggleStatusMap[card.id] !== undefined
												? toggleStatusMap[card.id]
													? 'bg-green-500'
													: 'bg-red-500'
												: card.isActive
												? 'bg-green-500'
												: 'bg-red-500'
										}`}
									/>
								</div>

								{/* Toggle Switch */}
								<label className='relative inline-flex items-center cursor-pointer'>
									<input
										type='checkbox'
										className='sr-only peer'
										checked={
											toggleStatusMap[card.id] !== undefined
												? toggleStatusMap[card.id]
												: card.isActive
										}
										onChange={() =>
											handleToggle({
												module_id: card.id,
												status:
													toggleStatusMap[card.id] !== undefined
														? toggleStatusMap[card.id]
															? 'active'
															: 'inactive'
														: card.isActive
														? 'active'
														: 'inactive',
											})
										}
									/>
									<div className='w-9 xs:w-11 h-5 xs:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500'></div>
								</label>
							</div>

							{/* Dropdown Actions */}
							{openCardId === card.id && (
								<div
									ref={dropdownRef}
									className='absolute top-8 xs:top-10 right-3 xs:right-4 z-10 w-28 xs:w-32 bg-white shadow-lg rounded-lg xs:rounded-xl p-2 border border-gray-200'
								>
									<button
										className='flex items-center gap-2 w-full px-3 xs:px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600 text-sm xs:text-base transition-colors'
										onClick={() => handleViewClick(card)}
									>
										<FaEye className='text-xs xs:text-sm' />
										View
									</button>

									<button
										onClick={() => {
											setSelectedModule(card);
											setShowEditPanel(true);
										}}
										className='flex items-center gap-2 w-full px-3 xs:px-4 py-2 mt-1 xs:mt-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 text-sm xs:text-base transition-colors'
									>
										<FaEdit className='text-xs xs:text-sm' />
										Edit
									</button>

									<button
										onClick={() => handleDelete(card.id, card.uuid)}
										className='flex items-center gap-2 w-full px-3 xs:px-4 py-2 mt-1 xs:mt-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 text-sm xs:text-base transition-colors'
									>
										<FaTrash className='text-xs xs:text-sm' />
										Delete
									</button>
								</div>
							)}
						</div>
					))
				)}
			</div>

			{/* Empty State */}
			{!loading && Module?.length === 0 && (
				<div className='col-span-full text-center py-8 xs:py-12'>
					<div className='text-gray-400 text-4xl xs:text-5xl mb-3 xs:mb-4'>
						📚
					</div>
					<h3 className='text-lg xs:text-xl font-semibold text-gray-600 mb-2'>
						No Modules Found
					</h3>
					<p className='text-gray-500 text-sm xs:text-base'>
						Get started by creating your first module
					</p>
				</div>
			)}
		</div>
	);
};

export default Modules;
