import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function View() {
  const modules = [
    "Dashboard",
    "Groups",
    "Users",
    "User Details",
    "Categories",
    "Courses",
    "Course Details",
    "Branch Details",
  ];

  const permissions = ["Read", "Create", "Update", "Delete"] as const;
  type Permission = (typeof permissions)[number];

  const navigate = useNavigate();

  // track checkbox state per module+permission
  const [state, setState] = useState<Record<string, Record<Permission, boolean>>>(
    () =>
      modules.reduce((acc, mod) => {
        acc[mod] = {
          Read: true,
          Create: true,
          Update: true,
          Delete: true,
        };
        return acc;
      }, {} as Record<string, Record<Permission, boolean>>)
  );

  // active filters set
  const [activeFilters, setActiveFilters] = useState<Set<Permission>>(new Set());

  const toggleFilter = (perm: Permission) => {
    setActiveFilters((prev) => {
      const copy = new Set(prev);
      if (copy.has(perm)) copy.delete(perm);
      else copy.add(perm);
      return copy;
    });
  };

  // Determine which modules to show: if no filter, show all; else show modules where any active filter permission is checked.
  const filteredModules = modules.filter((mod) => {
    if (activeFilters.size === 0) return true;
    const perms = state[mod];
    for (const f of activeFilters) {
      if (perms[f]) return true;
    }
    return false;
  });

  const toggleCheckbox = (mod: string, perm: Permission) => {
    setState((prev) => ({
      ...prev,
      [mod]: {
        ...prev[mod],
        [perm]: !prev[mod][perm],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div
        onClick={() => navigate("/group")}
        className="mb-4 cursor-pointer text-xl text-[#7D7D7D] hover:text-gray-500 w-fit"
      >
        <IoMdArrowRoundBack />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8">
        {permissions.map((permission) => (
          <button
            key={permission}
            onClick={() => toggleFilter(permission)}
            className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-1 ${
              activeFilters.has(permission)
                ? "bg-[#0faea8] text-white"
                : "bg-[#1BBFCA] text-white hover:bg-cyan-500"
            }`}
          >
            {permission}
          </button>
        ))}
      </div>

      {/* Permissions Table */}
      <div className="space-y-3">
        {filteredModules.map((module, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-6 px-6 text-[#7D7D7D] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          >
            {/* Left module name */}
            <div className="text-sm font-medium text-[#7D7D7D] w-48">{module}</div>

            {/* Checkboxes for each permission */}
            <div className="flex flex-1 justify-evenly">
              {permissions.map((permission) => (
                <div key={permission} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`${module}-${permission}`}
                    checked={state[module][permission]}
                    onChange={() => toggleCheckbox(module, permission)}
                    className="w-4 h-4 text-green-500 bg-white border-gray-300 rounded-2xl accent-green-500"
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

        {filteredModules.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No modules match the active filter(s).
          </div>
        )}
      </div>
    </div>
  );
}
