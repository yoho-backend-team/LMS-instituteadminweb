import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusLg } from "react-icons/bs";

import RefundAdd from "../../../components/RefundManagement/RefundAdd";
import RefundTable from "../../../components/RefundManagement/RefundTable";

import { GetAllRefundsThunk } from "../../../features/Refund_management/Reducer/refundThunks";
import {
  selectRefundData
} from "../../../features/Refund_management/Reducer/Selector";

export interface RefundData {
  uuid?: string; 
  refundId: string;
  studentId: string;
  studentInfo: string;
  paid: string;
  payment: string;
  status: string;
  branch: string;
}

const RefundFees = () => {
  const dispatch = useDispatch<any>();

  const refunds = useSelector(selectRefundData);
  const [showPanel, setShowPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState<RefundData | null>(null);

  useEffect(() => {
    dispatch(GetAllRefundsThunk());
  }, [dispatch]);

  const filteredRefunds = refunds.filter((item: RefundData) =>
    item.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (data: RefundData) => {
    setEditData(data);
    setShowPanel(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setEditData(null);
  };

  return (
    <div className="relative flex flex-col gap-6">
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
              onSubmit={() => {}} 
              editData={editData}
            />
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <input
          type="search"
          placeholder="Search by Student ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 border-[#1BBFCA] border rounded-xl p-2 font-normal ring-0 focus:ring-0 focus:outline-none w-80"
        />
        <div
          className="bg-[#1BBFCA] text-white p-2 rounded-xl flex gap-2 items-center cursor-pointer"
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
          onDelete={() => {}}
        />
      </div>
    </div>
  );
};

export default RefundFees;
