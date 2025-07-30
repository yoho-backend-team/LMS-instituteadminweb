import React, { useState } from 'react'
import profile from '../../assets/Ellipse 18.png'
import plus from '../../assets/plus.png'
import cals from '../../assets/Attendence management.png'
import filter from '../../assets/filter.png'
import DashCalender from '../ui/calendarDash'

interface formtype {
    setOpen: (data: boolean) => void;
    setMonth: (data: number) => void;
    setYear: (data: number) => void;
}

const StaffAddBar: React.FC<formtype> = ({ setOpen, setMonth, setYear }) => {

    const [callader, setcallader] = useState(false);
    const [filterDiv, setfilterDiv] = useState(false);

    return (
        <div className='flex flex-col w-full gap-5 p-2'>
            <div className='flex flex-row w-full justify-between items-center p-4 bg-white rounded-lg shadow-[0px_4px_24px_0px_#00000026]'>
                <div className="flex flex-row items-center w-full h-max gap-5">
                    <img src={profile} alt="" className='w-15 h-15 rounded-[50%]' />
                    <div className="flex flex-col">
                        <p className='text-[#716F6F] font-semibold text-[20px]'>Elon Musk</p>
                        <p className='text-[#716F6F] font-light text-[16px]'>Email: Musk@gmail.com</p>
                    </div>
                </div>

                <div
                    className="flex flex-row bg-[#3ABE65] w-[199px] h-min p-2 text-white rounded-md items-center gap-1 cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <img src={plus} alt="" className='w-5 h-5' />
                    <p className='font-medium text-[16px]'>Add Attendance</p>
                </div>
            </div>

            <div className="flex flex-row justify-between w-full">
                <div className="p-4 bg-[#1BBFCA] rounded-md cursor-pointer" onClick={() => setcallader(!callader)}>
                    <img src={cals} alt="" />
                </div>
                {
                    callader && <div className='absolute ml-15'><DashCalender setMonth={setMonth} setYear={setYear} setcals={setcallader} /></div>
                }
                <div
                    onClick={() => setfilterDiv(!filterDiv)}
                    className="flex flex-row p-4 bg-[#1BBFCA] rounded-md gap-1 cursor-pointer">
                    <img src={filter} alt="" />
                    <p className='text-white text-[16px] font-medium'>Filters</p>
                </div>
                {
                    filterDiv && <div className="absolute flex flex-col rounded-lg p-4 gap-5 bg-white right-9 mt-15 **:p-2 **:cursor-pointer shadow-[0px_4px_24px_0px_#00000026]">
                        <div className="border-[#716F6F] border-2 text-[#716F6F] text-[16px] font-medium hover:text-white hover:bg-[#1BBFCA] hover:border-[#1BBFCA] rounded-md">View All</div>
                        <div className="border-[#716F6F] border-2 text-[#716F6F] text-[16px] font-medium hover:text-white hover:bg-[#1BBFCA] hover:border-[#1BBFCA] rounded-md">Present</div>
                        <div className="border-[#716F6F] border-2 text-[#716F6F] text-[16px] font-medium hover:text-white hover:bg-[#1BBFCA] hover:border-[#1BBFCA] rounded-md">Absent</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default StaffAddBar