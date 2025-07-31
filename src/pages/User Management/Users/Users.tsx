import React, { useState } from "react";
import StatsCard from "../../../components/Usermanagement/Users/StatsCard";
import Filtericon from "../../../assets/filtericon.png";
import { IoAdd } from "react-icons/io5";
import AddUser from "../../../components/Usermanagement/Users/AddUser";

// Filter Card Component
const FilterCard = ({
  label,
  options,
  type = "select",
}: {
  label: string;
  options?: string[];
  type?: "select";
}) => (
  <div className="flex flex-col flex-1 ">
    <label className="text-sm font-medium text-[#716F6F] mb-1">{label}</label>
    <select className="w-full text-[#716F6F] bg-white outline-none border border-[#716F6F] rounded-md px-4 py-2 shadow-sm hover:border-[#1BBFCA]">
      <option value="">{`Select ${label}`}</option>
      {options?.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);


const Users = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div className="relative">
      {/* 🔹 Background Blur Container */}
      <div className={`${showAddUser ? "blur-sm pointer-events-none" : ""}`}>
        <h1 className="font-semibold text-[#3B3939] pl-4 mb-2">Admin Users</h1>

       <div className="pr-3"> <StatsCard /></div>

        {/* Filter & Add User Buttons */}
        <div className="flex justify-between items-center pl-4 pt-4">
          <button
            className="flex items-center gap-2 bg-[#1BBFCA] text-white font-semibold px-4 py-2 rounded-md shadow-sm"
            onClick={() => setShowFilter(!showFilter)}
          >
            <img src={Filtericon} alt="Filter icon" className="w-5 h-5" />
            {showFilter ? "Hide Filter" : "Show Filter"}
          </button>

          <button
            className="h-10 w-32 bg-[#1BBFCA] text-white rounded-md flex items-center justify-center gap-1"
            onClick={() => setShowAddUser(true)}
          >
            <IoAdd size={18} />
            Add User
          </button>
        </div>

        {/* Filter Section */}
        {showFilter && (
          <div className="grid grid-cols-1 gap-4 px-6 pt-4 transition-all duration-300">
            <div>
              <input
                type="text"
                placeholder="Search Admin User"
                className="w-96 px-4 py-2 border-[#716F6F] rounded-md outline-none text-[#716F6F] border hover:border-[#1BBFCA] hover:border-2"
              />
            </div>

            <div className="flex gap-4 w-full h-20 px-3 py-2 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              <FilterCard label="Status" options={["Active", "Not Active"]} />
              <FilterCard label="Role" options={["Admin", "Moderator"]} />
            </div>
          </div>
        )}
      </div>

      {/* 🔹 Modal with Overlay */}
      {showAddUser && (
        <>
          {/* Dimmed Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" />

          {/* Modal Component */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <AddUser onClose={() => setShowAddUser(false)} />
          </div>
        </>
      )}
    </div>
  );
};


export default Users;
