import React, { useState } from "react";
import type { RefundData } from "../../pages/Refund Management/Fees/RefundFees";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import toast from "react-hot-toast";

interface Props {
  data: RefundData[];
  onDelete: (refundId: string) => void;
  onEdit: (data: RefundData) => void;
  loading?: boolean; 
}

const SkeletonRow: React.FC = () => {
  return (
    <tr className="border-t animate-pulse">
      <td className="px-2 sm:px-4 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-2 sm:px-4 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-2 sm:px-4 py-3">
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </td>
      <td className="px-2 sm:px-4 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-2 sm:px-4 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-2 sm:px-4 py-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </td>
      <td className="px-2 sm:px-4 py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
      </td>
    </tr>
  );
};

// Function to convert ISO date to readable format
const formatPaymentDate = (dateString: string): string => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    // Format: DD/MM/YYYY, HH:MM AM/PM
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return "Date Error";
  }
};

const RefundTable: React.FC<Props> = ({ data, onDelete, onEdit, loading }) => {
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
    
    // Special handling for payment date sorting
    if (sortKey === "payment") {
      const dateA = new Date(a.payment).getTime();
      const dateB = new Date(b.payment).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    
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
    { label: "Payment Date", key: "payment" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="p-2 sm:p-3 md:p-4 bg-white shadow-lg overflow-x-auto max-h-[75vh] rounded-xl">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead className="bg-[#F8F8F8] text-[#716F6F] font-semibold">
          <tr>
            {sortableColumns.map(({ label, key }) => (
              <th
                key={key}
                className={`py-2 px-2 sm:py-3 sm:px-3 md:px-4 cursor-pointer ${
                  key === "studentInfo"
                    ? "min-w-[120px] sm:min-w-[150px] md:min-w-[180px]"
                    : key === "payment"
                    ? "min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
                    : key === "refundId" || key === "studentId"
                    ? "min-w-[80px] sm:min-w-[100px]"
                    : "min-w-[70px] sm:min-w-[90px]"
                }`}
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center gap-1">
                  <span className="truncate">{label}</span>
                  {sortKey === key ? (
                    sortOrder === "asc" ? (
                      <IoIosArrowRoundUp size={14} className="sm:size-4 flex-shrink-0" />
                    ) : (
                      <IoIosArrowRoundDown size={14} className="sm:size-4 flex-shrink-0" />
                    )
                  ) : (
                    <IoIosArrowRoundUp size={14} className="opacity-20 flex-shrink-0" />
                  )}
                </div>
              </th>
            ))}
            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="text-[#716F6F] text-xs sm:text-sm">
          {loading ? (
            // Show skeleton rows when loading
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRow key={index} />
            ))
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={sortableColumns.length + 1}
                className="text-center py-6 text-gray-400 text-sm sm:text-base"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((item) => (
              <tr key={item.refundId} className="border-t hover:bg-gray-50">
                <td className="px-2 sm:px-3 md:px-4 py-3 truncate" title={item.refundId}>
                  {item.refundId}
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 truncate" title={item.studentId}>
                  {item.studentId}
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3">
                  <div className="flex flex-col">
                    <span className="truncate font-medium" title={item.studentInfo}>
                      {item.studentInfo}
                    </span>
                    {item.studentEmail && (
                      <span className="text-xs text-gray-500 truncate" title={item.studentEmail}>
                        {item.studentEmail}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 truncate" title={item.paid}>
                  {item.paid}
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3" title={formatPaymentDate(item.payment)}>
                  <span className="text-xs sm:text-sm">
                    {formatPaymentDate(item.payment)}
                  </span>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      className="text-[#1BBFCA] hover:text-[#189ba6] transition-colors"
                      onClick={() => onEdit(item)}
                      title="Edit"
                    >
                      <FaEdit size={16} className="sm:size-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (item.uuid) {
                          onDelete(item.uuid);
                        } else {
                          toast.error("Cannot delete: Missing uuid");
                        }
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <FaTrashAlt size={16} className="sm:size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RefundTable;