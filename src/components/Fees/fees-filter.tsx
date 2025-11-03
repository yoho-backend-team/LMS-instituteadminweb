'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllBranches } from '../../features/Class Management/Live Class/services';
import toast from 'react-hot-toast';

interface FeesFilterProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	selectedBranch: string;
	onBranchChange: (value: string) => void;
	startDate: string;
	endDate: string;
	onStartDateChange: (value: string) => void;
	onEndDateChange: (value: string) => void;
	onResetFilters: () => void; // 👈 new prop
}

export const FeesFilter: React.FC<FeesFilterProps> = ({
	searchQuery,
	onSearchChange,
	selectedBranch,
	onBranchChange,
	startDate,
	endDate,
	onStartDateChange,
	onEndDateChange,
	onResetFilters,
}) => {
	const [allBranches, setAllBranches] = useState<any[]>([]);

	const fetchAllBranches = useCallback(async () => {
		try {
			const response = await getAllBranches();
			if (response?.data) setAllBranches(response.data);
		} catch {
			toast.error('Failed to load branches');
		}
	}, []);

	useEffect(() => {
		fetchAllBranches();
	}, [fetchAllBranches]);

	return (
		<div className='bg-white rounded-xl shadow p-4 mb-6 space-y-4 border border-gray-200'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div>
					<label className='block text-sm text-gray-700 mb-1'>
						Search by Student Name
					</label>
					<input
						type='text'
						placeholder='Search by student name'
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-700 mb-1'>Branch</label>
					<select
						value={selectedBranch}
						onChange={(e) => onBranchChange(e.target.value)}
						className='w-full border border-gray-300 rounded-md px-3 py-2'
					>
						<option value=''>Select Branch</option>
						{allBranches?.map((branch, index) => (
							<option key={index} value={branch?._id}>
								{branch?.branch_identity}
							</option>
						))}
					</select>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm text-gray-700 mb-1'>
							Start Date
						</label>
						<input
							type='date'
							value={startDate}
							onChange={(e) => onStartDateChange(e.target.value)}
							className='w-full border border-gray-300 rounded-md px-3 py-2'
						/>
					</div>

					<div>
						<label className='block text-sm text-gray-700 mb-1'>End Date</label>
						<input
							type='date'
							value={endDate}
							onChange={(e) => onEndDateChange(e.target.value)}
							className='w-full border border-gray-300 rounded-md px-3 py-2'
						/>
					</div>
				</div>
			</div>

			<div className='flex justify-end'>
				<button
					onClick={onResetFilters}
					className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition'
				>
					Reset Filters
				</button>
			</div>
		</div>
	);
};
