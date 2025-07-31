"use client"
import { forwardRef } from "react"
import { Eye, Edit, Trash2, Download } from "lucide-react"

interface FeesActionDropdownProps {
  onAction: (action: string) => void
}

const FeesActionDropdown = forwardRef<HTMLDivElement, FeesActionDropdownProps>(({ onAction }, ref) => {
  return (
    <div ref={ref} className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
      <div className="py-2">
        <button
          onClick={() => onAction("view")}
          className="w-full px-4 py-2 text-left text-sm text-white bg-cyan-500 hover:bg-cyan-600 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={() => onAction("edit")}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onAction("delete")}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={() => onAction("download")}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  )
})

FeesActionDropdown.displayName = "FeesActionDropdown"

export default FeesActionDropdown
