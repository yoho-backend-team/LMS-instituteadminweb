import { TbCalendarTime, TbClockHour7Filled } from "react-icons/tb"
import { COLORS, FONTS } from "../../../../constants/uiConstants"
import { FaClock } from "react-icons/fa"
import StudentDetails from "./StudentDetails"
import { useNavigate } from "react-router-dom"

const StudentCard = () => {
    const navigate = useNavigate();

    const handleStudentAttendanceDetails = () =>{
        try {
            navigate('/students-attendance/details')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <div className="flex gap-[30px] mt-5">
            <div className="border w-[406px] h-[307px] rounded-[12px] p-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)] grid gap-[20px]">
                <div className="w-full">
                    <h3 className={`text-[${COLORS.gray_dark_02}] font-semibold `} style={{...FONTS.heading_04}}>Where begins the web history Class</h3>
                </div>
                <div className="flex justify-between w-full] items-center">
                    <img className='w-[62px] h-[62px] rounded-full bg-[#000000]' src=''></img>
                    <img className='w-[62px] h-[62px] rounded-full bg-[#626262] relative right-[105px]' src=''></img>
                    <p className={`text-[${COLORS.gray_dark_02}] font-semibold`} style={{...FONTS.heading_06}}>2 Students</p>
                </div>
                <div className="flex  w-full justify-between ">
                    <p className={`text-[${COLORS.gray_light}] font-semibold flex gap-[12px] items-center`} style={{...FONTS.heading_08}}> <TbCalendarTime className="w-[18px] h-[18px]" />5-7-2025</p>
                    <p className={`text-[${COLORS.gray_light}] font-semibold flex gap-[12px] items-center`} style={{...FONTS.heading_08}}><FaClock className="w-[18px] h-[18px]"/>09:00:54 AM</p>
                    <p className={`text-[${COLORS.gray_light}] font-semibold flex gap-[12px] items-center`} style={{...FONTS.heading_08}}><TbClockHour7Filled className="w-[18px] h-[18px]"/>11:05:54 AM</p>
                </div>
                <div className="flex w-full items-center justify-end">
                    <button onClick={handleStudentAttendanceDetails} className=" pr-[16px] pl-[16px] bg-[#3ABE65] text-[#FFFFFF] hover:bg-[#3abea1] w-[170px] h-[48px] rounded-[8px]" style={{...FONTS.heading_07}}>View Attendance</button>
                </div>
            </div>
        </div>
        <StudentDetails />
        </>
    )
}

export default StudentCard