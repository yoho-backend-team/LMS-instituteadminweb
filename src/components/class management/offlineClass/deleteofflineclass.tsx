import { useState } from 'react';

import tick from '../../../assets/tick.png';
import warning from '../../../assets/warning.png';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { FONTS } from '../../../constants/uiConstants';
import { Button } from '../../ui/button';

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
            <DialogContent className='max-w-sm text-center p-0 space-y-2'>
                {step === 'statusConfirm' && (
                    <>
                        <img src={warning} className='text-yellow-500 mx-auto' />
                        <h2 style={{ ...FONTS.heading_03 }}>Confirm Action</h2>
                        <p style={{ ...FONTS.heading_03 }}>
                            Are you sure you want to change the status?
                        </p>
                        <div className='flex justify-center gap-4'>
                            <Button
                                className='bg-[#1bbfca] hover:bg-[#1bbfca]'
                                onClick={handleStatusConfirm}
                            >
                                Yes, Status
                            </Button>
                            <Button
                                variant='outline'
                                onClick={handleCancel}
                                className='border border-[#1bbfca] !text-[#1bbfca] bg-[#1bbeca15] px-4 py-2 rounded-md hover:bg-blue-50'
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                )}

                {step === 'deleteConfirm' && (
                    <>
                        <img src={warning} className='text-red-500 mx-auto' />
                        <h2 style={{ ...FONTS.heading_03 }}>Final Confirmation</h2>
                        <p style={{ ...FONTS.heading_03 }}>
                            Are you sure you want to delete this FAQ category?
                        </p>
                        <div className='flex justify-center gap-4 '>
                            <Button
                                className='bg-green-600 hover:bg-green-600'
                                onClick={handleFinalDelete}
                            >
                                Yes, Delete
                            </Button>
                            <Button
                                variant='outline'
                                onClick={handleCancel}
                                className='border border-[#1bbfca] !text-[#1bbfca] bg-[#1bbeca15] px-4 py-2 rounded-md hover:bg-blue-50'
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                )}

                {step === 'success' && (
                    <>
                        <img src={tick} className='text-green-500 mx-auto' />
                        <h2 style={{ ...FONTS.heading_03 }}>Success!</h2>
                        <div>
                            <Button className='bg-green-600 px-8 hover:bg-green-600'>
                                ok
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
