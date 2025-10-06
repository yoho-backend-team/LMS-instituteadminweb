import { TbCalendarTime, TbClockHour7Filled } from "react-icons/tb";
import { COLORS, FONTS } from "../../../../constants/uiConstants";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { GetImageUrl } from "../../../../utils/helper";
import { FaClock } from "react-icons/fa";

type studentAttendances = {
  student_class: {
    class_name: string;
    start_date: string;
    start_time: string;
    end_time: string;
    course: {
      course_name: string;
      duration: string;
      start_date: string;
      start_time: string;
      end_time: string;
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
  uuid: string;
};

type props = {
  studentAttendances: studentAttendances[];
};

const StudentCard: React.FC<props> = ({ studentAttendances }) => {
  const navigate = useNavigate();

  const handleStudentAttendanceDetails = (studentId: string) => {
    try {
      navigate(`/students-attendance/details/${studentId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full grid grid-cols-3 gap-[30px] mt-5">
      {studentAttendances?.map((card, index) => (
        <div
          key={index}
          className="border w-full h-[307px] rounded-[12px] p-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)] grid gap-[20px]"
        >
          <div className="w-full">
            <h3
              className={`text-[${COLORS.gray_dark_02}] font-semibold`}
              style={{ ...FONTS.heading_04 }}
            >
              {card?.student_class?.class_name}
            </h3>
          </div>

          <div className="flex justify-between w-full items-center pl-2 pr-7">
            {card?.students.map((img, index) => (
              <img
                key={index}
                className="w-[62px] h-[62px] rounded-full bg-[#000000] border-2 border-white 
                  -ml-50 first:ml-0 z-${index}"
                src={GetImageUrl(img.student.image) ?? undefined}
                alt="student"
              />
            ))}
            <p
              className={`text-[${COLORS.gray_dark_02}] font-semibold`}
              style={{ ...FONTS.heading_06 }}
            >
              {card?.students?.length > 1
                ? `${card?.students?.length} Students`
                : `${card?.students?.length} Student`}
            </p>
          </div>

          <div className="flex w-full justify-between gap-0.5">
            <p
              className={`text-[${COLORS.gray_light}] font-semibold flex gap-[7px] items-center`}
              style={{ ...FONTS.heading_08 }}
            >
              <TbCalendarTime className="w-[18px] h-[18px]" />
              {dayjs(card?.student_class?.course?.start_date).format(
                "DD-MMM-YYYY"
              )}
            </p>
            <p
          className={`text-[${COLORS.gray_light}] font-semibold flex gap-[7px] items-center`}
          style={{ ...FONTS.heading_08 }}
        >
          <FaClock className="w-[18px] h-[18px]" />
          {dayjs(card?.student_class?.start_time).format("hh:mm A")}
        </p>

            <p
              className={`text-[${COLORS.gray_light}] font-semibold flex gap-[7px] items-center`}
              style={{ ...FONTS.heading_08 }}
            >
              <TbClockHour7Filled className="w-[18px] h-[18px]" />
              {dayjs(card?.student_class?.end_time).format("HH:mm A")}
            </p>
          </div>

          <div className="flex w-full items-center justify-end">
            <button
              onClick={() => handleStudentAttendanceDetails(card.uuid)}
              className="pr-[16px] pl-[16px] bg-[#3ABE65] text-[#FFFFFF] hover:bg-[#3abea1] w-[170px] h-[48px] rounded-[8px]"
              style={{ ...FONTS.heading_07 }}
            >
              View Attendance
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentCard;
