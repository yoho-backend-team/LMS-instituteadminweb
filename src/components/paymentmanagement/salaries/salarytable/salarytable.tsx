/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { MoreVertical, Download, CheckCircle, X } from "lucide-react";
import { FaEye, FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { MoreVertical, Download, CheckCircle, X } from "lucide-react";
import { FaEye, FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllSalaryThunks,
  UpdateAllSalaryThunks,
} from "../../../../features/Payment_Managemant/salary/reducers/thunks";
import jsPDF from "jspdf";
import { DeleteSalary } from "../../../../features/Payment_Managemant/salary/services";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { GetBranchThunks } from "../../../../features/Payment_Managemant/salary/reducers/thunks";
import ContentLoader from "react-content-loader";
import type { RootState } from "../../../../store/store";
  GetAllSalaryThunks,
  UpdateAllSalaryThunks,
} from "../../../../features/Payment_Managemant/salary/reducers/thunks";
import jsPDF from "jspdf";
import { DeleteSalary } from "../../../../features/Payment_Managemant/salary/services";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { GetBranchThunks } from "../../../../features/Payment_Managemant/salary/reducers/thunks";
import ContentLoader from "react-content-loader";
import type { RootState } from "../../../../store/store";

interface SalaryTableProps {
  search: string;
  branch: string;
  startDate: string;
  endDate: string;
  cardData?: any[];
  setCardData?: React.Dispatch<React.SetStateAction<any[]>>;
  onView: (salary: any) => void;
  loading?: boolean;
  search: string;
  branch: string;
  startDate: string;
  endDate: string;
  cardData?: any[];
  setCardData?: React.Dispatch<React.SetStateAction<any[]>>;
  onView: (salary: any) => void;
  loading?: boolean;
}

