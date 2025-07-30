import React from 'react';
import { X } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS, FONTS } from '../../constants/uiConstants';
import { Button } from '../ui/button';

interface EditBatchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface FormValues {
	batchName: string;
	startDate: string;
	endDate: string;
}

const EditBatchModal: React.FC<EditBatchModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const selectedStudents = ['Elon Muck', 'John William'];

	const formik = useFormik<FormValues>({
		initialValues: {
			batchName: '',
			startDate: '',
			endDate: '',
		},
		validationSchema: Yup.object({
			batchName: Yup.string().required('Batch Name is required'),
			startDate: Yup.string().required('Start Date is required'),
			endDate: Yup.string()
				.required('End Date is required')
				.test(
					'is-after-start',
					'End Date must be after Start Date',
					function (value: any) {
						return (
							!value || !this.parent.startDate || value >= this.parent.startDate
						);
					}
				),
		}),
		onSubmit: (values) => {
			console.log('Form Data', values);
			onClose();
		},
	});

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
			<div className='bg-white w-full max-w-2xl rounded-2xl shadow-lg'>
				<div className='bg-[#1BBFCA] text-white rounded-t-xl py-3 px-6'>
					<h2 className='text-center' style={{ ...FONTS.heading_04_bold }}>
						Edit Batch
					</h2>
				</div>

				<form onSubmit={formik.handleSubmit} className='mt-6 px-6 space-y-4'>
					{/* Batch Name */}
					<div>
						<label
							className='block mb-1'
							style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
						>
							Batch Name
						</label>
						<input
							type='text'
							name='batchName'
							value={formik.values.batchName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className='w-full border rounded-md px-4 py-2'
							placeholder='Enter Batch Name'
						/>
						{formik.touched.batchName && formik.errors.batchName && (
							<p className='text-[#1BBFCA] text-sm mt-1'>
								{formik.errors.batchName}
							</p>
						)}
					</div>

					{/* Dates */}
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='flex-1'>
							<label
								className='block mb-1'
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								Start Date
							</label>
							<input
								type='date'
								name='startDate'
								value={formik.values.startDate}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className='w-full border rounded-md px-4 py-2'
							/>
							{formik.touched.startDate && formik.errors.startDate && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.startDate}
								</p>
							)}
						</div>

						<div className='flex-1'>
							<label
								className='block mb-1'
								style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
							>
								End Date
							</label>
							<input
								type='date'
								name='endDate'
								value={formik.values.endDate}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className='w-full border rounded-md px-4 py-2'
							/>
							{formik.touched.endDate && formik.errors.endDate && (
								<p className='text-[#1BBFCA] text-sm mt-1'>
									{formik.errors.endDate}
								</p>
							)}
						</div>
					</div>

					{/* Students Display */}
					<div>
						<label
							className='block mb-1'
							style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
						>
							Students
						</label>
						<div className='w-full border rounded-md px-4 py-2 flex flex-wrap gap-2 min-h-[44px]'>
							{selectedStudents.map((student, idx) => (
								<div
									key={idx}
									className='flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full'
								>
									{student}
									<X className='w-4 h-4 cursor-pointer text-green-700 hover:text-red-600' />
								</div>
							))}
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex justify-end items-center gap-4 mt-6 mb-8'>
						<Button
							type='button'
							onClick={onClose}
							variant='outline'
							className='!border-[#1BBFCA] bg-[#1bbeca15] !text-[#1BBFCA]'
							style={{ ...FONTS.heading_07_bold }}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							className='bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]'
							style={{ ...FONTS.heading_07_bold }}
						>
							Update
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditBatchModal;
