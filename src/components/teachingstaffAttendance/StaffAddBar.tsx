import React, { useState } from "react";
import plus from "../../assets/plus.png";
import cals from "../../assets/Attendence management.png";
import filter from "../../assets/filter.png";
import DashCalender from "../ui/calendarDash";
import type { StaffsAttendanceType } from "../../pages/Attendance Management/Staffs Attendance/StaffsAttendance";
import { GetImageUrl } from "../../utils/helper";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface formtype {
  setOpen: (data: boolean) => void;
  setMonth: (data: number) => void;
  setYear: (data: number) => void;
  data: StaffsAttendanceType;

}

const StaffAddBar: React.FC<formtype> = ({
  setOpen,
  setMonth,
  setYear,
  data,
}) => {
  const [callader, setcallader] = useState(false);
  const [filterDiv, setfilterDiv] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="flex flex-col w-full gap-4 p-2">
      {/* Top card with staff info and Add Attendance */}
      <div className="flex flex-col sm:flex-col md:flex-row w-full justify-between items-center p-4 bg-white rounded-lg shadow-[0px_4px_24px_0px_#00000026]">
        <div className="flex flex-row flex-wrap md:flex-nowrap items-center w-full h-max gap-5">
          <button
            onClick={() => navigate('/staffs-attendance')}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={24} className="text-[#3ABE65]" />
          </button>
          <img
            src={GetImageUrl(data?.img) ?? undefined}
            alt=""
            className="w-16 h-16 rounded-[50%]"
          />
          <div className="flex flex-col">
            <p className="text-[#716F6F] font-semibold text-[20px]">
              {data?.staff_name}
            </p>
            <p className="text-[#716F6F] font-light text-[16px]">
              Email: {data?.email}
            </p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex justify-start md:justify-end w-[200px] md:w-[199px] bg-[#3ABE65] h-min p-2 text-white rounded-md items-center gap-1 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <img src={plus} alt="" className="w-5 h-5" />
          <p className="font-medium text-[16px]">Add Attendance</p>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full">
        <div
          className="p-4 bg-[#1BBFCA] rounded-md cursor-pointer"
          onClick={() => setcallader(!callader)}
        >
          <img src={cals} alt="" />
        </div>
        {callader && (
          <div className="absolute ml-15">
            <DashCalender
              setMonth={setMonth}
              setYear={setYear}
              setcals={setcallader}
            />
          </div>
        )}
        <div
          onClick={() => setfilterDiv(!filterDiv)}
          className="flex flex-row p-4 bg-[#1BBFCA] rounded-md gap-1 cursor-pointer"
        >
          <img src={filter} alt="" />
          <p className="text-white text-[16px] font-medium">Filters</p>
        </div>
        {filterDiv && (
          <div className="absolute flex flex-col rounded-lg p-4 gap-5 bg-white right-9 mt-15 **:p-2 **:cursor-pointer shadow-[0px_4px_24px_0px_#00000026]">
            <div className="border-[#716F6F] border-2 text-[#716F6F] text-[16px] font-medium hover:text-white hover:bg-[#1BBFCA] hover:border-[#1BBFCA] rounded-md">
              View All
            </div>
            <div className="border-[#716F6F] border-2 text-[#716F6F] text-[16px] font-medium hover:text-white hover:bg-[#1BBFCA] hover:border-[#1BBFCA] rounded-md">
              Present
            </div>
            <div className="border-[#716F6F] border-2 text-[#716F6F] text-[16px] font-medium hover:text-white hover:bg-[#1BBFCA] hover:border-[#1BBFCA] rounded-md">
              Absent
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default StaffAddBar;