const SalaryTable: React.FC<SalaryTableProps> = ({
  search,
  branch,
  startDate,
  endDate,
  loading,
}) => {
  const [openCardId, setOpenCardId] = useState<number | null>(null);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showView, setShowView] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);
  const dispatch = useDispatch<any>();
  const AllSalary = useSelector(
    (state: RootState) => state?.StaffSalary?.salary
  );
  const [cardData, setCardData] = useState<any[]>([]);

  const [formData, setFormData] = useState<any>({
    staff: "",
    transactionId: "",
    salaryAmount: "",
    paymentDate: "",
    branchId: "",
  });
  const [openCardId, setOpenCardId] = useState<number | null>(null);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showView, setShowView] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);
  const dispatch = useDispatch<any>();
  const AllSalary = useSelector(
    (state: RootState) => state?.StaffSalary?.salary
  );
  const [cardData, setCardData] = useState<any[]>([]);

  const [formData, setFormData] = useState<any>({
    staff: "",
    transactionId: "",
    salaryAmount: "",
    paymentDate: "",
    branchId: "",
  });

  const filteredData = AllSalary.filter((row: any) => {
    const searchQuery = search.toLowerCase();
    const matchesSearch =
      row.staff.username?.toLowerCase().includes(searchQuery) ||
      row.salary_amount?.toString().includes(searchQuery) ||
      row.id?.toString().includes(searchQuery);
  const filteredData = AllSalary.filter((row: any) => {
    const searchQuery = search.toLowerCase();
    const matchesSearch =
      row.staff.username?.toLowerCase().includes(searchQuery) ||
      row.salary_amount?.toString().includes(searchQuery) ||
      row.id?.toString().includes(searchQuery);

    const matchesBranch = branch === "" || row.branchId === branch;
    const matchesBranch = branch === "" || row.branchId === branch;

    const rowDate = new Date(row.paymentDate);
    const matchesStartDate = startDate === "" || rowDate >= new Date(startDate);
    const matchesEndDate = endDate === "" || rowDate <= new Date(endDate);
    const rowDate = new Date(row.paymentDate);
    const matchesStartDate = startDate === "" || rowDate >= new Date(startDate);
    const matchesEndDate = endDate === "" || rowDate <= new Date(endDate);

    return matchesSearch && matchesBranch && matchesStartDate && matchesEndDate;
  });

  const handleEditClick = (card: any) => {
    setSelectedCard(card);
    setFormData({
      name: card.name,
      transactionId: card.transaction_id,
      salaryAmount: String(card.salary_amount),
      paymentDate: card.payment_date.split("T")[0],
      branchId: card.branchId,
    });
    setShowEditPanel(true);
    setOpenCardId(null);
  };
  const handleEditClick = (card: any) => {
    setSelectedCard(card);
    setFormData({
      name: card.name,
      transactionId: card.transaction_id,
      salaryAmount: String(card.salary_amount),
      paymentDate: card.payment_date.split("T")[0],
      branchId: card.branchId,
    });
    setShowEditPanel(true);
    setOpenCardId(null);
  };

  const handleViewClick = (card: any) => {
    setSelectedCard(card);
    setShowView(true);
    setOpenCardId(null);
  };
  const handleViewClick = (card: any) => {
    setSelectedCard(card);
    setShowView(true);
    setOpenCardId(null);
  };

  const handleCancel = () => {
    setShowEditPanel(false);
    setSelectedCard(null);
    setFormData({
      name: "",
      transactionId: "",
      salaryAmount: "",
      paymentDate: "",
      branchId: "",
    });
  };
  const handleCancel = () => {
    setShowEditPanel(false);
    setSelectedCard(null);
    setFormData({
      name: "",
      transactionId: "",
      salaryAmount: "",
      paymentDate: "",
      branchId: "",
    });
  };

  const handleSubmitAndClose = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWarning(true);
    setShowEditPanel(false);
  };
  const handleSubmitAndClose = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWarning(true);
    setShowEditPanel(false);
  };

  const confirmUpdate = async () => {
    if (!selectedCard) return;
  const confirmUpdate = async () => {
    if (!selectedCard) return;

    const updatedFields = {
      transaction_id: formData.transactionId,
      salary_amount: parseFloat(formData.salaryAmount),
      payment_date: formData.paymentDate,
      branchId: formData.branchId,
    };
    const updatedFields = {
      transaction_id: formData.transactionId,
      salary_amount: parseFloat(formData.salaryAmount),
      payment_date: formData.paymentDate,
      branchId: formData.branchId,
    };

    const result = await dispatch(
      UpdateAllSalaryThunks({ _id: selectedCard._id, ...updatedFields })
    );
    const result = await dispatch(
      UpdateAllSalaryThunks({ _id: selectedCard._id, ...updatedFields })
    );

    if (result?.payload) {
      const updated = cardData.map((item) =>
        item._id === selectedCard.id ? { ...item, ...updatedFields } : item
      );
    if (result?.payload) {
      const updated = cardData.map((item) =>
        item._id === selectedCard.id ? { ...item, ...updatedFields } : item
      );

      setCardData(updated);
      setShowWarning(false);
    }
    setShowSuccess(true);
  };
      setCardData(updated);
      setShowWarning(false);
    }
    setShowSuccess(true);
  };

  const handleDownload = (card: any) => {
    const doc = new jsPDF();
  const handleDownload = (card: any) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Salary Receipt", 20, 20);
    doc.setFontSize(16);
    doc.text("Salary Receipt", 20, 20);

    doc.setFontSize(12);
    const salaryData = [
      `Transaction ID: ${card.transaction_id || "N/A"}`,
      `Staff Name: ${card.staff?.username || "N/A"}`,
      `Email: ${card.email || "N/A"}`,
      `Branch: ${card.branchId === "1" ? "Chennai" : "Madurai"}`,
      `Payment Date: ${
        card.payment_date
          ? new Date(card.payment_date).toISOString().split("T")[0]
          : "N/A"
      }`,
      `Salary Amount: $${card.salary_amount || "N/A"}`,
      `Status: ${card.is_active ? "Active" : "Inactive"}`,
    ];
    doc.setFontSize(12);
    const salaryData = [
      `Transaction ID: ${card.transaction_id || "N/A"}`,
      `Staff Name: ${card.staff?.username || "N/A"}`,
      `Email: ${card.email || "N/A"}`,
      `Branch: ${card.branchId === "1" ? "Chennai" : "Madurai"}`,
      `Payment Date: ${
        card.payment_date
          ? new Date(card.payment_date).toISOString().split("T")[0]
          : "N/A"
      }`,
      `Salary Amount: $${card.salary_amount || "N/A"}`,
      `Status: ${card.is_active ? "Active" : "Inactive"}`,
    ];

    let y = 30;
    salaryData.forEach((line) => {
      doc.text(line, 20, y);
      y += 10;
    });
    let y = 30;
    salaryData.forEach((line) => {
      doc.text(line, 20, y);
      y += 10;
    });

    const fileName = `SalaryReceipt_${
      card.staff?.username?.replace(/\s+/g, "_") || "Staff"
    }_${card.transaction_id || "TXN"}.pdf`;
    doc.save(fileName);
  };
    const fileName = `SalaryReceipt_${
      card.staff?.username?.replace(/\s+/g, "_") || "Staff"
    }_${card.transaction_id || "TXN"}.pdf`;
    doc.save(fileName);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteSalary({ id });
      if (response?.sucess) {
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteSalary({ id });
      if (response?.sucess) {
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(GetAllSalaryThunks({}));
      if (result?.payload && Array.isArray(result.payload)) {
        setCardData(result.data);
      }
    };
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(GetAllSalaryThunks({}));
      if (result?.payload && Array.isArray(result.payload)) {
        setCardData(result.data);
      }
    };

    const fetchBranches = async () => {
      const branchRes = await dispatch(GetBranchThunks({}));
      if (branchRes?.payload && Array.isArray(branchRes.payload)) {
        setBranches(branchRes.payload);
      }
    };
    const fetchBranches = async () => {
      const branchRes = await dispatch(GetBranchThunks({}));
      if (branchRes?.payload && Array.isArray(branchRes.payload)) {
        setBranches(branchRes.payload);
      }
    };

    fetchData();
    fetchBranches();
  }, [dispatch, setCardData]);
    fetchData();
    fetchBranches();
  }, [dispatch, setCardData]);

  return (
    <>
      <div className="p-2 sm:p-4 shadow-2xl w-full overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-xs sm:text-sm text-gray-600">
              <th className="py-2 px-2 sm:py-3 sm:px-4">ID</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 hidden md:table-cell">Transaction ID</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Name</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Amount</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 hidden lg:table-cell">Payment Date</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 hidden sm:table-cell">Status</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Action</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <ContentLoader
                      speed={2}
                      width={60}
                      height={20}
                      viewBox="0 0 60 20"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="4" ry="4" width="60" height="20" />
                    </ContentLoader>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 hidden md:table-cell">
                    <ContentLoader
                      speed={2}
                      width={100}
                      height={20}
                      viewBox="0 0 100 20"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
                    </ContentLoader>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <ContentLoader
                      speed={2}
                      width={120}
                      height={20}
                      viewBox="0 0 120 20"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="4" ry="4" width="120" height="20" />
                    </ContentLoader>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <ContentLoader
                      speed={2}
                      width={80}
                      height={20}
                      viewBox="0 0 80 20"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="4" ry="4" width="80" height="20" />
                    </ContentLoader>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 hidden lg:table-cell">
                    <ContentLoader
                      speed={2}
                      width={100}
                      height={20}
                      viewBox="0 0 100 20"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
                    </ContentLoader>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 hidden sm:table-cell">
                    <ContentLoader
                      speed={2}
                      width={70}
                      height={20}
                      viewBox="0 0 70 20"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="4" ry="4" width="70" height="20" />
                    </ContentLoader>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <ContentLoader
                      speed={2}
                      width={80}
                      height={20}
                      viewBox="0 0 80 20"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="4" ry="4" width="80" height="20" />
                    </ContentLoader>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : filteredData.length > 0 ? (
            <tbody>
              {filteredData.map((row: any) => (
                <tr key={row.id} className="border-t text-xs sm:text-sm font-semibold">
                  <td className="py-2 px-2 sm:py-3 sm:px-4">#{row.id}</td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 hidden md:table-cell">{row.transaction_id}</td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={row.image}
                        alt={row.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-gray-800 truncate">
                          {row.staff.username}
                        </span>
                        <span className="text-xs text-gray-500 truncate hidden sm:block">
                          {row.staff.email ? row.staff.email : "Nil"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 whitespace-nowrap">${row.salary_amount}</td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 hidden lg:table-cell whitespace-nowrap">
                    {new Date(row.payment_date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 hidden sm:table-cell">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap">
                      {row.is_active ? "Active" : "InActive"}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-center relative">
                    <button
                      className="p-1 hover:bg-gray-200 rounded-full"
                      onClick={() =>
                        setOpenCardId(openCardId === row.id ? null : row.id)
                      }
                    >
                      <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    </button>

                    {openCardId === row.id && (
                      <div className="absolute -top-10 right-8 sm:right-20 z-10 w-32 sm:w-36 bg-white shadow-2xl rounded-xl p-2">
                        <button
                          className="flex items-center gap-2 w-full px-2 sm:px-4 py-2 text-xs sm:text-sm text-black rounded-md hover:bg-[#1BBFCA] hover:text-white"
                          onClick={() => handleViewClick(row)}
                        >
                          <FaEye className="flex-shrink-0" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleEditClick(row)}
                          className="flex items-center gap-2 w-full px-2 sm:px-4 py-2 mt-2 text-xs sm:text-sm border rounded-md hover:bg-[#1BBFCA] hover:text-white"
                        >
                          <FaEdit className="flex-shrink-0" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="flex items-center gap-2 w-full px-2 sm:px-4 py-2 mt-2 text-xs sm:text-sm border rounded-md hover:bg-[#1BBFCA] hover:text-white"
                        >
                          <FaTrash className="flex-shrink-0" />
                          <span>Delete</span>
                        </button>
                        <button
                          onClick={() => handleDownload(row)}
                          className="flex items-center gap-2 w-full px-2 sm:px-4 py-2 mt-2 text-xs sm:text-sm border rounded-md hover:bg-[#1BBFCA] hover:text-white"
                        >
                          <Download className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>Download</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={7} className="px-2 py-4 sm:px-4 sm:py-6 text-center text-gray-500 text-xs sm:text-sm">
                  No salary data available
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* View Panel */}
      {showView && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[35%] bg-white p-4 sm:p-6 mt-0 sm:mt-4 h-full sm:h-[95%] overflow-y-auto shadow-lg sm:rounded-l-xl">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <p className="text-xl sm:text-2xl font-semibold">View Salary</p>
              <button
                className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
                onClick={() => setShowView(false)}
              >
                <IoMdClose size={16} />
              </button>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-3 sm:gap-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 border rounded-full overflow-hidden">
                <img
                  src={
                    selectedCard.staff?.profileImage || "/placeholder-user.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center flex flex-col justify-center">
                <p className="font-bold text-[#716F6F] text-sm sm:text-base">
                  {selectedCard.staff?.username || "No Name"}
                </p>
                <p className="font-medium text-[#7D7D7D] text-xs sm:text-sm">
                  {selectedCard.staff?.email || "No Email"}
                </p>
              </div>
            </div>

            <div className="text-[#716F6F] font-semibold mt-6 mb-3 text-sm sm:text-base">
              <p>Staff Details</p>
            </div>
            <form className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Transaction ID</label>
                <input
                  value={selectedCard.transaction_id || ""}
                  readOnly
                  className="h-9 sm:h-10 border rounded p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Staff ID</label>
                <input
                  value={selectedCard.staff?.id || ""}
                  readOnly
                  className="h-9 sm:h-10 border rounded p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Staff Name</label>
                <input
                  value={selectedCard.staff?.username || ""}
                  readOnly
                  className="h-9 sm:h-10 border rounded p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Staff Email</label>
                <input
                  value={selectedCard.email ? selectedCard.staff.email : "Nil"}
                  readOnly
                  className="h-9 sm:h-10 border rounded p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Salary Amount</label>
                <input
                  value={`$${selectedCard.salary_amount || ""}`}
                  readOnly
                  className="h-9 sm:h-10 border rounded p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Paid Date</label>
                <input
                  value={
                    selectedCard.payment_date
                      ? new Date(selectedCard.payment_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  readOnly
                  className="h-9 sm:h-10 border rounded p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Panel */}
      {showEditPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[35%] bg-white p-4 sm:p-6 mt-0 sm:mt-4 h-full sm:h-[95%] overflow-y-auto shadow-lg sm:rounded-xl">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <p className="font-semibold text-xl sm:text-2xl">Edit Salary</p>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <X size={25}/>
              </button>
            </div>

            <form
              className="flex flex-col gap-3 sm:gap-4 mt-2"
              onSubmit={handleSubmitAndClose}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="branch" className="text-xs sm:text-sm">Select Branch</label>
                <select
                  id="branch"
                  className="border p-2 rounded h-9 sm:h-10 text-xs sm:text-sm"
                  value={formData.branchId}
                  onChange={(e) =>
                    setFormData({ ...formData, branchId: e.target.value })
                  }
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch._id} value={branch._uuid}>
                      {branch.branch_identity}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Select Staff</label>
                <input
                  type="text"
                  className="border p-2 rounded h-9 sm:h-10 text-xs sm:text-sm"
                  value={formData.staff}
                  onChange={(e) =>
                    setFormData({ ...formData, staff: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Payment Date</label>
                <input
                  type="date"
                  className="border p-2 rounded h-9 sm:h-10 text-xs sm:text-sm"
                  value={formData.paymentDate}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentDate: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Transaction Id</label>
                <input
                  type="text"
                  className="border p-2 rounded h-9 sm:h-10 text-xs sm:text-sm"
                  value={formData.transactionId}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionId: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Salary Amount</label>
                <input
                  type="text"
                  className="border p-2 rounded h-9 sm:h-10 text-xs sm:text-sm"
                  value={formData.salaryAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, salaryAmount: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end items-center gap-3 sm:gap-4 mt-4">
                <button
                  className="text-[#1BBFCA] border border-[#1BBFCA] px-3 sm:px-4 py-1.5 sm:py-2 rounded font-semibold text-xs sm:text-sm"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#1BBFCA] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded font-semibold text-xs sm:text-sm"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showWarning && !showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-[320px] sm:max-w-sm text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="text-red-500 text-4xl sm:text-5xl">
                <FaExclamationTriangle />
              </div>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
              Confirm Action
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              Are you sure you want to update this record?
            </p>
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md shadow text-xs sm:text-sm"
                onClick={confirmUpdate}
              >
                Yes, Update
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="border border-cyan-500 text-cyan-500 hover:bg-cyan-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-15 backdrop-blur-sm bg-black z-150 p-4">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-[280px] sm:max-w-sm text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-green-500 rounded-full p-2 sm:p-3">
                <CheckCircle className="text-white w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </div>
            <h2 className="text-gray-700 text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              Update Successful!
            </h2>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 sm:px-6 py-1.5 sm:py-2 rounded-md transition text-xs sm:text-sm"
              onClick={() => {
                setShowSuccess(false);
                setShowWarning(false);
                setShowEditPanel(false);
                setSelectedCard(null);
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryTable;