import React, { useState } from "react";
import CourseCard from "../../../components/Coursemanagement/CourseCard";
import FilterPanel from "../../../components/Coursemanagement/FilterPanel";
import AddNewCourseForm from "../../../components/Coursemanagement/AddNewCourseForm";

const Courses: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [addingCourse, setAddingCourse] = useState(false);

  const handleToggleFilter = () => setShowFilter((prev) => !prev);
  const handleAddNewCourse = () => setAddingCourse(true);
  const handleBack = () => setAddingCourse(false);

  const courses = [
    {
      title: "Mern Stack 2025",
      category: "Web Development",
      mode: "Online",
      price: "₹500,000",
      modules: "1 Modules",
      image: "https://via.placeholder.com/300x180.png?text=MERN",
    },
    {
      title: "Manual Testing Basic",
      category: "Manual Testing",
      mode: "Online",
      price: "₹1,00,000",
      modules: "1 Modules",
      image: "https://via.placeholder.com/300x180.png?text=Testing",
    },
  ];

  if (addingCourse) {
    return <AddNewCourseForm onBack={handleBack} />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl text-[#3B3939] font-semibold">Admin User</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm"
          onClick={handleToggleFilter}
        >
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
