import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
  const modules = [
    "Dashboard",
    "Groups",
    "Users",
    "User Details",
    "Categories",
    "Courses",
    "Course Details",
    "Branch Details",
  ]
  const permissions = ["Read", "Create", "Update", "Delete"]

function Edit() {
    const navigate = useNavigate();
  return (
<>
<div
        onClick={() => navigate("/group")}
        className="mb-4 cursor-pointer text-xl text-[#7D7D7D] hover:text-gray-500 w-fit"
      >
        <IoMdArrowRoundBack />
      </div>
      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#1BBFCA] mb-2">Edit Group</h1>
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
          <input type="checkbox" className="w-5 h-5 appearance-none rounded-md border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 checked:before:content-['✓'] checked:before:block checked:before:text-white checked:before:text-center checked:before:font-bold checked:before:leading-[1.1rem]" />
          Select All
        </label>
      </div>
      <hr className="mb-6" />
       {/* Permissions Table */}
       <div className="space-y-3">
  {modules.map((module, index) => (
    <div
      key={index}
      className="flex items-center justify-between py-6 px-6 text-[#7D7D7D] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
    >
      {/* Left module name */}
      <div className="text-sm font-medium text-[#7D7D7D] w-48">{module}</div>

      {/* Permissions equally spaced */}
      <div className="flex flex-1 justify-evenly">
        {permissions.map((permission) => (
          <div key={permission} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${module}-${permission}`}
              defaultChecked={true}
             className="w-5 h-5 appearance-none rounded-md border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 checked:before:content-['✓'] checked:before:block checked:before:text-white checked:before:text-center checked:before:font-bold checked:before:leading-[1.1rem]"
            />
            <label
              htmlFor={`${module}-${permission}`}
              className="text-sm text-gray-600 cursor-pointer"
            >
              {permission}
            </label>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

</>
  )
}

export default Edit