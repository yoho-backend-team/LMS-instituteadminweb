import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Calendar } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { TbCalendarTime, TbClockHour7Filled } from "react-icons/tb";
import { FaClock } from "react-icons/fa";

import {
  fetchAllStudentAttendances,
} from "../../../features/Attendance_Managemenet/Student_Attendance/redux/thunk";
import { getwithIdBatches } from "../../../features/batchManagement/reducers/thunks";
import { selectLoading, selectStudentAttendances } from "../../../features/Attendance_Managemenet/Student_Attendance/redux/selector";
import { getInstituteDetails, getSelectedBranchId } from "../../../apis/httpEndpoints";

import { COLORS, FONTS } from "../../../constants/uiConstants";
import { GetImageUrl } from "../../../utils/helper";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../../components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import StudentSkeleton from "../../../features/Attendance_Managemenet/Student_Attendance/components/StudentSkeleton";

const StudentsAttendance = () => {
  const instituteId = getInstituteDetails() ?? "973195c0-66ed-47c2-b098-d8989d3e4529";
  const branchId = getSelectedBranchId() ?? "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4";

  const studentAttendances: any = useSelector(selectStudentAttendances);
  const loading = useSelector(selectLoading);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [filterShow, setFilterShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);


  useEffect(() => {
    const data = { branch_id: branchId, institute_id: instituteId, page: "1" };
    dispatch(fetchAllStudentAttendances(data));
    dispatch(getwithIdBatches(data));
  }, [branchId, dispatch]);

  const handleStudentAttendanceDetails = (studentId: string) => {
    try {
      navigate(`/students-attendance/details/${studentId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredAttendances = selectedBatch
    ? studentAttendances?.data?.filter(
      (card: any) => card?.student_class?.class_name === selectedBatch
    )
    : studentAttendances?.data;


  return (
    <div className="w-full">
      <div
        className="flex flex-col sm:flex-row justify-between w-full h-auto sm:h-[80px] gap-3  sm:gap-0 pr-[16px] pl-[16px] pb-[10px] items-center rounded-[8px]"
        style={{ backgroundColor: COLORS.primary }}
      >

        <h1 className="flex gap-[10px] text-white font-bold" style={{ ...FONTS.heading_05 }}>
          <Calendar className="text-white" />
          STUDENT ATTENDANCE
        </h1>

        {!filterShow ? (
          <button
            onClick={() => setFilterShow(true)}
            className="w-[88px] h-[48px] mt-2 flex items-center justify-center gap-1.5 rounded-[8px]"
            style={{ backgroundColor: "#FFFFFF", color: "#3ABE65" }}
          >
            Filter
          </button>
        ) : (
          <button
            onClick={() => setFilterShow(false)}
            className="w-[67px] h-[48px] mt-2 flex items-center justify-center rounded-[8px]"
            style={{ backgroundColor: "#FFFFFF", color: "#3ABE65" }}
          >
            <IoClose className="w-[33px] h-[30px]" />
          </button>
        )}
      </div>

      {filterShow && (
        <div className="mt-5 shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] bg-white p-4">
          <h3 className="font-semibold pb-4" style={{ ...FONTS.heading_05, color: COLORS.gray_dark_02 }}>
            Filters
          </h3>

          <label className="block mb-2" style={{ color: COLORS.gray_dark_02 }}>
            Batches
          </label>

          <Select onValueChange={(value) => setSelectedBatch(value)}>
            <SelectTrigger style={{ height: "45px" }} className="w-full border rounded-[8px] px-4">
              <SelectValue placeholder="Select" />
              <ChevronDownIcon className="opacity-50 text-[#716F6F]" />
            </SelectTrigger>

            <SelectContent
              className="border w-full rounded-[8px] p-1 bg-white/30 backdrop-blur-md"
              side="bottom"
              align="start"
              avoidCollisions={false}
            >
              {studentAttendances?.data?.map((attendance: any, index: number) => {
                const batchName = attendance?.student_class?.class_name;
                if (!batchName) return null;

                return (
                  <SelectItem
                    key={index}
                    value={batchName}
                    style={{
                      backgroundColor: COLORS.primary,
                      color: "white",
                      ...FONTS.heading_08,
                      margin: "0.375rem 0",
                      cursor: "pointer",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a9d50")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
                  >
                    {batchName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>


        </div>
      )}

      <div className="w-full mt-5">
        {loading ? (
          <StudentSkeleton />
        ) : (
          <div className="w-full grid grid-cols-1 [@media(max-width:420px)]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-5">

            {filteredAttendances.map((card: any, index: number) => (
              <div
                key={index}
                className="border w-full h-[307px] rounded-[12px] p-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)] grid gap-[20px]"
              >
                <div className="w-full">
                  <h3
                    style={{ ...FONTS.heading_04, color: COLORS.gray_dark_02 }}
                  >
                    {card?.student_class?.class_name}
                  </h3>
                </div>

                <div className="flex justify-between w-full items-center pl-2 pr-7 overflow-hidden">
                  {card?.students.map((img: any, idx: number) => (
                    <img
                      key={idx}
                      className="
        rounded-full bg-[#000000] border-2 border-white
        w-10 h-10        /* <640px */
        sm:w-12 sm:h-12  /* ≥640px */
        md:w-14 md:h-14  /* ≥768px */
        lg:w-16 lg:h-16  /* ≥1024px */
        xl:w-20 xl:h-20  /* ≥1280px */
        2xl:w-24 2xl:h-24/* ≥1536px */
        -ml-1 sm:-ml-3 md:-ml-4 lg:-ml-6 xl:-ml-8 2xl:-ml-10
        first:ml-0
      "
                      src={GetImageUrl(img.student.image) ?? undefined}
                      alt="student"
                    />
                  ))}

                  <p
                    style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}
                  >
                    {card?.students?.length > 1
                      ? `${card?.students?.length} Students`
                      : `${card?.students?.length} Student`}
                  </p>
                </div>



                <div className="flex w-full justify-between gap-0.5">
                  <p
                    className="flex gap-[7px] items-center"
                    style={{ ...FONTS.heading_08, color: COLORS.gray_light }}
                  >
                    <TbCalendarTime className="w-[18px] h-[18px]" />
                    {dayjs(card?.student_class?.course?.start_date).format("DD-MMM-YYYY")}
                  </p>

                  <p
                    className="flex gap-[7px] items-center"
                    style={{ ...FONTS.heading_08, color: COLORS.gray_light }}
                  >
                    <FaClock className="w-[18px] h-[18px]" />
                    {dayjs(card?.student_class?.start_time).format("hh:mm A")}
                  </p>

                  <p
                    className="flex gap-[7px] items-center"
                    style={{ ...FONTS.heading_08, color: COLORS.gray_light }}
                  >
                    <TbClockHour7Filled className="w-[18px] h-[18px]" />
                    {dayjs(card?.student_class?.end_time).format("hh:mm A")}
                  </p>
                </div>

                <div className="flex w-full items-center justify-end">
                  <button
                    onClick={() => handleStudentAttendanceDetails(card.uuid)}
                    className="pr-[16px] pl-[16px] w-[170px] h-[48px] rounded-[8px]"
                    style={{ ...FONTS.heading_07, backgroundColor: "#3ABE65", color: "#FFFFFF" }}
                  >
                    View Attendance
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsAttendance;
