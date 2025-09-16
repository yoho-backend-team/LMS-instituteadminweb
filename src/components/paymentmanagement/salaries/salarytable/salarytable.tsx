/* eslint-disable @typescript-eslint/no-explicit-any */

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

interface SalaryTableProps {
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
  // cardData,
  // onView,
  loading,
  // setCardData,
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

  const filteredData = AllSalary.filter((row: any) => {
    const searchQuery = search.toLowerCase();
    const matchesSearch =
      row.staff.username?.toLowerCase().includes(searchQuery) ||
      row.salary_amount?.toString().includes(searchQuery) ||
      row.id?.toString().includes(searchQuery);

    const matchesBranch = branch === "" || row.branchId === branch;

    const rowDate = new Date(row.paymentDate);
    const matchesStartDate = startDate === "" || rowDate >= new Date(startDate);
    const matchesEndDate = endDate === "" || rowDate <= new Date(endDate);

    return matchesSearch && matchesBranch && matchesStartDate && matchesEndDate;
  });

  // const handleViewClick = (card: any) => {
  //     onView(card);
  // };

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

  const confirmUpdate = async () => {
    if (!selectedCard) return;

    const updatedFields = {
      transaction_id: formData.transactionId,
      salary_amount: parseFloat(formData.salaryAmount),
      payment_date: formData.paymentDate,
      branchId: formData.branchId,
    };

    const result = await dispatch(
      UpdateAllSalaryThunks({ _id: selectedCard._id, ...updatedFields })
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

  const handleDownload = (card: any) => {
    const doc = new jsPDF();

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

    const fetchBranches = async () => {
      const branchRes = await dispatch(GetBranchThunks({}));
      if (branchRes?.payload && Array.isArray(branchRes.payload)) {
        setBranches(branchRes.payload);
      }
    };

    fetchData();
    fetchBranches();
  }, [dispatch, setCardData]);

  return (
    <>
      <div className="p-4 shadow-2xl">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Salary Amount</th>
              <th className="py-3 px-4">Payment Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          {loading ? (
            // Loading skeleton
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
                    <ContentLoader
                      speed={2}
                      width={150}
                      height={20}
                      viewBox="0 0 150 20"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="4" ry="4" width="150" height="20" />
                    </ContentLoader>
                  </td>
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
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
                </tr>
              ))}
            </tbody>
          ) : filteredData.length > 0 ? (
            // Data rows
            <tbody>
              {filteredData.map((row: any) => (
                <tr key={row.id} className="border-t text-sm font-semibold">
                  <td className="py-3 px-4">#{row.id}</td>
                  <td className="py-3 px-4">{row.transaction_id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.image}
                        alt={row.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {row.staff.username}
                        </span>
                        <span className="text-sm text-gray-500">
                          {row.staff.email ? row.staff.email : "Nil"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">${row.salary_amount}</td>
                  <td className="py-3 px-4">
                    {new Date(row.payment_date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">
                      {row.is_active ? "Active" : "InActive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center relative">
                    <button
                      className="p-1 hover:bg-gray-200 rounded-full"
                      onClick={() =>
                        setOpenCardId(openCardId === row.id ? null : row.id)
                      }
                    >
                      <MoreVertical className="h-5 w-5 text-gray-600" />
                    </button>

                    {openCardId === row.id && (
                      <div className="absolute -top-10 right-20 z-10 w-36 bg-white shadow-2xl rounded-xl p-2">
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-black rounded-md hover:bg-[#1BBFCA] hover:text-white"
                          onClick={() => handleViewClick(row)}
                        >
                          <FaEye />
                          View
                        </button>
                        <button
                          onClick={() => handleEditClick(row)}
                          className="flex items-center gap-2 w-full px-4 py-2 mt-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="flex items-center gap-2 w-full px-4 py-2 mt-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white"
                        >
                          <FaTrash />
                          Delete
                        </button>
                        <button
                          onClick={() => handleDownload(row)}
                          className="flex items-center gap-2 w-full px-4 py-2 mt-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            // Empty state
            <tbody>
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No salary data available
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* View Panel */}
      {showView && selectedCard && (
        <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-15 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full xl:w-[35%] bg-white p-4 mt-4 h-[95%] overflow-y-auto shadow-lg rounded-l-xl">
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-semibold">View Salary</p>
              <button
                className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
                onClick={() => setShowView(false)}
              >
                <IoMdClose size={16} />
              </button>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <div className="w-32 h-32 border rounded-full overflow-hidden">
                <img
                  src={
                    selectedCard.staff?.profileImage || "/placeholder-user.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center flex flex-col justify-center">
                <p className="font-bold text-[#716F6F]">
                  {selectedCard.staff?.username || "No Name"}
                </p>
                <p className="font-medium text-[#7D7D7D]">
                  {selectedCard.staff?.email || "No Email"}
                </p>
              </div>
            </div>

            {/* Staff Details */}
            <div className="text-[#716F6F] font-semibold">
              <p>Staff Details</p>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>Transaction ID</label>
                <input
                  value={selectedCard.transaction_id || ""}
                  readOnly
                  className="h-10 border rounded p-2 bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label>Staff ID</label>
                <input
                  value={selectedCard.staff?.id || ""}
                  readOnly
                  className="h-10 border rounded p-2 bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label>Staff Name</label>
                <input
                  value={selectedCard.staff?.username || ""}
                  readOnly
                  className="h-10 border rounded p-2 bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label>Staff Email</label>
                <input
                  value={selectedCard.email ? selectedCard.staff.email : "Nil"}
                  readOnly
                  className="h-10 border rounded p-2 bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label>Salary Amount</label>
                <input
                  value={`$${selectedCard.salary_amount || ""}`}
                  readOnly
                  className="h-10 border rounded p-2 bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label>Paid Date</label>
                <input
                  value={
                    selectedCard.payment_date
                      ? new Date(selectedCard.payment_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  readOnly
                  className="h-10 border rounded p-2 bg-gray-100"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Panel */}
      {showEditPanel && (
        <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-15 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full xl:w-[35%] bg-white p-4 mt-4 h-[95%] overflow-y-auto shadow-lg rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-2xl">Edit Salary</p>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <X size={25}/>
              </button>
            </div>

            <form
              className="flex flex-col gap-4 mt-2"
              onSubmit={handleSubmitAndClose}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="branch">Select Branch</label>
                <select
                  id="branch"
                  className="border p-2 rounded h-10"
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
                <label>Select Staff</label>
                <input
                  type="text"
                  className="border p-2 rounded h-10"
                  value={formData.staff}
                  onChange={(e) =>
                    setFormData({ ...formData, staff: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Payment Date</label>
                <input
                  type="date"
                  className="border p-2 rounded h-10"
                  value={formData.paymentDate}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentDate: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Transaction Id</label>
                <input
                  type="text"
                  className="border p-2 rounded h-10"
                  value={formData.transactionId}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionId: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Salary Amount</label>
                <input
                  type="text"
                  className="border p-2 rounded h-10"
                  value={formData.salaryAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, salaryAmount: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end items-center gap-4 mt-4">
                <button
                  className="text-[#1BBFCA] border border-[#1BBFCA] px-4 py-1 rounded font-semibold"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#1BBFCA] text-white px-4 py-1 rounded font-semibold"
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
        <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[320px] text-center">
            <div className="flex justify-center mb-4">
              <div className="text-red-500 text-5xl">
                <FaExclamationTriangle />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Confirm Action
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to update this record?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md shadow"
                onClick={confirmUpdate}
              >
                Yes, Update
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="border border-cyan-500 text-cyan-500 hover:bg-cyan-50 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-15 backdrop-blur-sm bg-black z-150">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 rounded-full p-3">
                <CheckCircle className="text-white w-10 h-10" />
              </div>
            </div>
            <h2 className="text-gray-700 text-lg font-semibold mb-6">
              Update Successful!
            </h2>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-md transition"
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
