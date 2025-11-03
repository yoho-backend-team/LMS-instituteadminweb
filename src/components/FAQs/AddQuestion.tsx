/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerClose,
} from '../../components/ui/drawer';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../components/ui/select';
import { X } from 'lucide-react';
import { CreateFaq } from '../../features/Faq/service';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { GetLocalStorage } from '../../utils/localStorage';
import { fetchFaqCategoryThunk } from '../../features/Faq_Category/thunks';
import toast from 'react-hot-toast';

export function AddFAQDrawer({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category1, setCategory1] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<{
		title?: string;
		description?: string;
		category1?: string;
	}>({});

	const category = useSelector((state: RootState) => state.faqCategory.data);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		(async () => {
			const params = {
				branchid: GetLocalStorage('selectedBranchId'),
				instituteid: GetLocalStorage('instituteId'),
			};
			dispatch(fetchFaqCategoryThunk(params));
		})();
	}, [dispatch]);

	useEffect(() => {
		if (!open) {
			// Reset form when drawer closes
			setTitle('');
			setDescription('');
			setCategory1('');
			setErrors({});
		}
	}, [open]);

	const validateForm = () => {
		const newErrors: {
			title?: string;
			description?: string;
			category1?: string;
		} = {};
		if (!title.trim()) newErrors.title = 'Title is required.';
		if (!description.trim()) newErrors.description = 'Description is required.';
		if (!category1) newErrors.category1 = 'Please select a category.';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		const payload = {
			title,
			description,
			category_id: category1,
			accessby: ['Teaching Staff'],
		};

		try {
			setLoading(true);
			await CreateFaq(payload);
			toast.success('FAQ added successfully');
			onOpenChange(false);
		} catch (err) {
			toast.error('Failed to create FAQ');
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		onOpenChange(false);
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange} direction='right'>
			<DrawerContent className='w-full max-w-md ml-auto p-6 bg-white shadow-lg border-l h-[90%] mt-10 rounded-xl'>
				<DrawerHeader className='flex items-left justify-between p-0 mb-6 relative'>
					<DrawerTitle className='text-lg font-semibold'>Add FAQ</DrawerTitle>
					<DrawerClose>
						<X className='w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 hover:text-black absolute top-0 right-0' />
					</DrawerClose>
				</DrawerHeader>

				<form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
					{/* Title */}
					<div className='flex flex-col'>
						<Label htmlFor='faq-title'>Title</Label>
						<Input
							id='faq-title'
							className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						{errors.title && (
							<span className='text-red-500 text-sm mt-1'>{errors.title}</span>
						)}
					</div>

					{/* Description */}
					<div className='flex flex-col'>
						<Label htmlFor='faq-description'>Description</Label>
						<Textarea
							id='faq-description'
							className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						{errors.description && (
							<span className='text-red-500 text-sm mt-1'>
								{errors.description}
							</span>
						)}
					</div>

					{/* Category */}
					<div className='flex flex-col'>
						<Label htmlFor='faq-category1'>Category</Label>
						<Select value={category1} onValueChange={setCategory1}>
							<SelectTrigger
								id='faq-category1'
								className={`mt-1 w-full ${
									errors.category1 ? 'border-red-500' : ''
								}`}
							>
								<SelectValue placeholder='Select category' />
							</SelectTrigger>
							<SelectContent className='bg-white'>
								{category?.map((item: any, index) => (
									<SelectItem key={index} value={item?._id}>
										{item?.category_name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.category1 && (
							<span className='text-red-500 text-sm mt-1'>
								{errors.category1}
							</span>
						)}
					</div>

					{/* Buttons */}
					<div className='flex justify-between mt-6'>
						<Button
							type='button'
							onClick={handleCancel}
							variant='outline'
							className='border-cyan-500 text-cyan-500 hover:bg-cyan-50 bg-transparent'
						>
							Cancel
						</Button>
						<Button
							type='submit'
							disabled={loading}
							className='bg-cyan-500 hover:bg-cyan-600 text-white'
						>
							{loading ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</form>
			</DrawerContent>
		</Drawer>
	);
}
