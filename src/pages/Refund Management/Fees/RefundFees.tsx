import { useState } from "react";
import RefundAdd from "../../../components/RefundManagement/RefundAdd";
import RefundTable from "../../../components/RefundManagement/RefundTable";
import { BsPlusLg } from "react-icons/bs";

export interface RefundData {
  refundId: string;
  studentId: string;
  studentInfo: string;
  paid: string;
  payment: string;
  status: string;
  branch: string;
}
const initialRefunds: RefundData[] = [
  {
    refundId: "RF0001",
    studentId: "ST0001",
    studentInfo: "Full Stack",
    paid: "Paid",
    payment: "80,000",
    status: "Pending",
    branch: "Hyderabad",
  },
  {
    refundId: "RF0002",
    studentId: "ST0002",
    studentInfo: "Frontend Angular",
    paid: "Unpaid",
    payment: "75,000",
    status: "Completed",
    branch: "Bangalore",
  },
  {
    refundId: "RF0003",
    studentId: "ST0003",
    studentInfo: "UI Design",
    paid: "Paid",
    payment: "60,000",
    status: "Pending",
    branch: "Chennai",
  },
  {
    refundId: "RF0004",
    studentId: "ST0004",
    studentInfo: "Backend NodeJS",
    paid: "Unpaid",
    payment: "65,000",
    status: "Pending",
    branch: "Pune",
  },
  {
    refundId: "RF0005",
    studentId: "ST0005",
    studentInfo: "MongoDB + Express",
    paid: "Paid",
    payment: "70,000",
    status: "Completed",
    branch: "Hyderabad",
  },
  {
    refundId: "RF0006",
    studentId: "ST0006",
    studentInfo: "Full Stack",
    paid: "Paid",
    payment: "90,000",
    status: "Pending",
    branch: "Bangalore",
  },
  {
    refundId: "RF0007",
    studentId: "ST0007",
    studentInfo: "UI Design",
    paid: "Unpaid",
    payment: "55,000",
    status: "Completed",
    branch: "Chennai",
  },
];
const RefundFees = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [refunds, setRefunds] = useState<RefundData[]>(initialRefunds);
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState<RefundData | null>(null);

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
