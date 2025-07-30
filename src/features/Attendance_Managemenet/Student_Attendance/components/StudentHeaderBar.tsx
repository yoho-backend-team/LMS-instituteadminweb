import { COLORS, FONTS } from "../../../../constants/uiConstants"

import { Calendar } from "lucide-react"
import StudentCard from "./StudentCard"

const StudentHeaderBar = () => {
    return (
        <div>
            <div className={`flex justify-between w-full h-[80px] bg-[${COLORS.primary}] pr-[16px] rounded-[8px] pl-[16px] items-center `}>
                <h1 className='flex gap-[10px] text-[#FFFFFF] font-semibold' style={{ ...FONTS.heading_05 }}><Calendar />
                    STUDENT ATTENDANCE</h1>
                <button className="pt-[8px] pb-[8px] pr-[16px] pl-[16px] bg-[#FFFFFF] text-[#3ABE65] w-[67px] h-[48px] rounded-[8px]">Show</button>
            </div>

            {/* Filter */}
            <div className="mt-5 shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px]">
                <h3 className={`pl-4 pt-4 pr-4 pb-7  !font-semibold text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_05 }}>Filters</h3>
                <label htmlFor="dropdown" className={`pl-4 text-[${COLORS.gray_dark_02}]`}>Batches</label>
                <div className="flex justify-between  pl-4 pr-4 pb-4 mt-2 gap-[30px]">
                    <select id='dropdown' className={`w-full border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] focus:border-[${COLORS.primary}] hover:border-[${COLORS.primary}]`}>
                        <option>Select</option>
                    </select>
                    <input type='text' placeholder="Search" className={`w-full border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}></input>
                </div>
            </div>
            <StudentCard />
        </div>
    )
}

export default StudentHeaderBar