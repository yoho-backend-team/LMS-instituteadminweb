import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashCalender from '../ui/calendarDash';
import profile from '../../assets/Ellipse 18.png'

interface formtype {
    setOpen: (data: boolean) => void;
    isOpen: boolean;
}

const backdropVariants = {
    visible: { opacity: 0.5 },
    hidden: { opacity: 0 },
};

const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
};

const StaffFormModal: React.FC<formtype> = ({ setOpen, isOpen }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={() => setOpen(false)}
                        style={{ zIndex: 50 }}
                    />

                    <motion.div
                        className="fixed top-20 right-5 h-[810px] w-full max-w-md bg-white shadow-xl p-6 rounded-lg"
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: 'tween', duration: 0.3 }}
                        style={{ zIndex: 51 }}
                    >

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Add Attendance</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:text-red-500 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex flex-col items-center w-full h-[62px] gap-1">
                            <img src={profile} alt="" className='w-24 h-24 rounded-[50%]' />
                            <p className='text-[#716F6F] font-semibold text-[20px]'>Elon Musk</p>
                            <p className='text-[#716F6F] font-light text-[16px]'>Email: Musk@gmail.com</p>

                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-24">
                            <div className='flex flex-col gap-2'>
                                <p className='text-[#716F6F]'>Attendance</p>
                                <select
                                    className='border-2 w-full border-[#716F6F] text-[#716F6F] rounded-md p-2'
                                >
                                    <option value="">view all</option>
                                    <option value="present">present</option>
                                    <option value="absent">absent</option>
                                </select>
                            </div>

                            <div>
                                <p className='text-[#716F6F]'>Attendance Date</p>
                                <DashCalender />
                            </div>

                            <div className='flex flex-row justify-end gap-5'>
                                <div
                                    className="bg-[#1BBFCA1A] w-[98px] text-[#1BBFCA] py-2 px-2 text-center rounded-md border-2 border-[#1BBFCA] hover:bg-[#1BBFCA] hover:text-white"
                                >
                                    Reset
                                </div>
                                <div
                                    className="bg-[#1BBFCA1A] w-[124px] text-[#1BBFCA] py-2 px-2 text-center rounded-md border-2 border-[#1BBFCA] hover:bg-[#1BBFCA] hover:text-white"
                                >
                                    Add
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StaffFormModal;
