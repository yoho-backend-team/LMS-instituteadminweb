import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusLg } from "react-icons/bs";

import RefundAdd from "../../../components/RefundManagement/RefundAdd";
import RefundTable from "../../../components/RefundManagement/RefundTable";

import {
  GetAllRefundsThunk,
  DeleteRefundThunk,
} from "../../../features/Refund_management/Reducer/refundThunks";
import { selectRefundData } from "../../../features/Refund_management/Reducer/Selector";
import toast from "react-hot-toast";

export interface RefundData {
  uuid?: string;
  refundId: string;
  studentId: string;
  studentInfo: string;
  studentEmail?: string;
  paid: string;
  payment: string;
  status: string;
  branch: string;
  courseId?: string;
  batchId?: string;
  feeId?: string;
}

const RefundFees = () => {
  const dispatch = useDispatch<any>();

  const refunds = useSelector(selectRefundData);
  const [showPanel, setShowPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState<RefundData | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(GetAllRefundsThunk());
  }, [dispatch]);

  const mappedRefunds: RefundData[] = refunds?.map((item: any) => ({
    uuid: item._id || "",
    refundId: item._id || "",
    studentId: item.student?.id || item.student?.uuid || "",
    studentInfo: `${item.student?.first_name || ""} ${
      item.student?.last_name || ""
    }`.trim(),
    studentEmail: item.student?.email || "",
    paid: item.studentfees?.paid_amount ? item.studentfees.paid_amount.toString() : "0",
    payment: item.payment_date ? new Date(item.payment_date).toISOString() : "",
    status: item.is_active ? "Active" : "Inactive",
    branch: item.branch_name?.uuid || "",
    courseId: item.course?.uuid || "",
    batchId: item.batch?.uuid || "",
    feeId: item.studentfees || "",
  }));

  const filteredRefunds = mappedRefunds.filter((item) =>
    item.studentInfo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (data: RefundData) => {
    console.log("code :",data)
    setEditData(data);
    setShowPanel(true);
  };

  const handleDelete = (id: string) => {
    setDeleteItemId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    console.log("delete", deleteItemId);
    if (deleteItemId) {
      try {
        await dispatch(DeleteRefundThunk(deleteItemId));

        dispatch(GetAllRefundsThunk());
        setShowDeleteConfirm(false);
        setDeleteItemId(null);
      } catch (error) {
        console.error("Failed to delete refund:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteItemId(null);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setEditData(null);
  };

  const handleSubmitRefund = async () => {
    try {
      await dispatch(GetAllRefundsThunk());
      handleClosePanel();
      toast.success("Refund saved successfully!");
    } catch (error) {
      console.error("Failed to submit refund:", error);
      toast.error("Failed to save refund. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col gap-6">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this refund? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Panel */}
      {showPanel && (
        <div
          className="fixed inset-0 z-50 flex justify-end items-center backdrop-blur-sm"
          onClick={handleClosePanel}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-[500px] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <RefundAdd
              onClose={handleClosePanel}
              onSubmit={handleSubmitRefund}
              editData={editData}
            />
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <input
          type="search"
          placeholder="Search by Student Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 border-[#1BBFCA] border rounded-xl p-2 font-normal ring-0 focus:ring-0 focus:outline-none w-80"
        />
        <div
          className="bg-[#1BBFCA] text-white p-2 rounded-xl flex gap-2 items-center cursor-pointer hover:bg-[#1AACB7] transition-colors"
          onClick={() => {
            setEditData(null);
            setShowPanel(true);
          }}
        >
          <BsPlusLg size={20} />
          <span>Add Refund</span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto h-[60vh] border rounded-xl shadow-lg">
        <RefundTable
          data={filteredRefunds}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default RefundFees;
