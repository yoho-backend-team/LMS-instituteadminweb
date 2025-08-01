import React, { useState } from "react";
import type { RefundData } from "../../pages/Refund Management/Fees/RefundFees";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

interface Props {
  data: RefundData[];
  onDelete: (refundId: string) => void;
  onEdit: (data: RefundData) => void;
}
const RefundTable: React.FC<Props> = ({ data, onDelete, onEdit }) => {
  const [sortKey, setSortKey] = useState<keyof RefundData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof RefundData) => {
    if (sortKey === key) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const sortableColumns: { label: string; key: keyof RefundData }[] = [
    { label: "Refund ID", key: "refundId" },
    { label: "Student ID", key: "studentId" },
    { label: "Student Info", key: "studentInfo" },
    { label: "Paid", key: "paid" },
    { label: "Payment", key: "payment" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="p-4 bg-white  shadow-lg overflow-x-auto max-h-[75vh]">
      <table className="w-full text-left border-collapse table-auto">
        <thead className="bg-[#F8F8F8] text-[#716F6F] font-semibold text-sm">
          <tr>
            {sortableColumns.map(({ label, key }) => (
              <th
                key={key}
                className={`py-3 px-4 cursor-pointer select-none ${
                  key === "studentInfo"
                    ? "w-[250px] "
                    : key === "refundId" || key === "studentId"
                    ? "w-[120px]"
                    : "w-[150px]"
                }`}
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center gap-1">
                  {label}
                  {sortKey === key ? (
                    sortOrder === "asc" ? (
                      <IoIosArrowRoundUp size={20} />
                    ) : (
                      <IoIosArrowRoundDown size={20} />
                    )
                  ) : (
                    <IoIosArrowRoundUp size={20} className="opacity-20" />
                  )}
                </div>
              </th>
            ))}
            <th className="px-4 py-3 w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-[#716F6F] text-sm">
          {sortedData.map((item) => (
            <tr key={item.refundId} className="border-t">
              <td className="px-4 py-4">{item.refundId}</td>
              <td className="px-4 py-4">{item.studentId}</td>
              <td className="px-4 py-4">{item.studentInfo}</td>
              <td className="px-4 py-4">{item.paid}</td>
              <td className="px-4 py-4">{item.payment}</td>
              <td className="px-4 py-4">{item.status}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <button
                    className="text-[#1BBFCA]"
                    onClick={() => onEdit(item)}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className="text-red-400"
                    onClick={() => onDelete(item.refundId)}
                  >
                    <FaTrashAlt size={18} />
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
