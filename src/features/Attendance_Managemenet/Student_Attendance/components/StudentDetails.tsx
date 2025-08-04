import { COLORS, FONTS } from '../../../../constants/uiConstants'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import card1 from '../../../../assets/profileion1.png'
import card2 from '../../../../assets/Frame 5825blue.png'
import card4 from '../../../../assets/Frame 5825green.png'
import card3 from '../../../../assets/cardimg3.png'
import { SlOptionsVertical } from "react-icons/sl";
import { Select, SelectContent, SelectItem, SelectValue } from '../../../../components/ui/select';
import { SelectTrigger } from '../../../../components/ui/select';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStudentAttendance, updateStudentAttendanceStatus } from '../service';
import dayjs from 'dayjs';
import warning from '../../../../assets/warning.png'
import toast from 'react-hot-toast';
import { ChevronDownIcon } from 'lucide-react';

const StudentDetails = () => {
    const [attendance, setAttendance] = useState([]);
    const [alertModal, setAlertModal] = useState<boolean>(false);
    const [selectedStatusValue, setSelectedStatusValue] = useState<string>('')
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>()
    const handleBack = () => {
        try {
            navigate('/students-attendance')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchStudentAttendance = async () => {
            try {
                console.log("Location", id)
                const response = await getStudentAttendance({id});
                setAttendance(response?.data)
                console.log('Response Student Individual Data', response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchStudentAttendance();
    }, [])

    const handleStatusValue = (row: any) => {
         setSelectedStatusValue(row)
         setAlertModal(true)
    }

    const updateAttendanceStatus = async(studentId: String)=>{
        const attendanceData = selectedStatusValue === 'present' ? 'present' : 'absent'
        const data = {
            attedence_id : id,
            attedence: attendanceData,
            student: studentId
        }
        const response = await updateStudentAttendanceStatus(data);
        if(response){
            toast.success(response.message)
            setAlertModal(false)
        }else{
            toast.error(response.error)
            setAlertModal(false)
        }
    }

    return (
        <div className='grid gap-[30px]'>
            <div className={`flex justify-between w-full h-[80px] bg-[${COLORS.primary}] pr-[16px] rounded-[8px] pl-[16px] items-center `}>
                <h1 className='flex gap-[10px] text-[#FFFFFF] !font-semibold items-center' style={{ ...FONTS.heading_05 }}><div className='cursor-pointer' onClick={handleBack}><MdOutlineKeyboardBackspace className='w-[24px] h-[24px] !font-bold' /></div>{attendance?.student_class?.class_name}</h1>
            </div>

            <div className='flex gap-[15px] w-full justify-between '>
                <div className='rounded-[12px] grid gap-[10px]  bg-[#1996E333] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card1}></img>
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Course</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_02 }}>{attendance?.student_class?.course?.course_name}</h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px]  bg-[#8519E333] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card2}></img>
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Batch</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_02 }}>{attendance?.student_class?.batch?.id}</h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px]  bg-[#E3711933] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card3}></img>
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Duration</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5 `} style={{ ...FONTS.heading_02 }}>{attendance?.student_class?.course?.duration}</h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px]  bg-[#19E35C33] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card4}></img>
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Start Date</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_02 }}>{dayjs(attendance?.student_class?.course?.start_date).format('DD-MM-YYYY')}</h1>
                </div>

            </div>

            <div className='grid gap-[30px]'>
                <h1 className={`text-[${COLORS.gray_dark_02}] !font-semibold`} style={{ ...FONTS.heading_05 }}> Attendance Report</h1>
                {attendance?.students?.map((card, index)=> (<div key={index} className='shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] w-[374px] p-[16px] h-full grid gap-[30px] bg-[#FFFFF]'>
                    <div className='flex justify-between items-center'>
                        <img className='w-[62px] h-[62px] rounded-full bg-[#000000]'></img>
                        <div className='mr-22'>
                            <p className={`text-[${COLORS.gray_dark_02}] font-bold`}>{card?.student?.full_name}</p>
                            <p className={`text-[${COLORS.gray_light}]`} style={{...FONTS.heading_09}}>{card?.student?.email}</p>
                        </div>
                        <div><SlOptionsVertical className={`text-[${COLORS.primary}]`} /></div>
                    </div>

                    <div className='flex justify-center items-center'><h1 className={`text-[${COLORS.gray_dark_02}] `}><span className='font-bold'>ID : </span>{card?.student?.userDetail?.studentId}</h1></div>
                    
                    <div className='flex justify-end'>
                        <Select onValueChange={handleStatusValue}>
                            <SelectTrigger
                                className={`w-[126px] h-[48px] border text-white rounded-[8px] pr-[16px] pl-[16px] bg-[${COLORS.primary}]`}
                            >
                                <SelectValue placeholder={card?.attedence === null ? 'Status' : card?.attedence} className={`p-2 bg-[#FFFFF]`} />
                                <ChevronDownIcon className="size-4 opacity-50 text-[#FFFFFF]" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-white border p-2 rounded-[8px]">
                                <SelectItem
                                    value="absent"
                                    className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2  my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                    style={{ ...FONTS.heading_08 }}
                                >
                                    Absent
                                </SelectItem>
                                <SelectItem
                                    value="present"
                                    className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2 focus:text-white rounded-[8px]  cursor-pointer`}
                                    style={{ ...FONTS.heading_08 }}
                                >
                                    Present
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {alertModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" >
            <div className='fixed z-50 left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/3 bottom-50 border w-[402px] h-[279px] bg-[#FFFFFF] rounded-[12px] flex flex-col gap-[30px] p-4 justify-center items-center'>
                <div className='grid gap-2'>
                    <img className={`w-[100px] h-[100px] flex justify-center ml-32`} src={warning}></img>
                    <h2 className={`text-[${COLORS.gray_dark_02}] text-center`} style={{...FONTS.heading_04_bold}}>Confirm Action</h2>
                    <p className={`text-[${COLORS.gray_light}] text-center`} style={{...FONTS.heading_07}}>Are you sure you want to change the status</p>
                </div>
                <div className='flex gap-5'>
                    <button onClick={()=> setAlertModal(false)} style={{ ...FONTS.heading_08_bold }} className={`bg-[#D7F6F5] border border-[#1BBFCA] pr-[16px] pl-[16px] h-[40px] rounded-[8px] flex items-center gap-2 text-[#1BBFCA]`}>Cancel</button>
                    <button onClick={() =>updateAttendanceStatus(card?.student?._id)} type='submit' style={{ ...FONTS.heading_08_bold }} className='bg-[#1BBFCA] pr-[16px] pl-[16px] h-[40px] rounded-[8px] flex items-center gap-2 text-[#FFFFFF]'>Yes, Status</button>
                </div>
            </div>
            </div>}
                </div>))}
            </div>

        </div>
    )
}

export default StudentDetails