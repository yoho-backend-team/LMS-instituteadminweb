/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"
import { useState, useEffect, useRef } from "react" // Import useRef
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { ArrowLeft, ChevronDown, X } from "lucide-react"
import { Button } from "../../../components/ui/button" // Keep Button for the back button, but custom for dropdown trigger

// Assuming these are available in your project
import { CreateGroup } from "../../../features/Users_Management/Group/reducers/service"
import { GetGroupCardthunks } from "../../../features/Users_Management/Group/reducers/thunks"

const normalizeIdentity = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "_").replace(/-/, "_")

// Define the types of permissions
const permissionTypes = ["Read", "Create", "Update", "Delete"] as const
type PermissionType = (typeof permissionTypes)[number]

interface PermissionItem {
  id: number
  identity: string
  selectedPermissions: Record<PermissionType, boolean>
}

interface OutputPermission {
  id: number
  identity: string
  permission: Array<{ permission: string; granted: boolean }>
}

interface AddNewGroupProps {
  institute_id?: string
  defaultIdentity?: string
}

function AddNewGroup({
  institute_id = "973195c0-66ed-47c2-b098-d8989d3e4529",
  defaultIdentity = "",
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
  ]

  const navigate = useNavigate()
  const dispatch = useDispatch<any>()
  const [groupName, setGroupName] = useState(defaultIdentity)
  const [permissions, setPermissions] = useState<PermissionItem[]>(
    permissionsList.map((p, i) => ({
      id: i + 1,
      identity: p,
      selectedPermissions: {
        Read: false,
        Create: false,
        Update: false,
        Delete: false,
      },
    })),
  )
  const [selectAll, setSelectAll] = useState(false)

  // State and ref for custom dropdowns
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);


  useEffect(() => {
    setPermissions((prev) =>
      prev.map((p) => ({
        ...p,
        selectedPermissions: {
          Read: selectAll,
          Create: selectAll,
          Update: selectAll,
          Delete: selectAll,
        },
      })),
    )
    if (selectAll) {
      toast.success("All permissions selected")
    } else {
      toast.info("All permissions deselected")
    }
  }, [selectAll])

  // Effect to handle clicks outside custom dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownIndex !== null &&
        dropdownRefs.current[openDropdownIndex] &&
        !dropdownRefs.current[openDropdownIndex]?.contains(event.target as Node)
      ) {
        setOpenDropdownIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdownIndex])

  const handlePermissionChange = (moduleIndex: number, permissionType: PermissionType, isChecked: boolean) => {
    setPermissions((prev) => {
      const newPermissions = [...prev]
      newPermissions[moduleIndex] = {
        ...newPermissions[moduleIndex],
        selectedPermissions: {
          ...newPermissions[moduleIndex].selectedPermissions,
          [permissionType]: isChecked,
        },
      }
      const allSelected = newPermissions.every((module) => Object.values(module.selectedPermissions).every(Boolean))
      const noneSelected = newPermissions.every((module) =>
        Object.values(module.selectedPermissions).every((val) => !val),
      )
      if (selectAll && !allSelected) {
        setSelectAll(false)
      } else if (!selectAll && allSelected && !noneSelected) {
        setSelectAll(true)
      }
      return newPermissions
    })
  }

  const buildPayload = () => {
    const formattedPermissions: OutputPermission[] = permissions
      .filter((p) => Object.values(p.selectedPermissions).some(Boolean))
      .map((p) => {
        const permissionArray: Array<{ permission: string; granted: boolean }> = []
        if (p.selectedPermissions.Read) {
          permissionArray.push({ permission: "read", granted: true })
        }
        if (p.selectedPermissions.Create) {
          permissionArray.push({ permission: "create", granted: true })
        }
        if (p.selectedPermissions.Update) {
          permissionArray.push({ permission: "update", granted: true })
        }
        if (p.selectedPermissions.Delete) {
          permissionArray.push({ permission: "delete", granted: true })
        }
        return {
          id: p.id,
          identity: normalizeIdentity(p.identity),
          permission: permissionArray,
        }
      })
    return {
      identity: groupName,
      institute_id,
      permissions: formattedPermissions,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = buildPayload()
    try {
      await CreateGroup(payload)
      toast.success("Group created successfully")
      dispatch(GetGroupCardthunks({}))
      navigate("/group")
    } catch (err) {
      console.error("err creating group", err)
      toast.error("Error creating group")
    }
  }

  const reset = () => {
    setGroupName(defaultIdentity)
    setPermissions(
      permissionsList.map((p, i) => ({
        id: i + 1,
        identity: p,
        selectedPermissions: {
          Read: false,
          Create: false,
          Update: false,
          Delete: false,
        },
      })),
    )
    setSelectAll(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/group")}
        className="mb-4 text-xl text-[#7D7D7D] hover:text-gray-500"
      >
        <ArrowLeft />
        <span className="sr-only">Go back</span>
      </Button>

      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#1BBFCA] mb-2">Add New Group</h1>
      <p className="text-[#7D7D7D] mb-6">Set Group Permissions</p>

      {/* Group Name */}
      <div className="mb-6">
        <label htmlFor="group-name" className="block mb-2 text-sm font-medium text-[#7D7D7D]">
          Group Name
        </label>
        <input
          id="group-name"
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-96 mb-1 outline-none focus:ring-0"
        />
      </div>

      {/* Group Permissions Header */}
      <div className="mb-2">
        <div className="text-lg font-semibold text-[#7D7D7D]">Group Permissions</div>
      </div>

      {/* Administrator Access + Select All */}
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm text-[#7D7D7D]">Administrator Access</div>
        <label htmlFor="select-all" className="text-sm text-[#7D7D7D] flex items-center gap-2 cursor-pointer">
          <input
            id="select-all"
            type="checkbox"
            checked={selectAll}
            onChange={(e) => setSelectAll(e.target.checked)}
            className="w-4 h-4 rounded border border-gray-300 accent-[#1BBFCA]"
          />
          <span>Select All</span>
        </label>
      </div>
      <hr className="border-t border-gray-200 mb-4" />

      {/* Permission Grid with Custom Dropdowns and Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {permissions.map((item, moduleIndex) => {
          const selectedPermissionsCount = Object.values(item.selectedPermissions).filter(Boolean).length
          const hasSelectedPermissions = selectedPermissionsCount > 0
          const isOpen = openDropdownIndex === moduleIndex

          return (
            <div
              key={item.id}
              className="flex flex-col gap-2 bg-white rounded-lg p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100"
            >
              <label className="text-base font-semibold text-[#7D7D7D] mb-2">{item.identity}</label>

              {/* Custom Dropdown */}
              <div className="relative" ref={(el: any) => (dropdownRefs.current[moduleIndex] = el)}>
                <button
                  type="button"
                  onClick={() => setOpenDropdownIndex(isOpen ? null : moduleIndex)}
                  className="w-full flex justify-between items-center text-[#7D7D7D] border border-gray-300 bg-transparent h-auto min-h-[40px] py-2 px-3 rounded-lg cursor-pointer
                             outline-none focus:ring-0 hover:text-[#1BBFCA] hover:bg-transparent"
                >
                  {hasSelectedPermissions ? (
                    <div className="flex flex-wrap gap-2 justify-start items-center w-full">
                      {permissionTypes.map((type) =>
                        item.selectedPermissions[type] ? (
                          <span
                            key={type}
                            className="flex items-center gap-1 bg-[#1BBFCA1A] text-[#1BBFCA] rounded-full px-2 py-1 text-xs font-medium"
                          >
                            {type}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handlePermissionChange(moduleIndex, type, false)
                              }}
                              className="ml-1 text-[#1BBFCA] hover:text-[#1BBFCA]/80"
                              aria-label={`Remove ${type} permission`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ) : null,
                      )}
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
                    </div>
                  ) : (
                    <>
                      Select Permissions
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                    </>
                  )}
                </button>

                {isOpen && (
                  <div
                    className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg p-2"
                    style={{ width: dropdownRefs.current[moduleIndex]?.offsetWidth }} // Match width of trigger
                  >
                    {permissionTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handlePermissionChange(moduleIndex, type, !item.selectedPermissions[type])}
                        className={`
                          flex items-center justify-center w-full h-10 rounded-lg border border-gray-300 bg-white text-[#1F2D3A] cursor-pointer
                          ${item.selectedPermissions[type] ? "bg-[#1BBFCA] text-white" : ""}
                          outline-none focus:ring-0
                          hover:bg-[#1BBFCA] hover:text-white
                          mb-2 last:mb-0
                        `}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-5">
        <button
          type="button"
          onClick={reset}
          className="w-28 h-10 rounded-xl bg-[#1BBFCA1A] border text-sm text-[#1BBFCA] border-[#1BBFCA] hover:bg-[#1BBFCA] hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-28 h-10 rounded-xl text-white text-sm bg-[#1BBFCA] hover:bg-[#1BBFCA]/90 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddNewGroup
