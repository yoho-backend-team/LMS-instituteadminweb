import React from "react";
import type { RefundData } from "../../pages/Refund Management/Fees/RefundFees";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface Props {
  data: RefundData[];
  onDelete: (refundId: string) => void;
  onEdit: (data: RefundData) => void;
}

const RefundTable: React.FC<Props> = ({ data, onDelete, onEdit }) => {
  return (
    <div className="p-4 bg-white rounded-xl border shadow-md overflow-x-auto max-h-[75vh]">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#F8F8F8] text-[#716F6F] font-semibold text-sm">
          <tr>
            <th className="px-6 py-3">Refund ID</th>
            <th className="px-6 py-3">Student ID</th>
            <th className="px-6 py-3">Student Info</th>
            <th className="px-6 py-3">Paid</th>
            <th className="px-6 py-3">Payment</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-[#716F6F] text-sm">
          {data.map((item) => (
            <tr key={item.refundId} className="border-t">
              <td className="px-6 py-4">{item.refundId}</td>
              <td className="px-6 py-4">{item.studentId}</td>
              <td className="px-6 py-4">{item.studentInfo}</td>
              <td className="px-6 py-4">{item.paid}</td>
              <td className="px-6 py-4">{item.payment}</td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button className="text-[#1BBFCA]" onClick={() => onEdit(item)}>
                    <FaEdit size={20} />
                  </button>
                  <button className="text-red-400" onClick={() => onDelete(item.refundId)}>
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundTable;
