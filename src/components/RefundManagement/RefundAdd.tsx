import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import CustomDropdown from "../ContentMangement/Notes/CoustomDropdown/CustomDropdown";
import type { RefundData } from "../../pages/Refund Management/Fees/RefundFees";

interface RefundAddProps {
  onClose: () => void;
  onSubmit: (data: RefundData) => void;
  editData?: RefundData | null;
}

let refundCounter = 1;
let studentCounter = 1;

const generateRefundId = () => `RF${refundCounter.toString().padStart(4, "0")}`;
const generateStudentId = () =>
  `ST${studentCounter.toString().padStart(4, "0")}`;

const RefundAdd: React.FC<RefundAddProps> = ({
  onClose,
  onSubmit,
  editData,
}) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedFee, setSelectedFee] = useState("");
  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState({
    selectedCourse: false,
    selectedBranch: false,
    selectedStudent: false,
    selectedFee: false,
    amount: false,
  });

  useEffect(() => {
    if (editData) {
      setSelectedCourse(editData.studentInfo);
      setSelectedBranch(editData.branch);
      setSelectedStudent(editData.studentId);
      setSelectedFee(editData.paid === "Paid" ? "some fee" : "");
      setAmount(editData.payment.replace(/,/g, ""));
    } else {
      setSelectedCourse("");
      setSelectedBranch("");
      setSelectedStudent("");
      setSelectedFee("");
      setAmount("");
    }
    setErrors({
      selectedCourse: false,
      selectedBranch: false,
      selectedStudent: false,
      selectedFee: false,
      amount: false,
    });
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      selectedCourse: !selectedCourse,
      selectedBranch: !selectedBranch,
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
      branch: selectedBranch,
    };

    onSubmit(newRefund);

    if (!editData) {
      refundCounter++;
      studentCounter++;
    }
  };

  const getInputClass = (error: boolean) =>
    `h-10 border px-2 rounded w-full ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  const getDropdownClass = (error: boolean) => (error ? "border-red-500" : "");

  return (
    <div className="relative text-[#716F6F] p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {editData ? "Edit Refund" : "Add Refund"}
        </h2>
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
          <div>
            <label>Select Course</label>
            <CustomDropdown
              options={[
                "Full Stack Development (MEAN)",
                "Frontend Angular",
                "Backend NodeJS",
                "MongoDB + Express Crash Course",
              ]}
              value={selectedCourse}
              onChange={setSelectedCourse}
              placeholder="Select Course"
              width="w-full"
              className={getDropdownClass(errors.selectedCourse)}
            />
            {errors.selectedCourse && (
              <p className="text-red-500 text-sm">Course is required.</p>
            )}
          </div>
          <div>
            <label>Branch</label>
            <CustomDropdown
              options={["Hyderabad", "Bangalore", "Chennai", "Pune"]}
              value={selectedBranch}
              onChange={setSelectedBranch}
              placeholder="Select Branch"
              width="w-full"
              className={getDropdownClass(errors.selectedBranch)}
            />
            {errors.selectedBranch && (
              <p className="text-red-500 text-sm">Branch is required.</p>
            )}
          </div>
          <div>
            <label>Student</label>
            <CustomDropdown
              options={["John Doe", "Jane Smith", "Rahul Sharma", "Anita Roy"]}
              value={selectedStudent}
              onChange={setSelectedStudent}
              placeholder="Select Student"
              width="w-full"
              className={getDropdownClass(errors.selectedStudent)}
            />
            {errors.selectedStudent && (
              <p className="text-red-500 text-sm">Student is required.</p>
            )}
          </div>
          <div>
            <label>Student Fee</label>
            <CustomDropdown
              options={["INR 20,000", "INR 25,000", "INR 30,000", "INR 35,000"]}
              value={selectedFee}
              onChange={setSelectedFee}
              placeholder="Select Fee"
              width="w-full"
              className={getDropdownClass(errors.selectedFee)}
            />
            {errors.selectedFee && (
              <p className="text-red-500 text-sm">Fee is required.</p>
            )}
          </div>
          <div>
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
