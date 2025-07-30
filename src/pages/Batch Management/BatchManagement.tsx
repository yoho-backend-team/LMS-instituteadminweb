import { useState } from 'react';

// import bg from "../../assets/bg.png";
import filter from '../../assets/Filter.png';
import plus from '../../assets/Add.png';

import { Button } from '../../components/ui/button';
import { BatchCard } from '../../components/BatchManagement/batchCard';
import { COLORS, FONTS } from '../../constants/uiConstants';
import { CreateBatchModal } from '../../components/BatchManagement/createBatch';

export default function BatchManagement() {
	const [showFilter, setShowFilter] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);

	return (
		<div
			className='min-h-screen bg-cover bg-no-repeat bg-center p-4 overflow-y-auto'
			// style={{ backgroundImage: `url(${bg})` }}
		>
			<div className='mb-8'>
				<h2 className=' mb-6' style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}>
					Student
				</h2>

				<div className='flex justify-between items-center'>
					<Button
						onClick={() => setShowFilter(!showFilter)}
						className='bg-[#1BBFCA] hover:bg-[#1BBFCA]  px-4 flex items-center gap-2'
						style={{ ...FONTS.heading_07, color: COLORS.white }}
					>
						<img src={filter} className='w-4 h-4' />
						{showFilter ? 'Hide Filter' : 'Show Filter'}
					</Button>

					<Button
						className='bg-[#1BBFCA] hover:bg-[#1BBFCA]  px-4 flex items-center gap-2'
						style={{ ...FONTS.heading_07, color: COLORS.white }}
						onClick={() => setShowCreateModal(true)}
					>
						<img src={plus} className='w-4 h-4' />
						Add New Batch
					</Button>
				</div>
			</div>

			{showFilter && (
				<div className='bg-[white] p-6 rounded-2xl shadow mb-8'>
					<h3 className=' mb-4' style={{ ...FONTS.heading_05_bold, color: COLORS.gray_dark_02}}>
						Batches
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02}}>
								Search by Status
							</label>
							<select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'>
								<option value=''>Select Status</option>
								<option value='active'>Active</option>
								<option value='inactive'>Inactive</option>
							</select>
						</div>

						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02}}>
								Search Between Dates
							</label>
							<input
								type='date'
								className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
							/>
						</div>

						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02}}>
								Search by Course
							</label>
							<select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'>
								<option value=''>Select Course</option>
								<option value='mern stack'>MERN STACK</option>
								<option value='mean stack'>MEAN STACK</option>
								<option value='python'>Python</option>
								<option value='java'>Java</option>
							</select>
						</div>

						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02}}>
								Search Batch
							</label>
							<input
								type='text'
								placeholder='search batch'
								className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
							/>
						</div>
					</div>
				</div>
			)}

			<div className='flex gap-6 flex-wrap'>
				<BatchCard
					title='MERN 2025'
					subtitle='MERN STACK 2024'
					students={2}
					startDate='April 7, 2025'
					endDate='April 7, 2025'
					status='Active'
				/>
				<BatchCard
					title='MERN 2025'
					subtitle='MERN STACK 2024'
					students={2}
					startDate='April 7, 2025'
					endDate='April 7, 2025'
					status='Active'
				/>
			</div>
			<CreateBatchModal
				isOpen={showCreateModal}
				setIsOpen={setShowCreateModal}
			/>
		</div>
	);
}
