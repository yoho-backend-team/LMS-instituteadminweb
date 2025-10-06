/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetViewCard, UpdateGroup } from "../../../features/Users_Management/Group/reducers/service";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";

const permissions = ["Read", "Create", "Update", "Delete"] as const;
type Permission = (typeof permissions)[number];

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation()
  const { grpName } = location.state

  // const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [groupView, setGroupView] = useState<any[]>([]);
  const [state, setState] = useState<Record<string, Record<Permission, boolean>>>({});

  // Load group details from API
  useEffect(() => {
    const fetchGroup = async () => {
      if (!id) return;
      try {
        // setLoading(true);
        const res = await GetViewCard({ role: id });
        const data = res?.data || [];

        setGroupView(data);

        if (data.length > 0) {
          setGroupName(grpName || "");

          const initialState = data.reduce((acc: any, module: any) => {
            acc[module.identity] = {
              Read: !!module.read_permission?.permission,
              Create: !!module.create_permission?.permission,
              Update: !!module.update_permission?.permission,
              Delete: !!module.delete_permission?.permission,
            };
            return acc;
          }, {});
          setState(initialState);
        }
      } catch (err) {
        console.error("Error fetching group:", err);
      } finally {
        // setLoading(false);
      }
    };
    fetchGroup();
  }, [grpName, id]);

  // Toggle a single checkbox
  const toggleCheckbox = (moduleName: string, perm: Permission) => {
    setState((prev) => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        [perm]: !prev[moduleName]?.[perm],
      },
    }));
  };

  // Save changes
  const handleSave = async () => {
    try {
      const payload = {
        id: Number(id), // backend expects the group id
        identity: groupName, // backend calls group name "identity"
        institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
        permissions: Object.entries(state).map(([module, perms]) => ({
          identity: module, // match backend naming
          read: perms.Read,
          create: perms.Create,
          update: perms.Update,
          delete: perms.Delete,
        })),
      };

      await UpdateGroup(payload); // Submit to backend

      toast("Group updated successfully");
      navigate("/group"); // go back to list after update
    } catch (err) {
      console.error("Update failed", err);
      toast("Failed to update group");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <div className="flex items-center mb-6 sm:mb-8">
        <Button
          onClick={() => navigate("/group")}
          className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-2 sm:p-3"
        >
          <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
        </Button>
      </div>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1BBFCA] mb-2">
          Edit Group
        </h1>
        <p className="text-sm sm:text-base text-[#7D7D7D]">
          Set Group Permissions
        </p>
      </div>

      {/* Group Name */}
      <div className="mb-6 sm:mb-8">
        <label className="block mb-2 text-sm sm:text-base font-medium text-[#7D7D7D]">
          Group Name
        </label>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full sm:w-96 border border-gray-300 rounded-lg p-3 hover:border-[#1BBFCA] focus:border-[#1BBFCA] outline-none transition-colors"
        />
      </div>

      {/* Permissions Table */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-medium text-[#7D7D7D] mb-4">
          Group Permissions
        </h2>
        <hr className="mb-4 sm:mb-6" />
      </div>

      {/* Permissions Grid */}
      <div className="space-y-3 sm:space-y-4 mb-8">
        {groupView.map((module, index) => (
          <div
            key={index}
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
                    checked={state[module.identity]?.[permission] || false}
                    onChange={() => toggleCheckbox(module.identity, permission)}
                    className="w-4 h-4 sm:w-5 sm:h-5 appearance-none rounded-md border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 checked:before:content-['✓'] checked:before:block checked:before:text-white checked:before:text-center checked:before:font-bold checked:before:leading-[1rem] sm:checked:before:leading-[1.1rem] cursor-pointer"
                  />
                  <label
                    htmlFor={`${module.identity}-${permission}`}
                    className="text-xs sm:text-sm text-gray-600 cursor-pointer whitespace-nowrap"
                  >
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-6 py-3 bg-[#1BBFCA] text-white rounded-lg hover:bg-[#17a8b4] transition-colors text-sm sm:text-base font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Edit;