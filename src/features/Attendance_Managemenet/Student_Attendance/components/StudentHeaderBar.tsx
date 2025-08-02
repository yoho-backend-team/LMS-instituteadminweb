import { COLORS, FONTS } from "../../../../constants/uiConstants"

import { Calendar } from "lucide-react"
import StudentCard from "./StudentCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Input } from "../../../../components/ui/input"
import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"


const StudentHeaderBar = () => {
    const [filterShow, setFilterShow] = useState<boolean>(false)

    return (
        <div>
            <div className={`flex justify-between w-full h-[80px] bg-[${COLORS.primary}] pr-[16px] rounded-[8px] pl-[16px] items-center `}>
                <h1 className='flex gap-[10px] text-[#FFFFFF] !font-bold' style={{ ...FONTS.heading_05 }}><Calendar />
                    STUDENT ATTENDANCE</h1>
                {!filterShow ? (<button onClick={() => setFilterShow(true)} className={`pt-[8px] pb-[8px] pr-[16px] pl-[16px] bg-[#FFFFFF] text-[#3ABE65] w-[67px] h-[48px] rounded-[8px]`}>Show</button>) : (<button onClick={() => setFilterShow(false)} className={`pt-[8px] pb-[8px] pr-[16px] pl-[16px] bg-[#FFFFFF] text-[#3ABE65] w-[67px] h-[48px] rounded-[8px]`}><IoClose className="w-[35px]" /></button>)}
            </div>

            {/* Filter */}
            {filterShow && <div className="mt-5 shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px]">
                <h3 className={`pl-4 pt-4 pr-4 pb-7  !font-semibold text-[${COLORS.gray_dark_02}]`} style={{ ...FONTS.heading_05 }}>Filters</h3>
                <label htmlFor="dropdown" className={`pl-4 text-[${COLORS.gray_dark_02}]`}>Batches</label>
                <div className="flex justify-between  pl-4 pr-4 pb-4 mt-2 gap-[30px]">
                    <Select>
                        <SelectTrigger style={{height: '45px'}}
                            className={`w-full border rounded-[8px] border-[#716F6F] pr-[16px] pl-[16px] text-[${COLORS.gray_dark_02}]`}

                        >
                            <SelectValue placeholder="Select" className={`p-2 bg-[#FFFFF]`} />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-white border p-3 w-full rounded-[8px]">
                            <SelectItem
                                value="batch"
                                className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2  my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                style={{ ...FONTS.heading_08 }}
                            >
                                Mern Stack 2025
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Input placeholder="Search" className={`w-full  h-[45px] border border-[#716F6F] rounded-[8px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus: outline-none`}>

                    </Input>
                </div>
            </div>}
            {/* <StudentCard /> */}
        </div>
    )
}

export default StudentHeaderBar