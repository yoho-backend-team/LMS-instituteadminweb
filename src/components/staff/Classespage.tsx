/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FONTS, COLORS } from "../../constants/uiConstants";
import { useDispatch, useSelector } from "react-redux";
import {  getClassesData } from "../../features/staff/reducers/thunks";
import { selectClass, } from "../../features/staff/reducers/selector";

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
        }),
       
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
    <div className="p-2 sm:p-4 md:p-6">
      {course ? (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 mb-6 md:mb-8">
            <h1 
              style={{ ...FONTS.heading_03, color: COLORS.gray_dark_02 }}
              className="text-xl sm:text-2xl md:text-3xl break-words"
            >
              {course?.class_name}
            </h1>
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-gray-300 text-gray-600 hover:bg-gray-50 w-full xs:w-auto text-sm sm:text-base h-9 sm:h-10"
            >
              Back to Courses
            </Button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="space-y-2">
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }} className="text-xs sm:text-sm">
                  Course
                </Label>
                <Input 
                  value={course?.class_name ?? ""} 
                  readOnly 
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }} className="text-xs sm:text-sm">
                  Batch
                </Label>
                <Input 
                  value={course?.batch?.batch_name ?? "N/A"} 
                  readOnly 
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }} className="text-xs sm:text-sm">
                  Duration
                </Label>
                <Input 
                  value={`${course?.duration ?? ""} mins`} 
                  readOnly 
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="space-y-2">
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }} className="text-xs sm:text-sm">
                  Date
                </Label>
                <Input
                  value={
                    course?.start_date
                      ? new Date(course.start_date).toLocaleDateString()
                      : ""
                  }
                  readOnly
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }} className="text-xs sm:text-sm">
                  Started At
                </Label>
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
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }} className="text-xs sm:text-sm">
                  Ended At
                </Label>
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
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="space-y-2">
                <Label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }} className="text-xs sm:text-sm">
                  Class Link
                </Label>
                <Input 
                  value={course?.video_url ?? ""} 
                  readOnly 
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
            </div>

            <hr className="my-4 sm:my-6" />

            {/* Students Section */}
            <div className="pt-2 sm:pt-4">
              {/* Optional: Add student search functionality here */}
            </div>

            {/* Student list table headers */}
            <div className="pt-4 sm:pt-6 md:pt-8">
              {/* Student table content can be added here */}
            </div>
          </div>
        </div>
      ) : (
        /* Course Grid View */
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {classesData?.map((course: any, index: number) => (
            <Card
              key={index}
              className="bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]"
            >
              <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                <div className="flex-grow space-y-2 sm:space-y-3">
                  <h3
                    className="break-words line-clamp-2 text-sm sm:text-base font-semibold"
                    style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}
                  >
                    {course?.class_name}
                  </h3>
                  <p 
                    style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
                    className="text-xs sm:text-sm"
                  >
                    {course?.batch?.student?.length ?? 0} Students in this Class
                  </p>
                  <p 
                    style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
                    className="text-xs sm:text-sm"
                  >
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
                <div className="flex justify-end mt-3 sm:mt-4">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
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

      {/* Empty State */}
      {!course && (!classesData || classesData.length === 0) && (
        <div className="text-center py-8 sm:py-12 md:py-16">
          <p className="text-gray-500 text-sm sm:text-base">No classes found</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            This staff member is not assigned to any classes yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;