import { useState } from 'react';
import tick from '../../assets/tick.png';
import warning from '../../assets/warning.png';
import { Dialog, DialogContent, DialogOverlay } from '../ui/dialog';
import { COLORS, FONTS } from '../../constants/uiConstants';
import { Button } from '../ui/button';

interface DeleteConfirmationModalProps {
	open: boolean;
	onClose: () => void;
	onConfirmDelete: () => void;
}

const DeleteConfirmationModal = ({
	open,
	onClose,
	onConfirmDelete,
}: DeleteConfirmationModalProps) => {
	const [step, setStep] = useState<
		'statusConfirm' | 'deleteConfirm' | 'success'
	>('statusConfirm');

	const handleStatusConfirm = () => setStep('deleteConfirm');

	const handleFinalDelete = () => {
		setStep('success');
		setTimeout(() => {
			onConfirmDelete();
			onClose();
			setStep('statusConfirm');
		}, 1500);
	};

	const handleCancel = () => {
		onClose();
		setStep('statusConfirm');
	};

	return (
		<Dialog open={open} onOpenChange={handleCancel}>
			<DialogOverlay className='fixed inset-0 bg-black/50' />
			<DialogContent className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
				<div className='text-center space-y-4'>
					{step === 'statusConfirm' && (
						<>
							<img src={warning} className='mx-auto w-16 h-16' alt='Warning' />
							<h2 style={{ ...FONTS.heading_03 }}>Confirm Action</h2>
							<p style={{ ...FONTS.heading_05, color: COLORS.gray_dark_01 }}>
								Are you sure you want to change the status?
							</p>
							<div className='flex justify-center gap-4'>
								<Button
									className='bg-[#1bbfca] hover:bg-[#1bbfca]'
									onClick={handleStatusConfirm}
									style={{ ...FONTS.heading_07, color: COLORS.white }}
								>
									Yes, Status
								</Button>
								<Button
									variant='outline'
									onClick={handleCancel}
									style={{ ...FONTS.heading_07 }}
									className='border border-[#1bbfca] !text-[#1bbfca] bg-[#1bbeca15] hover:bg-blue-50'
								>
									Cancel
								</Button>
							</div>
						</>
					)}

					{step === 'deleteConfirm' && (
						<>
							<img src={warning} className='mx-auto w-16 h-16' alt='Warning' />
							<h2 style={{ ...FONTS.heading_03 }}>Final Confirmation</h2>
							<p style={{ ...FONTS.heading_05, color: COLORS.gray_dark_01 }}>
								Are you sure you want to delete this batch?
							</p>
							<div className='flex justify-center gap-4'>
								<Button
									className='bg-red-600 hover:bg-red-600'
									onClick={handleFinalDelete}
									style={{ ...FONTS.heading_07, color: COLORS.white }}
								>
									Yes, Delete
								</Button>
								<Button
									variant='outline'
									onClick={handleCancel}
									style={{ ...FONTS.heading_07 }}
									className='border border-[#1bbfca] !text-[#1bbfca] bg-[#1bbeca15] hover:bg-blue-50'
								>
									Cancel
								</Button>
							</div>
						</>
					)}

					{step === 'success' && (
						<>
							<img src={tick} className='mx-auto w-16 h-16' alt='Success' />
							<h2 style={{ ...FONTS.heading_03 }}>Success!</h2>
							<div>
								<Button
									className='bg-green-600 hover:bg-green-600'
									onClick={handleCancel}
									style={{ ...FONTS.heading_07, color: COLORS.white }}
								>
									OK
								</Button>
							</div>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
