import { FONTS } from "../../../../constants/uiConstants"
import calendar from "../../../../assets/Attendance/Student_Attendance/calendar (1) 1.svg"
import { Calendar } from "lucide-react"
 
const StudentHeaderBar = () => {
    return (
        <div>
            <div className='flex justify-between w-full h-[80px] bg-[#1BBFCA] pr-[16px] rounded-[8px] pl-[16px] items-center '>
                <h1 className='flex gap-[10px] text-[#FFFFFF]' style={{ ...FONTS.heading_04 }}><Calendar/>
                STUDENT ATTENDANCE</h1>
                <button>Show</button>
            </div>
        </div>
    )
}

export default StudentHeaderBar