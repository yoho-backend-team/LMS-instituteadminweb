import { useState } from "react"
import StaffAddBar from "../../../components/teachingstaffAttendance/StaffAddBar"
import StaffFormModal from "../../../components/teachingstaffAttendance/StaffFormModal";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const AddAttendance = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const getDaysInMonth = (year: number, month: number) => {
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const weeks: (number | null)[][] = [];
        let day = 1;
        for (let i = 0; i < 6; i++) {
            const week: (number | null)[] = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay) || day > totalDays) {
                    week.push(null);
                } else {
                    week.push(day++);
                }
            }
            weeks.push(week);
        }

        return weeks;
    };

    const calendarData = getDaysInMonth(currentYear, currentMonth);

    const [openModal, setopenModal] = useState(false);

    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
        <div className='w-full'>
            <StaffAddBar setOpen={setopenModal} setMonth={setCurrentMonth} setYear={setCurrentYear} />
            <StaffFormModal setOpen={setopenModal} isOpen={openModal} />

            <div className="w-full grid grid-cols-2 mt-5">
                <p className="col-span-1 text-center text-[#716F6F] font-semibold text-[22px]">{months[currentMonth] + ' ' + currentYear}</p>
                <div className="w-full grid grid-cols-4 gap-5 **:w-full **:h-[47px] **:justify-center **:flex **:items-center **:border **:rounded-md **:cursor-pointer">
                    <div className="border-[#1BBFCA] bg-[#1BBFCA1A] text-[#1BBFCA]">Monthly</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">Week</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">Day</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">List</div>
                </div>
            </div>

            <div className="grid grid-cols-7 h-[47px] w-full gap-5 mt-5 **:cursor-context-menu">
                {
                    days.map((items, index) => (
                        <div key={index}
                            className="border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]"
                        >
                            {items}
                        </div>
                    ))
                }
            </div>

            <div className="grid grid-cols-7 h-[47px] w-full gap-5 mt-5 **:w-full **:h-[80px] **:cursor-context-menu">
                {
                    calendarData.slice(0, 5).flat().map((items, index) => (
                        <div key={index}
                            className="border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]"
                        >
                            {items}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AddAttendance