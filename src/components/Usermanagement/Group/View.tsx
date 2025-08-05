import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "../../../features/Users_Management/Group/reducers/selectors";
import { GetViewGroupthunks } from "../../../features/Users_Management/Group/reducers/thunks";

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

  const toggleCheckbox = (moduleKey: string, perm: Permission) => {
    setState((prev) => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [perm]: !prev[moduleKey][perm],
      },
    }));
  };

  if (!groupView) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div
          onClick={() => navigate("/group")}
          className="mb-4 cursor-pointer text-xl text-[#7D7D7D] hover:text-gray-500 w-fit"
        >
          <IoMdArrowRoundBack />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading permissions...</div>
        </div>
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div
          onClick={() => navigate("/group")}
          className="mb-4 cursor-pointer text-xl text-[#7D7D7D] hover:text-gray-500 w-fit"
        >
          <IoMdArrowRoundBack />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">No permissions found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div
        onClick={() => navigate("/group")}
        className="mb-4 cursor-pointer text-xl text-[#7D7D7D] hover:text-gray-500 w-fit"
      >
        <IoMdArrowRoundBack />
      </div>

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
                    return new Set();
                  } else {
                    return new Set([permission]);
                  }
                });
              }}
              className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-1 border border-[#1BBFCA]
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

      <div className="space-y-3">
        {filteredModules.map((module: any) => {
          const moduleKey = module._id;
          return (
            <div
              key={moduleKey}
              className="flex items-center justify-between py-6 px-6 text-[#7D7D7D] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            >
              <div className="text-sm font-medium text-[#7D7D7D] w-48">
                {module.identity}
              </div>
              <div className="flex flex-1 justify-evenly">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={state[moduleKey]?.[permission] || false}
                      onChange={() => toggleCheckbox(moduleKey, permission)}
                      className="w-5 h-5 appearance-none rounded-md border border-gray-300 bg-white
                        checked:bg-green-500 checked:border-green-500
                        checked:before:content-['✓'] checked:before:block checked:before:text-white
                        checked:before:text-center checked:before:font-bold checked:before:leading-[1.1rem]"
                    />
                    <label
                      htmlFor={`${moduleKey}-${permission}`}
                      className="text-sm text-gray-600 cursor-pointer"
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
