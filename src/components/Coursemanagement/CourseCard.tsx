import React, { useState } from "react";
import card1 from "../../assets/navbar/card1.png";
import arr from "../../assets/navbar/arrow.png";
import dots from "../../assets/navbar/dots.png";
import { updateCourse } from "../../features/CourseManagement/Course/service";

interface CourseCardProps {
  course_name: string;
  courseuuid: string;
  categoryUuid: string;
  category_name: string;
  price: string;
  image: string;
  courseStatus: boolean;
  mainImage: string;
  onView: () => void;
  onEdit?: () => void;
}
const CourseCard: React.FC<CourseCardProps> = ({
  course_name,
  category_name,
  categoryUuid,
  price,
  image,
  courseuuid,
  courseStatus,
  onView,
}) => {
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [showDropdown, setShowDropdown] = useState(false);

  const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;
  const imageUrl = image?.startsWith('http') ? image : `${baseUrl}${image}`;

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  console.log('is active', courseStatus)

  const handleStatusChange = async (newStatus: "Active" | "Inactive") => {
    try {
      setStatus(newStatus);
      setShowDropdown(false);

      const payload = {
        category: categoryUuid,
        course: courseuuid,
        is_active: newStatus === "Active",
      };

      await updateCourse(payload);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };


  return (
    <div className="bg-white rounded-2xl ml-4 shadow-md p-5 mb-4 border border-gray-200 flex flex-col gap-y-4 w-full md:w-auto min-w-[220px] max-w-[374px]">
      <div className="flex justify-between items-center">
        <span className="bg-[#1BBFCA33] text-[#1BBFCA] text-sm font-medium px-3 py-1 rounded-md">
          {category_name}
        </span>
        <span className="bg-[#3ABE65] text-white text-sm font-medium px-3 py-1 rounded-md">
          Online
        </span>
      </div>

      <img
        src={image || card1}
        alt={title}
        className="rounded-md w-full h-30 object-cover"
      />

      <div className="flex flex-col gap-y-1">
        <h2 className="text-lg font-semibold text-[#1BBFCA]">{course_name}</h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={dots} alt="dot" className="w-4 h-4" />
            <p className="text-sm text-gray-600">1 Module</p>
          </div>
          <p className="text-lg font-bold">{price}</p>
        </div>
      </div>


      <div className="flex justify-between items-center relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`px-3 py-1 rounded-md inline-block items-center gap-1 ${status === "Active"
                ? "bg-[#1BBFCA] text-white"
                : "bg-white text-black border border-gray-300"
              }`}
          >
            {status}
            <img
              src={arr}
              alt="arrow"
              className={`w-3 h-3 ${status === "Inactive" ? "filter invert" : ""}`}
            />
          </button>

          {showDropdown && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
              <div
                onClick={() => handleStatusChange("Active")}
                className={`block px-4 py-2 text-sm cursor-pointer rounded-t-md ${status === "Active"
                    ? "bg-[#1BBFCA] text-white"
                    : "hover:bg-gray-100 text-gray-800"
                  }`}
              >
                Active
              </div>
              <div
                onClick={() => handleStatusChange("Inactive")}
                className={`block px-4 py-2 text-sm cursor-pointer rounded-b-md ${status === "Inactive"
                    ? "bg-[#1BBFCA] text-white"
                    : "hover:bg-gray-100 text-gray-800"
                  }`}
              >
                Inactive
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onView}
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-5 py-1.5 rounded-md"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
