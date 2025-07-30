import type React from "react"
import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdDelete, MdEditDocument } from "react-icons/md"

interface DropdownMenuProps {
  onEdit: () => void
  onDelete: () => void
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <BsThreeDotsVertical className="text-red-600" />
      </button>
      {open && (
        <div className="absolute grid right-0 mt-2 p-3 gap-2 w-28 bg-white text-[#716F6F] border rounded shadow-md z-10">
          <button
            onClick={() => {
              onEdit()
              setOpen(false)
            }}
            className="w-full flex border px-3 py-2 text-left text-sm rounded-md hover:text-white hover:bg-[#CA406F]"
          >
            <MdEditDocument className="mt-1 mr-2" />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="w-full flex border px-3 py-2 text-left text-sm rounded-md hover:text-white hover:bg-[#CA406F]"
          >
            <MdDelete className="mt-1 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
