import React, { useCallback, useEffect, useState } from 'react';
import { TbXboxXFilled } from 'react-icons/tb';
import { FaFilter } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { FONTS } from '../../constants/uiConstants';
import { getAllBatches } from '../../features/certificateManagement/services';
import {
	getBranchService,
	getCourseService,
} from '../../features/batchManagement/services';
import { useDispatch } from 'react-redux';

interface CertificateFilterProps {
	showFilter: boolean;
	setShowFilter: (show: boolean) => void;
	selectedCourse: string;
	setSelectedCourse: (course: string) => void;
	selectedBranch: string;
	setSelectedBranch: (branch: string) => void;
	selectedBatch: string;
	setSelectedBatch: (batch: string) => void;
	selectedStudent: string;
	setSelectedStudent: (student: string) => void;
	onAdd: () => void;
	setBranchFilter: any;
	setCourseFilter: any;
	setSearchTerm: any;
	searchTerm: any;
}

export const CertificateFilter: React.FC<CertificateFilterProps> = ({
	showFilter,
	setShowFilter,
	selectedCourse,
	setSelectedCourse,
	selectedBranch,
	setSelectedBranch,
	// selectedBatch,
	// setSelectedBatch,
	setBranchFilter,
	setCourseFilter,
	// selectedStudent,
	// setSelectedStudent,
	onAdd,
	setSearchTerm,
	searchTerm,
}) => {
	const dispatch = useDispatch<any>();
	const [courses, setCourses] = useState<any[]>([]);
	const [branches, setBranches] = useState<any[]>([]);
	const [, setAllBatches] = useState<any[]>([]);

	const fetchAllCourses = useCallback(async () => {
		try {
			const response = await getCourseService({ branch: selectedBranch });
			if (response) {
				setCourses(response?.data);
			}
		} catch (error) {
			console.log('Error fetching course data:', error);
		}
	}, [selectedBranch]);

	const fetchAllBranches = async () => {
		try {
			const response = await getBranchService({});
			if (response) {
				setBranches(response?.data);
			}
		} catch (error) {
			console.log('Error fetching branch data:', error);
		}
	};

	const fetchAllBatches = useCallback(async () => {
		try {
			const response = await getAllBatches({});
			if (response?.data) {
				setAllBatches(response.data);
			}
		} catch (error) {
			console.error('Error fetching batches:', error);
			// toast.error('Failed to load batches');
		}
	}, []);

	useEffect(() => {
		fetchAllBranches();
		fetchAllCourses();
		fetchAllBatches();
	}, [dispatch, fetchAllBatches, fetchAllCourses, selectedBranch]);

	return (
		<>
			<div className='bg-[#1BBFCA] px-4 lg:px-6 py-3 rounded-xl flex justify-between items-center'>
				<h2 className='text-white text-base lg:text-lg font-semibold flex items-center'>
					<FaFilter
						className='mt-0.5 lg:mt-1 mr-2 flex-shrink-0'
						style={{ ...FONTS.heading_06_bold }}
					/>{' '}
					FILTER
				</h2>
				<button
					onClick={() => setShowFilter(!showFilter)}
					className='bg-white w-8 h-8 lg:w-10 lg:h-10 p-1 rounded flex items-center justify-center hover:bg-gray-100 transition-colors'
				>
					{showFilter ? (
						<TbXboxXFilled className='w-5 h-5 lg:w-6 lg:h-6 text-gray-600' />
					) : (
						<span className='text-green-700 font-semibold text-sm lg:text-base'>
							Go
						</span>
					)}
				</button>
			</div>

			{showFilter && (
				<div className='bg-white mt-4 lg:mt-5 rounded-xl p-4 lg:p-6 shadow-md'>
					<div className='font-normal text-lg lg:text-xl text-[#716F6F] mb-4 lg:mb-5'>
						<h2>Student Certificates</h2>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4'>
						{/* Branch Filter */}
						<div className='sm:col-span-1'>
							<label
								className='block text-base lg:text-lg font-medium text-[#716F6F] mb-1 lg:mb-2'
								style={{ ...FONTS.heading_08 }}
							>
								Branch
							</label>
							<select
								className='w-full border h-10 lg:h-13 px-3 py-2 rounded text-sm lg:text-base'
								value={selectedBranch}
								onChange={(e) => {
									const selected = branches.find(
										(branch: any) => branch?.uuid === e.target.value
									);
									setSelectedBranch(selected?.uuid || '');
									setBranchFilter(selected?._id || '');
								}}
								style={{ ...FONTS.heading_08 }}
							>
								<option value=''>All</option>
								{branches?.map((branch: any) => (
									<option key={branch?._id} value={branch?.uuid}>
										{branch?.branch_identity}
									</option>
								))}
							</select>
						</div>

						{/* Course Filter */}
						<div className='sm:col-span-1'>
							<label
								className='block text-base lg:text-lg font-medium text-[#716F6F] mb-1 lg:mb-2'
								style={{ ...FONTS.heading_08 }}
							>
								Course
							</label>
							<select
								className='w-full border h-10 lg:h-13 px-3 py-2 rounded text-sm lg:text-base'
								value={selectedCourse}
								onChange={(e) => {
									const selected = courses.find(
										(course: any) => course?.uuid === e.target.value
									);
									setSelectedCourse(selected?.uuid || '');
									setCourseFilter(selected?._id || '');
								}}
								style={{ ...FONTS.heading_08 }}
							>
								<option value=''>All</option>
								{courses?.map((course: any) => (
									<option key={course?.uuid} value={course?.uuid}>
										{course?.course_name}
									</option>
								))}
							</select>
							{selectedBranch && courses?.length === 0 && (
								<p className='text-sm mt-1 text-red-600 text-center'>
									No courses available in this branch
								</p>
							)}
						</div>

						{/* Search Input */}
						<div className='sm:col-span-2 lg:col-span-2 xl:col-span-2'>
							<label className='block text-base lg:text-lg font-medium text-[#716F6F] mb-1 lg:mb-2 invisible'>
								Search
							</label>
							<input
								type='text'
								className='w-full text-sm lg:text-base border h-10 lg:h-13 px-3 py-2 rounded'
								placeholder='Search Certificates...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* Add Button */}
						<div className='sm:col-span-2 lg:col-span-1 xl:col-span-1 flex items-end'>
							<button
								onClick={onAdd}
								className='bg-[#1BBFCA] text-white px-3 lg:px-4 py-2 w-full flex items-center justify-center rounded-lg hover:bg-[#17a8b3] transition-colors text-sm lg:text-base'
							>
								<IoMdAdd
									className='mr-1 lg:mr-2 h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0'
									style={{ ...FONTS.heading_06_bold }}
								/>{' '}
								<span className='truncate'>Add Certificate</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
