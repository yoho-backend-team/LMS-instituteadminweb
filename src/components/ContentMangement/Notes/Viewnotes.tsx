import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';

interface Note {
	title: string;
	course: string;
	description: string;
	status: any;
	file?: File;
	fileName?: string;
	videoUrl?: string;
}

interface NoteDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	note: Note;
}

const getFileTypeFromName = (name: string): string => {
	const extension = name.split('.').pop()?.toLowerCase();
	if (extension === 'pdf') return 'application/pdf';
	if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image/';
	if (['mp4', 'webm', 'ogg', 'mov'].includes(extension || '')) return 'video/';
	return 'unknown';
};

const ViewNoteModal: React.FC<NoteDetailModalProps> = ({
	isOpen,
	onClose,
	note,
}) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [fileType, setFileType] = useState<string>('unknown');

	useEffect(() => {
		if (note.file) {
			const url = URL.createObjectURL(note.file);
			setPreviewUrl(url);
			setFileType(note.file.type);
			return () => URL.revokeObjectURL(url);
		} else if (note.fileName) {
			setPreviewUrl(note.fileName);
			setFileType(getFileTypeFromName(note.fileName));
		} else {
			setPreviewUrl(null);
			setFileType('unknown');
		}
	}, [note]);

	if (!isOpen) return null;

	const renderPreview = () => {
		if (note.videoUrl) {
			const isYoutube =
				note.videoUrl.includes('youtube.com') ||
				note.videoUrl.includes('youtu.be');
			return (
				<div className='w-full h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 bg-gray-200 rounded-md mb-4 flex items-center justify-center overflow-hidden'>
					{isYoutube ? (
						<iframe
							src={note.videoUrl}
							className='w-full h-full rounded'
							allow='autoplay; encrypted-media'
							allowFullScreen
						/>
					) : (
						<video
							src={note.videoUrl}
							controls
							className='w-full h-full rounded'
						/>
					)}
				</div>
			);
		}

		if (!previewUrl) {
			return (
				<div className='w-full h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500 text-sm sm:text-base'>
					No file uploaded
				</div>
			);
		}

		if (fileType.startsWith('image/')) {
			return (
				<img
					src={previewUrl}
					alt='Preview'
					className='w-full h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 object-contain rounded-md mb-4'
				/>
			);
		}

		if (fileType === 'application/pdf') {
			return (
				<iframe
					src={`${previewUrl}#view=fitH`}
					className='w-full h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 rounded-md mb-4'
				/>
			);
		}

		if (fileType.startsWith('video/')) {
			return (
				<video
					src={previewUrl}
					controls
					className='w-full h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 rounded-md mb-4'
				/>
			);
		}

		return (
			<div className='w-full h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500 text-sm sm:text-base'>
				{note.fileName?.split('/').pop() || 'File'}
			</div>
		);
	};

	return (
		<div className='fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-center justify-center p-2 sm:p-4'>
			<div className='bg-white rounded-2xl p-4 sm:p-6 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl shadow-xl relative max-h-[90vh] overflow-y-auto'>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-2 right-2 sm:top-3 sm:right-3 text-xl hover:text-red-500 z-10 bg-white rounded-full p-1 shadow-md'
				>
					<IoMdClose size={20} className='sm:w-6 sm:h-6' />
				</button>

				{/* Preview Section */}
				{renderPreview()}

				{/* Header Section */}
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4'>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-semibold flex items-center gap-2 text-gray-800'>
						{note.title}
						<FaStar className='text-yellow-400 w-4 h-4 sm:w-5 sm:h-5' />
					</h2>
					<span
						className={`w-20 sm:w-24 text-center py-1 sm:py-1.5 rounded-lg text-white text-sm sm:text-base ${
							note.status === 'Active' ? 'bg-green-600' : 'bg-red-600'
						}`}
					>
						{note.status}
					</span>
				</div>

				{/* Note Details */}
				<div className='text-sm sm:text-base text-gray-700 space-y-3 sm:space-y-4'>
					<div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
						<span className='font-semibold min-w-28'>Title:</span>
						<span className='px-0 sm:px-2 break-words'>{note.title}</span>
					</div>
					<div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
						<span className='font-semibold min-w-28'>Course Name:</span>
						<span className='px-0 sm:px-2 break-words'>{note.course}</span>
					</div>
					<div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2'>
						<span className='font-semibold min-w-28'>Description:</span>
						<span className='px-0 sm:px-2 break-words'>{note.description}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewNoteModal;
