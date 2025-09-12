/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CourseCard from "../../../components/Coursemanagement/CourseCard";
import FilterPanel from "../../../components/Coursemanagement/FilterPanel";
import AddNewCourseForm from "../../../components/Coursemanagement/AddNewCourseForm";
import CourseDetailView from "../../../components/Coursemanagement/CourseDetailView";
import showfilter from "../../../assets/navbar/showfilter.png";
import ContentLoader from "react-content-loader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createCourse } from "../../../features/CourseManagement/Course/service";

import { selectBranches } from "../../../features/StudyMaterials/selector";
import { GetBranchThunks } from "../../../features/StudyMaterials/thunk";
import { selectCoursesData } from "../../../features/CourseManagement/Course/selector";
import { GetAllCoursesThunk } from "../../../features/CourseManagement/Course/thunks";
import { getCategories } from "../../../features/Category/selector";
import { GetAllCategoryThunk } from "../../../features/Category/thunks";
import { Card } from "../../../components/ui/card";
import { GetLocalStorage } from "../../../utils/localStorage";

const Courses: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [addingCourse, setAddingCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isLoad, setisLoad] = useState(true);

  const dispatch = useDispatch<any>();
  const course = useSelector(selectCoursesData);
  const category = useSelector(getCategories);
  const branch = useSelector(selectBranches);

  useEffect(() => {
    dispatch(GetAllCategoryThunk());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      branch: GetLocalStorage("selectedBranchId"),
    };
    dispatch(GetBranchThunks(params));
  }, [dispatch]);

  useEffect(() => {
    const params = {
      id: GetLocalStorage("selectedBranchId"),
      page: 1,
    };

    dispatch(GetAllCoursesThunk(params));
  }, [dispatch]);

  useEffect(() => {
    setInterval(() => {
      setisLoad(false);
    }, 1500);
  }, []);

  const handleToggleFilter = () => setShowFilter((prev) => !prev);
  const handleAddNewCourse = () => setAddingCourse(true);
  const handleBack = () => {
    setAddingCourse(false);
    setSelectedCourse(null);
  };

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course);
  };

  const handleAddCourse = async (formValues: any) => {
    const payload = {
      course_name: formValues.title,
      description: formValues.description,
      overview: formValues.overview,
      duration: formValues.duration,
      actual_price: formValues.actualPrice,
      current_price: formValues.price,
      rating: parseInt(formValues.rating),
      reviews: formValues.review,
      image: `staticfiles/lms/${formValues.image}`,
      thumbnail: `staticfiles/lms/${formValues.thumbnail}`,
      class_type: [formValues.format.toLowerCase()],
      category: formValues.category,
      branch_ids: [formValues.branch],
      institute_id: GetLocalStorage("instituteId"),
      branch_id: GetLocalStorage("selectedBranchId"),
    };

    try {
      await createCourse(payload);
      // const createdCourse = response?.data || payload;
      // setCourses((prev) => [...prev, createdCourse]);
      setAddingCourse(false);
    } catch (error: any) {
      console.error("Error creating course:", error.message);
    }
  };

  if (addingCourse)
    return (
      <AddNewCourseForm
        onBack={handleBack}
        onSubmit={handleAddCourse}
        branches={branch}
        categories={category}
      />
    );

  if (selectedCourse)
    return (
      <CourseDetailView
        course={selectedCourse}
        onBack={handleBack}
        courses={course}
        categories={category}
      />
    );

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
          <span className="inline-block align-middle">
            <img
              src={showfilter}
              alt="Filter"
              className="w-4 h-4 mr-2 inline-block align-middle"
            />
          </span>
          <span className="inline-block align-middle">
            {showFilter ? "Hide Filter" : "Show Filter"}
          </span>
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
          Array(6)
            .fill(null)
            .map((_, index) => (
              <ContentLoader
                speed={1}
                width="100%"
                height="100%"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="w-full h-[310px] p-4 rounded-2xl border shadow-md"
                key={index}
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
            ))}
        {course.length ? (
          course?.map((course: any, index: any) => (
            <CourseCard
              key={index}
              {...course}
              courseStatus={course.is_active}
              courseuuid={course.uuid}
              category_name={course.category.category_name}
              categoryUuid={course.category.uuid}
              image={course.image}
              onView={() => handleViewCourse(course)}
            />
          ))
        ) : (
          <Card className="col-span-3 mt-8">
            <p className="font-lg text-gray-900 text-center">
              No Courses available
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Courses;
