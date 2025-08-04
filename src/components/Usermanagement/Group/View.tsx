import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "../../../features/Users_Management/Group/reducers/selectors";
import { GetViewGroupthunks } from "../../../features/Users_Management/Group/reducers/thunks";

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

   const { id } = useParams<{ id: string }>();
   console.log("View")

  const navigate = useNavigate();
    //integration
 const dispatch = useDispatch<any>();
const groupView = useSelector(selectView);

useEffect(() => {
  const ParamsData = {
    role:id, 
  };
  dispatch(GetViewGroupthunks(ParamsData));
}, [dispatch]);

console.log(groupView, "response");

  // Track checkbox state per module+permission
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

  // Active filters set
  const [activeFilters, setActiveFilters] = useState<Set<Permission>>(new Set());

  const toggleFilter = (perm: Permission) => {
    setActiveFilters((prev) => {
      const copy = new Set(prev);
      if (copy.has(perm)) copy.delete(perm);
      else copy.add(perm);
      return copy;
    });
  };

  // Filter modules based on active filters
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

  const isReadActive = activeFilters.has("Read");

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Back button */}
      <div
        onClick={() => navigate("/group")}
        className="mb-4 cursor-pointer text-xl text-[#7D7D7D] hover:text-gray-500 w-fit"
      >
        <IoMdArrowRoundBack />
      </div>
   {/* Filter Buttons */}
<div className="flex gap-3 mb-8">
  {permissions.map((permission) => {
    const isActive = activeFilters.has(permission);
    const anyActive = activeFilters.size > 0;

    return (
      <button
        key={permission}
        onClick={() => {
          setActiveFilters((prev) => {
            if (prev.has(permission)) {
              return new Set(); // clear if clicked again
            } else {
              return new Set([permission]); // only this active
            }
          });
        }}
        className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-1 border border-[#1BBFCA]
          ${
            isActive
              ? "bg-[#1BBFCA] text-white" // Active state
              : anyActive
              ? "bg-white text-[#1BBFCA]" // Inactive when another active
              : "bg-white text-[#1BBFCA] hover:bg-[#1BBFCA] hover:text-white"
          }`}
      >
        {permission}
      </button>
    );
  })}
</div>
      {/* Permissions Table */}
      <div className="space-y-3">
        {filteredModules.map((module, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-6 px-6 text-[#7D7D7D] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          >
            {/* Module name */}
            <div className="text-sm font-medium text-[#7D7D7D] w-48">
              {module}
            </div>

            {/* Permission checkboxes */}
            <div className="flex flex-1 justify-evenly">
              {permissions.map((permission) => (
                <div key={permission} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state[module][permission]}
                    onChange={() => toggleCheckbox(module, permission)}
                    className="w-5 h-5 appearance-none rounded-md border border-gray-300 bg-white
                      checked:bg-green-500 checked:border-green-500
                      checked:before:content-['✓'] checked:before:block checked:before:text-white
                      checked:before:text-center checked:before:font-bold checked:before:leading-[1.1rem]"
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
