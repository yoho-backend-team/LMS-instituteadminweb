import React from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function AddNewGroup() {
  const permissions = [
    "Dashboard",
    "Groups",
    "Users",
    "User Details",
    "Categories",
    "Courses",
    "Course Details",
    "Branch Details",
    "Course Notes",
    "Course Modules",
    "Teaching Staffs",
    "Branches",
    "Non Teaching Staffs",
    "Students Details",
    "Batches",
    "Batch Details",
    "Offline Classes",
    "Offline Class Details",
    "Live Classes",
    "Live Class Details",
    "Student Attendance",
    "Student Attendance Details",
    "Study Materials",
    "Teaching Staff Details",
    "Non Teaching Staff Attendances",
    "Student Fee Details",
    "Non Teaching Staff Attendances Details",
    "Student Fees",
    "Staff Salaries",
    "Subscription Details",
    "Staff Notification",
    "All Notification",
    "Student Certificate",
    "Student Certificate Details",
    "Student_Idcards",
    "Student Idcards",
    "Teaching Staff Attendances",
    "Teaching Staff Attendance Details",
    "FAQS",
    "Staff-Ticket",
    "FAQ Categories",
    "Help FAQs",
    "Fees"


  ];
 const navigate = useNavigate();
  return (
    <div className="">
        {/* Back Button */}
      <div
        onClick={() => navigate("/group")}
        className="mb-4 cursor-pointer text-xl text-[#7D7D7D] hover:text-gray-500 w-fit"
      >
        <IoMdArrowRoundBack />
      </div>
      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#1BBFCA] mb-2">Add New Group</h1>
      <p className="text-[#7D7D7D] mb-6">Set Group Permissions</p>

      {/* Group Name */}
      <label className="block mb-2 text-sm font-medium text-[#7D7D7D]">
        Group Name
      </label>
      <input
        type="text"
        placeholder="Group Name"
        className="border border-gray-300 rounded-lg p-2 w-96 mb-6 hover:border-[#1BBFCA]  outline-none"
      />

      {/* Group Permissions */}
      <h2 className="text-lg font-medium text-[#7D7D7D] mb-4">
        Group Permissions
      </h2>
      <div className="flex justify-between gap-3 mb-6 text-[#7D7D7D]">
        <p>AdminiStrator Access</p>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 text-green-500 bg-white border-gray-300 rounded accent-green-500" />
          Select All
        </label>
      </div>

      <hr className="mb-6" />

      
      {/* Permission Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {permissions.map((item, index) => (
    <div
      key={index}
      className="flex flex-col gap-1 bg-white rounded-lg p-3 "
    >
      <label className="text-sm font-medium text-[#7D7D7D]">
        {item}
      </label>
      <div className="relative">
        <select
          className="appearance-none w-full rounded-lg border border-gray-300 p-2 pr-8 text-sm text-[#7D7D7D] outline-none focus:ring focus:ring-[#1BBFCA]"
          defaultValue=""
        >
          <option value="" disabled>
            Select access
          </option>
          <option value="Read">Read</option>
          <option value="Create">Create</option>
          <option value="Update">Update</option>
          <option value="Delete">Delete</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default AddNewGroup;