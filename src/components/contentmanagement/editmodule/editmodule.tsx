import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { BiSolidCloudUpload } from 'react-icons/bi';
import {
	EditModuleThunks,
	GetallModuleThunks,
	Upload_addFileThunks,
} from '../../../features/Content_Management/reducers/thunks';

interface Props {
	onClose: () => void;
	existingModule: {
		_id?: string;
		uuid: string;
		title: string;
		description?: string;
		video?: any;
		file?: File | null;
	};
}

const EditmodulePage = ({ onClose, existingModule }: Props) => {
	const dispatch = useDispatch<any>();
	const fileInputRef = useRef<HTMLInputElement>(null);
	console.log(fileInputRef, 'fileinputref');
	console.log(existingModule, 'ref');

	const [formData, setFormData] = useState({
		_id: '',
		uuid: '',
		title: '',
		description: '',
		video: existingModule.video ?? '',
		file: null as File | null,
	});
	console.log(formData, 'formdata');

	useEffect(() => {
		if (existingModule) {
			setFormData({
				_id: (existingModule as any)._id || '',
				uuid: existingModule.uuid,
				title: existingModule.title || '',
				description: existingModule.description || '',
				video: existingModule.video || '',
				file: null,
			});
		}
	}, [existingModule]);

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			const videoURL = URL.createObjectURL(file);
			setFormData((prev) => ({
				...prev,
				file,
				video: videoURL,
			}));
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		let finalVideoUri = formData.video;

		try {
			if (formData.file) {
				const formDataToSend = new FormData();
				formDataToSend.append('file', formData.file);

				const response = await dispatch(Upload_addFileThunks(formDataToSend));
				console.log(response, 'res');
			}

			const payload = {
				_id: formData._id,
				uuid: formData.uuid,
				title: formData.title,
				description: formData.description,
				video: finalVideoUri,
			};

			const paramsData = {
				branch_id: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
				institute_id: '973195c0-66ed-47c2-b098-d8989d3e4529',
				page: 1,
			};

			await dispatch(EditModuleThunks(payload));
			onClose();
			dispatch(GetallModuleThunks(paramsData));
		} catch (error) {
			console.error('Error in module update:', error);
		}
	};

	return (
		<div className='relative text-[#716F6F] p-3 xs:p-4 sm:p-6 h-full shadow-[4px_4px_24px_0px_#0000001A] bg-white rounded-lg xs:rounded-xl sm:rounded-2xl'>
			{/* Header */}
			<div className='flex justify-between items-center mb-3 xs:mb-4 sm:mb-5'>
				<h2 className='text-lg xs:text-xl sm:text-2xl font-bold text-gray-800'>
					Edit Module
				</h2>
				<button
					onClick={onClose}
					className='text-white bg-gray-500 rounded-full p-1 xs:p-1.5 hover:bg-red-500 transition-colors duration-200 flex-shrink-0'
				>
					<IoMdClose size={14} className='xs:w-4 xs:h-4 sm:w-5 sm:h-5' />
				</button>
			</div>

			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-3 xs:gap-4 sm:gap-5 mt-2 overflow-y-auto max-h-[65vh] xs:max-h-[70vh] sm:max-h-[75vh] scrollbar-hide px-1'
			>
				{/* Video Upload Section - Fixed height for small screens */}
				<div
					onClick={handleUploadClick}
					className='flex items-center gap-2 border-2 border-dashed border-gray-300 p-3 xs:p-4 sm:p-5 rounded-lg xs:rounded-xl flex-col justify-center cursor-pointer hover:bg-gray-50 transition-all duration-200 min-h-[100px] xs:min-h-[120px] sm:min-h-[140px] max-h-[180px] xs:max-h-[200px] sm:max-h-[240px] overflow-hidden'
				>
					{existingModule?.video &&
					existingModule.video.includes('youtube.com') ? (
						<div className='w-full h-full flex flex-col'>
							<p className='text-xs xs:text-sm text-gray-600 mb-1 xs:mb-2 text-center flex-shrink-0'>
								Current YouTube Video
							</p>
							<div className='relative w-full flex-1 min-h-0 rounded xs:rounded-lg overflow-hidden'>
								<iframe
									src={existingModule.video}
									className='w-full h-full'
									allow='autoplay; encrypted-media'
									allowFullScreen
									title='YouTube video'
								></iframe>
							</div>
							<p className='text-xs text-gray-500 mt-1 xs:mt-2 text-center flex-shrink-0'>
								Click to change video
							</p>
						</div>
					) : existingModule?.video ? (
						<div className='w-full h-full flex flex-col'>
							<p className='text-xs xs:text-sm text-gray-600 mb-1 xs:mb-2 text-center flex-shrink-0'>
								Current Video
							</p>
							<div className='relative w-full flex-1 min-h-0 rounded xs:rounded-lg overflow-hidden'>
								<video
									src={existingModule.video}
									controls
									className='w-full h-full object-contain'
									title='Module video'
								/>
							</div>
							<p className='text-xs text-gray-500 mt-1 xs:mt-2 text-center flex-shrink-0'>
								Click to change video
							</p>
						</div>
					) : (
						<div className='text-center p-2'>
							<BiSolidCloudUpload
								size={28}
								className='xs:w-8 xs:h-8 sm:w-10 sm:h-10 mx-auto text-gray-400 mb-2 xs:mb-3 flex-shrink-0'
							/>
							<p className='text-sm xs:text-base font-medium text-gray-600 mb-1'>
								Click to upload video
							</p>
							<p className='text-xs text-gray-500'>MP4, WebM, or YouTube URL</p>
						</div>
					)}
				</div>

				{/* Hidden File Input */}
				<input
					type='file'
					accept='video/*'
					ref={fileInputRef}
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>

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
						value={formData.title}
						onChange={handleChange}
						className='border border-gray-300 p-2 xs:p-2.5 rounded-lg h-10 xs:h-11 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent transition-all'
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
						value={formData.description}
						onChange={handleChange}
						className='border border-gray-300 p-2 xs:p-2.5 rounded-lg h-20 xs:h-24 sm:h-28 resize-none text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent transition-all'
						placeholder='Enter module description'
						rows={3}
					></textarea>
				</div>

				{/* Video URL Input */}
				<div className='flex flex-col gap-2'>
					<label
						htmlFor='video'
						className='text-sm xs:text-base font-medium text-gray-700'
					>
						Video URL
					</label>
					<input
						id='video'
						type='text'
						value={formData.video}
						onChange={handleChange}
						className='border border-gray-300 p-2 xs:p-2.5 rounded-lg h-10 xs:h-11 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] focus:border-transparent transition-all'
						placeholder='https://example.com/video or YouTube URL'
					/>
				</div>

				{/* Buttons */}
				<div className='flex flex-col xs:flex-row justify-end items-center gap-3 xs:gap-4 mt-4 xs:mt-5 sm:mt-6 pt-2 border-t border-gray-200'>
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
						disabled={!formData.title || !formData.video}
					>
						Update Module
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditmodulePage;
