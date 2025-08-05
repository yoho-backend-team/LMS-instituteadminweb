"use client"

import type React from "react"
import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { FeesFilter } from "../../components/Fees/fees-filter"
import { FeesTableRow } from "../../components/Fees/fees-table-row"
import { FeeDrawer } from "../../components/Fees/fee-drawer"
import { FeeDetailsDrawer } from "../../components/Fees/fee-details-drawer"
import { ConfirmationModal } from "../../components/Fees/confirmation-modal"
import { SuccessModal } from "../../components/Fees/success-modal"
import type { Fee } from "../../components/Fees/types"

const feesData: Fee[] = [
  {
    id: "#28",
    transactionId: "N/A",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$0",
    date: "N/A",
    status: "Active",
  },
  {
    id: "#30",
    transactionId: "N/A",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$0",
    date: "N/A",
    status: "Active",
  },
  {
    id: "#31",
    transactionId: "198",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$10000",
    date: "2025-05-07",
    status: "Active",
  },
  {
    id: "#34",
    transactionId: "123456",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$5000",
    date: "2025-05-07",
    status: "Active",
  },
  {
    id: "#31-2", // Unique ID for React key, display will be #31
    transactionId: "198",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$10000",
    date: "2025-05-07",
    status: "Active",
  },
  {
    id: "#31-3", // Unique ID for React key, display will be #31
    transactionId: "198",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$10000",
    date: "2025-05-07",
    status: "Active",
  },
  {
    id: "#31-4", // Unique ID for React key, display will be #31
    transactionId: "198",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$10000",
    date: "2025-05-07",
    status: "Active",
  },
]

export const FeesTable: React.FC = () => {
  const [currentFeesData, setCurrentFeesData] = useState<Fee[]>(feesData)
  const [showFilter, setShowFilter] = useState(false)
  const [showEditAddDrawer, setShowEditAddDrawer] = useState(false)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null)
  const [actionToPerform, setActionToPerform] = useState<string | null>(null)

  const handleAddFee = (newFee: Fee) => {
    setCurrentFeesData((prevData) => [...prevData, newFee])
  }

  const handleUpdateFee = (updatedFee: Fee) => {
    setCurrentFeesData((prevData) => prevData.map((fee) => (fee.id === updatedFee.id ? updatedFee : fee)))
  }

  const handleEdit = (fee: Fee) => {
    setSelectedFee(fee)
    setShowEditAddDrawer(true) // Directly open the edit drawer
    setShowDetailsDrawer(false) // Ensure other drawers are closed
    setShowConfirmationModal(false) // Ensure confirmation modal is closed
    setShowSuccessModal(false) // Ensure success modal is closed
  }

  const handleView = (fee: Fee) => {
    setSelectedFee(fee)
    setShowDetailsDrawer(true)
    setShowEditAddDrawer(false)
    setShowConfirmationModal(false)
    setShowSuccessModal(false)
  }

  const handleDelete = (fee: Fee) => {
    setSelectedFee(fee)
    setActionToPerform("delete")
    setShowConfirmationModal(true)
  }

  const handleDownload = (fee: Fee) => {
    setSelectedFee(fee)
    console.log("Downloading fee:", fee) // Directly perform download action
    // No confirmation modal or success modal for download
  }

  const handleConfirm = () => {
    setShowConfirmationModal(false)
    if (!selectedFee || !actionToPerform) return

    switch (actionToPerform) {
      case "delete":
        console.log("Deleting fee:", selectedFee)
        setCurrentFeesData((prevData) => prevData.filter((feeItem) => feeItem.id !== selectedFee.id))
        setShowSuccessModal(true)
        break
      // The 'download' case is removed as it's handled directly in handleDownload
    }
    setActionToPerform(null)
  }

  const getConfirmationMessage = () => {
    if (!actionToPerform || !selectedFee) return ""
    switch (actionToPerform) {
      case "edit":
        return `Are you sure you want to edit fee ID ${selectedFee.id.split("-")[0]}?`
      case "delete":
        return `Are you sure you want to delete fee ID ${selectedFee.id.split("-")[0]}? This action cannot be undone.`
      case "download":
        return `Are you sure you want to download details for fee ID ${selectedFee.id.split("-")[0]}?`
      default:
        return "Are you sure you want to proceed with this action?"
    }
  }

  const getConfirmationTitle = () => {
    if (!actionToPerform) return "Confirm Action"
    switch (actionToPerform) {
      case "edit":
        return "Confirm Edit"
      case "delete":
        return "Confirm Deletion"
      case "download":
        return "Confirm Download"
      default:
        return "Confirm Action"
    }
  }

  const getConfirmButtonText = () => {
    if (!actionToPerform) return "Yes"
    switch (actionToPerform) {
      case "edit":
        return "Yes, Edit"
      case "delete":
        return "Yes, Delete"
      case "download":
        return "Yes, Download"
      default:
        return "Yes"
    }
  }

  return (
    <>
      <div className="rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Fees</h2>
        <div className="flex justify-between items-center mb-7 mt-7">
          <div className="flex items-center gap-4">
            <button
              className="bg-cyan-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              onClick={() => setShowFilter(!showFilter)}
            >
              <SlidersHorizontal className="text-lg" />
              {showFilter ? "Hide" : "Show Filter"}
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedFee(null)
              setShowEditAddDrawer(true)
              setShowDetailsDrawer(false)
              setShowConfirmationModal(false)
              setShowSuccessModal(false)
            }}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            + Add Fee
          </button>
        </div>
        {showFilter && <FeesFilter />}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Transaction ID</th>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Amount Paid</th>
                <th className="px-4 py-3 font-medium">Issued Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFeesData.map((fee) => (
                <FeesTableRow
                  key={fee.id}
                  fee={fee}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <FeeDrawer
        isOpen={showEditAddDrawer}
        onClose={() => setShowEditAddDrawer(false)}
        selectedFee={selectedFee}
        onSuccess={() => setShowSuccessModal(true)}
        onAddFee={handleAddFee}
        onUpdateFee={handleUpdateFee} // Pass the new update handler
      />
      <FeeDetailsDrawer isOpen={showDetailsDrawer} onClose={() => setShowDetailsDrawer(false)} fee={selectedFee} />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirm}
        title={getConfirmationTitle()}
        message={getConfirmationMessage()}
        confirmButtonText={getConfirmButtonText()}
      />
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Success!" />
    </>
  )
}
