import { useEffect, useState } from "react";
import StaffAddBar from "../../../components/teachingstaffAttendance/StaffAddBar";
import StaffFormModal from "../../../components/teachingstaffAttendance/StaffFormModal";
import { useDispatch, useSelector } from "react-redux";
import type { StaffsAttendanceType } from "./StaffsAttendance";
import { useNavigate, useParams } from "react-router-dom";
import { GetAttendanceByIdThunk, GetStaffAttendanceRerender } from "../../../features/teachingstaffAttendance/thunk";
import { ArrowLeft } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AddAttendance = () => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();

  const staff: StaffsAttendanceType = useSelector(
    (state: any) => state.staffAttendace.selectStaff
  );

  const staffAttendace = useSelector(
    (state: any) => state.staffAttendace.attendance
  );

  // console.log(staffAttendace, 'staff att full')

  useEffect(() => {
    if (!staff.staff) {
      dispatch(GetStaffAttendanceRerender(id ?? ""));
    }
    dispatch(GetAttendanceByIdThunk(id ?? ""));
  }, [dispatch, id, staff.staff]);

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
    const data: { date: number | null; status: any }[] = [];
    const dates = new Date(year, month).getMonth();
    const dates2 = new Date(year, month).getFullYear();

    weeks.flat().forEach((day) => {
      if (day) {
        const finds = staffAttendace?.find((item: any) => {
          const changeDate = new Date(item.date).getDate();
          const changeDate2 = new Date(item.date).getMonth();
          const changeDate3 = new Date(item.date).getFullYear();
          return (
            changeDate == day && changeDate2 == dates && changeDate3 == dates2
          );
        });

        if (finds) {
          data.push({ date: day, status: finds.status });
        } else {
          data.push({ date: day, status: null });
        }
      } else {
        data.push({ date: null, status: null });
      }
    });

    return data;
  };

  const calendarData = getDaysInMonth(currentYear, currentMonth);

  const [openModal, setopenModal] = useState(false);

  const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const navigate = useNavigate()
  return (
    <div className='w-full'>
      <div
        onClick={() => navigate(-1)}
        className=' text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit mb-4'>
        <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
      </div>
      <StaffAddBar data={staff} setOpen={setopenModal} setMonth={setCurrentMonth} setYear={setCurrentYear} />
      <StaffFormModal data={staff} setOpen={setopenModal} isOpen={openModal} />

      <div className="w-full grid grid-cols-2 mt-2">
        <p className="col-span-1 text-center text-[#716F6F] font-semibold text-[22px]">
          {months[currentMonth] + " " + currentYear}
        </p>
        <div className="w-full grid grid-cols-4 gap-5 **:w-full **:h-[47px] **:justify-center **:flex **:items-center **:border **:rounded-md **:cursor-pointer">
          <div className="border-[#1BBFCA] bg-[#1BBFCA1A] text-[#1BBFCA]">
            Monthly
          </div>
          <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">
            Week
          </div>
          <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">
            Day
          </div>
          <div className="border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]">
            List
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 h-[47px] w-full gap-5 mt-5 **:cursor-context-menu">
        {days.map((items, index) => (
          <div
            key={index}
            className="border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]"
          >
            {items}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 h-[47px] w-full gap-5 mt-5 **:w-full **:h-[80px] **:cursor-context-menu">
        {calendarData.map((items, index) => (
          <div
            key={index}
            className={
              items.status
                ? `border pt-2 border-[#BDC2C7BF] flex flex-col justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]`
                : `border border-[#BDC2C7BF] flex flex-col justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]`
            }
          >
            {items.date}
            {items.status ? (
              <span
                className={
                  items.status == "present"
                    ? "text-green-600 text-center"
                    : "text-red-600 text-center"
                }
              >
                {items.status}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddAttendance;
