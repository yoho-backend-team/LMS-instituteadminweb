import React, { useState } from "react";
import CourseCard from "../../../components/Coursemanagement/CourseCard";
import FilterPanel from "../../../components/Coursemanagement/FilterPanel";
import AddNewCourseForm from "../../../components/Coursemanagement/AddNewCourseForm";
import CourseDetailView from "../../../components/Coursemanagement/CourseDetailView";

const Courses: React.FC = () => {
  const [courses, setCourses] = useState([
    {
      title: "Mern Stack 2025",
      category: "Web Development",
      price: "₹500,000",
      image: "https://via.placeholder.com/300x180.png?text=MERN",
    },
    {
      title: "Manual Testing Basic",
      category: "Manual Testing",
      price: "₹1,00,000",
      image: "https://via.placeholder.com/300x180.png?text=Testing",
    },
  ]);

  const [showFilter, setShowFilter] = useState(false);
  const [addingCourse, setAddingCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

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
    setCourses((prev) => [...prev, newCourse]);
    setAddingCourse(false);
  };

  if (addingCourse)
    return <AddNewCourseForm onBack={handleBack} onSubmit={handleAddCourse} />;

  if (selectedCourse)
    return <CourseDetailView course={selectedCourse} onBack={handleBack} />;

  return (
    <div className="p-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-0">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} onView={() => handleViewCourse(course)} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
