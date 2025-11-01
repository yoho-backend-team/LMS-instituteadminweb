/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllCategoriesThunk } from '../../../features/Course mangement/categories/reducers/thunks';
import { selectCategories } from '../../../features/Course mangement/categories/reducers/slice';
import { GetImageUrl } from '../../../utils/helper';
import {
	CreateCategories,
	deleteCategories,
	UpdateCategories,
} from '../../../features/Course mangement/categories/service';
import { GetLocalStorage } from '../../../utils/localStorage';

type CardProps = {
	category_name: string;
	image: string;
	is_active: boolean;
	onStatusChange: (uuid: string, newStatus: 'Active' | 'Inactive') => void;
	onEdit: () => void;
	onDelete: () => void;
	uuid: string;
};

const Card: React.FC<CardProps> = ({
	category_name,
	image,
	is_active,
	uuid,
	onStatusChange,
	onEdit,
	onDelete,
}) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className='bg-white rounded-lg shadow-md relative'>
			<img
				src={GetImageUrl(image) ?? undefined}
				alt={category_name}
				className='w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 object-cover rounded-t-lg'
			/>
			<div className='p-3 sm:p-4'>
				<div className='flex justify-between items-start'>
					<h3 className='text-base sm:text-lg font-semibold text-[#1BBFCA] break-words pr-2'>
						{category_name}
					</h3>
					<div className='relative flex-shrink-0'>
						<button
							onClick={() => setShowMenu(!showMenu)}
							className='p-1 text-[#1BBFCA] hover:text-[#1BBFCA]'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
							</svg>
						</button>

						{showMenu && (
							<div className='absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-10'>
								<div className='py-1'>
									<button
										onClick={() => {
											onEdit();
											setShowMenu(false);
										}}
										className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full text-left'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-4 w-4 mr-2'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
											/>
										</svg>
										Edit
									</button>
									<button
										onClick={() => {
											onDelete();
											setShowMenu(false);
										}}
										className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full text-left'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-4 w-4 mr-2'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
											/>
										</svg>
										Delete
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
				<select
					value={is_active ? 'Active' : 'Inactive'}
					onChange={(e) =>
						onStatusChange(uuid, e.target.value as 'Active' | 'Inactive')
					}
					className='mt-2 w-full sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px] 
             border border-gray-300 rounded px-3 py-2 text-sm 
             sm:text-sm md:text-base lg:text-base xl:text-lg'
				>
					<option value='Active'>Active</option>
					<option value='Inactive'>Inactive</option>
				</select>
			</div>
		</div>
	);
};

