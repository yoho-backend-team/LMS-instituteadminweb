import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CreateGroup } from "../../../features/Users_Management/Group/reducers/service";

// Helper to normalize identity strings (e.g., "Student Idcards" -> "student_idcards")
const normalizeIdentity = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/, "_");

type AccessType = "" | "Read" | "Create" | "Update" | "Delete";

interface PermissionItem {
  id: number;
  identity: string;
  access: AccessType;
}

interface OutputPermission {
  id: number;
  identity: string;
  permission: Array<Record<string, any>>; // e.g., [{ read: true, _id: "..." }]
}

interface AddNewGroupProps {
  institute_id?: string;
  defaultIdentity?: string; // group identity/name
}

function AddNewGroup({
  institute_id = "973195c0-66ed-47c2-b098-d8989d3e4529",
  defaultIdentity = "vtgyhunun",
}: AddNewGroupProps) {
  const permissionsList = [
    "Dashboard",
    "Groups",
    "Users",
    "User Details",
    "Categories",
    "Courses",
    "Course Details",
    "Branch Details",
    "Course Notes",
    "Course Modules",
    "Teaching Staffs",
    "Branches",
    "Non Teaching Staffs",
    "Students Details",
    "Batches",
    "Batch Details",
    "Offline Classes",
    "Offline Class Details",
    "Live Classes",
    "Live Class Details",
    "Student Attendance",
    "Student Attendance Details",
    "Study Materials",
    "Teaching Staff Details",
    "Non Teaching Staff Attendances",
    "Student Fee Details",
    "Non Teaching Staff Attendances Details",
    "Student Fees",
    "Staff Salaries",
    "Subscription Details",
    "Staff Notification",
    "All Notification",
    "Student Certificate",
    "Student Certificate Details",
    "Student_Idcards",
    "Student Idcards",
    "Teaching Staff Attendances",
    "Teaching Staff Attendance Details",
    "FAQS",
    "Staff-Ticket",
    "FAQ Categories",
    "Help FAQs",
    "Fees",
  ];

  const navigate = useNavigate();

  // State
  const [groupName, setGroupName] = useState(defaultIdentity);
  const [permissions, setPermissions] = useState<PermissionItem[]>(
    permissionsList.map((p, i) => ({
      id: i + 1,
      identity: p,
      access: "",
    }))
  );
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllAccess, setSelectAllAccess] = useState<AccessType>("Read");

  // Effect: when selectAll toggled, apply to all
  useEffect(() => {
    if (selectAll) {
      setPermissions((prev) =>
        prev.map((p) => ({ ...p, access: selectAllAccess }))
      );
    }
  }, [selectAll, selectAllAccess]);

  const handleSingleAccessChange = (idx: number, value: AccessType) => {
    setPermissions((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], access: value };
      return copy;
    });
  };

  const buildPayload = () => {
    const formattedPermissions: OutputPermission[] = permissions
      .filter((p) => p.access) // skip if no access selected
      .map((p) => {
        const key = p.access.toLowerCase(); // e.g., "read"
        const permissionObj: Record<string, any> = {
          _id: crypto.randomUUID(),
        };
        permissionObj[key] = true;
        return {
          id: p.id,
          identity: normalizeIdentity(p.identity),
          permission: [permissionObj],
        };
      });

    return {
      identity: groupName,
      institute_id,
      permissions: formattedPermissions,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = buildPayload();
    try{
     const response = CreateGroup(payload)
     console.log("group created",response)
    }catch(err){
      console.log("err")
    }
    console.log("Group Payload:", payload);
    // You can replace the console.log with actual API call here.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Button */}
      <div
        onClick={() => navigate("/group")}
        className="mb-4 cursor-pointer text-xl text-[#7D7D7D] hover:text-gray-500 w-fit"
      >
        <IoMdArrowRoundBack />
      </div>

      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#1BBFCA] mb-2">
        Add New Group
      </h1>
      <p className="text-[#7D7D7D] mb-6">Set Group Permissions</p>

      {/* Group Name / Identity */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-[#7D7D7D]">
          Group Name
        </label>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-96 mb-1 hover:border-[#1BBFCA] outline-none"
        />
        <p className="text-xs text-gray-500">
          This will be used as <code>identity</code> in payload.
        </p>
      </div>

      {/* Group Permissions / Select All */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex justify-between gap-3 mb-2 text-[#7D7D7D] items-center">
          <div className="flex items-center gap-2">
            <input
              id="admin-access-checkbox"
              type="checkbox"
              checked={selectAll}
              onChange={(e) => setSelectAll(e.target.checked)}
              className="w-5 h-5 rounded-md border border-gray-300"
            />
            <label htmlFor="admin-access-checkbox" className="text-sm">
              Administrator Access (Select All)
            </label>
          </div>
          {selectAll && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#7D7D7D]">Apply access:</span>
              <select
                value={selectAllAccess}
                onChange={(e) =>
                  setSelectAllAccess(e.target.value as AccessType)
                }
                className="appearance-none rounded border border-gray-300 p-1 pr-6 text-sm outline-none"
              >
                <option value="Read">Read</option>
                <option value="Create">Create</option>
                <option value="Update">Update</option>
                <option value="Delete">Delete</option>
              </select>
            </div>
          )}
        </div>
        <hr />
      </div>

      {/* Permission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {permissions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 bg-white rounded-lg p-3 shadow-sm"
          >
            <label className="text-sm font-medium text-[#7D7D7D]">
              {item.identity}
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full rounded-lg border border-gray-300 p-2 pr-8 text-sm text-[#7D7D7D] outline-none focus:ring focus:ring-[#1BBFCA]"
                value={item.access}
                onChange={(e) =>
                  handleSingleAccessChange(
                    index,
                    e.target.value as AccessType
                  )
                }
              >
                <option value="">Select access</option>
                <option value="Read">Read</option>
                <option value="Create">Create</option>
                <option value="Update">Update</option>
                <option value="Delete">Delete</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-5">
        <button
          type="button"
          onClick={() => {
            // reset behavior if needed
            setGroupName(defaultIdentity);
            setPermissions((prev) =>
              prev.map((p) => ({ ...p, access: "" as AccessType }))
            );
            setSelectAll(false);
          }}
          className="w-24 h-10 rounded-xl bg-[#1BBFCA1A] border text-sm text-[#1BBFCA] border-[#1BBFCA]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-24 h-10 rounded-xl text-white text-sm bg-[#1BBFCA]"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AddNewGroup;
