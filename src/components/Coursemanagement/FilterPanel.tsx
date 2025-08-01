import React from "react";

const FilterPanel: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search Course input (outside the box) */}
      <input
        type="text"
        placeholder="Search Course"
        className="border border-[#1BBFCA] px-4 py-2 w-60 rounded-md"
      />

      {/* White filter box with dropdowns */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <select className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3">
            <option>Search by Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <select className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3">
            <option>Search by Categories</option>
            <option>Web Development</option>
            <option>Manual Testing</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
