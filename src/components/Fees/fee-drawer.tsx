"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { Fee } from "./types"
// Updated import path for createpaymentdata
import { createpaymentdata } from "../../features/Payment_Management/Services/Payment"

interface FeeDrawerProps {
  isOpen: boolean
  onClose: () => void
  selectedFee: Fee | null
  onSuccess: () => void
  onAddFee: (newFee: Fee) => void
  onUpdateFee: (updatedFee: Fee) => void
}

export const FeeDrawer: React.FC<FeeDrawerProps> = ({
  isOpen,
  onClose,
  selectedFee,
  onSuccess,
  onAddFee,
  onUpdateFee,
}) => {
  const [branch, setBranch] = useState("")
  const [course, setCourse] = useState("")
  const [batch, setBatch] = useState("")
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [paidAmount, setPaidAmount] = useState("")
  const [balance, setBalance] = useState("")
  const [dueDate, setDueDate] = useState("")

  useEffect(() => {
    if (isOpen) {
      if (selectedFee) {
        // Edit mode: populate fields with selected fee data
        setTransactionId(selectedFee.transactionId)
        // Use selectedFee.paid_amount and selectedFee.payment_date for consistency
        setPaidAmount(selectedFee.paid_amount)
        setPaymentDate(selectedFee.payment_date === "N/A" ? "" : selectedFee.payment_date)
        setStudentName(selectedFee.name) // Populate student name for display
        setStudentEmail(selectedFee.email) // Populate student email for display
        setBalance(selectedFee.balance)
        setDueDate(selectedFee.duepaymentdate === "NA" ? "" : selectedFee.duepaymentdate)
        setBranch(selectedFee.branch_id) // Assuming branch_id maps to branch selection
        setCourse(selectedFee.course_name)
        setBatch(selectedFee.batch_name)
      } else {
        // Add mode: clear all fields
        setBranch("")
        setCourse("")
        setBatch("")
        setStudentName("")
        setStudentEmail("")
        setPaymentDate("")
        setTransactionId("")
        setPaidAmount("")
        setBalance("")
        setDueDate("")
      }
    }
  }, [isOpen, selectedFee]) // [^2]

  // Function to handle updating an existing fee
  const handleUpdateFeeLogic = () => {
    if (selectedFee) {
      const updatedFee: Fee = {
        ...selectedFee,
        transactionId: transactionId,
        paid_amount: paidAmount, // Updated to use paid_amount
        payment_date: paymentDate, // Updated to use payment_date
        balance: balance,
        duepaymentdate: dueDate,
        batch_name: batch,
        branch_id: branch,
        course_name: course,
      }
      onUpdateFee(updatedFee)
      console.log("Updated fee:", updatedFee)
      // Do NOT call onSuccess() for edit operations
    }
  }

  // Function to handle adding a new fee
  const handleAddFeeLogic = async () => {
    const newFee: Fee = {
      id: `#${Date.now().toString()}`, // Using full timestamp for better uniqueness
      transactionId: transactionId || "N/A", // Re-added
      institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529", // Your hardcoded institute ID
      name: studentName || "N/A", // Re-added
      email: studentEmail || "N/A", // Re-added
      status: "Active", // Default status for new fees, re-added
      balance: balance || "$0",
      batch_name: batch || "N/A",
      branch_id: branch || "N/A", // Use selected branch
      course_name: course || "N/A", // Use selected course
      duepaymentdate: dueDate || "NA",
      paid_amount: paidAmount || "$0",
      payment_date: paymentDate || "NA",
    }
    // Await the data creation before updating local state/parent
    await createpaymentdata(newFee)
    onAddFee(newFee) // This calls the parent's handleAddFee
    console.log("New fee added:", newFee)
    onSuccess() // Call onSuccess() for add operations
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFee) {
      handleUpdateFeeLogic()
    } else {
      handleAddFeeLogic()
    }
    onClose() // Always close the drawer
  }

  if (!isOpen) return null

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-xl z-50 overflow-y-auto transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{selectedFee ? "Edit Fees" : "Add Fees"}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>
        {selectedFee && (
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-cyan-500 rounded-full overflow-hidden border-2 border-gray-200 mb-3 flex items-center justify-center text-white text-4xl font-bold">
              {selectedFee.name.charAt(0).toUpperCase()}
            </div>
            <p className="font-semibold text-lg text-gray-800">{selectedFee.name}</p>
            <p className="text-sm text-gray-500">{selectedFee.email}</p>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {selectedFee ? (
            // Edit mode fields
            <>
              <div>
                <label htmlFor="transaction-id-edit" className="block text-sm text-gray-700">
                  Transaction ID
                </label>
                <input
                  id="transaction-id-edit"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="paid-amount-edit" className="block text-sm text-gray-700">
                  Paid Amount
                </label>
                <input
                  id="paid-amount-edit"
                  type="text"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="payment-date-edit" className="block text-sm text-gray-700">
                  Payment Date
                </label>
                <input
                  id="payment-date-edit"
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              {/* Add other editable fields for selectedFee here if needed */}
              <div>
                <label htmlFor="balance-edit" className="block text-sm text-gray-700">
                  Balance
                </label>
                <input
                  id="balance-edit"
                  type="text"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="due-date-edit" className="block text-sm text-gray-700">
                  Due Payment Date
                </label>
                <input
                  id="due-date-edit"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="select-branch-edit" className="block text-sm text-gray-700">
                  Select Branch
                </label>
                <select
                  id="select-branch-edit"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value="">Select Branch</option>
                  <option value="chennai">Chennai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="coimbatore">Coimbatore</option>
                </select>
              </div>
              <div>
                <label htmlFor="select-course-edit" className="block text-sm text-gray-700">
                  Select Course
                </label>
                <select
                  id="select-course-edit"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  <option value="bca">BCA</option>
                  <option value="mca">MCA</option>
                  <option value="bsc">B.Sc</option>
                </select>
              </div>
              <div>
                <label htmlFor="batch-edit" className="block text-sm text-gray-700">
                  Batch
                </label>
                <input
                  id="batch-edit"
                  type="text"
                  placeholder="Batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
            </>
          ) : (
            // Add mode fields (original fields)
            <>
              
              <div>
                <label htmlFor="select-branch" className="block text-sm text-gray-700">
                  Select Branch
                </label>
                <select
                  id="select-branch"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value="">Select Branch</option>
                  <option value="chennai">Chennai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="coimbatore">Coimbatore</option>
                </select>
              </div>
              <div>
                <label htmlFor="select-course" className="block text-sm text-gray-700">
                  Select Course
                </label>
                <select
                  id="select-course"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  <option value="bca">BCA</option>
                  <option value="mca">MCA</option>
                  <option value="bsc">B.Sc</option>
                </select>
              </div>
              <div>
                <label htmlFor="batch" className="block text-sm text-gray-700">
                  Batch
                </label>
                <input
                  id="batch"
                  type="text"
                  placeholder="Batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="student-name" className="block text-sm text-gray-700">
                  Student Name
                </label>
                <input
                  id="student-name"
                  type="text"
                  placeholder="Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="student-email" className="block text-sm text-gray-700">
                  Student Email
                </label>
                <input
                  id="student-email"
                  type="email"
                  placeholder="Student Email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="payment-date" className="block text-sm text-gray-700">
                  Payment Date
                </label>
                <input
                  id="payment-date"
                  type="date"
                  placeholder="Payment Date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="transaction-id" className="block text-sm text-gray-700">
                  Transaction ID
                </label>
                <input
                  id="transaction-id"
                  type="text"
                  placeholder="Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="paid-amount" className="block text-sm text-gray-700">
                  Paid Amount
                </label>
                <input
                  id="paid-amount"
                  type="text"
                  placeholder="Paid Amount"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="balance" className="block text-sm text-gray-700">
                  Balance
                </label>
                <input
                  id="balance"
                  type="text"
                  placeholder="Balance"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="due-date" className="block text-sm text-gray-700">
                  Due Payment Date
                </label>
                <input
                  id="due-date"
                  type="date"
                  placeholder="Due Payment Date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
            </>
          )}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-cyan-400 text-cyan-600 hover:bg-cyan-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600">
              {selectedFee ? "Update Fee" : "Create Fee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
