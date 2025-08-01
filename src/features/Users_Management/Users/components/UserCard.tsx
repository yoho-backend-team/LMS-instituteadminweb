import { COLORS, FONTS } from '../../../../constants/uiConstants'
import card1 from '../../../../assets/profileion1.png'
import card2 from '../../../../assets/Frame 5825blue.png'
import card4 from '../../../../assets/Frame 5825green.png'
import card3 from '../../../../assets/cardimg3.png'
import { Input } from '../../../../components/ui/input'
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '../../../../components/ui/select'
import filter from '../../../../assets/SHFilter.png'
import add from '../../../../assets/Add.png'
import AddForm from './AddForm'
import { useState } from 'react'


const UserCard = () => {
    const [showForm, SetShowForm] = useState<boolean>(false)
    return (
        <div className='grid gap-5'>
            <div className='grid gap-7 p-1.5'>
                <h1 className={`text-[${COLORS.gray_dark_01}]`} style={{ ...FONTS.heading_05_bold }}>Admin User</h1>
                <div className='w-full flex gap-[30px]'>
                    <div className='rounded-[12px] grid gap-[10px]  bg-[#1996E333] pr-3.5 pb-3.5 w-full'>
                        <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                            <img className='w-[92px] h-[92px]' src={card1}></img>
                            <h3 className={`text-[${COLORS.gray_dark_02}]`}>Total Users</h3>
                        </div>
                        <div className='flex justify-end'>
                            <h1 className={`text-[${COLORS.gray_light}] !font-semibold pr-3.5`} style={{ ...FONTS.heading_01 }}>0</h1>
                        </div>
                    </div>

                    <div className='rounded-[12px] grid gap-[10px]  bg-[#FBE3DF] pr-3.5 pb-3.5 w-full'>
                        <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                            <img className='w-[92px] h-[92px]' src={card2}></img>
                            <h3 className={`text-[${COLORS.gray_dark_02}]`}>Total Groups</h3>
                        </div>
                        <div className='flex justify-end'>
                            <h1 className={`text-[${COLORS.gray_light}] !font-semibold pr-3.5`} style={{ ...FONTS.heading_01 }}>0</h1>
                        </div>
                    </div>

                    <div className='rounded-[12px] grid gap-[10px]  bg-[#D7F6F5] pr-3.5 pb-3.5 w-full'>
                        <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                            <img className='w-[92px] h-[92px]' src={card3}></img>
                            <h3 className={`text-[${COLORS.gray_dark_02}]`}>Active Users</h3>
                        </div>
                        <div className='flex justify-end'>
                            <h1 className={`text-[${COLORS.gray_light}] !font-semibold pr-3.5`} style={{ ...FONTS.heading_01 }}>0</h1>
                        </div>
                    </div>

                    <div className='rounded-[12px] grid gap-[10px]  bg-[#DEF6D7] pr-3.5 pb-3.5 w-full'>
                        <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                            <img className='w-[92px] h-[92px]' src={card4}></img>
                            <h3 className={`text-[${COLORS.gray_dark_02}]`}>Blocked Users</h3>
                        </div>
                        <div className='flex justify-end'>
                            <h1 className={`text-[${COLORS.gray_light}] !font-semibold pr-3.5`} style={{ ...FONTS.heading_01 }}>0</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid gap-7'>
                <div className='flex justify-between w-full'>
                    <button className='bg-[#1BBFCA] text-[#FFFFFF] pr-[16px] pl-[16px] h-[48px] rounded-[8px] flex items-center gap-2'><img src={filter} className='w-[18px] h-[18px]' />Show Filter</button>

                    <button onClick={() => SetShowForm(true)} className='bg-[#1BBFCA] pr-[16px] pl-[16px] h-[48px] rounded-[8px] flex items-center gap-2 text-[#FFFFFF]'><img src={add} className='w-[18px] h-[18px]' />Add User</button>
                </div>

                <div className='grid gap-5'>
                    <Input className={`w-1/4 border-2 border-[${COLORS.primary}]`} placeholder='Search Admin User'></Input>
                    <div className='flex justify-between gap-5 w-full p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px]'>
                        <div className='w-full grid gap-2'>
                            <label className={`text-[${COLORS.gray_dark_02}] font-semibold`}>Status</label>
                            <Select>
                                <SelectTrigger style={{ height: '45px' }}
                                    className={`w-full border rounded-[8px] border-[${COLORS.gray_dark_02}] pr-[16px] pl-[16px] text-[${COLORS.gray_dark_02}]`}

                                >
                                    <SelectValue placeholder="Select" className={`p-2 bg-[#FFFFF]`} />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-white border p-3 w-full rounded-[8px]">
                                    <SelectItem
                                        value="batch"
                                        className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2  my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                        style={{ ...FONTS.heading_08 }}
                                    >
                                        No results found...
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='w-full grid gap-2'>
                            <label className={`text-[${COLORS.gray_dark_02}] font-semibold`}>Status</label>
                            <Select>
                                <SelectTrigger style={{ height: '45px' }}
                                    className={`w-full border rounded-[8px] border-[${COLORS.gray_dark_02}] pr-[16px] pl-[16px] text-[${COLORS.gray_dark_02}]`}>
                                    <SelectValue placeholder="Select" className={`p-2 bg-[#FFFFF]`} />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-white border p-3 w-full rounded-[8px]">
                                    <SelectItem
                                        value="batch"
                                        className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2  my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                        style={{ ...FONTS.heading_08 }}
                                    >
                                        No results found...
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            {showForm && <div className={`fixed top-0 right-0 rounded-[8px] overflow-y-auto h-full w-[400px] bg-white shadow-lg transition-transform duration-300 z-50 ${showForm ? 'translate-x-0' : 'translate-x-full'}`}>
                <AddForm />
            </div>
            }
        </div>
    )
}

export default UserCard