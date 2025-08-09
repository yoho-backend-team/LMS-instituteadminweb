import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../../components/Coursemanagement/CourseCard";
import FilterPanel from "../../../components/Coursemanagement/FilterPanel";
import AddNewCourseForm from "../../../components/Coursemanagement/AddNewCourseForm";
import CourseDetailView from "../../../components/Coursemanagement/CourseDetailView";
import showfilter from "../../../assets/navbar/showfilter.png";
import ContentLoader from "react-content-loader";

import {
  GetAllCoursesThunk,
  CreateCourseThunk,
} from "../../../features/Courses_mangement/Reducers/CourseThunks";
import { selectCoursesData } from "../../../features/Courses_mangement/Reducers/Selectors";

const Courses: React.FC = () => {
  const dispatch = useDispatch<any>();
  const courses = useSelector(selectCoursesData);
  const [showFilter, setShowFilter] = useState(false);
  const [addingCourse, setAddingCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const params = {
      id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      page: 1,
    };
    dispatch(GetAllCoursesThunk(params)).finally(() => setIsLoad(false));
  }, [dispatch]);

  const handleToggleFilter = () => setShowFilter((prev) => !prev);
  const handleAddNewCourse = () => setAddingCourse(true);
  const handleBack = () => {
    setAddingCourse(false);
    setSelectedCourse(null);
  };

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course);
  };

  const handleAddCourse = (newCourse: any) => {
    try {
      dispatch(CreateCourseThunk(newCourse));
      setAddingCourse(false);
    } catch (error: any) {
      console.error("Error creating course:", error.message);

    }
  };



  if (addingCourse)
    return <AddNewCourseForm onBack={handleBack} onSubmit={handleAddCourse} branches={branch} categories={category} />;

  if (selectedCourse)
    return <CourseDetailView course={selectedCourse} onBack={handleBack} courses={course} categories={category} />;


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl text-[#3B3939] font-bold">Courses</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm inline-block"
          onClick={handleToggleFilter}
        >
          <img
            src={showfilter}
            alt="Filter"
            className="w-4 h-4 mr-2 inline-block align-middle"
          />
          {showFilter ? "Hide Filter" : "Show Filter"}
        </button>

        <button
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm"
          onClick={handleAddNewCourse}
        >
          + Add New Course
        </button>
      </div>

      {showFilter && <FilterPanel />}

      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-5">
        {isLoad &&
          Array.from({ length: 6 }).map((_, index) => (
            <ContentLoader
              key={index}
              speed={2}
              width="100%"
              height={310}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              className="w-full h-[310px] p-4 rounded-2xl border shadow-md"
            >
              <rect x="0" y="0" rx="6" ry="6" width="100" height="24" />
              <rect x="270" y="0" rx="6" ry="6" width="80" height="24" />
              <rect x="0" y="36" rx="10" ry="10" width="100%" height="120" />
              <rect x="0" y="170" rx="6" ry="6" width="60%" height="20" />
              <rect x="0" y="200" rx="4" ry="4" width="80" height="16" />
              <rect x="280" y="200" rx="4" ry="4" width="60" height="20" />
              <rect x="0" y="240" rx="6" ry="6" width="100" height="32" />
              <rect x="260" y="240" rx="6" ry="6" width="80" height="32" />
            </ContentLoader>
          ))
        }
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} onView={() => handleViewCourse(course)} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
