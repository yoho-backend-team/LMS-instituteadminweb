
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MoreVertical, Eye, Edit, Trash2, Download, X } from "lucide-react"
import type { Fee } from "../../components/Fees/types"
import { useDispatch } from "react-redux"
import { DeleteAll } from "../../features/Payment_Managemant/salary/fees/services"
import jsPDF from "jspdf"


interface FeesTableRowProps {
  fee: any
  onView: (fee: Fee) => void
  onEdit: (fee: Fee) => boolean
  onDelete: (fee: Fee) => void
  onDownload: (fee: Fee) => void
}

export const FeesTableRow: React.FC<FeesTableRowProps> = ({ fee, onEdit }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [FeeDetailsDrawer, setFeeDetailsDrawer] = useState(false)
  const dropdownRef = useRef<HTMLTableRowElement>(null)

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

  const handleActionClick = () => {
    setShowDropdown(!showDropdown)
  }

  const dispatch = useDispatch<any>()

  const handleDeleteClick = async (uuid: any) => {
    const transaction_id = "67f3b8ffb8d2634300cc881d"

    if (transaction_id) {
      const response = await DeleteAll({ uuid })
      setShowDropdown(false)
    } else {
      console.warn("No transaction_id found for this fee.")
    }
  }

  const handleDownloadClick = (fee: any) => {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text("Fee Details", 20, 20)

    doc.setFontSize(12)
    const feeData = [
      `Transaction ID: ${fee.payment_history?.[0]?.transaction_id || "N/A"}`,
      `Student Name: ${fee.student.full_name || "N/A"}`,
      `Student Email: ${fee.student.email || "N/A"}`,
      `Student ID: ${fee.student?.id || "N/A"}`,
      `Roll No: ${fee.student?.roll_no || "N/A"}`,
      `Paid Amount: ${fee.paid_amount || "N/A"}`,
      `Payment Date: ${fee.payment_history?.[0]?.payment_date
        ? new Date(fee.payment_history[0].payment_date).toISOString().split("T")[0]
        : "N/A"
      }`,
      `Created At: ${fee.createdAt || "N/A"}`,
      `Status: ${fee.is_active ? "Active" : "Inactive"}`
    ]

    let y = 30
    feeData.forEach((line) => {
      doc.text(line, 20, y)
      y += 10
    })

    const fileName = `Fee_${fee.student.full_name?.replace(/\s+/g, "_") || "student"}_${fee.id}.pdf`
    doc.save(fileName)

    setShowDropdown(false)
  }



  return (
    <>
      <tr ref={dropdownRef}>
        <td className="px-4 py-3">{fee.id}</td>
        <td className="px-4 py-3">
          {fee.payment_history?.[0]?.transaction_id ? fee.payment_history[0].transaction_id : "No Data"}
        </td>
        <td className="px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
            {fee?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-[#1c1c1c]">{fee.student.full_name}</p>
            <p className="text-xs text-gray-500">{fee.student.email}</p>
          </div>
        </td>
        <td className="px-4 py-3">{fee.paid_amount}</td>

        <td className="px-4 py-3">
          {new Date(fee.createdAt).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </td>

        <td className="px-4 py-3">
          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">
            {fee.is_active ? "Active" : "InActive"}
          </span>
        </td>
        <td className="px-4 py-3 text-gray-600 relative">
          <MoreVertical className="text-xl cursor-pointer" onClick={handleActionClick} />
          {showDropdown && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
              <div className="py-2">
                <button
                  onClick={() => setFeeDetailsDrawer(true)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => onEdit(fee)}>
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(fee?.student?.uuid)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => handleDownloadClick(fee)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          )}
        </td>
      </tr>

      {FeeDetailsDrawer && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-40">
          <div className="h-full w-full sm:w-[400px] bg-white shadow-xl overflow-y-auto transition-transform duration-300 translate-x-0">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Fees Details</h2>
                <button onClick={() => setFeeDetailsDrawer(false)} className="text-gray-600 hover:text-gray-800">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-cyan-500 rounded-full overflow-hidden border-2 border-gray-200 mb-3 flex items-center justify-center text-white text-4xl font-bold">
                  {fee?.name?.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-lg text-gray-800">{fee.student.full_name}</p>
                <p className="text-sm text-gray-500">{fee.student.email}</p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Details:</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Transaction ID</label>
                  <input
                    type="text"
                    value={fee.payment_history?.[0]?.transaction_id || "N/A"}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Student Name</label>
                  <input
                    type="text"
                    value={fee.student.full_name || "N/A"}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Student Email</label>
                  <input
                    type="email"
                    value={fee.student.email || "N/A"}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Student ID</label>
                  <input
                    type="text"
                    value={fee.student?.id || "N/A"}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Roll No</label>
                  <input
                    type="text"
                    value={fee.student.roll_no || "N/A"}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Paid Amount</label>
                  <input
                    type="text"
                    value={fee.paid_amount || "N/A"}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Payment Date</label>
                  <input
                    type="date"
                    value={
                      fee.payment_history?.[0]?.payment_date
                        ? new Date(fee.payment_history[0].payment_date).toISOString().split("T")[0]
                        : ""
                    }
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setFeeDetailsDrawer(false)}
                    className="px-4 py-2 rounded-md border border-cyan-400 text-cyan-600 hover:bg-cyan-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeeDetailsDrawer(false)}
                    className="px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600"
                  >
                    Close
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
