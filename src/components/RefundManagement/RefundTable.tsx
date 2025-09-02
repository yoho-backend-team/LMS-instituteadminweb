import React, { useState } from 'react';
import type { RefundData } from '../../pages/Refund Management/Fees/RefundFees';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import toast from 'react-hot-toast';

interface Props {
	data: RefundData[];
	onDelete: (refundId: string) => void;
	onEdit: (data: RefundData) => void;
	loading?: boolean; // Added loading prop
}

// Skeleton row component
const SkeletonRow: React.FC = () => {
	return (
		<tr className='border-t animate-pulse'>
			<td className='px-4 py-4'>
				<div className='h-4 bg-gray-200 rounded'></div>
			</td>
			<td className='px-4 py-4'>
				<div className='h-4 bg-gray-200 rounded'></div>
			</td>
			<td className='px-4 py-4'>
				<div className='flex flex-col gap-2'>
					<div className='h-4 bg-gray-200 rounded w-3/4'></div>
					<div className='h-3 bg-gray-200 rounded w-1/2'></div>
				</div>
			</td>
			<td className='px-4 py-4'>
				<div className='h-4 bg-gray-200 rounded'></div>
			</td>
			<td className='px-4 py-4'>
				<div className='h-4 bg-gray-200 rounded'></div>
			</td>
			<td className='px-4 py-4'>
				<div className='h-6 bg-gray-200 rounded w-3/4'></div>
			</td>
			<td className='px-4 py-4'>
				<div className='flex items-center gap-3'>
					<div className='h-6 w-6 bg-gray-200 rounded'></div>
					<div className='h-6 w-6 bg-gray-200 rounded'></div>
				</div>
			</td>
		</tr>
	);
};

const RefundTable: React.FC<Props> = ({ data, onDelete, onEdit, loading }) => {
	const [sortKey, setSortKey] = useState<keyof RefundData | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const handleSort = (key: keyof RefundData) => {
		if (sortKey === key) {
			setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortKey(key);
			setSortOrder('asc');
		}
	};

	const sortedData = [...data].sort((a, b) => {
		if (!sortKey) return 0;
		const valA = a[sortKey];
		const valB = b[sortKey];

		if (typeof valA === 'number' && typeof valB === 'number') {
			return sortOrder === 'asc' ? valA - valB : valB - valA;
		}

		return sortOrder === 'asc'
			? String(valA).localeCompare(String(valB))
			: String(valB).localeCompare(String(valA));
	});

	const sortableColumns: { label: string; key: keyof RefundData }[] = [
		{ label: 'Refund ID', key: 'refundId' },
		{ label: 'Student ID', key: 'studentId' },
		{ label: 'Student Info', key: 'studentInfo' },
		{ label: 'Paid', key: 'paid' },
		{ label: 'Payment', key: 'payment' },
		{ label: 'Status', key: 'status' },
	];

	return (
		<div className='p-4 bg-white shadow-lg overflow-x-auto max-h-[75vh]'>
			<table className='w-full text-left border-collapse table-auto'>
				<thead className='bg-[#F8F8F8] text-[#716F6F] font-semibold text-sm'>
					<tr>
						{sortableColumns.map(({ label, key }) => (
							<th
								key={key}
								className={`py-3 px-4 cursor-pointer select-none ${
									key === 'studentInfo'
										? 'w-[250px]'
										: key === 'refundId' || key === 'studentId'
										? 'w-[120px]'
										: 'w-[150px]'
								}`}
								onClick={() => handleSort(key)}
							>
								<div className='flex items-center gap-1'>
									{label}
									{sortKey === key ? (
										sortOrder === 'asc' ? (
											<IoIosArrowRoundUp size={20} />
										) : (
											<IoIosArrowRoundDown size={20} />
										)
									) : (
										<IoIosArrowRoundUp size={20} className='opacity-20' />
									)}
								</div>
							</th>
						))}
						<th className='px-4 py-3 w-[100px]'>Actions</th>
					</tr>
				</thead>

				<tbody className='text-[#716F6F] text-sm'>
					{loading ? (
						// Show skeleton rows when loading
						Array.from({ length: 5 }).map((_, index) => (
							<SkeletonRow key={index} />
						))
					) : sortedData.length === 0 ? (
						<tr>
							<td
								colSpan={sortableColumns.length + 1}
								className='text-center py-6 text-gray-400'
							>
								No data available
							</td>
						</tr>
					) : (
						sortedData.map((item) => (
							<tr key={item.refundId} className='border-t'>
								<td className='px-4 py-4'>{item.refundId}</td>
								<td className='px-4 py-4'>{item.studentId}</td>
								<td className='px-4 py-4 flex flex-col'>
									<span>{item.studentInfo}</span>
									<span className='text-xs text-gray-500'>
										{item.studentEmail}
									</span>
								</td>

								<td className='px-4 py-4'>{item.paid}</td>
								<td className='px-4 py-4'>{item.payment}</td>
								<td className='px-4 py-4'>{item.status}</td>
								<td className='px-4 py-4'>
									<div className='flex items-center gap-3'>
										<button
											className='text-[#1BBFCA]'
											onClick={() => onEdit(item)}
										>
											<FaEdit size={18} />
										</button>
										<button
											onClick={() => {
												if (item.uuid) {
													onDelete(item.uuid);
												} else {
													toast.error('Cannot delete: Missing uuid');
												}
											}}
										>
											<FaTrashAlt size={18} />
										</button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default RefundTable;
