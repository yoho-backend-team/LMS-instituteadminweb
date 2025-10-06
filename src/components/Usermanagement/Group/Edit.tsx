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
    <>

      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={() => navigate("/group")}
          className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
        </Button>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#1BBFCA] mb-2">Edit Group</h1>
      <p className="text-[#7D7D7D] mb-6">Set Group Permissions</p>

      {/* Group Name */}
      <label className="block mb-2 text-sm font-medium text-[#7D7D7D]">
        Group Name
      </label>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-96 mb-6 hover:border-[#1BBFCA] outline-none"
      />

      {/* Permissions Table */}
      <h2 className="text-lg font-medium text-[#7D7D7D] mb-4">Group Permissions</h2>
      <hr className="mb-6" />

      <div className="space-y-3">
        {groupView.map((module, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-6 px-6 text-[#7D7D7D] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          >
            {/* Module Name */}
            <div className="text-sm font-medium text-[#7D7D7D] w-48">
              {module.identity}
            </div>

            {/* Permission Checkboxes */}
            <div className="flex flex-1 justify-evenly">
              {permissions.map((permission) => (
                <div key={permission} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state[module.identity]?.[permission] || false}
                    onChange={() => toggleCheckbox(module.identity, permission)}
                    className="w-5 h-5 appearance-none rounded-md border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 checked:before:content-['✓'] checked:before:block checked:before:text-white checked:before:text-center checked:before:font-bold checked:before:leading-[1.1rem]"
                  />
                  <label
                    htmlFor={`${module.identity}-${permission}`}
                    className="text-sm text-gray-600 cursor-pointer"
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
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#1BBFCA] text-white rounded-lg hover:bg-[#17a8b4] transition"
        >
          Save Changes
        </button>

      </div>
    </>
  );
}

export default Edit;
