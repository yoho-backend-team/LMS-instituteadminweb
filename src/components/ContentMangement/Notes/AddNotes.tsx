import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import {
	GetBranchThunks,
	GetBranchCourseThunks,
} from '../../../features/Content_Management/reducers/thunks';
import {
	Branch,
	BranchCourse,
} from '../../../features/Content_Management/reducers/selectors';
import { createNoteThunk } from '../../../features/ContentMangement/Notes/Reducer/noteThunk';
import { uploadFile } from '../../../features/ContentMangement/Notes/Services';

type AddNotesProps = {
	onClose: () => void;
	onSubmit: (data: any) => void;
};

const AddNotes: React.FC<AddNotesProps> = ({ onClose, onSubmit }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch<any>();
	const [selectedBranch, setSelectedBranch] = useState('');
	const [selectedCourse, setSelectedCourse] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState({
		title: '',
		file: '',
		branch: '',
		course: '',
		description: '',
	});

	const branches = useSelector(Branch);
	const courses = useSelector(BranchCourse);

	const instituteId = useSelector(
		(state: any) => state.authuser?.user?.institute_id?.uuid
	);

	useEffect(() => {
		dispatch(GetBranchThunks([]));
	}, [dispatch]);

	useEffect(() => {
		if (selectedBranch) {
			dispatch(GetBranchCourseThunks(selectedBranch));
		}
	}, [selectedBranch, dispatch]);

	const validateForm = () => {
		const newErrors = {
			title: !title.trim() ? 'Title is required.' : '',
			file: !uploadedFile ? 'File is required.' : '',
			branch: !selectedBranch ? 'Branch is required.' : '',
			course: !selectedCourse ? 'Course is required.' : '',
			description: !description.trim() ? 'Description is required.' : '',
		};

		setErrors(newErrors);
		return !Object.values(newErrors).some((error) => error !== '');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			setLoading(true);
			let uploadedFileUrl = '';

			if (uploadedFile instanceof File) {
				if (uploadedFile.size > 5 * 1024 * 1024) {
					setErrors((prev) => ({
						...prev,
						file: 'File size should be under 5MB.',
					}));
					setLoading(false);
					return;
				}

				const formData = new FormData();
				formData.append('file', uploadedFile);

				const fileUploadResponse = await uploadFile(formData);

				if (fileUploadResponse?.data?.file) {
					uploadedFileUrl = fileUploadResponse.data.file;
				} else {
					throw new Error('File upload failed');
				}
			}

			const payload = {
				title,
				description,
				course: selectedCourse,
				branch: selectedBranch,
				file: uploadedFileUrl,
				institute: instituteId,
			};

			await dispatch(createNoteThunk(payload));
			onSubmit(payload);

			// Reset form
			setTitle('');
			setDescription('');
			setSelectedBranch('');
			setSelectedCourse('');
			setUploadedFile(null);
			setFilePreviewUrl(null);
			setErrors({
				title: '',
				file: '',
				branch: '',
				course: '',
				description: '',
			});
		} catch (error) {
			console.error('Failed to add note', error);
			alert('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='relative text-[#716F6F] p-3 xs:p-4 sm:p-6 h-full mx-2 xs:mx-3 sm:mx-0'>
			{/* Header */}
			<div className='flex justify-between items-center mb-4 sm:mb-6'>
				<h2 className='text-lg xs:text-xl sm:text-2xl font-bold text-gray-800'>
					Add Note
				</h2>
				<button
					onClick={onClose}
					className='text-white bg-gray-500 rounded-full p-1 hover:bg-red-500 transition-colors'
				>
					<IoMdClose size={14} className='xs:w-4 xs:h-4 sm:w-5 sm:h-5' />
				</button>
			</div>

			{/* Form */}
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-3 xs:gap-4 sm:gap-5 overflow-y-auto max-h-[75vh] xs:max-h-[80vh] scrollbar-hide'
			>
				{/* File Upload Section */}
				{!uploadedFile ? (
					<div
						onClick={() => fileInputRef.current?.click()}
						className='flex items-center gap-2 xs:gap-3 border-2 border-dashed border-gray-300 p-4 xs:p-5 sm:p-6 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-50 transition-all hover:border-[#1BBFCA]'
					>
						<BiSolidCloudUpload
							size={32}
							className='xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-[#1BBFCA]'
						/>
						<span className='text-sm xs:text-base sm:text-lg text-center text-gray-600'>
							Drop File Here Or Click To Upload
						</span>
						<span className='text-xs xs:text-sm text-gray-500 text-center'>
							Supports: PDF, DOC, DOCX (Max 5MB)
						</span>
						<input
							type='file'
							ref={fileInputRef}
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (
									file &&
									[
										'application/pdf',
										'application/msword',
										'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
									].includes(file.type)
								) {
									setUploadedFile(file);
									setFilePreviewUrl(URL.createObjectURL(file));
									setErrors((prev) => ({ ...prev, file: '' }));
								} else {
									setUploadedFile(null);
									setFilePreviewUrl(null);
									setErrors((prev) => ({
										...prev,
										file: 'Only PDF, DOC, or DOCX files are allowed.',
									}));
								}
							}}
							accept='.pdf,.doc,.docx'
							className='hidden'
						/>
						{errors.file && (
							<p className='text-sm text-red-500 mt-2 text-center'>
								{errors.file}
							</p>
						)}
					</div>
				) : (
					<div className='relative border border-gray-300 p-3 xs:p-4 rounded-lg bg-gray-50'>
						<button
							type='button'
							onClick={() => {
								setUploadedFile(null);
								setFilePreviewUrl(null);
							}}
							className='absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors'
						>
							<IoMdClose size={12} className='xs:w-3 xs:h-3' />
						</button>
						{uploadedFile?.type === 'application/pdf' ? (
							<iframe
								src={filePreviewUrl!}
								className='w-full h-48 xs:h-52 sm:h-60 md:h-64 border rounded-md'
								title='PDF Preview'
							/>
						) : (
							<div className='text-center py-6 xs:py-8'>
								<div className='text-blue-600 text-lg xs:text-xl sm:text-2xl mb-2'>
									📄
								</div>
								<div className='text-sm xs:text-base text-blue-600 font-medium'>
									DOC/DOCX File Selected
								</div>
								<div className='text-xs xs:text-sm text-gray-500 mt-1'>
									Preview not supported for document files
								</div>
							</div>
						)}
						<p className='mt-3 text-xs xs:text-sm text-green-600 break-words font-medium'>
							{uploadedFile.name}
						</p>
					</div>
				)}

				{/* Branch Dropdown */}
				<div className='flex flex-col gap-1 xs:gap-2'>
					<label
						htmlFor='branch'
						className='text-sm xs:text-base font-medium text-gray-700'
					>
						Branch
					</label>
					<select
						id='branch'
						className='border border-gray-300 p-2 xs:p-3 rounded-lg text-sm xs:text-base focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
						value={selectedBranch}
						onChange={(e) => {
							const branchId = e.target.value;
							setSelectedBranch(branchId);
							setSelectedCourse(''); // reset course
						}}
					>
						<option value=''>Select Branch</option>
						{Array.isArray(branches) &&
							branches.map((b: any) => (
								<option key={b.uuid} value={b.uuid}>
									{b.branch_identity}
								</option>
							))}
					</select>
					{errors.branch && (
						<p className='text-xs xs:text-sm text-red-500 mt-1'>
							{errors.branch}
						</p>
					)}
				</div>

				{/* Course Dropdown */}
				<div className='flex flex-col gap-1 xs:gap-2'>
					<label
						htmlFor='course'
						className='text-sm xs:text-base font-medium text-gray-700'
					>
						Course
					</label>
					<select
						id='course'
						className='border border-gray-300 p-2 xs:p-3 rounded-lg text-sm xs:text-base focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
						value={selectedCourse}
						onChange={(e) => setSelectedCourse(e.target.value)}
						disabled={!selectedBranch}
					>
						<option value=''>Select Course</option>
						{Array.isArray(courses) &&
							courses.map((c: any) => (
								<option key={c._id} value={c._id}>
									{c.course_name}
								</option>
							))}
					</select>
					{errors.course && (
						<p className='text-xs xs:text-sm text-red-500 mt-1'>
							{errors.course}
						</p>
					)}
				</div>

				{/* Title Input */}
				<div className='flex flex-col gap-1 xs:gap-2'>
					<label className='text-sm xs:text-base font-medium text-gray-700'>
						Title
					</label>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='border border-gray-300 p-2 xs:p-3 rounded-lg text-sm xs:text-base focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent'
						placeholder='Enter note title'
					/>
					{errors.title && (
						<p className='text-xs xs:text-sm text-red-500 mt-1'>
							{errors.title}
						</p>
					)}
				</div>

				{/* Description Input */}
				<div className='flex flex-col gap-1 xs:gap-2'>
					<label className='text-sm xs:text-base font-medium text-gray-700'>
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='border border-gray-300 p-2 xs:p-3 rounded-lg text-sm xs:text-base focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent resize-none h-24 xs:h-28 sm:h-32'
						placeholder='Enter note description'
						rows={4}
					/>
					{errors.description && (
						<p className='text-xs xs:text-sm text-red-500 mt-1'>
							{errors.description}
						</p>
					)}
				</div>

				{/* Buttons */}
				<div className='flex xs:flex-row md:flex-row  justify-end gap-3 xs:gap-4 pt-2 xs:pt-4'>
					<button
						className='text-[#1BBFCA] border border-[#1BBFCA] px-4 xs:px-6 py-2 xs:py-2.5 rounded-lg font-semibold text-sm xs:text-base hover:bg-[#1BBFCA] hover:text-white transition-colors'
						type='button'
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className='bg-[#1BBFCA] text-white px-4 xs:px-6 py-2 xs:py-2.5 rounded-lg font-semibold text-sm xs:text-base hover:bg-[#19acc7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						type='submit'
						disabled={loading}
					>
						{loading ? 'Submitting...' : 'Submit'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddNotes;
