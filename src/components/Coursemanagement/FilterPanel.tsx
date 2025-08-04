import React from "react";

const FilterPanel: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search Course input (outside the box) */}
      <input
        type="text"
        placeholder="Search Course"
        className="border border-[#1BBFCA] px-4 py-2 w-98 rounded-md"
      />

      {/* White filter box with dropdowns */}
      <div className="bg-white p-4 rounded-lg shadow-md border-2 w-full">
  <div className="flex flex-col md:flex-row gap-4">
    {/* Status Filter */}
    <div className="flex flex-col w-full md:flex-1">
      <label className="pb-2 font-medium text-gray-700">Status</label>
      <select className="border border-gray-300 px-4 py-2 rounded-md hover:border-[#1BBFCA]">
        <option>Search by Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>

    {/* Category Filter */}
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
