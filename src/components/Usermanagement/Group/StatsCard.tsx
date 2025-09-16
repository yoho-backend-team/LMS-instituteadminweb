/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
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

function StatsCard() {
	const [openMenu, setOpenMenu] = useState<number | null>(null);
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

	const handledelete = async (id: any) => {
		try {
			await dispatch(deleteGroupThunk({ id }));
		} catch (error) {
			console.error('failed to delete', error);
		}
	};

	if (loading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-5'>
				{[...Array(6)].map((_, index) => (
					<ContentLoader
						speed={1}
						width='100%'
						height='100%'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
						className='w-full h-[160px] p-4 rounded-2xl border shadow-md'
						key={index}
					>
						<rect x='0' y='0' rx='6' ry='6' width='100' height='24' />
						<rect x='270' y='0' rx='6' ry='6' width='80' height='24' />

						<rect x='0' y='36' rx='10' ry='10' width='100%' height='120' />

						<rect x='0' y='170' rx='6' ry='6' width='60%' height='20' />

						<rect x='0' y='200' rx='4' ry='4' width='80' height='16' />
						<rect x='280' y='200' rx='4' ry='4' width='60' height='20' />

						<rect x='0' y='240' rx='6' ry='6' width='100' height='32' />

						<rect x='260' y='240' rx='6' ry='6' width='80' height='32' />
					</ContentLoader>
				))}
			</div>
		);
	}

	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{groupCard.map((card: any, idx: any) => (
					<div
						key={idx}
						className='relative rounded-lg bg-white shadow-md p-4 pt-6'
					>
						{/* Three Dots Menu */}
						<div className='absolute top-3 right-3 z-20'>
							<button onClick={() => toggleMenu(idx)}>
								<FiMoreVertical className='h-5 w-5 text-[#1BBFCA]' />
							</button>
							{openMenu === idx && (
								<div className='absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-lg text-sm p-2 space-y-2 z-30'>
									<button
										className='flex items-center gap-2 w-full px-3 py-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition'
										onClick={() => navigate(`/group/view/${card.id}`)}
									>
										<FaEye className='w-5 h-5' />
										<span>View</span>
									</button>
									<button
										className='flex items-center gap-2 w-full px-3 py-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition'
										onClick={() =>
											navigate(`/group/edit/${card.id}`, {
												state: {
													grpName: card?.identity,
												},
											})
										}
									>
										<LuNotebookPen className='w-5 h-5' />
										<span>Edit</span>
									</button>
									<button
										className='flex items-center gap-2 w-full px-3 py-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition'
										onClick={() => handledelete(card.uuid)} // ✅ use uuid here
									>
										<AiOutlineDelete className='w-5 h-5' />
										<span>Delete</span>
									</button>
								</div>
							)}
						</div>

						{/* Card Content */}
						<h2 className='text-lg text-[#716F6F] font-semibold mb-1 mt-4 bg-[#F7F7F7] px-3 py-2'>
							{card.identity}
						</h2>
						<p className='text-sm text-[#716F6F] mb-4'>
							Total {card.users.length} Users
						</p>

						{/* Status Dropdown */}
						<StatusDropdown
							idx={idx}
							initialStatus={card.is_active ? 'Active' : 'Inactive'}
							options={['Active', 'Inactive']}
							itemId={card.id}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default StatsCard;
