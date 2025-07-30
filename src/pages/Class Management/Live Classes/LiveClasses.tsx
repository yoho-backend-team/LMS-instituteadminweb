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
							Add Live Class
						</Button>
					</div>
				</div>

				{showFilter && (
					<div className='bg-[white] p-6 rounded-2xl shadow mb-8'>
						<h3
							className=' mb-4'
							style={{ ...FONTS.heading_05_bold, color: COLORS.gray_dark_02 }}
						>
							Filters
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Status
								</label>
								<select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'>
									<option value=''>Select Status</option>
									<option value='active'>Active</option>
									<option value='inactive'>Inactive</option>
								</select>
							</div>

							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Course
								</label>
								<select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'>
									<option value=''>Select Course</option>
									<option value='mern'>MERN STACK</option>
									<option value='mean'>MEAN STACK</option>
									<option value='full'>FULL STACK</option>
									<option value='python'>PYTHON</option>
								</select>
							</div>

							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Batches
								</label>
								<select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'>
									<option value=''>Select Batches</option>
									<option value='batch_1'>BATCH 1</option>
									<option value='batch_2'>BATCH 2</option>
									<option value='batch_3'>BATCH 3</option>
									<option value='batch_4'>BATCH 4</option>
									<option value='batch_5'>BATCH 5</option>
								</select>
							</div>

							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Search Batch
								</label>
								<input
									type='text'
									placeholder='Undefined'
									className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
								/>
							</div>

							<div>
								<label
									className='block mb-1'
									style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
								>
									Search Class
								</label>
								<input
									type='text'
									placeholder='Search Class'
									className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default LiveClasses;
