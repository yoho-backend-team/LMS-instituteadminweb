import React, { useState, type ChangeEvent } from "react";

interface Branch {
  id: string;
  name: string;
}

type FilterProps = {
  branches: Branch[];
  onFilterChange: (filters: {
    search: string;
    branch: string;
    startDate: string;
    endDate: string;
  }) => void;
};

const Filtersalary: React.FC<FilterProps> = ({ branches, onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const triggerFilterChange = (
    newSearch = search,
    newBranch = branch,
    newStartDate = startDate,
    newEndDate = endDate
  ) => {
    onFilterChange({
      search: newSearch,
      branch: newBranch,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 border-gray mb-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Search */}
        <div className="col-span-1 w-full md:w-[33%]">
          <label
            htmlFor="search-input"
            className="block text-sm text-gray-700 mb-1"
          >
            Search by Name / Amount / ID
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Enter name, amount, or ID"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
              triggerFilterChange(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Branch, Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Branch */}
          <div>
            <label
              htmlFor="branch-select"
              className="block text-sm text-gray-700 mb-1"
            >
              Branch
            </label>
            <select
              id="branch-select"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                triggerFilterChange(undefined, e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
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
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                triggerFilterChange(undefined, undefined, e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* End Date */}
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
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                triggerFilterChange(
                  undefined,
                  undefined,
                  undefined,
                  e.target.value
                );
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtersalary;