export const DashboardCards: React.FC = () => {
	const [categories, setCategories] = useState<any>([]);
	const [showFilter, setShowFilter] = useState(false);
	const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [categoryName, setCategoryName] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [editingCategory, setEditingCategory] = useState<null | {
		category_name: string;
		uuid: string;
		image: string;
	}>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isLoad, setisLoad] = useState(true);
	const [selecteduuid, setSelecteduuid] = useState<string | null>(null);
	const [isDragOver, setIsDragOver] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [statusFilter, setStatusFilter] = useState('');
	const [uploadError, setUploadError] = useState<string | null>(null);

	const dispatch = useDispatch();
	const instituteId = GetLocalStorage('instituteId');
	const branchId = GetLocalStorage('selectedBranchId');
	const page = 1;

	const categoriess = useSelector(selectCategories);

	useEffect(() => {
		dispatch(
			getAllCategoriesThunk({
				institute_id: instituteId,
				branch_id: branchId,
				page,
			}) as any
		);
	}, [dispatch, instituteId, branchId, page]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setisLoad(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	const handleStatusChange = async (
		uuid: string,
		newStatus: 'Active' | 'Inactive'
	) => {
		try {
			const payload = {
				id: uuid,
				is_active: newStatus === 'Active',
			};

			await UpdateCategories(payload);

			setCategories((prevCategories: any[]) =>
				prevCategories.map((cat) =>
					cat.uuid === uuid ? { ...cat, is_active: payload.is_active } : cat
				)
			);

			console.log(`Status updated successfully for category ${uuid}`);
		} catch (error) {
			console.error('Failed to update status:', error);
			alert('Failed to update status. Please try again.');
		}
	};

	// Validate file type
	const isValidImageType = (file: File): boolean => {
		const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
		return allowedTypes.includes(file.type);
	};

	// Validate file size (max 5MB)
	const isValidFileSize = (file: File): boolean => {
		const maxSize = 5 * 1024 * 1024; // 5MB in bytes
		return file.size <= maxSize;
	};

	const handleImageUpload = async (file: File) => {
		if (!file) return;

		// Reset previous error
		setUploadError(null);

		// Validate file type
		if (!isValidImageType(file)) {
			setUploadError(
				'Please upload only PNG or JPEG images. GIF files are not allowed.'
			);
			// Clear the file input
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
			return;
		}

		// Validate file size
		if (!isValidFileSize(file)) {
			setUploadError('File size should be less than 5MB.');
			// Clear the file input
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
			return;
		}

		setIsUploading(true);
		const formData = new FormData();
		formData.append('file', file);

		try {
			const uploadRes = await fetch(
				'https://lms-node-backend-v1.onrender.com/api/upload',
				{
					method: 'POST',
					body: formData,
				}
			);

			const response = await uploadRes.json();
			console.log(response, 'upload img');

			if (response) {
				setSelectedImage(response.data.file);
			} else {
				console.error('Upload response missing path:', response.data.file);
				setUploadError('Upload failed. Please try again.');
			}
		} catch (err) {
			console.error('Upload failed', err);
			setUploadError('Upload failed. Please try again.');
		} finally {
			setIsUploading(false);
		}
	};

	const handleFileInputChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (file) {
			setUploadedFileName(file.name);
			await handleImageUpload(file);
		}
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);
		setUploadError(null);

		const file = e.dataTransfer.files[0];
		if (file) {
			await handleImageUpload(file);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const triggerFileInput = () => {
		setUploadError(null);
		fileInputRef.current?.click();
	};

	const handleAddCategory = async () => {
		if (!categoryName.trim()) {
			setUploadError('Please provide a category name.');
			return;
		}

		if (!selectedImage) {
			setUploadError('Please select an image.');
			return;
		}

		try {
			const payload = {
				category_name: categoryName,
				image: selectedImage,
			};

			const createdCategory = await CreateCategories(payload);

			setCategories([
				...categories,
				{
					category_name: createdCategory.category_name,
					image: createdCategory.image,
					is_active: true,
					uuid: createdCategory.uuid,
				},
			]);

			setShowAddCategoryModal(false);
			setCategoryName('');
			setSelectedImage(null);
			setUploadError(null);
		} catch (err) {
			console.error('Error creating category', err);
			setUploadError('Failed to create category. Please try again.');
		}
	};

	const handleEditCategory = (cat: any) => {
		setEditingCategory({
			category_name: cat?.category_name,
			uuid: cat?.uuid,
			image: cat?.image,
		});
		setCategoryName(cat?.category_name);
		setSelectedImage(cat?.image ?? null);
		setSelecteduuid(cat?.uuid);
		setShowEditModal(true);
		setUploadError(null);
		console.log('✏️ Category Edited:', editingCategory);
	};

	const handleUpdateCategory = async () => {
		if (!categoryName.trim()) {
			setUploadError('Please provide a category name.');
			return;
		}

		if (!editingCategory) return;

		const payload = {
			id: selecteduuid,
			category_name: categoryName,
			image: selectedImage || editingCategory.image,
		};

		try {
			const updatedCategory = await UpdateCategories(payload);

			console.log(updatedCategory, 'updated');

			setCategories((prevCategories: any[]) =>
				prevCategories.map((cat) =>
					cat.uuid === selecteduuid
						? {
								...cat,
								category_name: updatedCategory.category_name,
								image: updatedCategory.image,
						  }
						: cat
				)
			);

			setShowEditModal(false);
			setCategoryName('');
			setSelectedImage(null);
			setEditingCategory(null);
			setSelecteduuid(null);
			setUploadError(null);
		} catch (error) {
			console.error('Error updating category:', error);
			setUploadError('Failed to update category. Please try again.');
		}
	};

	const handleDeleteCategory = async (uuid: string) => {
		try {
			await deleteCategories(instituteId, uuid);
			setCategories((prev: any) =>
				prev.filter((cat: any) => cat.uuid !== uuid)
			);
		} catch (error) {
			console.error('Error deleting category:', error);
			alert('Failed to delete category. Please try again.');
		}
	};

	const filteredCategories = categories?.filter((cat: any) => {
		const matchesSearch = cat.category_name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		const matchesStatus =
			statusFilter === ''
				? true
				: statusFilter === 'Active'
				? cat.is_active === true
				: cat.is_active === false;

		return matchesSearch && matchesStatus;
	});

	useEffect(() => {
		setCategories(categoriess);
	}, [categoriess]);

	const ImageUploadComponent = ({
		currentImage,
	}: {
		currentImage?: string;
	}) => (
		<div className='mb-6'>
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileInputChange}
				accept='.png,.jpg,.jpeg,image/png,image/jpg,image/jpeg'
				className='hidden'
			/>

			{/* Error Message */}
			{uploadError && (
				<div className='mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm'>
					{uploadError}
				</div>
			)}

			<div
				className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
					isDragOver ? 'border-[#1BBFCA] bg-blue-50' : 'border-gray-300'
				} ${uploadError ? 'border-red-400' : ''}`}
				onClick={triggerFileInput}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
			>
				{isUploading ? (
					<div className='flex flex-col items-center'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#1BBFCA] mb-2'></div>
						<p className='text-sm sm:text-base'>Uploading...</p>
					</div>
				) : selectedImage ? (
					<div className='flex flex-col items-center'>
						<img
							src={selectedImage}
							alt='Preview'
							className='h-24 w-24 sm:h-32 sm:w-32 mx-auto object-cover rounded-lg shadow-md mb-2'
						/>
						<p className='text-sm text-green-600'>
							✓ Image uploaded successfully
						</p>
						<p className='text-xs text-gray-500 mt-1'>Click to change image</p>
					</div>
				) : currentImage ? (
					<div className='flex flex-col items-center'>
						<img
							src={currentImage}
							alt='Current'
							className='h-24 w-24 sm:h-32 sm:w-32 mx-auto object-cover rounded-lg shadow-md mb-2'
						/>
						<p className='text-sm text-gray-600'>Current image</p>
						<p className='text-xs text-gray-500 mt-1'>Click to change image</p>
					</div>
				) : (
					<div className='flex flex-col items-center'>
						<svg
							className='w-12 h-12 text-gray-400 mb-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
							/>
						</svg>
						<p className='text-sm sm:text-base mb-1'>
							Drag & drop your image or click to browse
						</p>
						<p className='text-xs text-gray-500'>
							Supported formats: PNG, JPEG (Max 5MB)
						</p>
					</div>
				)}
			</div>

			{/* File name and URL display */}
			{(selectedImage || currentImage) && (
				<div className='mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Image Information:
					</label>

					<div className='space-y-3'>
						{/* File Name Display */}
						{uploadedFileName && (
							<div>
								<span className='text-xs font-medium text-gray-600'>
									File Name:
								</span>
								<div className='mt-1 p-2 bg-white border border-gray-300 rounded'>
									<p className='text-sm text-gray-900 break-all'>
										{uploadedFileName}
									</p>
								</div>
							</div>
						)}

						{/* Image URL Display */}
						<div>
							<span className='text-xs font-medium text-gray-600'>
								Image URL:
							</span>
							<div className='flex flex-col sm:flex-row gap-2 mt-1'>
								<div className='flex-1 p-2 bg-white border border-gray-300 rounded'>
									<p className='text-sm text-gray-900 break-all'>
										{selectedImage || currentImage || 'No image URL available'}
									</p>
								</div>
								<button
									type='button'
									onClick={() => {
										navigator.clipboard.writeText(
											selectedImage || currentImage || ''
										);
										alert('Image URL copied to clipboard!');
									}}
									className='px-3 py-2 text-xs bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA] transition-colors whitespace-nowrap'
								>
									Copy URL
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Placeholder when no image is selected */}
			{!selectedImage && !currentImage && (
				<div className='mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
					<div className='flex items-center gap-2'>
						<svg
							className='h-4 w-4 text-yellow-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
							/>
						</svg>
						<p className='text-sm text-yellow-700'>
							No image selected. Please upload an image for the category.
						</p>
					</div>
				</div>
			)}
		</div>
	);

	return (
		<div className='p-3 sm:p-4 md:p-6'>
			{showAddCategoryModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white p-4 sm:p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
						<h2 className='text-lg sm:text-xl font-semibold mb-4 sm:mb-6'>
							Add Category
						</h2>

						<ImageUploadComponent />

						<div className='mb-4 sm:mb-6'>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Category Name
							</label>
							<input
								type='text'
								value={categoryName}
								onChange={(e) => {
									const value = e.target.value;
									// Allow only letters and spaces
									if (/^[A-Za-z\s]*$/.test(value)) {
										setCategoryName(value);
									}
								}}
								className='w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base'
								placeholder='Enter category name'
							/>
						</div>

						<div className='flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3'>
							<button
								onClick={() => {
									setShowAddCategoryModal(false);
									setSelectedImage(null);
									setUploadError(null);
								}}
								className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm sm:text-base'
							>
								Cancel
							</button>
							<button
								onClick={handleAddCategory}
								disabled={isUploading || !selectedImage}
								className='w-full sm:w-auto px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'
							>
								{isUploading ? 'Uploading...' : 'Save Changes'}
							</button>
						</div>
					</div>
				</div>
			)}

			{showEditModal && editingCategory && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white p-4 sm:p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
						<h2 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-4'>
							Edit Category
						</h2>
						<p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6'>
							Edit Course Category Details
						</p>

						<div className='mb-4'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Category Name
							</label>
							<input
								type='text'
								value={categoryName}
								onChange={(e) => setCategoryName(e.target.value)}
								className='w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base'
								placeholder='Enter category name'
							/>
						</div>

						<ImageUploadComponent currentImage={editingCategory.image} />

						<p className='text-xs text-gray-500 mb-4'>
							Recommended: 388x300 Pixels
							<br />
							Accepted Formats: PNG, JPG, JPEG (Max 5MB)
						</p>

						<div className='flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3'>
							<button
								onClick={() => {
									setShowEditModal(false);
									setSelectedImage(null);
									setSelecteduuid(null);
									setUploadError(null);
								}}
								className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm sm:text-base'
							>
								Cancel
							</button>
							<button
								onClick={handleUpdateCategory}
								disabled={isUploading}
								className='w-full sm:w-auto px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'
							>
								{isUploading ? 'Uploading...' : 'Update Category'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Rest of your existing JSX remains the same */}
			<div className='flex flex-col mb-4 sm:mb-6'>
				<h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4'>
					Course Category
				</h2>
				<div className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3'>
					<button
						className='px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA] text-sm sm:text-base min-w-[120px]'
						onClick={() => setShowFilter(!showFilter)}
					>
						{showFilter ? 'Hide' : 'Show Filter'}
					</button>
					<button
						className='px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA] flex items-center justify-center text-sm sm:text-base min-w-[160px]'
						onClick={() => setShowAddCategoryModal(true)}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 mr-2'
							viewBox='0 0 20 20'
							fill='currentColor'
						>
							<path
								fillRule='evenodd'
								d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
								clipRule='evenodd'
							/>
						</svg>
						Add New Category
					</button>
				</div>
			</div>

			{showFilter && (
				<div>
					<div className='mb-4'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search Categories...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] text-sm'
							/>
							<svg
								className='absolute left-3 top-3 h-4 w-4 text-gray-400'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</div>
					</div>
					<div className='bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6'>
						<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6'>
							<div className='flex-1 min-w-0'>
								<label className='block text-sm font-semibold text-gray-700 mb-1'>
									Status
								</label>
								<select
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
									className='w-full border border-gray-300 rounded px-3 py-2 text-sm'
								>
									<option value=''>Filter by status</option>
									<option value='Active'>Active</option>
									<option value='Inactive'>Inactive</option>
								</select>
							</div>
							<div className='flex-1 min-w-0'>
								<label className='block text-sm font-semibold text-gray-700 mb-1'>
									Filter by Course
								</label>
								<select className='w-full border border-gray-300 rounded px-3 py-2 text-sm'>
									<option value=''>Filter by course</option>
									<option value='Web Development'>Web Development</option>
									<option value='MERN Stack Development'>
										MERN Stack Development
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			)}

			{isLoad && (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6'>
					{Array(8)
						.fill(null)
						.map((_, index) => (
							<ContentLoader
								speed={1}
								width='100%'
								height='100%'
								viewBox='0 0 390 330'
								backgroundColor='#f3f3f3'
								foregroundColor='#ecebeb'
								className='w-full h-[280px] sm:h-[300px] md:h-[310px] rounded-lg'
								key={index}
							>
								<rect x='0' y='0' rx='10' ry='10' width='400' height='200' />
								<rect x='0' y='220' rx='8' ry='8' width='60%' height='20' />
								<rect x='0' y='250' rx='8' ry='8' width='100%' height='28' />
								<rect x='0' y='290' rx='8' ry='8' width='30%' height='58' />
							</ContentLoader>
						))}
				</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6'>
				{!isLoad &&
					filteredCategories?.map((cat: any, index: any) => (
						<Card
							key={cat.uuid || index}
							uuid={cat.uuid}
							category_name={cat.category_name}
							image={cat.image}
							is_active={cat.is_active}
							onStatusChange={handleStatusChange}
							onEdit={() => handleEditCategory(cat)}
							onDelete={() => handleDeleteCategory(cat.uuid)}
						/>
					))}
			</div>
		</div>
	);
};

export default DashboardCards;
