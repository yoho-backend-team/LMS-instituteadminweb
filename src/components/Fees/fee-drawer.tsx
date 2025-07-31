"use client"
import type React from "react"
import { X } from "lucide-react"

interface Fee {
  id: string
  transactionId: string
  name: string
  email: string
  amount: string
  date: string
  status: string
}

interface FeeDrawerProps {
  isOpen: boolean
  onClose: () => void
  selectedFee: Fee | null
}

const FeeDrawer: React.FC<FeeDrawerProps> = ({ isOpen, onClose, selectedFee }) => {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")
    onClose()
  }

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-xl z-50 overflow-y-auto transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-500">{selectedFee ? "Edit Fee" : "Add Fee"}</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700">Select Branch</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1">
              <option value="">Select Branch</option>
              <option value="chennai">Chennai</option>
              <option value="bangalore">Bangalore</option>
              <option value="coimbatore">Coimbatore</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700">Select Course</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1">
              <option value="">Select Course</option>
              <option value="bca">BCA</option>
              <option value="mca">MCA</option>
              <option value="bsc">B.Sc</option>
            </select>
          </div>
          {["Batch", "Student", "Payment Date", "Transaction ID", "Paid Amount", "Balance", "Due Payment Date"].map(
            (label, i) => (
              <div key={i}>
                <label className="block text-sm text-gray-700">{label}</label>
                <input
                  type={label.toLowerCase().includes("date") ? "date" : "text"}
                  placeholder={label}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
            ),
          )}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-cyan-400 text-cyan-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-cyan-500 text-white">
              {selectedFee ? "Update Fee" : "Create Fee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeeDrawer
