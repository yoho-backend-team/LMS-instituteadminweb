import { useState } from "react";
import { addMonths, format, getDaysInMonth, getDay, subMonths } from "date-fns";

const Attendancepage = () => {
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
        <div className='w-full p-2 sm:p-4'>
            {/* Header Section */}
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 mt-3 sm:mt-5">
                {/* Month Navigation */}
                <div className="flex justify-center items-center gap-3 sm:gap-4 order-2 xs:order-1">
                    <button 
                        onClick={handlePrevMonth} 
                        className="text-[#1BBFCA] hover:bg-[#1BBFCA]/10 p-1 sm:p-2 rounded-lg transition-colors duration-200 text-lg sm:text-xl"
                    >
                        ←
                    </button>
                    <p className="text-center text-[#716F6F] font-semibold text-base sm:text-lg md:text-[22px] min-w-[180px] sm:min-w-[200px]">
                        {format(currentMonth, 'MMMM yyyy')}
                    </p>
                    <button 
                        onClick={handleNextMonth} 
                        className="text-[#1BBFCA] hover:bg-[#1BBFCA]/10 p-1 sm:p-2 rounded-lg transition-colors duration-200 text-lg sm:text-xl"
                    >
                        →
                    </button>
                </div>
                
                {/* View Type Selector */}
                <div className="w-full grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-3 md:gap-5 order-1 xs:order-2">
                    <div className="border-[#1BBFCA] bg-[#1BBFCA1A] text-[#1BBFCA] text-xs sm:text-sm md:text-base w-full h-8 sm:h-10 md:h-[47px] justify-center flex items-center border rounded-md cursor-pointer hover:bg-[#1BBFCA] hover:text-white transition-colors duration-200">
                        Monthly
                    </div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F] text-xs sm:text-sm md:text-base w-full h-8 sm:h-10 md:h-[47px] justify-center flex items-center border rounded-md cursor-pointer hover:bg-[#716F6F] hover:text-white transition-colors duration-200">
                        Week
                    </div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F] text-xs sm:text-sm md:text-base w-full h-8 sm:h-10 md:h-[47px] justify-center flex items-center border rounded-md cursor-pointer hover:bg-[#716F6F] hover:text-white transition-colors duration-200">
                        Day
                    </div>
                    <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F] text-xs sm:text-sm md:text-base w-full h-8 sm:h-10 md:h-[47px] justify-center flex items-center border rounded-md cursor-pointer hover:bg-[#716F6F] hover:text-white transition-colors duration-200">
                        List
                    </div>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 h-8 sm:h-10 md:h-[47px] w-full gap-2 sm:gap-3 md:gap-5 mt-3 sm:mt-5">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className="border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-sm sm:text-base md:text-lg text-[#716F6F]"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 w-full gap-2 sm:gap-3 md:gap-5 mt-3 sm:mt-5">
                {allDays.map((day, index) => (
                    <div
                        key={index}
                        className={`border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-sm sm:text-base md:text-lg
                            w-full h-12 sm:h-16 md:h-20
                            ${isCurrentDay(day) ? 'bg-[#1BBFCA] text-white' : ''}
                            ${!isCurrentMonthDay(day) ? 'text-[#BDC2C7]' : 'text-[#716F6F]'}
                            transition-colors duration-200 hover:bg-gray-50 cursor-pointer
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