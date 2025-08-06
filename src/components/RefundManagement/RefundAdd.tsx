import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import type { RefundData } from "../../pages/Refund Management/Fees/RefundFees";

import {
  GetCourseThunks,
  GetBatchThunks,
} from "../../features/Refund_management/Reducer/refundThunks"; 
import {
  selectRefundCourses,
  selectRefundBatches,
} from "../../features/Refund_management/Reducer/Selector";

interface RefundAddProps {
  onClose: () => void;
  onSubmit: (data: RefundData) => void;
  editData?: RefundData | null;
}

let refundCounter = 1;
let studentCounter = 1;

const generateRefundId = () => `RF${refundCounter.toString().padStart(4, "0")}`;
const generateStudentId = () => `ST${studentCounter.toString().padStart(4, "0")}`;

const RefundAdd: React.FC<RefundAddProps> = ({ onClose, onSubmit, editData }) => {
  const dispatch = useDispatch<any>();
  const courses = useSelector(selectRefundCourses);
  const batches = useSelector(selectRefundBatches);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedFee, setSelectedFee] = useState("");
  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState({
    selectedCourse: false,
    selectedBatch: false,
    selectedStudent: false,
    selectedFee: false,
    amount: false,
  });

  useEffect(() => {
    const instituteId = "instituteId"; // Replace with actual ID
    const branchId = "branchId"; // Replace with actual ID
    dispatch(GetCourseThunks({ instituteId, branchId }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourse) {
      const instituteId = "instituteId"; // Replace with actual ID
      const branchId = "branchId"; // Replace with actual ID
      dispatch(GetBatchThunks(instituteId, branchId, selectedCourse));
    }
  }, [selectedCourse, dispatch]);

  useEffect(() => {
    if (editData) {
      setSelectedCourse(editData.studentInfo);
      setSelectedBatch(editData.branch);
      setSelectedStudent(editData.studentId);
      setSelectedFee(editData.paid === "Paid" ? "some fee" : "");
      setAmount(editData.payment.replace(/,/g, ""));
    } else {
      setSelectedCourse("");
      setSelectedBatch("");
      setSelectedStudent("");
      setSelectedFee("");
      setAmount("");
    }

    setErrors({
      selectedCourse: false,
      selectedBatch: false,
      selectedStudent: false,
      selectedFee: false,
      amount: false,
    });
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      selectedCourse: !selectedCourse,
      selectedBatch: !selectedBatch,
      selectedStudent: !selectedStudent,
      selectedFee: !selectedFee,
      amount: !amount,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    const newRefund: RefundData = {
      refundId: editData?.refundId ?? generateRefundId(),
      studentId: editData?.studentId ?? generateStudentId(),
      studentInfo: selectedCourse,
      paid: selectedFee ? "Paid" : "Unpaid",
      payment: parseInt(amount).toLocaleString(),
      status: editData?.status ?? "Pending",
      branch: selectedBatch,
    };

    onSubmit(newRefund);

    if (!editData) {
      refundCounter++;
      studentCounter++;
    }
  };

  const getInputClass = (error: boolean) =>
    `h-10 border px-2 rounded w-full ${error ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="relative text-[#716F6F] p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{editData ? "Edit Refund" : "Add Refund"}</h2>
        <button
          onClick={onClose}
          className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
        >
          <IoMdClose size={16} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 h-[75vh] overflow-y-auto pr-2"
      >
        <div className="space-y-4">
          {/* Course */}
          <div className="flex flex-col p-1">
            <label>Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={getInputClass(errors.selectedCourse)}
            >
              <option value="">Select Course</option>
              {courses?.map((course: any) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.selectedCourse && (
              <p className="text-red-500 text-sm">Course is required.</p>
            )}
          </div>

          {/* Batch */}
          <div className="flex flex-col p-1">
            <label>Batch</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className={getInputClass(errors.selectedBatch)}
            >
              <option value="">Select Batch</option>
              {batches?.map((batch: any) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
            </select>
            {errors.selectedBatch && (
              <p className="text-red-500 text-sm">Batch is required.</p>
            )}
          </div>

          {/* Student */}
          <div className="flex flex-col p-1">
            <label>Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className={getInputClass(errors.selectedStudent)}
            >
              <option value="">Select Student</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Rahul Sharma">Rahul Sharma</option>
              <option value="Anita Roy">Anita Roy</option>
            </select>
            {errors.selectedStudent && (
              <p className="text-red-500 text-sm">Student is required.</p>
            )}
          </div>

          {/* Fee */}
          <div className="flex flex-col p-1">
            <label>Student Fee</label>
            <select
              value={selectedFee}
              onChange={(e) => setSelectedFee(e.target.value)}
              className={getInputClass(errors.selectedFee)}
            >
              <option value="">Select Fee</option>
              <option value="INR 20,000">INR 20,000</option>
              <option value="INR 25,000">INR 25,000</option>
              <option value="INR 30,000">INR 30,000</option>
              <option value="INR 35,000">INR 35,000</option>
            </select>
            {errors.selectedFee && (
              <p className="text-red-500 text-sm">Fee is required.</p>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col p-1">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={getInputClass(errors.amount)}
              placeholder="Enter amount"
              min="0"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">Amount is required.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="text-[#1BBFCA] border border-[#1BBFCA] px-4 py-1 rounded font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#1BBFCA] text-white px-4 py-1 rounded font-semibold"
          >
            {editData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RefundAdd;
