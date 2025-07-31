"use client"
import type React from "react"
import { useState } from "react"
import { FaSlidersH } from "react-icons/fa"
import FeesFilter from "./fees-filter"
import FeesTableRow from "./fees-table-row"
import FeeDrawer from "./fee-drawer"

interface Fee {
  id: string
  transactionId: string
  name: string
  email: string
  amount: string
  date: string
  status: string
}

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
    id: "#31-2",
    transactionId: "198",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$10000",
    date: "2025-05-07",
    status: "Active",
  },
  {
    id: "#31-3",
    transactionId: "198",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$10000",
    date: "2025-05-07",
    status: "Active",
  },
  {
    id: "#31-4",
    transactionId: "198",
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    amount: "$10000",
    date: "2025-05-07",
    status: "Active",
  },
]

const FeesTable: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null)

  const handleEdit = (fee: Fee) => {
    setSelectedFee(fee)
    setShowDrawer(true)
  }

  const handleView = (fee: Fee) => {
    console.log("View fee:", fee)
    // Add view logic here
  }

  const handleDelete = (fee: Fee) => {
    console.log("Delete fee:", fee)
    // Add delete logic here
  }

  const handleDownload = (fee: Fee) => {
    console.log("Download fee:", fee)
    // Add download logic here
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 border border-cyan-400">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-xl font-semibold">Fees</h2>
          <button
            onClick={() => {
              setSelectedFee(null)
              setShowDrawer(true)
            }}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            + Add Fee
          </button>
        </div>

        {/* Filter Toggle */}
        <button
          className="bg-cyan-500 text-white px-4 py-2 rounded-md mb-4 flex items-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaSlidersH className="text-lg" />
          {showFilter ? "Hide" : "Show Filter"}
        </button>

        {/* Filter Section */}
        {showFilter && <FeesFilter />}

        {/* Table */}
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
              {feesData.map((fee) => (
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

      {/* Drawer Form */}
      <FeeDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} selectedFee={selectedFee} />
    </>
  )
}

export default FeesTable
