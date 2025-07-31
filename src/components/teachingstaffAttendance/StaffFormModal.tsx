import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashCalender from '../ui/calendarDash';
import type { StaffsAttendanceType } from '../../pages/Attendance Management/Staffs Attendance/StaffsAttendance';
import { GetImageUrl } from '../../utils/helper';

interface formtype {
    setOpen: (data: boolean) => void;
    isOpen: boolean;
    data: StaffsAttendanceType;
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

const StaffFormModal: React.FC<formtype> = ({ setOpen, isOpen, data }) => {

    const [FormData, setFormData] = useState({
        status: '',
        staff: '',
        date: ''
    });

    const [currentMonth, setcurrentMonth] = useState(0);
    const [currentYear, setcurrentYear] = useState(0);
    const [currentDate, setcurrentDate] = useState(0);


    const handelsubmit = () => {
        const date = new Date(currentYear, currentMonth, currentDate, 12).toISOString()
        FormData.date = date.split('T')[0]
        FormData.staff = data.staff
        console.log(FormData)
    }

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
                        className="fixed top-4 right-5 h-[880px] w-full max-w-md bg-white shadow-xl p-6 rounded-lg"
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
                            <img src={GetImageUrl(data?.img) ?? undefined} alt="" className='w-24 h-24 rounded-[50%]' />
                            <p className='text-[#716F6F] font-semibold text-[20px]'>{data?.staff_name}</p>
                            <p className='text-[#716F6F] font-light text-[16px]'>Email: {data?.email}</p>

                        </div>

                        <form className="flex flex-col gap-4 mt-24">
                            <div className='flex flex-col gap-2'>
                                <p className='text-[#716F6F]'>Attendance</p>
                                <select
                                    onChange={(e) => setFormData({ ...FormData, status: e.target.value })}
                                    className='border-2 w-full border-[#716F6F] text-[#716F6F] rounded-md p-2'
                                >
                                    <option value="">view all</option>
                                    <option value="present">present</option>
                                    <option value="absent">absent</option>
                                </select>
                            </div>

                            <div>
                                <p className='text-[#716F6F]'>Attendance Date</p>
                                <DashCalender setMonth={setcurrentMonth} setYear={setcurrentYear} setDate={setcurrentDate} />
                            </div>

                            <div className='flex flex-row justify-end mt-15 gap-5'>
                                <div
                                    className="bg-[#1BBFCA1A] w-[98px] text-[#1BBFCA] py-2 px-2 text-center rounded-md border-2 border-[#1BBFCA] hover:bg-[#1BBFCA] hover:text-white"
                                >
                                    Reset
                                </div>
                                <div
                                    onClick={handelsubmit}
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
