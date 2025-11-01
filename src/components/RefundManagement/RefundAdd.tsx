import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import type { RefundData } from "../../pages/Refund Management/Fees/RefundFees";

import {
  GetBatchThunk,
  CreateRefundThunk,
  GetStudentsWithBatchThunks,
  GetStudentFeeThunks,
} from "../../features/Refund_management/Reducer/refundThunks";

import {
  Batch,
  Fees,
  Student,
} from "../../features/Refund_management/Reducer/Selector";

import {
  GetBranchThunks,
  GetBranchCourseThunks,
} from "../../features/Content_Management/reducers/thunks";

import {
  Branch,
  BranchCourse,
} from "../../features/Content_Management/reducers/selectors";
import { updateRefund } from "../../features/Refund_management/Service";

interface RefundAddProps {
  onClose: () => void;
  onSubmit: (data: RefundData) => void;
  editData?: RefundData | null;
}

let refundCounter = 1;

const generateRefundId = () => `RF${refundCounter.toString().padStart(4, "0")}`;

const RefundAdd: React.FC<RefundAddProps> = ({
  onClose,
  onSubmit,
  editData,
}) => {
  const dispatch = useDispatch<any>();

  const branches = useSelector(Branch);
  const courses = useSelector(BranchCourse);
  const batches = useSelector(Batch);
  const students = useSelector(Student);
  const fees = useSelector(Fees);

  const instituteId = useSelector(
    (state: any) => state.authuser?.user?.institute_id?.uuid
  );

  const [branchId, setBranchId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedFee, setSelectedFee] = useState("");
  const [amount, setAmount] = useState("");
  const feeList = fees ?? [];

  const [errors, setErrors] = useState({
    branchId: false,
    selectedCourse: false,
    selectedBatch: false,
    selectedStudent: false,
    selectedFee: false,
    amount: false,
  });

  useEffect(() => {
    dispatch(GetBranchThunks([]));
  }, [dispatch]);

  useEffect(() => {
    if (branchId) {
      dispatch(GetBranchCourseThunks(branchId));
    }
  }, [branchId, dispatch]);

  useEffect(() => {
    if (selectedStudent) {
      dispatch(GetStudentFeeThunks(selectedStudent));
    }
  }, [dispatch, selectedStudent]);

  useEffect(() => {
    if (selectedCourse) {
      dispatch(GetBatchThunk({ course: selectedCourse }));
    }
  }, [selectedCourse, dispatch, branchId, instituteId]);

  useEffect(() => {
    if (selectedBatch && branchId && instituteId) {
      const params = {
        batch_id: selectedBatch,
        branch_id: branchId,
        institute_id: instituteId,
      };
      dispatch(GetStudentsWithBatchThunks(params));
    }
  }, [selectedBatch, branchId, instituteId, dispatch]);

  useEffect(() => {
    if (editData) {
      setBranchId(editData.branch);
      setSelectedCourse(editData.courseId || "");
      setSelectedBatch(editData.batchId || "");
      setSelectedStudent(editData.studentId);
      setSelectedFee(editData.feeId || "");
      setAmount(editData.paid || "");
    } else {
      setBranchId("");
      setSelectedCourse("");
      setSelectedBatch("");
      setSelectedStudent("");
      setSelectedFee("");
      setAmount("");
    }
    setErrors({
      branchId: false,
      selectedCourse: false,
      selectedBatch: false,
      selectedStudent: false,
      selectedFee: false,
      amount: false,
    });
  }, [editData]);

  console.log(editData, "editdata");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      branchId: !branchId,
      selectedCourse: !selectedCourse,
      selectedBatch: !selectedBatch,
      selectedStudent: !selectedStudent,
      selectedFee: !selectedFee,
      amount: !amount,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    const selectedBatchObj = batches.find(
      (batch: any) => batch.uuid === selectedBatch
    );
    const selectedStudentObj = students.find(
      (stu: any) => stu.uuid === selectedStudent
    );

    const batchIdForAPI = selectedBatchObj?._id || "";
    const studentIdForAPI = selectedStudentObj?._id || "";

    const selectedFeeObj = (fees?.fees || []).find(
      (fee: any) => fee._id === selectedFee
    );
    const feeAmount = selectedFeeObj ? selectedFeeObj.amount : "0";

    const apiPayload = {
      institute_id: instituteId,
      student: studentIdForAPI,
      branch_name: branchId,
      course_name: selectedCourse,
      batch_name: batchIdForAPI,
      studentfees: selectedFee,
      amount: parseFloat(amount) || parseFloat(feeAmount),
      payment_date: new Date(),
    };

    const uiRefundData: RefundData = {
      refundId: editData?.refundId ?? generateRefundId(),
      studentId: selectedStudent,
      studentInfo: selectedCourse,
      paid: selectedFee ? "Paid" : "Unpaid",
      payment: parseInt(amount || feeAmount).toLocaleString(),
      status: editData?.status ?? "Pending",
      branch: selectedBatch,
    };

    if (editData?.uuid) {
      const updatePayload = { uuid: editData.uuid, ...apiPayload };

      await updateRefund(updatePayload);
    } else {
      dispatch(CreateRefundThunk(apiPayload));
      refundCounter++;
    }
    onSubmit(uiRefundData);
    onClose();
  };

  const getInputClass = (error: boolean) =>
    `h-10 border px-2 rounded w-full ${
      error ? "border-red-500" : "border-gray-300"
    }`;

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
        className="flex flex-col gap-5 h-[85vh] overflow-y-auto pr-2"
      >
        <div className="space-y-4">
          {/* Branch Dropdown */}
          <div className="flex flex-col p-1">
            <label>Select Branch</label>
            <select
              value={branchId}
              onChange={(e) => {
                setBranchId(e.target.value);
                setSelectedCourse("");
                setSelectedBatch("");
                setSelectedStudent("");
              }}
              className={getInputClass(errors.branchId)}
            >
              <option value="">Select Branch</option>
              {branches.map((b: any) => (
                <option key={b.uuid} value={b.uuid}>
                  {b.branch_identity}
                </option>
              ))}
            </select>
            {errors.branchId && (
              <p className="text-red-500 text-sm">Branch is required.</p>
            )}
          </div>

          {/* Course Dropdown */}
          <div className="flex flex-col p-1">
            <label>Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={getInputClass(errors.selectedCourse)}
              disabled={!branchId}
            >
              <option value="">Select Course</option>
              {courses.map((course: any) => (
                <option key={course.uuid} value={course.uuid}>
                  {course.course_name}
                </option>
              ))}
            </select>
            {errors.selectedCourse && (
              <p className="text-red-500 text-sm">Course is required.</p>
            )}
          </div>

          {/* Batch Dropdown */}
          <div className="flex flex-col p-1">
            <label>Select Batch</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className={getInputClass(errors.selectedBatch)}
            >
              <option value="">Select Batch</option>
              {batches.map((batch: any) => (
                <option key={batch.uuid} value={batch.uuid}>
                  {batch.batch_name}
                </option>
              ))}
            </select>
            {errors.selectedBatch && (
              <p className="text-red-500 text-sm">Batch is required.</p>
            )}
          </div>

          {/* Student Dropdown */}
          <div className="flex flex-col p-1">
            <label>Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => {
                setSelectedStudent(e.target.value);
                setSelectedFee("");
              }}
              className={getInputClass(errors.selectedStudent)}
            >
              <option value="">Select Student</option>
              {students?.map((student: any) => (
                <option key={student.uuid} value={student.uuid}>
                  {student.full_name}
                </option>
              ))}
            </select>

            {errors.selectedStudent && (
              <p className="text-red-500 text-sm">Student is required.</p>
            )}
          </div>

          <div className="flex flex-col p-1">
            <label>Student Fee</label>
            <select
              value={selectedFee}
              onChange={(e) => {
                const selectedFeeId = e.target.value;
                setSelectedFee(selectedFeeId);
                const fee = feeList.find((f: any) => f._id === selectedFeeId);
                if (fee) {
                  setAmount(fee.paid_amount?.toString() || "0");
                }
              }}
              className={getInputClass(errors.selectedFee)}
              disabled={!selectedStudent}
            >
              <option value="">Select Fee</option>
              {selectedStudent ? (
                (() => {
                  const studentFees = feeList.filter(
                    (fee: any) =>
                      fee.student === selectedStudent ||
                      fee.student?.uuid === selectedStudent
                  );

                  if (studentFees.length > 0) {
                    return studentFees.map((fee: any) => {
                      const paidAmount = fee?.paid_amount ?? 0;
                      return (
                        <option key={fee._id} value={fee._id}>
                          Paid: ₹{paidAmount.toLocaleString()}
                        </option>
                      );
                    });
                  }

                  return (
                    <option disabled>No available fees for this student</option>
                  );
                })()
              ) : (
                <option disabled>Please select a student first</option>
              )}
            </select>

            {errors.selectedFee && (
              <p className="text-red-500 text-sm">Fee is required.</p>
            )}
          </div>

          {/* Amount Input */}
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="text-[#1BBFCA] border border-[#1BBFCA] px-4 py-2 sm:py-2 rounded font-semibold text-sm sm:text-base order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#1BBFCA] text-white px-4 py-2 sm:py-2 rounded font-semibold text-sm sm:text-base order-1 sm:order-2 mb-3 sm:mb-0"
          >
            {editData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RefundAdd;
