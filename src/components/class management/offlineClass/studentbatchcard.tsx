import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import { Button } from "../../ui/button";
import { GetImageUrl } from "../../../utils/helper";

const StudentClassBatch: React.FC = () => {
  const [searchStudent, setSearchStudent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { classData } = location.state;

  const filteredStudents = classData?.batch?.student?.filter((student: any) =>
    student?.full_name?.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const formattedTime = (isoTime: string) => {
    const date = new Date(isoTime);

    const time12hr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return time12hr;
  };

  return (
    <div className='p-6 bg-white min-h-screen'>
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
        </Button>
      </div>
      <Button
        type='button'
        className='!bg-[#1BBFCA] !text-white'
        style={{ ...FONTS.heading_07 }}
      >
        {classData?.batch?.batch_name}
      </Button>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2
          style={{ ...FONTS.heading_06, color: COLORS.gray_dark_01 }}
          className='mt-2'
        >
          Batch {classData?.batch?.id}
        </h2>
        <div className='flex gap-4 items-center'>
          <span
            style={{ ...FONTS.heading_08_bold, color: COLORS.gray_dark_02 }}
          >
            Duration: {classData?.duration} days
          </span>
          <Button
            type='button'
            className='!bg-[#3ABE65] text-center !text-white'
            style={{ ...FONTS.heading_07 }}
          >
            Offline
          </Button>
        </div>
      </div>

      {/* Course Info */}
      <div className="bg-gray-50 mt-6 p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold text-gray-500">Course</p>
          <p className="font-medium text-gray-800">
            {classData?.batch?.course?.course_name}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-500">Started At</p>
          <p className="font-medium text-gray-800">
            {formattedTime(classData?.start_time)}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-500">Ended At</p>
          <p className="font-medium text-gray-800">
            {formattedTime(classData?.end_time)}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-500">Date</p>
          <p className="font-medium text-gray-800">
            {classData?.start_date.split("T")[0]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 mt-6">
        {/* Faculty Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Faculty & Coordinators</h3>
          {classData?.instructors?.map((instr: any) => (
            <div
              key={instr?.id}
              className="flex items-center bg-white p-4 mb-3 shadow rounded-md"
            >
              <img
                src={GetImageUrl(instr?.image) ?? undefined}
                alt={instr?.full_name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-medium">{instr?.full_name}</p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled Students Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Enrolled Students</h3>
          <input
            type="text"
            placeholder="Search Student"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            className="mb-4 w-full px-3 py-2 border rounded focus:outline-none"
          />
          {filteredStudents?.map((student: any) => (
            <div
              key={student?.id}
              className="flex items-start justify-between bg-white p-4 mb-3 shadow rounded-md"
            >
              <img
                src={GetImageUrl(student?.image) ?? undefined}
                alt={student?.full_name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <p className="font-medium">{student?.full_name}</p>
                <p className="text-sm text-gray-500">{student?.email}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <p
                  className="border-2 border-gray-500 max-w-15 text-center px-2 py-0.5 rounded-md"
                  style={{ ...FONTS.heading_09, color: COLORS.gray_dark_02 }}
                >
                  ID: {student?.id}
                </p>
                <div className="flex gap-1 items-center">
                  <MapPin className="w-4 h-4" color={COLORS.gray_dark_02} />
                  <p
                    style={{ ...FONTS.heading_09, color: COLORS.gray_dark_02 }}
                  >
                    {student?.contact_info?.city}
                  </p>
                </div>
                <div>
                  <p
                    style={{ ...FONTS.heading_09, color: COLORS.gray_dark_01 }}
                  >
                    Address
                  </p>
                  <p
                    style={{ ...FONTS.heading_09, color: COLORS.gray_dark_02 }}
                  >
                    {`${student?.contact_info?.address1}, ${student?.contact_info?.address2}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentClassBatch;
