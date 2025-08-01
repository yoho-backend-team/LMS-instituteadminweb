import { useState } from "react";
import type { ChangeEvent } from "react";


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

function Filtersalary(props: FilterProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    triggerFilterChange(value, branch, startDate, endDate);
  };
  const triggerFilterChange = (
    search: string,
    branch: string,
    startDate: string,
    endDate: string
  ) => {
    props.onFilterChange({ search, branch, startDate, endDate });
  };

  return (
    <div className="p-4 space-y-4 shadow-2xl">
  
      <div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex gap-4 flex-wrap justify-between">
        <select
          className="border p-2 rounded"
        >
          <option value="">Select Branch</option>
        </select>
        <input
          type="date"
          className="border p-2 rounded"
        />
        <input
          type="date"
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}

export default Filtersalary;
