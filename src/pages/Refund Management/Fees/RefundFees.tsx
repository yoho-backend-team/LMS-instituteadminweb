import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RefundAdd from "../../../components/RefundManagement/RefundAdd";
import RefundTable from "../../../components/RefundManagement/RefundTable";
import { BsPlusLg } from "react-icons/bs";
import { getAllRefundsThunk } from "../../../features/Refund_management/Reducer/refundThunks";

export interface RefundData {
  refundId: string;
  studentId: string;
  studentInfo: string;
  paid: string;
  payment: string;
  status: string;
  branch: string;
}

const RefundFees = () => {
  const dispatch = useDispatch();
  const [refunds, setRefunds] = useState<RefundData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState<RefundData | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
   dispatch(getAllRefundsThunk({}) as any)
      .then((data: RefundData[]) => {
        setRefunds(data);
      })
      .catch((err: any) => {
        console.error("Failed to fetch refunds:", err);
      });
  }, [dispatch]);

  const handleAddOrUpdateRefund = (data: RefundData) => {
    if (editData) {
      setRefunds((prev) =>
        prev.map((item) => (item.refundId === data.refundId ? data : item))
      );
    } else {
      setRefunds((prev) => [...prev, data]);
    }
    setEditData(null);
    setShowPanel(false);
  };

  const handleDelete = (refundId: string) => {
    setRefunds((prev) => prev.filter((item) => item.refundId !== refundId));
  };

  const handleEdit = (data: RefundData) => {
    setEditData(data);
    setShowPanel(true);
  };

  const filteredRefunds = refunds.filter((item) =>
    item.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col gap-6">
      {showPanel && (
        <div
          className="fixed inset-0 z-50 flex justify-end items-center backdrop-blur-sm"
          onClick={() => {
            setShowPanel(false);
            setEditData(null);
          }}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-[500px] max-w-full "
            onClick={(e) => e.stopPropagation()}
          >
            <RefundAdd
              onClose={() => {
                setShowPanel(false);
                setEditData(null);
              }}
              onSubmit={handleAddOrUpdateRefund}
              editData={editData}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <input
          type="search"
          placeholder="Student ID"
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

      <div className="flex-1 overflow-auto h-[60vh] border rounded-xl shadow-lg">
        <RefundTable
          data={filteredRefunds}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default RefundFees;
