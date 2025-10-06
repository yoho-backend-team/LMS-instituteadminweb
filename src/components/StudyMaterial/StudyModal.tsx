/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';
import cancel from '../../assets/icons/Cancel.png';

interface FormFieldOption {
	label: string;
	value: string;
}

interface FormField {
	label: string;
	key: string;
	type: 'input' | 'select';
	options?: FormFieldOption[];
}

interface NoteModalProps {
	isOpen: boolean;
	isEditing: boolean;
	formData: Record<string, string>;
	uploadedFile: File | null;
	uploadIcon: string;
	onClose: () => void;
	onSubmit: () => void;
	onFormChange: (key: string, value: string) => void;
	onFileChange: (file: File | null) => void;
	fields: FormField[];
	onReset: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
	isOpen,
	isEditing,
	formData,
	uploadedFile,
	uploadIcon,
	onClose,
	onSubmit,
	onFormChange,
	onFileChange,
	fields,
}) => {
	if (!isOpen) return null;

	const filteredFields = isEditing
		? fields.filter(
				(field) => field.key === 'title' || field.key === 'description'
		  )
		: fields;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-black/30 backdrop-blur-md text-[#716F6F]'>
			<div
				className='
      bg-white rounded-xl shadow-lg relative overflow-y-auto
      h-[90vh] w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]
      max-w-[800px]
      p-4 sm:p-6 md:p-8
      transition-all duration-300
    '
			>
				{/* Close Button */}
				<button
					className='absolute top-3 right-3 text-gray-600 hover:text-gray-900 p-1 rounded-full'
					onClick={onClose}
				>
					<img src={cancel} alt='close' className='w-5 h-5 sm:w-6 sm:h-6' />
				</button>

				{/* Header */}
				<h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 mt-1'>
					{isEditing ? 'Edit Study Material' : 'Add Study Material'}
				</h2>

				{/* File Upload / Preview */}
				<div className='mb-6'>
					{!uploadedFile ? (
						<div
							className='
            border border-dashed border-gray-300 rounded-md
            text-center py-6 sm:py-8
            cursor-pointer hover:border-[#1BBFCA] transition
          '
							onClick={() => document.getElementById('fileInput')?.click()}
						>
							<input
								id='fileInput'
								type='file'
								className='hidden'
								accept='.pdf,.doc,.docx'
								onChange={(e) => {
									const file = e.target.files?.[0];
									onFileChange(file || null);
								}}
							/>
							<img
								src={uploadIcon || '/placeholder.svg'}
								alt='upload'
								className='mx-auto mb-2 w-8 h-8 sm:w-10 sm:h-10'
							/>
							<p className='text-xs sm:text-sm text-gray-500'>
								Drop Files Here or Click to Upload
							</p>
						</div>
					) : (
						<div className='relative border p-3 sm:p-4 rounded-md'>
							<button
								type='button'
								onClick={() => onFileChange(null)}
								className='absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600'
							>
								<img
									src={cancel}
									alt='remove file'
									className='w-3 h-3 sm:w-4 sm:h-4'
								/>
							</button>

							{uploadedFile.type === 'application/pdf' ? (
								<iframe
									src={URL.createObjectURL(uploadedFile)}
									className='w-full h-48 sm:h-56 md:h-64 border rounded-md'
									title='PDF Preview'
								/>
							) : uploadedFile?.type?.includes('word') ? (
								<div className='text-sm text-blue-600'>
									DOC/DOCX file selected. Preview not supported.
								</div>
							) : (
								<div className='text-sm'>Unknown file type.</div>
							)}
							<p className='mt-2 text-sm text-green-600 break-words'>
								{uploadedFile.name}
							</p>
						</div>
					)}
				</div>

				{/* Form Fields */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{filteredFields.map((field) => (
						<div key={field.key}>
							<label className='block mb-1 text-sm text-gray-600'>
								{field.label}
							</label>
							{field.type === 'select' ? (
								<div className='relative'>
									<select
										className='
                  appearance-none w-full border border-gray-300 rounded-md
                  px-3 py-2 pr-10 text-gray-700
                  focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]
                  text-sm sm:text-base
                '
										value={formData[field.key] || ''}
										onChange={(e) => onFormChange(field.key, e.target.value)}
									>
										<option value=''>Select {field.label}</option>
										{field.options?.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
									<div className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500'>
										<svg
											className='w-4 h-4'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</div>
								</div>
							) : (
								<input
									type='text'
									className='
                w-full border border-gray-300 rounded-md
                px-3 py-2 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]
              '
									value={formData[field.key] || ''}
									onChange={(e) => onFormChange(field.key, e.target.value)}
								/>
							)}
						</div>
					))}
				</div>

				{/* Action Buttons */}
				<div className='mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
					<button
						onClick={onClose}
						className='
          border border-gray-300 bg-[#1BBFCA]/10 text-[#1BBFCA]
          px-4 py-2 rounded-md text-sm sm:text-base
          hover:bg-[#1BBFCA]/20 transition
        '
					>
						Cancel
					</button>
					<button
						onClick={onSubmit}
						className='
          bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm sm:text-base
          hover:bg-[#17aab5] transition
        '
					>
						{isEditing ? 'Update' : 'Submit'}
					</button>
				</div>
			</div>
		</div>
	);
};
