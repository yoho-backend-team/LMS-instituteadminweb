import React from "react";

const FilterPanel: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">



      <div className="bg-white p-4 rounded-lg shadow-md border-2 w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:flex-1">
            <label className="pb-2 font-medium text-gray-700">Course</label>
            <input
              type="text"
              placeholder="Search Course"
              className="border border-[#1BBFCA] px-4 py-2 w-full rounded-md"
            />
          </div>

          <div className="flex flex-col w-full md:flex-1">
            <label className="pb-2 font-medium text-gray-700">Categories</label>
            <select className="border border-gray-300 px-4 py-2 rounded-md hover:border-[#1BBFCA]">
              <option>Search by Categories</option>
              <option>Web Development</option>
              <option>Manual Testing</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FilterPanel;
