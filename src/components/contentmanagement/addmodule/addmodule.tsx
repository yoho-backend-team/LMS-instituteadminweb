/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
	AddModuleThunks,
	GetBranchCourseThunks,
	GetBranchThunks,
} from '../../../features/Content_Management/reducers/thunks';
import {
	Branch,
	BranchCourse,
} from '../../../features/Content_Management/reducers/selectors';

interface Props {
	onClose: () => void;
	onSubmit: (data: {
		branch: string;
		course: string;
		description: string;
		title: string;
		video: string;
	}) => void;
}

const Addmodule = ({ onClose, onSubmit }: Props) => {
	const [branch, setBranch] = useState('');
	const [course, setCourse] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const dispatch = useDispatch();
	const branches = useSelector(Branch);
	const courses = useSelector(BranchCourse);
	const [video, setVideo] = useState('');

	useEffect(() => {
		dispatch(GetBranchThunks([]) as any);
	}, [dispatch]);

	useEffect(() => {
		if (branch) {
			dispatch(GetBranchCourseThunks(branch) as any);
		}
	}, [branch, dispatch]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const moduleData = {
			branch,
			course,
			title,
			description,
			video,
		};

		try {
			await dispatch(AddModuleThunks(moduleData) as any);
			dispatch(GetBranchCourseThunks(branch) as any);
			onSubmit(moduleData);
			onClose();
		} catch (error) {
			console.error('Failed to add module', error);
		}
	};

	return (
		<div className='text-[#716F6F] p-3 xs:p-4 sm:p-6 h-full shadow-[4px_4px_24px_0px_#0000001A] bg-white rounded-lg xs:rounded-xl sm:rounded-2xl'>
			{/* Header */}
			<div className='flex justify-between items-center mb-4 xs:mb-5 sm:mb-6'>
				<h2 className='text-lg xs:text-xl sm:text-2xl font-bold text-gray-800'>
					Add Modules
				</h2>
				<button
					onClick={onClose}
					className='text-white bg-gray-500 rounded-full p-1 xs:p-1.5 hover:bg-red-500 transition-colors duration-200'
				>
					<IoMdClose size={14} className='xs:w-4 xs:h-4 sm:w-5 sm:h-5' />
				</button>
			</div>

			<form
				className='flex flex-col gap-3 xs:gap-4 sm:gap-5 mt-2 overflow-y-auto max-h-[60vh] xs:max-h-[65vh] sm:max-h-[70vh] scrollbar-hide px-1'
				onSubmit={handleSubmit}
			>
				{/* Branch Dropdown */}
				<div className='flex flex-col gap-2'>
					<label
						htmlFor='branch'
						className='text-sm xs:text-base font-medium text-gray-700'
					>
						Branch
					</label>
					<select
						id='branch'
						className='border border-gray-300 p-2 xs:p-2.5 rounded-lg h-10 xs:h-11 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent transition-all'
						value={branch}
						onChange={(e) => {
							setBranch(e.target.value);
							setCourse('');
						}}
					>
						<option value=''>Select Branch</option>
						{Array.isArray(branches) &&
							branches.map((b: any) => (
								<option key={b.id} value={b.uuid}>
									{b.branch_identity}
								</option>
							))}
					</select>
				</div>

				{/* Course Dropdown */}
				<div className='flex flex-col gap-2'>
					<label
						htmlFor='course'
						className='text-sm xs:text-base font-medium text-gray-700'
					>
						Select Course
					</label>
					<select
						id='course'
						className='border border-gray-300 p-2 xs:p-2.5 rounded-lg h-10 xs:h-11 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
						value={course}
						onChange={(e) => setCourse(e.target.value)}
						disabled={!branch}
					>
						<option value=''>Select Course</option>
						{Array.isArray(courses) &&
							courses.map((c: any) => (
								<option key={c.uuid} value={c.uuid}>
									{c.course_name}
								</option>
							))}
					</select>
				</div>

				{/* Title Input */}
				<div className='flex flex-col gap-2'>
					<label
						htmlFor='title'
						className='text-sm xs:text-base font-medium text-gray-700'
					>
						Title
					</label>
					<input
						id='title'
						type='text'
						className='border border-gray-300 p-2 xs:p-2.5 rounded-lg h-10 xs:h-11 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent transition-all'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Enter module title'
					/>
				</div>

				{/* Description Textarea */}
				<div className='flex flex-col gap-2'>
					<label
						htmlFor='description'
						className='text-sm xs:text-base font-medium text-gray-700'
					>
						Description
					</label>
					<textarea
						id='description'
						className='border border-gray-300 p-2 xs:p-2.5 rounded-lg h-20 xs:h-24 sm:h-28 resize-none text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent transition-all'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Enter module description'
						rows={4}
					></textarea>
				</div>

				{/* Video URL Input */}
				<div className='flex flex-col gap-2'>
					<label
						htmlFor='videoURL'
						className='text-sm xs:text-base font-medium text-gray-700'
					>
						Video URL
					</label>
					<input
						type='url'
						id='videoURL'
						className='border border-gray-300 p-2 xs:p-2.5 rounded-lg h-10 xs:h-11 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent transition-all'
						value={video}
						onChange={(e) => setVideo(e.target.value)}
						placeholder='https://example.com/video'
					/>
				</div>

				{/* Buttons */}
				<div className='flex flex-col xs:flex-row justify-end items-center gap-3 xs:gap-4 mt-4 xs:mt-6 sm:mt-8'>
					<button
						className='text-[#1BBFCA] border border-[#1BBFCA] px-4 xs:px-5 py-2 xs:py-2.5 rounded-lg font-semibold text-sm xs:text-base w-full xs:w-auto hover:bg-[#1BBFCA] hover:text-white transition-all duration-200'
						onClick={onClose}
						type='button'
					>
						Cancel
					</button>
					<button
						className='bg-[#1BBFCA] text-white px-4 xs:px-5 py-2 xs:py-2.5 rounded-lg font-semibold text-sm xs:text-base w-full xs:w-auto hover:bg-[#159ba5] transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
						type='submit'
						disabled={!branch || !course || !title || !video}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Addmodule;
