/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FONTS, COLORS } from "../../constants/uiConstants";
import { useDispatch, useSelector } from "react-redux";
import { getClassesData } from "../../features/staff/reducers/thunks";
import { selectClass } from "../../features/staff/reducers/selector";

interface ClassProps {
  classId: any;
}

const ClassesPage: React.FC<ClassProps> = ({ classId }) => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const classData = useSelector(selectClass);
  const classesData = classData?.data?.classes;

  const dispatch = useDispatch<any>();

  useEffect(() => {
    (async () => {
      dispatch(
        getClassesData({
          id: classId,
          staff: classId,
        })
      );
    })();
  }, [classId, dispatch]);

  const handleViewMore = (index: number) => {
    setSelectedCourse(index);
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  // Get selected course data
  const course = selectedCourse !== null ? classesData?.[selectedCourse] : null;

  return (
    <div>
      {course ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 style={{ ...FONTS.heading_03, color: COLORS.gray_dark_02 }}>
              {course?.class_name}
            </h1>
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Back to Courses
            </Button>
          </div>

          <div className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>Course</Label>
                <Input value={course?.class_name ?? ""} readOnly />
              </div>
              <div>
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>Batch</Label>
                <Input value={course?.batch?.batch_name ?? "N/A"} readOnly />
              </div>
              <div>
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>Duration</Label>
                <Input value={`${course?.duration ?? ""} mins`} readOnly />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>Date</Label>
                <Input
                  value={
                    course?.start_date
                      ? new Date(course.start_date).toLocaleDateString()
                      : ""
                  }
                  readOnly
                />
              </div>
              <div>
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>Started At</Label>
                <Input
                  value={
                    course?.start_time
                      ? new Date(course.start_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : ""
                  }
                  readOnly
                />
              </div>
              <div>
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>Ended At</Label>
                <Input
                  value={
                    course?.end_time
                      ? new Date(course.end_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-6">
              {/* <div>
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>Instructor</Label>
                <Input
                  value={
                    Array.isArray(course?.instructors)
                      ? course.instructors.join(", ")
                      : "N/A"
                  }
                  readOnly
                />
              </div> */}
              <div>
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>Class Link</Label>
                <Input value={course?.video_url ?? ""} readOnly />
              </div>
            </div>

            <hr className="my-6" />

            {/* Students Section */}
            <div className="pt-4">
              <Button
                variant="outline"
                className="border-[#CA406F] hover:bg-pink-50 px-6 py-2"
                style={{ color: COLORS.gray_dark_02 }}
              >
                Search Student
              </Button>
            </div>

            {/* Student list table headers */}
            <div className="pt-8">
              <div className="grid grid-cols-4 gap-6 items-center bg-gray-50 py-4 px-6 rounded-lg">
                <Label className="text-sm font-medium text-gray-600 text-center">
                  Student ID
                </Label>
                <Label className="text-sm font-medium text-gray-600 text-center">
                  Student Name
                </Label>
                <Label className="text-sm font-medium text-gray-600 text-center">
                  City
                </Label>
                <Label className="text-sm font-medium text-gray-600 text-center">
                  Address
                </Label>
              </div>

              {/* Map Students */}
              {course?.batch?.student?.map((student: any, idx: number) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 gap-6 items-center py-3 px-6 border-b"
                >
                  <p className="text-center">{student?.student_id ?? "N/A"}</p>
                  <p className="text-center">{student?.name ?? "N/A"}</p>
                  <p className="text-center">{student?.city ?? "N/A"}</p>
                  <p className="text-center">{student?.address ?? "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classesData?.map((course: any, index: number) => (
            <Card
              key={index}
              className="bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-grow space-y-2">
                  <h3
                    className="whitespace-nowrap"
                    style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}
                  >
                    {course?.class_name}
                  </h3>
                  <p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
                    {course?.batch?.student?.length ?? 0} Students on this Class
                  </p>
                  <p style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                    {new Date(course.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    to{" "}
                    {new Date(course.end_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleViewMore(index)}
                  >
                    View More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassesPage;
