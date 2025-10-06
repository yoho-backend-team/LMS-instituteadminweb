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
			<DialogOverlay className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50' />
			<DialogContent className='fixed left-16/18 top-11/15 md:left-12/18 lg:left-10/18 lg:top-9/15 sm:left-12/16 -translate-x-1/2 -translate-y-1/2 bg-white p-4 xs:p-5 sm:p-6 rounded-lg shadow-xl w-[90vw] max-w-xs xs:max-w-sm sm:max-w-md mx-auto z-50'>
				<div className='text-center space-y-4 sm:space-y-5'>
					{step === 'statusConfirm' && (
						<>
							<img
								src={warning}
								className='mx-auto w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18'
								alt='Warning'
							/>
							<h2
								style={{ ...FONTS.heading_03 }}
								className='text-lg xs:text-xl sm:text-2xl'
							>
								Confirm Action
							</h2>
							<p
								style={{ ...FONTS.heading_05, color: COLORS.gray_dark_01 }}
								className='text-sm xs:text-base sm:text-lg'
							>
								Are you sure you want to change the status?
							</p>
							<div className='flex flex-row xs:flex-row justify-center gap-3 xs:gap-4 sm:gap-4'>
								<Button
									className='bg-[#1bbfca] hover:bg-[#1bbfca] xs:w-auto px-4 xs:px-6 py-2 xs:py-2.5 w-[100px]'
									onClick={handleStatusConfirm}
									style={{ ...FONTS.heading_07, color: COLORS.white }}
								>
									Yes, Status
								</Button>
								<Button
									variant='outline'
									onClick={handleCancel}
									style={{ ...FONTS.heading_07 }}
									className='border border-[#1bbfca] !text-[#1bbfca] bg-[#1bbeca15] hover:bg-blue-50 xs:w-auto px-4 xs:px-6 py-2 xs:py-2.5 w-[100px] sm:w-[120px] xs:w-[60px]'
								>
									Cancel
								</Button>
							</div>
						</>
					)}

					{step === 'deleteConfirm' && (
						<>
							<img
								src={warning}
								className='mx-auto w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18'
								alt='Warning'
							/>
							<h2
								style={{ ...FONTS.heading_03 }}
								className='text-lg xs:text-xl sm:text-2xl'
							>
								Final Confirmation
							</h2>
							<p
								style={{ ...FONTS.heading_05, color: COLORS.gray_dark_01 }}
								className='text-sm xs:text-base sm:text-lg'
							>
								Are you sure you want to delete this batch?
							</p>
							<div className='flex flex-row xs:flex-row justify-center gap-3 xs:gap-4 sm:gap-4'>
								<Button
									className='bg-red-600 hover:bg-red-700 xs:w-auto px-4 xs:px-6 py-2 xs:py-2.5 md:w-[200px] w-[100px]'
									onClick={handleFinalDelete}
									style={{ ...FONTS.heading_07, color: COLORS.white }}
								>
									Yes, Delete
								</Button>
								<Button
									variant='outline'
									onClick={handleCancel}
									style={{ ...FONTS.heading_07 }}
									className='border border-[#1bbfca] !text-[#1bbfca] bg-[#1bbeca15] hover:bg-blue-50 xs:w-auto px-4 xs:px-6 py-2 xs:py-2.5 md:w-[200px] w-[100px]'
								>
									Cancel
								</Button>
							</div>
						</>
					)}

					{step === 'success' && (
						<>
							<img
								src={tick}
								className='mx-auto w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18'
								alt='Success'
							/>
							<h2
								style={{ ...FONTS.heading_03 }}
								className='text-lg xs:text-xl sm:text-2xl'
							>
								Success!
							</h2>
							<div className='flex justify-center'>
								<Button
									className='bg-green-600 hover:bg-green-700 px-6 xs:px-8 py-2 xs:py-2.5'
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
