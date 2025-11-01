import React, { useState } from 'react';
import { DropdownMenu } from './DropdownMenu';
import { MdToggleOn, MdToggleOff, MdClose } from 'react-icons/md';
import type { Note } from '../../components/StudyMaterial/Note';
import { GetImageUrl } from '../../utils/helper';

interface NoteCardProps {
	note: Note;
	onView: (note: Note) => void;
	onEdit: (note: Note) => void;
	onDelete: (id: number) => void;
	onToggleStatus?: (uuid: string, status: boolean) => void;
	fileIcon: string;
	titleIcon: string;
}

// View Modal Component
const ViewModal: React.FC<{
	note: Note;
	isOpen: boolean;
	onClose: () => void;
	titleIcon: string;
}> = ({ note, isOpen, onClose, titleIcon }) => {
	if (!isOpen) return null;

	const renderFilePreview = () => {
		if (!note.file) {
			return (
				<div className='w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-500'>
					No file uploaded
				</div>
			);
		}

		let fileUrl: string;
		let fileName: string;
		let fileType: string = '';

		if (note.file instanceof File) {
			fileUrl = URL.createObjectURL(note.file);
			fileName = note.file.name;
			fileType = note.file.type;
		} else {
			fileUrl = String(note.file);
			fileName = String(note.file);
		}

		// Check if the file is a PDF
		const isPDF = () => {
			if (note.file instanceof File) {
				const result =
					note.file.type === 'application/pdf' ||
					note.file.name.toLowerCase().endsWith('.pdf');
				return result;
			}
			const fileStr = String(note.file);
			const result =
				fileStr.toLowerCase().includes('.pdf') ||
				fileStr.toLowerCase().includes('pdf');
			return result;
		};

		// Check if it's an image
		const isImage = () => {
			if (note.file instanceof File) {
				const result = note.file.type.startsWith('image/');
				return result;
			}
			const fileStr = String(note.file);
			const imageExtensions = [
				'.jpg',
				'.jpeg',
				'.png',
				'.gif',
				'.bmp',
				'.webp',
			];
			const result = imageExtensions.some((ext) =>
				fileStr.toLowerCase().includes(ext)
			);
			return result;
		};

		const pdfCheck = isPDF();
		const imageCheck = isImage();

		if (pdfCheck) {
			return (
				<div className='w-full h-full flex flex-col bg-gray-100 rounded border-2 border-gray-300'>
					{/* PDF Header */}
					<div className='p-3 border-b border-gray-300 bg-gray-50'>
						<div className='text-sm text-gray-600 font-medium'>
							PDF File: {fileName}
						</div>
					</div>

					{/* PDF Iframe - Takes remaining space */}
					<div className='flex-1 min-h-0'>
						{' '}
						{/* This container allows the iframe to expand */}
						<iframe
							src={GetImageUrl(fileName) ?? undefined}
							className='w-full h-full rounded-b'
							title='PDF Preview'
							style={{
								border: 'none',
								minHeight: '300px',
							}}
							onLoad={() => console.log('PDF iframe loaded successfully')}
							onError={() => console.log('PDF iframe failed to load')}
						/>
					</div>

					{/* Fallback for browsers that can't display PDF */}
					<div className='hidden'>
						{' '}
						{/* Hidden by default, shown via iframe onerror if needed */}
						<div className='flex flex-col items-center justify-center h-full text-gray-500 p-4'>
							<p className='text-sm font-medium mb-2'>
								Cannot display PDF in this browser
							</p>
							<a
								href={fileUrl}
								download={fileName}
								className='text-blue-500 hover:text-blue-700 underline'
							>
								Download PDF
							</a>
						</div>
					</div>
				</div>
			);
		}

		if (imageCheck) {
			return (
				<div className='w-full h-full bg-gray-100 rounded flex items-center justify-center border-2 border-gray-300'>
					<img
						src={fileUrl}
						alt='Preview'
						className='max-w-full max-h-full object-contain rounded'
						onLoad={() => console.log('Image loaded successfully')}
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.style.display = 'none';
							target.parentElement!.innerHTML = `
                <div class="text-center text-gray-500">
                  <p class="text-sm font-medium">Cannot load image</p>
                  <p class="text-xs mt-1">${fileName}</p>
                </div>
              `;
						}}
					/>
				</div>
			);
		}

		// For other file types
		return (
			<div className='w-full h-full bg-gray-100 rounded flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 p-4'>
				<div className='text-center max-w-full'>
					<img
						src='/file-icon.svg'
						alt='file'
						className='w-12 h-12 mx-auto mb-2 opacity-50'
					/>
					<p className='text-sm font-medium mb-2'>File Preview</p>
					<p className='text-xs mb-3 text-gray-600 break-all px-2'>
						{fileName}
					</p>
					<p className='text-xs mb-3 text-gray-400'>
						Type: {fileType || 'Unknown'}
					</p>

					<div className='space-y-2'>
						<a
							href={fileUrl}
							download={fileName}
							className='inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors'
						>
							Download File
						</a>
						<br />
						<a
							href={fileUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors'
						>
							Open in New Tab
						</a>
					</div>
					<p className='text-xs mt-2 text-gray-400'>File ID: {note.id}</p>
				</div>
			</div>
		);
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg text-[#716F6F] p-3 sm:p-4 md:p-6'>
			<div className='bg-white rounded-2xl shadow-xl relative overflow-y-auto flex flex-col w-full h-[90vh] max-w-[95%] sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 transition-all duration-300'>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-700 hover:text-black text-xl'
				>
					<MdClose />
				</button>

				{/* File Preview - Takes 2/3rd height */}
				<div className='flex justify-center items-center w-full mb-6 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 h-2/3 max-h-[66.666%] min-h-[400px]'>
					{renderFilePreview()}
				</div>

				{/* Header Section */}
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-5'>
					<h1 className='text-base sm:text-lg md:text-2xl font-semibold flex items-center gap-2 text-[#3B3939]'>
						<img src={titleIcon} alt='icon' className='w-4 h-4 sm:w-5 sm:h-5' />
						{note.title}
						<span className='text-yellow-400 text-sm sm:text-base md:text-lg'>
							{' '}
							★{' '}
						</span>
					</h1>
					<span
						className={`mt-2 sm:mt-0 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1 rounded-full font-medium text-center ${
							note?.is_active
								? 'bg-green-500 text-white'
								: 'bg-gray-500 text-white'
						}`}
					>
						{note?.is_active ? 'Active' : 'Inactive'}
					</span>
				</div>

				{/* Note Details */}
				<div className='space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base flex-grow'>
					<div className='flex flex-row flex-wrap gap-2'>
						<p className='font-medium'>Title:</p>
						<p className='break-words'>{note.title || 'No title available'}</p>
					</div>
					{note.description && (
						<div className='flex flex-row flex-wrap gap-2'>
							<p className='font-medium'>Description:</p>
							<p className='whitespace-pre-wrap break-words'>
								{note.description}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const NoteCard: React.FC<NoteCardProps> = ({
	note,
	onEdit,
	onDelete,
	onView,
	onToggleStatus,
	fileIcon,
	titleIcon,
}) => {
	const [status, setStatus] = useState<boolean>(note?.is_active || true);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);

	const handleToggle = () => {
		const newStatus = status === true ? false : true;
		setStatus(newStatus);
		onToggleStatus?.(note.uuid, newStatus);
	};

	const handleView = () => {
		setIsViewModalOpen(true);
		onView(note);
	};

	const handleCloseModal = () => {
		setIsViewModalOpen(false);
	};

	return (
		<>
			<div className='bg-white text-[#716F6F] rounded-2xl p-4 shadow-2xl relative min-h-[200px] flex flex-col 2xl:h-[320px]'>
				{/* Top-right dropdown */}
				<div className='ml-auto mt-3 text-2xl right-3 top-3'>
					<DropdownMenu
						onView={handleView}
						onEdit={() => onEdit(note)}
						onDelete={() => onDelete(note?.id)}
					/>
				</div>

				{/* File preview section */}
				{note?.file && (
					<div className='flex gap-2 mt-2 bg-[#F7F7F7] h-12 text-xl items-center cursor-pointer rounded px-2'>
						<img
							src={fileIcon || '/placeholder.svg'}
							alt='file'
							className='w-5 h-5'
						/>
						<span className='text-sm'>{note?.id}</span>
					</div>
				)}

				{/* Title */}
				<h2 className='text-xl font-semibold mt-3 flex items-center'>
					<img src={titleIcon} alt='icon' className='mr-2 w-5 h-5' />
					{note?.title}
				</h2>

				{/* Description or other content */}
				<div className='mt-2 flex-1'>
					{note?.description && (
						<p className='whitespace-pre-wrap text-sm'>{note?.description}</p>
					)}
				</div>

				<div className='flex items-center mt-auto pt-3 border-t border-gray-200'>
					{note?.is_active ? (
						<div className='flex items-center gap-1 text-green-600 font-medium text-lg'>
							<span>Active</span>
							<span className='h-3 w-3 mt-1 ml-1 rounded-full bg-green-500 inline-block' />
						</div>
					) : (
						<div className='flex items-center gap-1 text-gray-500 font-medium text-lg'>
							<span>Inactive</span>
							<span className='h-3 w-3 mt-1 rounded-full bg-gray-400 inline-block' />
						</div>
					)}

					<button onClick={handleToggle} className='ml-auto'>
						{note?.is_active ? (
							<MdToggleOn className='text-green-500 text-5xl' />
						) : (
							<MdToggleOff className='text-gray-400 text-5xl' />
						)}
					</button>
				</div>
			</div>

			<ViewModal
				note={note}
				isOpen={isViewModalOpen}
				onClose={handleCloseModal}
				titleIcon={titleIcon}
			/>
		</>
	);
};
