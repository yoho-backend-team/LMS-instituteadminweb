import React, { useState } from "react";
import { Card, CardContent } from "./card";
import prev from '../../assets/Vectorprev.png'
import next from '../../assets/Vectornext.png'
const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface propsdata {
  setMonth: (data: number) => void;
  setYear: (data: number) => void;
  setcals: (data: boolean) => void;
}

export const DashCalender: React.FC<propsdata> = ({ setMonth, setYear, setcals }) => {
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

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const calendarData = getDaysInMonth(currentYear, currentMonth);

  return (
    <div>
      <Card className="flex flex-col w-full h-max items-start gap-2.5 p-5 bg-white rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
        <CardContent className="flex flex-col w-full items-start gap-5 p-0">
          <div className="flex flex-col items-start gap-5 w-full">
            {/* Header: Month navigation */}
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-center rounded-lg items-center h-6 w-6 border border-[#7D7D7D]"
                onClick={handlePreviousMonth}
                aria-label="Next month">
                <img
                  alt="Next month"
                  src={prev}
                />
              </div>

              <div className="text-lg font-bold text-center w-[228px]">
                {months[currentMonth]} {currentYear}
              </div>

              <div className="flex justify-center rounded-lg items-center h-6 w-6 border border-[#7D7D7D]"
                onClick={handleNextMonth}
                aria-label="Next month">
                <img
                  alt="Next month"
                  src={next}
                />
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-x-2.5 w-full text-center">
              {daysOfWeek.map((day, index) => (
                <div
                  key={`dow-${index}`}
                  className="text-[10px] font-semibold tracking-[1.5px] text-[#2a2a2a]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-2.5 w-full text-center">
              {calendarData.flat().map((day, index) => {
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();

                return (
                  <div
                    key={`day-${index}`}
                    onClick={() => {
                      setMonth(currentMonth)
                      setYear(currentYear)
                      setcals(false)
                    }}
                    className={`h-8 w-8 flex items-center justify-center rounded-full transition cursor-pointer ${isToday
                      ? "bg-[linear-gradient(135deg,rgba(123,0,255,1)_0%,rgba(178,0,255,1)_100%)] text-white font-bold"
                      : day
                        ? "text-[#706f6f] text-sm font-medium hover:bg-gray-200"
                        : "text-transparent"
                      }`}
                  >
                    {day || ""}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashCalender;
