import { useState } from "react";
import { GoPlus } from "react-icons/go";
import RefundAdd from "../../../components/RefundManagement/RefundAdd";
import RefundTable from "../../../components/RefundManagement/RefundTable";

export interface RefundData {
  refundId: string;
  studentId: string;
  studentInfo: string;
  paid: string;
  payment: string;
  status: string;
  branch: string; // stored, not used for search or display
}

const initialRefunds: RefundData[] = [
  {
    refundId: "98765",
    studentId: "809",
    studentInfo: "UI Design",
    paid: "Paid",
    payment: "80,000",
    status: "Pending",
    branch: "Hyderabad",
  },
  {
    refundId: "12345",
    studentId: "702",
    studentInfo: "Full Stack",
    paid: "Unpaid",
    payment: "90,000",
    status: "Completed",
    branch: "Bangalore",
  },
  {
    refundId: "56789",
    studentId: "678",
    studentInfo: "Frontend Angular",
    paid: "Paid",
    payment: "50,000",
    status: "Pending",
    branch: "Chennai",
  },
];

const RefundFees = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [refunds, setRefunds] = useState<RefundData[]>(initialRefunds);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ For student ID search

  const handleAddRefund = (newRefund: RefundData) => {
    setRefunds((prev) => [...prev, newRefund]);
  };

  // ✅ Filter by studentId
  const filteredRefunds = refunds.filter((item) =>
    item.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col gap-6">
      {showPanel && (
        <div
          className="absolute inset-0 h-[85vh] flex justify-end z-50"
          onClick={() => setShowPanel(false)}
        >
          <div
            className="h-full w-1/3 bg-white shadow-xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <RefundAdd
              onClose={() => setShowPanel(false)}
              onSubmit={handleAddRefund}
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
          className="h-10 border-[#1BBFCA] border rounded-xl p-2 font-normal ring-0 focus:ring-0 focus:outline-none"
        />

        <div
          className="bg-[#1BBFCA] text-white p-2 rounded-xl flex gap-2 items-center cursor-pointer"
          onClick={() => setShowPanel(true)}
        >
          <GoPlus size={20} />
          <span>Add Refund</span>
        </div>
      </div>

      <RefundTable data={filteredRefunds} />
    </div>
  );
};

export default RefundFees;
