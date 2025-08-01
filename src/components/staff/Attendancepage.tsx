import { useState } from "react";
import { addMonths, format, getDaysInMonth, getDay, subMonths, isSameMonth, isToday } from "date-fns";

const Attendancepage = () => {
    // const [openModal, setopenModal] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get days for current month
    const daysInMonth = getDaysInMonth(currentMonth);
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDay = getDay(monthStart);
    
    // Get days from previous month
    const prevMonthDays = [];
    const prevMonth = subMonths(currentMonth, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);
    
    for (let i = startDay - 1; i >= 0; i--) {
        prevMonthDays.push(daysInPrevMonth - i);
    }

    // Get days for current month
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
        currentMonthDays.push(i);
    }

    // Get days from next month
    const nextMonthDays = [];
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const remainingCells = 35 - totalDays > 0 ? 35 - totalDays : 42 - totalDays;
    
    for (let i = 1; i <= remainingCells; i++) {
        nextMonthDays.push(i);
    }

    // Combine all days
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const isCurrentMonthDay = (day: number) => {
        const dayIndex = allDays.indexOf(day);
        return dayIndex >= prevMonthDays.length && dayIndex < prevMonthDays.length + currentMonthDays.length;
    };

    const isCurrentDay = (day: number) => {
        const today = new Date();
        return (
            isCurrentMonthDay(day) &&
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div className='w-full'>
            <div className="w-full grid grid-cols-2 mt-5">
                <div className="col-span-1 flex justify-center items-center gap-4">
                    <button onClick={handlePrevMonth} className="text-[#1BBFCA]">←</button>
                    <p className="text-center text-[#716F6F] font-semibold text-[22px]">
                        {format(currentMonth, 'MMMM yyyy')}
                    </p>
                    <button onClick={handleNextMonth} className="text-[#1BBFCA]">→</button>
                </div>
                <div className="w-full grid grid-cols-4 gap-5 **:w-full **:h-[47px] **:justify-center **:flex **:items-center **:border **:rounded-md">
                    <div className="border-[#1BBFCA] bg-[#1BBFCA1A] text-[#1BBFCA]">Monthly</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">Week</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">Day</div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">List</div>
                </div>
            </div>

            <div className="grid grid-cols-7 h-[47px] w-full gap-5 mt-5">
                {days.map((day, index) => (
                    <div 
                        key={index}
                        className="border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 w-full gap-5 mt-5 **:w-full **:h-[80px]">
                {allDays.map((day, index) => (
                    <div 
                        key={index}
                        className={`border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-lg 
                            ${isCurrentDay(day) ? 'bg-[#1BBFCA] text-white' : ''}
                            ${!isCurrentMonthDay(day) ? 'text-[#BDC2C7]' : 'text-[#716F6F]'}
                        `}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Attendancepage;