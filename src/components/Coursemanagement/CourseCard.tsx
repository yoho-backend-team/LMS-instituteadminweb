// CourseCard.tsx
import React, { useState } from "react";
import card1 from "../../assets/navbar/card1.png";
import arr from "../../assets/navbar/arrow.png";
import dots from "../../assets/navbar/dots.png";

interface CourseCardProps {
  title: string;
  category: string;
  price: string;
  image: string;
  onView: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  category,
  price,
  image,
  onView,
}) => {
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleStatusChange = (newStatus: "Active" | "Inactive") => {
    setStatus(newStatus);
    setShowDropdown(false);
  };

  return (
    <div className="bg-white rounded-2xl ml-4 shadow-md p-5 mb-4 border border-gray-200 flex flex-col gap-y-4 w-full md:w-auto min-w-[220px] max-w-[374px]">

      <div className="flex justify-between items-center">
        <span className="bg-[#1BBFCA33] text-[#1BBFCA] text-sm font-medium px-3 py-1 rounded-md">
          {category}
        </span>
        <span className="bg-[#3ABE65] text-white text-sm font-medium px-3 py-1 rounded-md">
          Online
        </span>
      </div>

      <img
        src={card1}
        alt={title}
        className="rounded-md w-full h-30 object-cover"
      />

      <div className="flex flex-col gap-y-1">
        <h2 className="text-lg font-semibold text-[#1BBFCA]">{title}</h2>
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
            className={`px-3 py-1 rounded-md inline-block flex items-center gap-1 ${
              status === "Active"
                ? "bg-[#1BBFCA] text-white"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            <span className="align-middle">{status}</span>
            <img
              src={arr}
              alt="arrow"
              className={`w-3 h-3 ${
                status === "Inactive" ? "filter invert" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
              <div
                onClick={() => handleStatusChange("Active")}
                className={`block px-4 py-2 text-sm cursor-pointer rounded-t-md ${
                  status === "Active"
                    ? "bg-[#1BBFCA] text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                Active
              </div>
              <div
                onClick={() => handleStatusChange("Inactive")}
                className={`block px-4 py-2 text-sm cursor-pointer rounded-b-md ${
                  status === "Inactive"
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
