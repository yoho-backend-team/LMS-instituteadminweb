"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MoreVertical } from "lucide-react"
import { FeesActionDropdown } from "../../components/Fees/fees-action-dropdown"
import type { Fee } from "../../components/Fees/types"

interface FeesTableRowProps {
  fee: Fee
  onView: (fee: Fee) => void
  onEdit: (fee: Fee) => void
  onDelete: (fee: Fee) => void
  onDownload: (fee: Fee) => void
}

export const FeesTableRow: React.FC<FeesTableRowProps> = ({ fee, onView, onEdit, onDelete, onDownload }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside [^1]
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleActionClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  const handleDropdownAction = (action: string) => {
    setShowDropdown(false)
    switch (action) {
      case "view":
        onView(fee)
        break
      case "edit":
        onEdit(fee)
        break
      case "delete":
        onDelete(fee)
        break
      case "download":
        onDownload(fee)
        break
    }
  }

  return (
    <tr>
      <td className="px-4 py-3">{fee.id.split("-")[0]}</td> {/* Display original ID without suffix */}
      <td className="px-4 py-3">{fee.transactionId}</td>
      <td className="px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
          {fee.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-[#1c1c1c]">{fee.name}</p>
          <p className="text-xs text-gray-500">{fee.email}</p>
        </div>
      </td>
      <td className="px-4 py-3">{fee.amount}</td>
      <td className="px-4 py-3">{fee.date}</td>
      <td className="px-4 py-3">
        <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">{fee.status}</span>
      </td>
      <td className="px-4 py-3 text-gray-600 relative">
        <MoreVertical className="text-xl cursor-pointer" onClick={handleActionClick} />
        {showDropdown && <FeesActionDropdown ref={dropdownRef} onAction={handleDropdownAction} />}
      </td>
    </tr>
  )
}
