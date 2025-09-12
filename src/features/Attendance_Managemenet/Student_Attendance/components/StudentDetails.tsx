import { COLORS, FONTS } from '../../../../constants/uiConstants';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import card1 from '../../../../assets/profileion1.png';
import card2 from '../../../../assets/Frame 5825blue.png';
import card4 from '../../../../assets/Frame 5825green.png';
import card3 from '../../../../assets/cardimg3.png';
import { Select, SelectContent, SelectItem, SelectValue } from '../../../../components/ui/select';
import { SelectTrigger } from '../../../../components/ui/select';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStudentAttendance, updateStudentAttendanceStatus } from '../service';
import dayjs from 'dayjs';
import warning from '../../../../assets/warning.png';
import toast from 'react-hot-toast';
import { ArrowLeft, ChevronDownIcon } from 'lucide-react';
import { GetImageUrl } from '../../../../utils/helper';

interface Attendance {
    student_class: {
        class_name: string;
        course: {
            course_name: string;
            duration: string;
            start_date: string;
        };
        batch: {
            id: string;
        };
    };
    students: Array<{
        student: {
            _id: string;
            full_name: string;
            email: string;
            image: string;
            userDetail: {
                studentId: string;
            };
        };
        attedence: string | null;
    }>;
}

const StudentDetails = () => {
    const [attendance, setAttendance] = useState<Attendance | null>(null);
    const [alertModal, setAlertModal] = useState<boolean>(false);
    const [selectedStatusValue, setSelectedStatusValue] = useState<string>('');
    const [selectedStudentId, setSelectedStudentId] = useState<string>('');
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const handleBack = () => {
        try {
            navigate('/students-attendance');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchStudentAttendance = async () => {
            try {
                const response = await getStudentAttendance({ id });
                setAttendance(response?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStudentAttendance();
    }, [id]);

    const handleStatusValue = (value: string, studentId: string) => {
        setSelectedStatusValue(value);
        setSelectedStudentId(studentId);
        setAlertModal(true);
    };

    const updateAttendanceStatus = async () => {
        const attendanceData = selectedStatusValue === 'present' ? 'present' : 'absent';
        const data = {
            attedence_id: id,
            attedence: attendanceData,
            student: selectedStudentId
        };

        try {
            const response = await updateStudentAttendanceStatus(data);
            if (response) {
                toast.success(response.message);
                setAlertModal(false);
                const updatedResponse = await getStudentAttendance({ id });
                setAttendance(updatedResponse?.data);
            }
        } catch (error) {
            toast.error('Failed to update attendance');
            setAlertModal(false);
        }
    };

    return (
        <div className='grid gap-[30px]'>
            <div className=' text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit mb-4' onClick={handleBack}>

                        <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
                    </div>
            <div className={`flex justify-between w-full h-[80px] bg-[${COLORS.primary}] pr-[16px] rounded-[8px] pl-[16px] items-center`}>
                <h1 className='flex gap-[10px] text-[#FFFFFF] !font-semibold items-center' style={{ ...FONTS.heading_05 }}>
                    {attendance?.student_class?.class_name}
                </h1>
            </div>

            <div className='flex gap-[15px] w-full justify-between'>
                <div className='rounded-[12px] grid gap-[10px] bg-[#1996E333] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card1} alt="Course" />
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Course</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_02 }}>
                        {attendance?.student_class?.course?.course_name}
                    </h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px] bg-[#8519E333] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card2} alt="Batch" />
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Batch</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_02 }}>
                        {attendance?.student_class?.batch?.id}
                    </h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px] bg-[#E3711933] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card3} alt="Duration" />
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Duration</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_02 }}>
                        {attendance?.student_class?.course?.duration}
                    </h1>
                </div>

                <div className='rounded-[12px] grid gap-[10px] bg-[#19E35C33] pr-3.5 pb-3.5 w-full'>
                    <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
                        <img className='w-[92px] h-[92px]' src={card4} alt="Start Date" />
                        <h3 className={`text-[${COLORS.gray_dark_02}]`}>Start Date</h3>
                    </div>
                    <h1 className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`} style={{ ...FONTS.heading_02 }}>
                        {dayjs(attendance?.student_class?.course?.start_date).format('DD-MM-YYYY')}
                    </h1>
                </div>
            </div>

            <div className='w-full'>
                <h1 className={`text-[${COLORS.gray_dark_02}] !font-semibold mb-4`} style={{ ...FONTS.heading_05 }}>
                    Attendance Report
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {attendance?.students?.map((card, index) => (
                        <div key={index} className='shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] p-[16px] grid gap-[20px] bg-white'>
                            <div className='flex gap-3.5 items-center'>
                                <img
                                    src={GetImageUrl(card?.student?.image) ?? undefined}
                                    className='w-[62px] h-[62px] rounded-full object-cover'
                                    alt="Student"
                                />
                                <div className='mr-4'>
                                    <p className={`text-[${COLORS.gray_dark_02}] font-bold`}>
                                        {card?.student?.full_name}
                                    </p>
                                    <p className={`text-[${COLORS.gray_light}]`} style={{ ...FONTS.heading_10 }}>
                                        Email: {card?.student?.email}
                                    </p>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <h1 className={`text-[${COLORS.gray_dark_02}] font-bold`}>
                                    <span className='font-bold'>ID : </span>
                                    {card?.student?.userDetail?.studentId || "STD-001"}
                                </h1>
                            </div>


                            <div className='flex justify-end'>
                                <Select onValueChange={(value) => handleStatusValue(value, card?.student?._id)}>
                                    <SelectTrigger
                                        className={`w-[110px] h-[48px] border text-white rounded-[8px] pr-[16px] pl-[16px] bg-[${COLORS.primary}]`}
                                    >
                                        <SelectValue
                                            placeholder={card?.attedence === null ? 'Status' : card?.attedence.charAt(0).toUpperCase() + card.attedence.slice(1)}
                                            className={`p-2 bg-white`}
                                        />
                                        <ChevronDownIcon className="size-4 opacity-50 text-[#FFFFFF]" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border p-2 rounded-[8px]">
                                        <SelectItem
                                            value="absent"
                                            className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] bg-white focus:bg-[${COLORS.primary}] p-2 my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                                            style={{ ...FONTS.heading_08 }}
                                        >
                                            Absent
                                        </SelectItem>
                                        <SelectItem
                                            value="present"
                                            className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] bg-white focus:bg-[${COLORS.primary}] p-2 focus:text-white rounded-[8px] cursor-pointer`}
                                            style={{ ...FONTS.heading_08 }}
                                        >
                                            Present
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {alertModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40">
                    <div className='fixed z-50 left-1/2 top-1/2 transform lg:-translate-x-1/4 lg:-translate-y-1/4 md:-translate-x-1/3 md:-translate-y-1/3  w-[402px] h-[279px] bg-white rounded-[12px] flex flex-col gap-[30px] p-4 justify-center items-center'>
                        <div className='grid gap-2'>
                            <img
                                className='w-[100px] h-[100px] mx-auto'
                                src={warning}
                                alt="Warning"
                            />
                            <h2 className={`text-[${COLORS.gray_dark_02}] text-center`} style={{ ...FONTS.heading_04_bold }}>
                                Confirm Action
                            </h2>
                            <p className={`text-[${COLORS.gray_light}] text-center`} style={{ ...FONTS.heading_07 }}>
                                Are you sure you want to change the status?
                            </p>
                        </div>
                        <div className='flex gap-5'>
                            <button
                                onClick={() => setAlertModal(false)}
                                style={{ ...FONTS.heading_08_bold }}
                                className={`bg-[#D7F6F5] border border-[#1BBFCA] px-4 h-[40px] rounded-[8px] flex items-center gap-2 text-[#1BBFCA]`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateAttendanceStatus}
                                type='submit'
                                style={{ ...FONTS.heading_08_bold }}
                                className='bg-[#1BBFCA] px-4 h-[40px] rounded-[8px] flex items-center gap-2 text-white'
                            >
                                Yes, Status
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDetails;