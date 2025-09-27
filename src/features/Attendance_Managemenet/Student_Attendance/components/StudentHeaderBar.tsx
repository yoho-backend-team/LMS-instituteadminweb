import { COLORS, FONTS } from "../../../../constants/uiConstants";
import { Calendar, ChevronDownIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectStudentAttendances } from "../redux/selector";

type batch = {
  batch_name: string;
  [key: string]: any;
};

type props = {
  batches: batch[];
};

const StudentHeaderBar: React.FC<props> = () => {
  const [filterShow, setFilterShow] = useState<boolean>(false);
  const studentAttendances = useSelector(selectStudentAttendances)?.data;
  console.log(studentAttendances, "attendence")
  return (
    <div>
      <div
        className={`flex justify-between w-full h-[70px] bg-[${COLORS.primary}] pr-[16px] rounded-[8px] pl-[16px] items-center `}
      >
        <h1
          className="flex gap-[10px] text-[#FFFFFF] !font-bold"
          style={{ ...FONTS.heading_05 }}
        >
          <Calendar className="text-white" />
          STUDENT ATTENDANCE
        </h1>
        {!filterShow ? (
          <button
            onClick={() => setFilterShow(true)}
            className={`bg-[#FFFFFF] text-[#3ABE65] w-[62px] h-[38px] rounded-[8px] flex items-center justify-center gap-1.5`}
          >
            Filter
          </button>
        ) : (
          <button
            onClick={() => setFilterShow(false)}
            className={`flex items-center justify-center bg-[#FFFFFF] text-[#3ABE65] w-[62px] h-[38px] rounded-[8px]`}
          >
            <IoClose className="w-[25px] h-[25px]" />
          </button>
        )}
      </div>

      {/* Filter */}
      {filterShow && (
        <div className="mt-5 shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px]">
          <h3
            className={`pl-4 pt-4 pr-4 pb-7  !font-semibold text-[${COLORS.gray_dark_02}]`}
            style={{ ...FONTS.heading_05 }}
          >
            Filters
          </h3>
          <label
            htmlFor="dropdown"
            className={`pl-4 text-[${COLORS.gray_dark_02}]`}
          >
            Batches
          </label>

          <Select>
            <SelectTrigger
              style={{ height: "45px" }}
              className={`w-full border rounded-[8px] border-[#716F6F] pr-[16px] pl-[16px] text-[${COLORS.gray_dark_02}]`}
            >
              <SelectValue placeholder="Select" className={`p-2 bg-[#FFFFF]`} />
              <ChevronDownIcon className="size-4 opacity-50 text-[#716F6F]" />
            </SelectTrigger>

            <SelectContent className="bg-white text-white border w-full rounded-[8px] p-1">
              {studentAttendances?.map((attendance: any, index: any) => {
                const batchName = attendance?.student_class?.class_name;
                if (!batchName) return null;
                return (
                  <SelectItem
                    key={index}
                    value={batchName}
                    className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] my-1.5 focus:text-white cursor-pointer`}
                    style={{ ...FONTS.heading_08 }}
                  >
                    {batchName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

        </div>
      )}
      {/* <StudentCard /> */}
    </div>
  );
};

export default StudentHeaderBar;
