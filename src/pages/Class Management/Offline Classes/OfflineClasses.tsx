import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import plus from '../../../assets/Add.png';
import filter from '../../../assets/Filter.png';
import { CreateOfflineClassModal } from '../../../components/class management/offlineClass/createOfflineClass';
import OfflineClassCard from '../../../components/class management/offlineClass/classcard';

const OfflineClasses = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);

	return (
		<div className='min-h-screen bg-cover bg-no-repeat bg-center p-4'>
			<div className='mb-8'>
				<h2
					className='mb-6'
					style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}
				>
					Offline Class
				</h2>

				<div className='flex justify-between items-center'>
					<Button
						onClick={() => setShowFilter(!showFilter)}
						className='bg-[#1BBFCA] hover:bg-[#1BBFCA] text-white px-4 flex items-center gap-2'
						style={{ ...FONTS.heading_07 }}
					>
						<img src={filter} className='w-4 h-4' alt='Filter Icon' />
						{showFilter ? 'Hide Filter' : 'Show Filter'}
					</Button>

					<Button
						onClick={() => setShowCreateModal(true)}
						className='bg-[#1BBFCA] hover:bg-[#1BBFCA] text-white px-4 flex items-center gap-2'
						style={{ ...FONTS.heading_07 }}
					>
						<img src={plus} className='w-4 h-4' alt='Add Icon' />
						Add Offline Class
					</Button>
				</div>
			</div>

			{showFilter && (
				<div className='bg-white p-6 rounded-2xl shadow mb-8'>
					<h3 className='mb-4' style={{ ...FONTS.heading_04 }}>
						Filter
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_07 }}>
								Status
							</label>
							<select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'>
								<option value=''>Status</option>
								<option value='active'>Active</option>
								<option value='inactive'>Inactive</option>
							</select>
						</div>

						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_07 }}>
								Batches
							</label>
							<select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'>
								<option value=''>Select Batch</option>
								<option value='batch1'>Batch 1</option>
								<option value='batch2'>Batch 2</option>
								<option value='batch3'>Batch 3</option>
								<option value='batch4'>Batch 4</option>
								<option value='batch5'>Batch 5</option>
							</select>
						</div>

						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_07 }}>
								Search Class
							</label>
							<input
								type='text'
								placeholder='Search class'
								className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
							/>
						</div>
					</div>
				</div>
			)}

			<div className='flex gap-6 flex-wrap'>
				<OfflineClassCard
					title='MERN'
					students={2}
					startDate='Thu, July 12, 2025 | 12:00 PM - 01:00 PM'
				/>
				<OfflineClassCard
					title='MEAN'
					students={1}
					startDate='Fri, August 4, 2025 | 12:00 PM - 01:00 PM'
				/>
			</div>

			<CreateOfflineClassModal
				isOpen={showCreateModal}
				setIsOpen={setShowCreateModal}
			/>
		</div>
	);
};

export default OfflineClasses;
