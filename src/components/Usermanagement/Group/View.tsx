import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "../../../features/Users_Management/Group/reducers/selectors";
import { GetViewGroupthunks } from "../../../features/Users_Management/Group/reducers/thunks";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";

export default function View() {
  const permissions = ["Read", "Create", "Update", "Delete"] as const;
  type Permission = (typeof permissions)[number];

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const groupView = useSelector(selectView);

  const modules = Array.isArray(groupView) ? groupView : [];

  useEffect(() => {
    const ParamsData = {
      role: id,
    };
    dispatch(GetViewGroupthunks(ParamsData));
  }, [dispatch, id]);

  const [state, setState] = useState<
    Record<string, Record<Permission, boolean>>
  >({});

  useEffect(() => {
    if (modules.length > 0) {
      const initialState = modules.reduce(
        (acc: Record<string, Record<Permission, boolean>>, module: any) => {
          const moduleKey = module._id;
          const modulePermissions: Record<Permission, boolean> = {
            Read: false,
            Create: false,
            Update: false,
            Delete: false,
          };

          // ✅ Use `code` instead of `permission` to decide checked state
          modulePermissions.Read = !!module.read_permission?.code;
          modulePermissions.Create = !!module.create_permission?.code;
          modulePermissions.Update = !!module.update_permission?.code;
          modulePermissions.Delete = !!module.delete_permission?.code;

          acc[moduleKey] = modulePermissions;
          return acc;
        },
        {}
      );

      setState(initialState);
    }
  }, [modules]);

  const [activeFilters, setActiveFilters] = useState<Set<Permission>>(
    new Set()
  );

  const filteredModules = modules.filter((module: any) => {
    if (activeFilters.size === 0) return true;
    const perms = state[module._id];
    if (!perms) return false;
    for (const f of activeFilters) {
      if (perms[f]) return true;
    }
    return false;
  });

  if (!groupView) {
    return (
      <div className="min-h-screen bg-white p-4 sm:p-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <Button
            onClick={() => navigate("/group")}
            className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-2 sm:p-3"
          >
            <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>
        </div>
        <div className="flex justify-center items-center h-48 sm:h-64">
          <div className="text-gray-500 text-sm sm:text-base">Loading permissions...</div>
        </div>
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="min-h-screen bg-white p-4 sm:p-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <Button
            onClick={() => navigate("/group")}
            className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-2 sm:p-3"
          >
            <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>
        </div>
        <div className="flex justify-center items-center h-48 sm:h-64">
          <div className="text-gray-500 text-sm sm:text-base">No permissions found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <div className="flex items-center mb-6 sm:mb-8">
        <Button
          onClick={() => navigate("/group")}
          className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-2 sm:p-3"
        >
<ArrowLeft style={{ width: "28px", height: "28px" }} />
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
        {permissions.map((permission) => {
          const isActive = activeFilters.has(permission);
          const anyActive = activeFilters.size > 0;
          return (
            <button
              key={permission}
              onClick={() => {
                setActiveFilters((prev) => {
                  if (prev.has(permission)) {
                    return new Set();
                  } else {
                    return new Set([permission]);
                  }
                });
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-md font-medium transition-colors flex items-center gap-1 border border-[#1BBFCA] text-xs sm:text-sm
                ${
                  isActive
                    ? "bg-[#1BBFCA] text-white"
                    : anyActive
                    ? "bg-white text-[#1BBFCA]"
                    : "bg-white text-[#1BBFCA] hover:bg-[#1BBFCA] hover:text-white"
                }`}
            >
              {permission}
            </button>
          );
        })}
      </div>

      {/* Permissions Grid */}
      <div className="space-y-3 sm:space-y-4">
        {filteredModules.map((module: any) => {
          const moduleKey = module._id;
          return (
            <div
              key={moduleKey}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 text-[#7D7D7D] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow"
            >
              {/* Module Name */}
              <div className="text-sm sm:text-base font-medium text-[#7D7D7D] mb-3 sm:mb-0 sm:w-48 lg:w-64 xl:w-80 break-words">
                {module.identity}
              </div>

              {/* Permission Checkboxes */}
              <div className="grid grid-cols-2 sm:flex sm:flex-1 sm:justify-evenly gap-3 sm:gap-4">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      checked={state[moduleKey]?.[permission] || false}
                      disabled
                      className="w-4 h-4 sm:w-5 sm:h-5 appearance-none rounded-md border border-gray-300 bg-white
                        checked:bg-green-500 checked:border-green-500
                        checked:before:content-['✓'] checked:before:block checked:before:text-white
                        checked:before:text-center checked:before:font-bold checked:before:leading-[1rem] sm:checked:before:leading-[1.1rem]"
                    />
                    <label
                      htmlFor={`${moduleKey}-${permission}`}
                      className="text-xs sm:text-sm text-gray-600 cursor-pointer whitespace-nowrap"
                    >
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}