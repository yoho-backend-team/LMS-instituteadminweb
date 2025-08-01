import { COLORS, FONTS } from '../../../../constants/uiConstants'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import card1 from '../../../../assets/profileion1.png'
import card2 from '../../../../assets/Frame 5825blue.png'
import card4 from '../../../../assets/Frame 5825green.png'
import card3 from '../../../../assets/cardimg3.png'
import { SlOptionsVertical } from "react-icons/sl";
import { Select, SelectContent, SelectItem, SelectValue } from '../../../../components/ui/select';
import { SelectTrigger } from '../../../../components/ui/select';
import { useNavigate } from 'react-router-dom';

const StudentDetails = () => {
    const navigate = useNavigate()
    const handleBack = () =>{
        try {
            navigate('/students-attendance')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='grid gap-[30px]'>
            <div className={`flex justify-between w-full h-[80px] bg-[${COLORS.primary}] pr-[16px] rounded-[8px] pl-[16px] items-center `}>
                <h1 className='flex gap-[10px] text-[#FFFFFF] !font-semibold items-center' style={{ ...FONTS.heading_05 }}><div className='cursor-pointer' onClick={handleBack}><MdOutlineKeyboardBackspace className='w-[24px] h-[24px] !font-bold' /></div>
                    WHERE BEGINS THE WEB HISTORY</h1>
            </div>

            <div className='flex gap-[15px] w-full justify-between '>
                <div className='rounded-[12px] grid gap-[10px]  bg-[#1996E333] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card1}></img>
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Course</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_01 }}>Mern Stack 2025</h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px]  bg-[#8519E333] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card2}></img>
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Batch</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_01 }}> 13</h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px]  bg-[#E3711933] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card3}></img>
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Duration</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5 `} style={{ ...FONTS.heading_01 }}>6 Months</h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px]  bg-[#19E35C33] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card4}></img>
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Start Date</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_01 }}>25-Jul-2025</h1>
                </div>

            </div>

            <div className='grid gap-[20px]'>
                <h1 className={`text-[${COLORS.gray_dark_02}] !font-semibold`} style={{ ...FONTS.heading_05 }}> Attendance Report</h1>
                <div className='shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] w-[374px] p-[16px] h-full grid gap-[20px] bg-[#FFFFF]'>
                    <div className='flex justify-between gap-[10px] items-center'>
                        <img className='w-[62px] h-[62px] rounded-full bg-[#000000]' src=''></img>
                        <div>
                            <p className={`text-[${COLORS.gray_dark_02}] font-bold`}>Elon Musk</p>
                            <p className={`text-[${COLORS.gray_light}]`}><span>Email : </span>elonmusk@gmail.com</p>
                        </div>
                        <div><SlOptionsVertical className={`text-[${COLORS.primary}]`}/></div>
                    </div>
                    <div className='flex justify-center items-center '><h1 className={`text-[${COLORS.gray_dark_02}] font-semibold`}>ID : 46</h1></div>
                    <div className='flex justify-end'>
                        <Select>
                            <SelectTrigger
                                className={`w-[126px] h-[48px] border text-white rounded-[8px] pr-[16px] pl-[16px] bg-[${COLORS.primary}]`}
                                style={{ backgroundColor: COLORS.primary }}
                            >
                                <SelectValue placeholder="Status" className={`p-2 bg-[#FFFFF]`}/>
                            </SelectTrigger>
                            <SelectContent className="bg-white text-white border p-2 rounded-[8px]">
                                <SelectItem
                                    value="absent"
                                    className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2  my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                    style={{...FONTS.heading_08}}
                                >
                                    Absent
                                </SelectItem>
                                <SelectItem
                                    value="present"
                                    className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2 focus:text-white rounded-[8px]  cursor-pointer`}
                                    style={{...FONTS.heading_08}}
                                >
                                    Present
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetails