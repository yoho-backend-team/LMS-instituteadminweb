
import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { Fee } from "./types"
import { useDispatch } from "react-redux"
import {
  GetBranchThunks,
  GetBranchCourseThunks,
  GetBatchThunks,
  GetStudentsWithBatchThunks
} from "../../features/Payment_Managemant/salary/fees/reducers/thunks"
import { creatFees } from "../../features/Payment_Managemant/salary/fees/services"
import { GetAllSalaryThunks } from "../../features/Payment_Management/salary/fees/reducers/thunks"; // adjust path


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
  const dispatch = useDispatch()
  const [branch, setBranch] = useState("")
  const [course, setCourse] = useState("")
  const [batch, setBatch] = useState("")
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentId, setStudentId] = useState("") // <-- NEW
  const [paymentDate, setPaymentDate] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [paidAmount, setPaidAmount] = useState("")
  const [balance, setBalance] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [branchOptions, setBranchOptions] = useState([])
  const [courseOptions, setCourseOptions] = useState([])
  const [batchOptions, setBatchOptions] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchBranches = async () => {
      const branchRes = await dispatch(GetBranchThunks({}) as any)
      if (branchRes && Array.isArray(branchRes)) {
        setBranchOptions(branchRes as any)
      }
    }
    fetchBranches()
  }, [dispatch, isOpen])

  useEffect(() => {
    const fetchCourses = async () => {
      const course = await dispatch(GetBranchCourseThunks(branch) as any)
      if (course) {
        setCourseOptions(course.data)
      }
    }
    fetchCourses()
  }, [branch])

  useEffect(() => {
    const fetchBatches = async () => {
      if (branch && course) {
        const instituteId = "973195c0-66ed-47c2-b098-d8989d3e4529"
        const res = await dispatch(GetBatchThunks(instituteId, branch, course) as any)
        if (res?.data) {
          setBatchOptions(res.data)
        }
      } else {
        setBatchOptions([])
      }
    }
    fetchBatches()
  }, [branch, course])

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedFee && branch && batch) {
        const params = {
          batch_id: "c078573f-060b-4bc9-9192-46d89ab2760b",
          branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
        }
        const res = await dispatch(GetStudentsWithBatchThunks(params) as any)
        console.log("Fetching students with name", res)

        if (res?.data && Array.isArray(res.data)) {
          setStudents(res.data)

          const firstStudent = res.data[0]
          setStudentName(firstStudent?.full_name || "")
          setStudentEmail(firstStudent?.email || "")
          setStudentId(firstStudent?._id || "") // <-- Set ID
        } else {
          setStudents([])
          setStudentName("")
          setStudentEmail("")
          setStudentId("") // <-- Clear ID
        }
      }
    }

    fetchStudents()
  }, [branch, batch, selectedFee])

  useEffect(() => {
    if (isOpen) {
      if (selectedFee) {
        setTransactionId(selectedFee.transactionId)
        setPaidAmount(selectedFee.paid_amount)
        setPaymentDate(selectedFee.payment_date === "N/A" ? "" : selectedFee.payment_date)
        setStudentName(selectedFee.name)
        setStudentEmail(selectedFee.email)
        setBalance(selectedFee.balance)
        setDueDate(selectedFee.duepaymentdate === "NA" ? "" : selectedFee.duepaymentdate)
        setBranch(selectedFee.branch_id)
        setCourse(selectedFee.course_name)
        setBatch(selectedFee.batch_name)
        // NOTE: If editing, we assume studentId won't be changed
      } else {
        setBranch("")
        setCourse("")
        setBatch("")
        setStudentName("")
        setStudentEmail("")
        setStudentId("") // <-- Reset ID
        setPaymentDate("")
        setTransactionId("")
        setPaidAmount("")
        setBalance("")
        setDueDate("")
      }
    }
  }, [isOpen, selectedFee])

  const handleUpdateFeeLogic = () => {
    if (selectedFee) {
      const updatedFee: Fee = {
        ...selectedFee,
        transactionId,
        paid_amount: paidAmount,
        payment_date: paymentDate,
        balance,
        duepaymentdate: dueDate,
        batch_name: batch,
        branch_id: branch,
        course_name: course,
      }
      onUpdateFee(updatedFee)
      console.log("Updated fee:", updatedFee)
    }
  }

  const handleAddFeeLogic = async () => {
    const newFee: Fee = {
      id: 1,
      transaction_id: transactionId || "N/A",
      institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
      student: studentId || "N/A", // <-- Use ID here
      balance: balance || "0",
      batch_name: batch || "N/A",
      branch_id: branch || "N/A",
      course_name: course || "N/A",
      duepaymentdate: dueDate || "NA",
      paid_amount: paidAmount || "0",
      payment_date: paymentDate || "NA",
      payment_history: [
        {
          paid_amount: paidAmount || "0",
          balance: balance || "0",
          payment_date: paymentDate || "NA",
          transaction_id: transactionId || "N/A",
          duepaymentdate: dueDate || "NA",
        },
      ],
    }

    await creatFees(newFee)
    onAddFee(newFee)
    console.log("New fee added:", newFee)
    onSuccess()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFee) {
      handleUpdateFeeLogic()
    } else {
      await handleAddFeeLogic()
    }
    onClose()
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
          <div>
            <label htmlFor="select-branch" className="block text-sm text-gray-700">Select Branch</label>
            <select
              id="select-branch"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">Select Branch</option>
              {branchOptions.map((b: any) => (
                <option key={b.id} value={b.uuid}>{b.branch_identity}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="select-course" className="block text-sm text-gray-700">Select Course</label>
            <select
              id="select-course"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {courseOptions?.map((c: any, id) => (
                <option key={id} value={c.uuid}>{c.course_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="batch" className="block text-sm text-gray-700">Select Batch</label>
            <select
              id="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            >
              <option value="">Select Batch</option>
              {batchOptions.map((b: any) => (
                <option key={b.uuid} value={b.uuid}>{b.batch_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="student-name" className="block text-sm text-gray-700">Student Name</label>
            <select
              id="student-name"
              value={studentName}
              onChange={(e) => {
                const selected: any = students.find((s: any) => s.full_name === e.target.value)
                setStudentName(selected?.full_name || "")
                setStudentEmail(selected?.email || "")
                setStudentId(selected?.uuid || "") // <-- Set ID
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            >
              <option value="">Select Student</option>
              {students.map((student: any, index: number) => (
                <option key={index} value={student.full_name}>{student.full_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="payment-date" className="block text-sm text-gray-700">Payment Date</label>
            <input
              id="payment-date"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label htmlFor="transaction-id" className="block text-sm text-gray-700">Transaction ID</label>
            <input
              id="transaction-id"
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label htmlFor="paid-amount" className="block text-sm text-gray-700">Paid Amount</label>
            <input
              id="paid-amount"
              type="text"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label htmlFor="balance" className="block text-sm text-gray-700">Balance</label>
            <input
              id="balance"
              type="text"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label htmlFor="due-date" className="block text-sm text-gray-700">Due Payment Date</label>
            <input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>

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
