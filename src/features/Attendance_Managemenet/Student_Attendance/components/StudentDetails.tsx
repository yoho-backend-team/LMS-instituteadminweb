import { COLORS, FONTS } from "../../../../constants/uiConstants";
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
import { Button } from "../../../../components/ui/button";

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
  const [selectedStatusValue, setSelectedStatusValue] = useState<string>("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleBack = () => {
    try {
      navigate("/students-attendance");
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
    const attendanceData =
      selectedStatusValue === "present" ? "present" : "absent";
    const data = {
      attedence_id: id,
      attedence: attendanceData,
      student: selectedStudentId,
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
      console.warn(error)
      toast.error("Failed to update attendance");
      setAlertModal(false);
    }
  };

  return (
    <div className='grid gap-[30px]'>
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
        </Button>
      </div>
      <div className={`flex justify-between w-full h-[80px] bg-[${COLORS.primary}] pr-[16px] rounded-[8px] pl-[16px] items-center`}>
        <h1 className='flex gap-[10px] text-[#FFFFFF] !font-semibold items-center' style={{ ...FONTS.heading_05 }}>
          {attendance?.student_class?.class_name}
        </h1>
      </div>

      {/* <div className="flex gap-[15px] w-full justify-between">
        <div className="rounded-[12px] grid gap-[10px] bg-[#1996E333] pr-3.5 pb-3.5 w-full">
          <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
            <img className="w-[92px] h-[92px]" src={card1} alt="Course" />
            <h3 className={`text-[${COLORS.gray_dark_02}]`}>Course</h3>
          </div>
          <h1
            className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`}
            style={{ ...FONTS.heading_02 }}
          >
            {attendance?.student_class?.course?.course_name}
          </h1>
        </div>

        <div className="rounded-[12px] grid gap-[10px] bg-[#8519E333] pr-3.5 pb-3.5 w-full">
          <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
            <img className="w-[92px] h-[92px]" src={card2} alt="Batch" />
            <h3 className={`text-[${COLORS.gray_dark_02}]`}>Batch</h3>
          </div>
          <h1
            className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`}
            style={{ ...FONTS.heading_02 }}
          >
            {attendance?.student_class?.batch?.id}
          </h1>
        </div>

        <div className="rounded-[12px] grid gap-[10px] bg-[#E3711933] pr-3.5 pb-3.5 w-full">
          <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
            <img className="w-[92px] h-[92px]" src={card3} alt="Duration" />
            <h3 className={`text-[${COLORS.gray_dark_02}]`}>Duration</h3>
          </div>
          <h1
            className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`}
            style={{ ...FONTS.heading_02 }}
          >
            {attendance?.student_class?.course?.duration}
          </h1>
        </div>

        <div className="rounded-[12px] grid gap-[10px] bg-[#19E35C33] pr-3.5 pb-3.5 w-full">
          <div className={`flex items-center`} style={{ ...FONTS.heading_05 }}>
            <img className="w-[92px] h-[92px]" src={card4} alt="Start Date" />
            <h3 className={`text-[${COLORS.gray_dark_02}]`}>Start Date</h3>
          </div>
          <h1
            className={`text-[${COLORS.gray_light}] !font-semibold pl-3.5`}
            style={{ ...FONTS.heading_02 }}
          >
            {dayjs(attendance?.student_class?.course?.start_date).format(
              "DD-MM-YYYY"
            )}
          </h1>
        </div>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {/* Course Card */}
        <div className="rounded-[12px] p-3.5 bg-[#1996E333] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img
              className="
          w-10 h-10
          sm:w-12 sm:h-12
          md:w-14 md:h-14
          lg:w-16 lg:h-16
          xl:w-20 xl:h-20
          2xl:w-24 2xl:h-24
          flex-shrink-0
        "
              src={card1}
              alt="Course"
            />
            <h3
              className={`
          text-[${COLORS.gray_dark_02}]
          text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          break-words
        `}
            >
              Course
            </h3>
          </div>
          <h1
            className={`text-[${COLORS.gray_light}] !font-semibold break-words`}
            style={{ ...FONTS.heading_02 }}
          >
            {attendance?.student_class?.course?.course_name}
          </h1>
        </div>

        {/* Batch Card */}
        <div className="rounded-[12px] p-3.5 bg-[#8519E333] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img
              className="
          w-10 h-10
          sm:w-12 sm:h-12
          md:w-14 md:h-14
          lg:w-16 lg:h-16
          xl:w-20 xl:h-20
          2xl:w-24 2xl:h-24
          flex-shrink-0
        "
              src={card2}
              alt="Batch"
            />
            <h3
              className={`
          text-[${COLORS.gray_dark_02}]
          text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          break-words
        `}
            >
              Batch
            </h3>
          </div>
          <h1
            className={`text-[${COLORS.gray_light}] !font-semibold break-words`}
            style={{ ...FONTS.heading_02 }}
          >
            {attendance?.student_class?.batch?.id}
          </h1>
        </div>

        {/* Duration Card */}
        <div className="rounded-[12px] p-3.5 bg-[#E3711933] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img
              className="
          w-10 h-10
          sm:w-12 sm:h-12
          md:w-14 md:h-14
          lg:w-16 lg:h-16
          xl:w-20 xl:h-20
          2xl:w-24 2xl:h-24
          flex-shrink-0
        "
              src={card3}
              alt="Duration"
            />
            <h3
              className={`
          text-[${COLORS.gray_dark_02}]
          text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          break-words
        `}
            >
              Duration
            </h3>
          </div>
          <h1
            className={`text-[${COLORS.gray_light}] !font-semibold break-words`}
            style={{ ...FONTS.heading_02 }}
          >
            {attendance?.student_class?.course?.duration}
          </h1>
        </div>

        {/* Start Date Card */}
        <div className="rounded-[12px] p-3.5 bg-[#19E35C33] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img
              className="
          w-10 h-10
          sm:w-12 sm:h-12
          md:w-14 md:h-14
          lg:w-16 lg:h-16
          xl:w-20 xl:h-20
          2xl:w-24 2xl:h-24
          flex-shrink-0
        "
              src={card4}
              alt="Start Date"
            />
            <h3
              className={`
          text-[${COLORS.gray_dark_02}]
          text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
          break-words
        `}
            >
              Start Date
            </h3>
          </div>
          <h1
            className={`text-[${COLORS.gray_light}] !font-semibold break-words`}
            style={{ ...FONTS.heading_02 }}
          >
            {dayjs(attendance?.student_class?.course?.start_date).format("DD-MM-YYYY")}
          </h1>
        </div>
      </div>




      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 w-full">
        {attendance?.students?.map((card, index) => (
          <div
            key={index}
            className="shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] p-4 flex flex-col gap-4 bg-white"
          >
            <div className="flex gap-3 items-center">
              <img
                src={GetImageUrl(card?.student?.image) ?? undefined}
                alt="Student"
                className="
            w-10 h-10
            sm:w-12 sm:h-12
            md:w-14 md:h-14
            lg:w-16 lg:h-16
            xl:w-20 xl:h-20
            2xl:w-24 2xl:h-24
            rounded-full object-cover flex-shrink-0
          "
              />
              <div className="flex-1 min-w-0">
                <p className={`text-[${COLORS.gray_dark_02}] font-bold truncate`}>
                  {card?.student?.full_name}
                </p>
                <p
                  className={`text-[${COLORS.gray_light}] truncate`}
                  style={{ ...FONTS.heading_10 }}
                >
                  Email: {card?.student?.email}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <h1 className={`text-[${COLORS.gray_dark_02}] font-bold truncate`}>
                <span className="font-bold">ID : </span>
                {card?.student?.userDetail?.studentId || "STD-001"}
              </h1>
            </div>

            <div className="flex justify-end">
              <Select
                onValueChange={(value) => handleStatusValue(value, card?.student?._id)}
              >
                <SelectTrigger
                  className={`w-[110px] h-[40px] sm:h-[44px] md:h-[48px] border text-white rounded-[8px] px-4 bg-[${COLORS.primary}]`}
                >
                  <SelectValue
                    placeholder={
                      card?.attedence === null
                        ? "Status"
                        : card?.attedence.charAt(0).toUpperCase() + card.attedence.slice(1)
                    }
                    className="truncate p-1"
                  />
                  <ChevronDownIcon className="size-4 opacity-50 text-white" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border p-2 rounded-[8px]">
                  <SelectItem
                    value="absent"
                    className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] bg-white p-2 my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
                  >
                    Absent
                  </SelectItem>
                  <SelectItem
                    value="present"
                    className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] bg-white p-2 focus:text-white rounded-[8px] cursor-pointer`}
                  >
                    Present
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>


      {alertModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40">
          <div className="fixed z-50 left-1/2 top-1/2 transform lg:-translate-x-1/4 lg:-translate-y-1/4 md:-translate-x-1/3 md:-translate-y-1/3  w-[402px] h-[279px] bg-white rounded-[12px] flex flex-col gap-[30px] p-4 justify-center items-center">
            <div className="grid gap-2">
              <img
                className="w-[100px] h-[100px] mx-auto"
                src={warning}
                alt="Warning"
              />
              <h2
                className={`text-[${COLORS.gray_dark_02}] text-center`}
                style={{ ...FONTS.heading_04_bold }}
              >
                Confirm Action
              </h2>
              <p
                className={`text-[${COLORS.gray_light}] text-center`}
                style={{ ...FONTS.heading_07 }}
              >
                Are you sure you want to change the status?
              </p>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => setAlertModal(false)}
                style={{ ...FONTS.heading_08_bold }}
                className={`bg-[#D7F6F5] border border-[#1BBFCA] px-4 h-[40px] rounded-[8px] flex items-center gap-2 text-[#1BBFCA]`}
              >
                Cancel
              </button>
              <button
                onClick={updateAttendanceStatus}
                type="submit"
                style={{ ...FONTS.heading_08_bold }}
                className="bg-[#1BBFCA] px-4 h-[40px] rounded-[8px] flex items-center gap-2 text-white"
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
