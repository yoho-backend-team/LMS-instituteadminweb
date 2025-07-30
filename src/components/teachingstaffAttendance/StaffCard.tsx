import React from 'react'
import profile from '../../assets/Ellipse 18.png'
import { useNavigate } from 'react-router-dom'

const StaffCard: React.FC = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-between w-[406px] h-[310px] rounded-md p-4 gap-2 shadow-[0px_4px_24px_0px_#00000026]">
            <div className="flex flex-row items-center w-full h-[62px] gap-5">
                <img src={profile} alt="" className='w-15 h-15 rounded-[50%]' />
                <div className="flex flex-col">
                    <p className='text-[#716F6F] font-semibold text-[20px]'>Elon Musk</p>
                    <p className='text-[#716F6F] font-light text-[16px]'>Email: Musk@gmail.com</p>
                </div>
            </div>
            <div className="text-center text-[#716F6F] text-[24px] font-semibold">
                ID:46
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center p-2 gap-1 text-center border-2 border-solid [border-image-source:linear-gradient(121.71deg,_#3ABE65_0%,_#FFFFFF_51.75%,_#3ABE65_99.66%)] [border-image-slice:1]  [border-radius:12px]">
                    <p className='text-[#3ABE65] font-semibold text-[24px]'>12</p>
                    <p className='text-[#3ABE65] font-semibold text-[18px]'>Present</p>
                </div>
                <div className="flex flex-col justify-center p-2 gap-1 text-center border-2 border-solid [border-image-source:linear-gradient(121.71deg,_#1BBFCA_0%,_#FFFFFF_51.75%,_#1BBFCA_99.66%)] [border-image-slice:1]  [border-radius:12px]">
                    <p className='text-[#1BBFCA] font-semibold text-[24px]'>2</p>
                    <p className='text-[#1BBFCA] font-semibold text-[18px]'>Absent</p>
                </div>
            </div>
            <div
                onClick={() => navigate('/staffs-attendance/view/1')}
                className="w-full bg-[#3ABE65] text-white p-4 text-[16px] font-medium text-center rounded-md cursor-pointer"
            >
                View Attendance
            </div>
        </div>
    )
}

export default StaffCard