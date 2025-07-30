import { useState } from 'react';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Button } from '../../../components/ui/button';
import filter from '../../../assets/Filter.png';
import plus from '../../../assets/Add.png';

const LiveClasses = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);

	return (
		<>
			<div className='my-4 min-h-screen'>
				<div className='mb-8'>
					<h2
						className=' mb-6'
						style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}
					>
						Live Classes
					</h2>

					<div className='flex justify-between items-center'>
						<Button
							onClick={() => setShowFilter(!showFilter)}
							className='bg-[#1BBFCA] hover:bg-[#1BBFCA]  px-4 flex items-center gap-2'
							style={{ ...FONTS.heading_03 }}
						>
							<img src={filter} className='w-4 h-4' />
							{showFilter ? 'Hide Filter' : 'Show Filter'}
						</Button>

						<Button
							className='bg-[#1BBFCA] hover:bg-[#1BBFCA]  px-4 flex items-center gap-2'
							style={{ ...FONTS.heading_03 }}
							onClick={() => setShowCreateModal(true)}
						>
							<img src={plus} className='w-4 h-4' />
							Add New Batch
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default LiveClasses;
