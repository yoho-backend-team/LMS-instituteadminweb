import type React from "react"
import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdDelete, MdEditDocument } from "react-icons/md"
import { FaEye } from "react-icons/fa"

interface DropdownMenuProps {
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <BsThreeDotsVertical className="text-[#1BBFCA]" />
      </button>
      {open && (
        <div className="absolute grid right-0 mt-2 p-3 gap-2 w-32 h-42 bg-white text-[#716F6F] border rounded-lg shadow-md z-10">
          <button
            onClick={() => {
              onView()
              setOpen(false)
            }}
            className="w-full flex border px-3 py-2 text-left text-sm rounded-md hover:text-white hover:bg-[#1BBFCA]"
          >
            <FaEye className="mt-1 mr-2" />
            View
          </button>
          <button
            onClick={() => {
              onEdit()
              setOpen(false)
            }}
            className="w-full flex border px-3 py-2 text-left text-sm rounded-md hover:text-white hover:bg-[#1BBFCA]"
          >
            <MdEditDocument className="mt-1 mr-2" />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="w-full flex border px-3 py-2 text-left text-sm rounded-md hover:text-white hover:bg-[#1BBFCA]"
          >
            <MdDelete className="mt-1 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
