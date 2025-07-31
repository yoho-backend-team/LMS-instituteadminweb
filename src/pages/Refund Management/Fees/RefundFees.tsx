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
  branch: string;
}
const initialRefunds: RefundData[] = [
  { refundId: "10001", studentId: "101", studentInfo: "Full Stack", paid: "Paid", payment: "80,000", status: "Pending", branch: "Hyderabad" },
  { refundId: "10002", studentId: "102", studentInfo: "Frontend Angular", paid: "Unpaid", payment: "75,000", status: "Completed", branch: "Bangalore" },
  { refundId: "10003", studentId: "103", studentInfo: "UI Design", paid: "Paid", payment: "60,000", status: "Pending", branch: "Chennai" },
  { refundId: "10004", studentId: "104", studentInfo: "Backend NodeJS", paid: "Unpaid", payment: "65,000", status: "Pending", branch: "Pune" },
  { refundId: "10005", studentId: "105", studentInfo: "MongoDB + Express", paid: "Paid", payment: "70,000", status: "Completed", branch: "Hyderabad" },
  { refundId: "10006", studentId: "106", studentInfo: "Full Stack", paid: "Paid", payment: "90,000", status: "Pending", branch: "Bangalore" },
  { refundId: "10007", studentId: "107", studentInfo: "UI Design", paid: "Unpaid", payment: "55,000", status: "Completed", branch: "Chennai" },
  { refundId: "10008", studentId: "108", studentInfo: "Frontend Angular", paid: "Paid", payment: "78,000", status: "Pending", branch: "Pune" },
  { refundId: "10009", studentId: "109", studentInfo: "Backend NodeJS", paid: "Unpaid", payment: "64,000", status: "Pending", branch: "Hyderabad" },
  { refundId: "10010", studentId: "110", studentInfo: "Full Stack", paid: "Paid", payment: "88,000", status: "Completed", branch: "Bangalore" },
  { refundId: "10011", studentId: "111", studentInfo: "MongoDB + Express", paid: "Unpaid", payment: "59,000", status: "Pending", branch: "Chennai" },
  { refundId: "10012", studentId: "112", studentInfo: "UI Design", paid: "Paid", payment: "73,000", status: "Completed", branch: "Pune" },
  { refundId: "10013", studentId: "113", studentInfo: "Frontend Angular", paid: "Paid", payment: "82,000", status: "Pending", branch: "Hyderabad" },
  { refundId: "10014", studentId: "114", studentInfo: "Backend NodeJS", paid: "Unpaid", payment: "68,000", status: "Pending", branch: "Bangalore" },
  { refundId: "10015", studentId: "115", studentInfo: "Full Stack", paid: "Paid", payment: "92,000", status: "Completed", branch: "Chennai" },
  { refundId: "10016", studentId: "116", studentInfo: "UI Design", paid: "Unpaid", payment: "52,000", status: "Pending", branch: "Pune" },
  { refundId: "10017", studentId: "117", studentInfo: "MongoDB + Express", paid: "Paid", payment: "76,000", status: "Completed", branch: "Hyderabad" },
  { refundId: "10018", studentId: "118", studentInfo: "Frontend Angular", paid: "Unpaid", payment: "69,000", status: "Pending", branch: "Bangalore" },
  { refundId: "10019", studentId: "119", studentInfo: "Backend NodeJS", paid: "Paid", payment: "84,000", status: "Pending", branch: "Chennai" },
  { refundId: "10020", studentId: "120", studentInfo: "Full Stack", paid: "Paid", payment: "95,000", status: "Completed", branch: "Pune" },
  { refundId: "10021", studentId: "121", studentInfo: "UI Design", paid: "Unpaid", payment: "63,000", status: "Pending", branch: "Hyderabad" },
  { refundId: "10022", studentId: "122", studentInfo: "MongoDB + Express", paid: "Paid", payment: "74,000", status: "Pending", branch: "Bangalore" },
  { refundId: "10023", studentId: "123", studentInfo: "Frontend Angular", paid: "Unpaid", payment: "66,000", status: "Completed", branch: "Chennai" },
  { refundId: "10024", studentId: "124", studentInfo: "Backend NodeJS", paid: "Paid", payment: "79,000", status: "Pending", branch: "Pune" },
  { refundId: "10025", studentId: "125", studentInfo: "Full Stack", paid: "Paid", payment: "85,000", status: "Completed", branch: "Hyderabad" },
];


const RefundFees = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [refunds, setRefunds] = useState<RefundData[]>(initialRefunds);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleAddRefund = (newRefund: RefundData) => {
    setRefunds((prev) => [...prev, newRefund]);
  };

  
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

    <div className="flex-1 overflow-auto h-[60vh]">
		  <RefundTable data={filteredRefunds} />
	</div>
    </div>
  );
};

export default RefundFees;
