import React, { useEffect, useState } from "react";
import CourseCard from "../../../components/Coursemanagement/CourseCard";
import FilterPanel from "../../../components/Coursemanagement/FilterPanel";
import AddNewCourseForm from "../../../components/Coursemanagement/AddNewCourseForm";
import CourseDetailView from "../../../components/Coursemanagement/CourseDetailView";
import showfilter from '../../../assets/navbar/showfilter.png'
import ContentLoader from "react-content-loader";

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
  const [isLoad, setisLoad] = useState(true);

  useEffect(() => {

    setInterval(() => {
      setisLoad(false)
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl text-[#3B3939] font-bold">Admin User</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm inline-block"
          onClick={handleToggleFilter}
        >
          <span className="inline-block align-middle">
            <img src={showfilter} alt="Filter" className="w-4 h-4 mr-2 inline-block align-middle" />
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
        {
          isLoad &&
          Array(6).fill(null).map((_, index) => (
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
