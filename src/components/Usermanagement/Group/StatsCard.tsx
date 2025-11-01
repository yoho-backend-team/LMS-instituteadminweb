/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';
import { LuNotebookPen } from 'react-icons/lu';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectGroup,
	selectLoading,
} from '../../../features/Users_Management/Group/reducers/selectors';
import {
	deleteGroupThunk,
	GetGroupCardthunks,
} from '../../../features/Users_Management/Group/reducers/thunks';
import { StatusDropdown } from './StatusDropdown';
import ContentLoader from 'react-content-loader';
import { ConfirmationPopup } from '../../BranchManagement/ConfirmationPopup';

function StatsCard() {
	const [openMenu, setOpenMenu] = useState<number | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [groupDeleteId, setGroupDeleteId] = useState('');

	const toggleMenu = (index: number) => {
		setOpenMenu(openMenu === index ? null : index);
	};

	const navigate = useNavigate();

	//integration
	const dispatch = useDispatch<any>();
	const groupCard = useSelector(selectGroup);
	const [currentPage] = useState(1);
	const loading = useSelector(selectLoading);

	useEffect(() => {
		const ParamsData = {
			institute_id: '973195c0-66ed-47c2-b098-d8989d3e4529',
			page: currentPage,
		};
		dispatch(GetGroupCardthunks(ParamsData));
	}, [dispatch, currentPage]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpenMenu(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handledelete = async () => {
		try {
			await dispatch(deleteGroupThunk({ id: groupDeleteId }));
			setOpenMenu(null);
		} catch (error) {
			console.error('failed to delete', error);
		} finally {
			setShowDeleteConfirm(false);
		}
	};

	if (loading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 px-3 sm:px-4 md:px-0'>
				{[...Array(6)].map((_, index) => (
					<ContentLoader
						speed={1}
						width='100%'
						height='100%'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
						className='w-full h-[180px] sm:h-[190px] md:h-[200px] p-4 sm:p-5 rounded-2xl border shadow-md'
						key={index}
					>
						<rect x='0' y='0' rx='6' ry='6' width='100' height='24' />
						<rect x='220' y='0' rx='6' ry='6' width='80' height='24' />

						<rect x='0' y='36' rx='10' ry='10' width='100%' height='80' />

						<rect x='0' y='130' rx='6' ry='6' width='60%' height='18' />

						<rect x='0' y='160' rx='4' ry='4' width='100' height='20' />
					</ContentLoader>
				))}
			</div>
		);
	}

	return (
		<div className='px-3 sm:px-4 md:px-0'>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6'>
				{groupCard.map((card: any, idx: any) => (
					<div
						key={idx}
						className='relative rounded-lg bg-white shadow-md p-4 sm:p-5 md:p-6 pt-5 sm:pt-6'
					>
						{/* Three Dots Menu */}
						<div className='absolute top-3 sm:top-4 right-3 sm:right-4 z-20'>
							<button
								onClick={() => toggleMenu(idx)}
								className='p-1 hover:bg-gray-100 rounded transition-colors'
							>
								<FiMoreVertical className='h-5 w-5 sm:h-6 sm:w-6 text-[#1BBFCA]' />
							</button>
							{openMenu === idx && (
								<div
									ref={menuRef}
									className='absolute right-0 mt-2 w-[140px] sm:w-[150px] md:w-[160px] bg-white shadow-lg border rounded-lg text-sm p-2 space-y-2 z-30'
								>
									<button
										className='flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition text-sm sm:text-base'
										onClick={() => {
											navigate(`/group/view/${card.id}`);
											setOpenMenu(null);
										}}
									>
										<FaEye className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
										<span>View</span>
									</button>
									<button
										className='flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition text-sm sm:text-base'
										onClick={() => {
											navigate(`/group/edit/${card.id}`, {
												state: {
													grpName: card?.identity,
												},
											});
											setOpenMenu(null);
										}}
									>
										<LuNotebookPen className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
										<span>Edit</span>
									</button>
									<button
										className='flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition text-sm sm:text-base'
										onClick={() => {
											setShowDeleteConfirm(true);
											setGroupDeleteId(card.uuid);
										}}
									>
										<AiOutlineDelete className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
										<span>Delete</span>
									</button>
								</div>
							)}
						</div>

						{/* Card Content */}
						<h2 className='text-base sm:text-lg md:text-xl text-[#716F6F] font-semibold mb-2 sm:mb-2.5 mt-3 sm:mt-4 bg-[#F7F7F7] px-3 sm:px-4 py-2 sm:py-2.5 rounded break-words'>
							{card.identity}
						</h2>
						<p className='text-xs sm:text-sm md:text-base text-[#716F6F] mb-4 sm:mb-5 px-1'>
							Total {card.users.length} Users
						</p>

						{/* Status Dropdown */}
						<div className='mt-auto'>
							<StatusDropdown
								idx={idx}
								initialStatus={card.is_active ? 'Active' : 'Inactive'}
								options={['Active', 'Inactive']}
								itemId={card.id}
							/>
						</div>
					</div>
				))}
				{showDeleteConfirm && (
					<ConfirmationPopup
						type='confirm'
						message='Are you sure you want to delete this branch?'
						onConfirm={() => handledelete()}
						onCancel={() => setShowDeleteConfirm(false)}
						onClose={() => setShowDeleteConfirm(false)}
					/>
				)}
			</div>
		</div>
	);
}

export default StatsCard;
