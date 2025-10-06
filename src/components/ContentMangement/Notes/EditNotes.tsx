import { useRef, useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BiSolidCloudUpload } from 'react-icons/bi';

interface NoteData {
	title: string;
	description: string;
	isActive?: boolean;
	file?: File;
	fileName?: string;
	uuid?: string;
}

interface Props {
	noteData: NoteData;
	onClose: () => void;
	onSubmit: (data: NoteData) => void;
}

const EditNotes = ({ noteData, onClose, onSubmit }: Props) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState(noteData.title);
	const [description, setDescription] = useState(noteData.description);
	const [file, setFile] = useState<File | undefined>();
	const [filePreview, setFilePreview] = useState<string | null>(null);
	const [fileType, setFileType] = useState<string | null>(null);

	useEffect(() => {
		if (noteData.fileName) {
			const fullUrl = `https://lms-node-backend-v1.onrender.com/${noteData.fileName}`;
			setFilePreview(fullUrl);
			const ext = noteData.fileName.split('.').pop() || '';
			if (ext === 'pdf') setFileType('application/pdf');
			else if (['doc', 'docx'].includes(ext)) setFileType('application/msword');
			else setFileType(null);
		}
	}, [noteData.fileName]);

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
			setFilePreview(URL.createObjectURL(selectedFile));
			setFileType(selectedFile.type);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			...noteData,
			title,
			description,
			file,
			fileName: noteData.fileName,
			isActive: noteData.isActive ?? true,
		});

		onClose();
	};

	return (
		<div className='relative text-[#716F6F] p-3 xs:p-2 h-full'>
			<div className='flex justify-between items-center mb-4 xs:mb-3'>
				<h2 className='text-2xl xs:text-xl font-semibold'>
					Edit Study Material
				</h2>
				<button
					onClick={onClose}
					className='text-white bg-gray-500 rounded-full p-1 hover:bg-red-500 xs:p-0.5'
				>
					<IoMdClose size={16} className='xs:w-3 xs:h-3' />
				</button>
			</div>

			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-3 xs:gap-4 sm:gap-5 overflow-y-auto max-h-[75vh] xs:max-h-[80vh] scrollbar-hide'
			>
				<div className='flex flex-col gap-4 xs:gap-3'>
					{/* File Upload or Preview */}
					<div className='flex flex-col gap-2 xs:gap-1'>
						{!filePreview ? (
							<div
								onClick={handleUploadClick}
								className='flex items-center gap-2 xs:gap-1 border p-5 xs:p-3 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition'
							>
								<BiSolidCloudUpload
									size={40}
									className='text-[#1BBFCA] xs:w-8 xs:h-8'
								/>
								<span className='text-gray-600 xs:text-sm text-center'>
									Drop File Here Or Click To Upload
								</span>
								<input
									type='file'
									ref={fileInputRef}
									onChange={handleFileChange}
									accept='.pdf,.doc,.docx'
									className='hidden'
								/>
							</div>
						) : (
							<div className='relative border p-3 xs:p-2 rounded-md bg-gray-50'>
								<button
									type='button'
									onClick={() => {
										setFile(undefined);
										setFilePreview(null);
										setFileType(null);
									}}
									className='absolute top-2 right-2 xs:top-1 xs:right-1 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 xs:p-0.5'
								>
									<IoMdClose size={14} className='xs:w-2 xs:h-2' />
								</button>

								{fileType === 'application/pdf' ? (
									<iframe
										src={filePreview}
										className='w-full h-64 xs:h-48 sm:h-56 md:h-60 lg:h-64 border rounded-md'
										title='PDF Preview'
									/>
								) : fileType?.includes('word') ? (
									<div className='text-sm xs:text-xs text-blue-600 p-2 xs:p-1'>
										DOC/DOCX file selected. Preview not supported.
									</div>
								) : (
									<div className='text-sm xs:text-xs p-2 xs:p-1'>
										Unknown file type.
									</div>
								)}

								<p className='mt-2 xs:mt-1 text-sm xs:text-xs text-green-600 break-words'>
									{file?.name || noteData.fileName?.split('/').pop()}
								</p>
							</div>
						)}
					</div>

					{/* Title Input */}
					<div className='flex flex-col gap-2 xs:gap-1'>
						<label className='text-base xs:text-sm'>Title</label>
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type='text'
							className='border p-2 xs:p-1.5 rounded h-10 xs:h-8 text-base xs:text-sm'
						/>
					</div>

					{/* Description Input */}
					<div className='flex flex-col gap-2 xs:gap-1'>
						<label className='text-base xs:text-sm'>Description</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='border p-2 xs:p-1.5 rounded h-30 xs:h-24 resize-none text-base xs:text-sm'
							rows={4}
						/>
					</div>
				</div>

				{/* Footer Buttons */}
				<div className='flex justify-end items-center gap-4 xs:gap-2 pt-4 xs:pt-2 border-t'>
					<button
						className='text-[#1BBFCA] border border-[#1BBFCA] px-4 xs:px-3 py-1 xs:py-0.5 rounded font-semibold text-base xs:text-sm hover:bg-[#1BBFCA] hover:text-white transition-colors'
						onClick={onClose}
						type='button'
					>
						Cancel
					</button>
					<button
						className='bg-[#1BBFCA] text-white px-4 xs:px-3 py-1 xs:py-0.5 rounded font-semibold text-base xs:text-sm hover:bg-[#159ba4] transition-colors'
						type='submit'
					>
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditNotes;
