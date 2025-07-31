import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CustomDropdown from "../ContentMangement/Notes/CoustomDropdown/CustomDropdown";
import type { RefundData } from "../../pages/Refund Management/Fees/RefundFees";

interface RefundAddProps {
  onClose: () => void;
  onSubmit: (data: RefundData) => void;
}

const RefundAdd: React.FC<RefundAddProps> = ({ onClose, onSubmit }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedFee, setSelectedFee] = useState("");
  const [amount, setAmount] = useState("");

  const courseOptions = [
    "Full Stack Development (MEAN)",
    "Frontend Angular",
    "Backend NodeJS",
    "MongoDB + Express Crash Course",
  ];
  const branchOptions = ["Hyderabad", "Bangalore", "Chennai", "Pune"];
  const studentOptions = ["John Doe", "Jane Smith", "Rahul Sharma", "Anita Roy"];
  const feeOptions = ["INR 20,000", "INR 25,000", "INR 30,000", "INR 35,000"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse || !selectedBranch || !selectedStudent || !selectedFee || !amount) {
      alert("Please fill all fields.");
      return;
    }

    const newRefund: RefundData = {
  refundId: (Math.floor(10000 + Math.random() * 90000)).toString(),
  studentId: (Math.floor(100 + Math.random() * 900)).toString(),
  studentInfo: selectedCourse,
  paid: selectedFee ? "Paid" : "Unpaid",
  payment: parseInt(amount).toLocaleString(),
  status: "Pending",
  branch: selectedBranch, 
};


    onSubmit(newRefund);
    onClose();
  };

  return (
    <div className="relative text-[#716F6F] p-4 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Refund</h2>
        <button
          onClick={onClose}
          className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
        >
          <IoMdClose size={16} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-[75vh] overflow-y-auto pr-2">
        <div className="space-y-4">
          <div>
            <label>Select Course</label>
            <CustomDropdown
              options={courseOptions}
              value={selectedCourse}
              onChange={setSelectedCourse}
              placeholder="Select Course"
              width="w-full"
            />
          </div>

          <div>
            <label>Branch</label>
            <CustomDropdown
              options={branchOptions}
              value={selectedBranch}
              onChange={setSelectedBranch}
              placeholder="Select Branch"
              width="w-full"
            />
          </div>

          <div>
            <label>Student</label>
            <CustomDropdown
              options={studentOptions}
              value={selectedStudent}
              onChange={setSelectedStudent}
              placeholder="Select Student"
              width="w-full"
            />
          </div>

          <div>
            <label>Student Fee</label>
            <CustomDropdown
              options={feeOptions}
              value={selectedFee}
              onChange={setSelectedFee}
              placeholder="Select Fee"
              width="w-full"
            />
          </div>

          <div>
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-10 border px-2 rounded w-full"
              placeholder="Enter amount"
              min="0"
            />
          </div>
        </div>

        {/* Action Buttons */}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RefundAdd;
