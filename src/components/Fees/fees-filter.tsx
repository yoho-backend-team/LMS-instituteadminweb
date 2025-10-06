"use client";
import type React from "react";

interface FeesFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const FeesFilter: React.FC<FeesFilterProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 border-gray mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="col-span-1 w-full md:w-[33%]">
          <label
            htmlFor="search-status"
            className="block text-sm text-gray-700 mb-1"
          >
            Search by Student Name
          </label>
          <input
            id="search-status"
            type="text"
            placeholder="Search by student name"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="select-batch"
              className="block text-sm text-gray-700 mb-1"
            >
              Batches
            </label>
            <select
              id="select-batch"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option>Select Batch</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="block text-sm text-gray-700 mb-1"
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
