import { COLORS, FONTS } from "../../../../constants/uiConstants"
import { Calendar, ChevronDownIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Input } from "../../../../components/ui/input"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import filterImg from '../../../../assets/filter.png'
import { FiFilter } from "react-icons/fi"

type props = {
    batches: ()=> void;
}

const StudentHeaderBar:React.FC<props> = ({batches}) => {
    const [filterShow, setFilterShow] = useState<boolean>(false)

    return (
        <div>
            <div className={`flex justify-between w-full h-[80px] bg-[${COLORS.primary}] pr-[16px] rounded-[8px] pl-[16px] items-center `}>
                <h1 className='flex gap-[10px] text-[#FFFFFF] !font-bold' style={{ ...FONTS.heading_05 }}><Calendar />
                    STUDENT ATTENDANCE</h1>
                {!filterShow ? (<button onClick={() => setFilterShow(true)} className={`bg-[#FFFFFF] text-[#3ABE65] w-[88px] h-[48px] rounded-[8px] flex items-center justify-center gap-1.5`}>Show</button>) : (<button onClick={() => setFilterShow(false)} className={`pt-[8px] pb-[8px] pr-[16px] pl-[16px] bg-[#FFFFFF] text-[#3ABE65] w-[67px] h-[48px] rounded-[8px]`}><IoClose className="w-[33px] h-[30px]" /></button>)}
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
                            <ChevronDownIcon className="size-4 opacity-50 text-[#716F6F]" />
                        </SelectTrigger>
                        <SelectContent  className="bg-white text-white border w-full rounded-[8px] p-1">
                            {batches?.map((batch, index)=>(<SelectItem
                            key={index}
                                value="batch"
                                className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}]   my-1.5 focus:text-white cursor-pointer`}
                                style={{ ...FONTS.heading_08 }}
                            >
                                {batch?.batch_name}
                            </SelectItem>))}
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