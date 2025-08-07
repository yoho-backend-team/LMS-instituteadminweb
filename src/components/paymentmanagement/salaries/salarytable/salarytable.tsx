

import React, { useState } from "react";
import { MoreVertical, Download } from "lucide-react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FaExclamationTriangle } from 'react-icons/fa';
import { CheckCircle } from 'lucide-react';

interface SalaryTableProps {
    search: string;
    branch: string;
    startDate: string;
    endDate: string;
    cardData: any[];
    setCardData: React.Dispatch<React.SetStateAction<any[]>>;
}

const SalaryTable: React.FC<SalaryTableProps> = ({
    search,
    branch,
    startDate,
    endDate,
    cardData,
    setCardData,
}) => {
    const [openCardId, setOpenCardId] = useState<number | null>(null);
    const [showEditPanel, setShowEditPanel] = useState(false);
    const [selectedCard, setSelectedCard] = useState<any | null>(null);
    const [showWarning, setShowWarning] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        transactionId: "",
        salaryAmount: "",
        paymentDate: "",
        branchId: "",
    });

    const filteredData = cardData.filter((row) => {
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

    const handleViewClick = (card: any) => {
        alert(`Viewing ${card.name}`);
    };

    const handleDownload = (card: any) => {
        alert(`Downloading receipt for ${card.name}`);
    };

    const handleEditClick = (card: any) => {
        setSelectedCard(card);
        setFormData({
            name: card.name,
            transactionId: card.transactionId,
            salaryAmount: String(card.salaryAmount),
            paymentDate: card.paymentDate,
            branchId: card.branchId,
        });
        setShowEditPanel(true);
        setOpenCardId(null);
    };

    const handleCancel = () => {
        setShowEditPanel(false);
        setSelectedCard(null);
    };

    const handleSubmitAndClose = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCard) return;

        const updated = cardData.map((item) =>
            item.id === selectedCard.id
                ? { ...item, ...formData, salaryAmount: parseFloat(formData.salaryAmount) }
                : item
        );

        setCardData(updated);
        setShowEditPanel(false);
        setSelectedCard(null);
    };

    const [showSuccess, setShowSuccess] = useState(false);


    return (
        <>
            <div className="p-4 shadow-2xl">
                <table className="min-w-full h-[50%] bg-white rounded-lg overflow-hidden">
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
                    <tbody>
                        {filteredData.map((row) => (
                            <tr key={row.id} className="border-t transition-colors text-sm font-semibold relative">
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
                                            <span className="font-medium text-gray-800">{row.staff.username}</span>
                                            <span className="text-sm text-gray-500">{row.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4">${row.salary_amount}</td>
                                <td className="py-3 px-4">
                                    {new Date(row.payment_date).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}
                                </td>

                                <td className="py-3 px-4">
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">{row.is_active ? "Active" : "InActive"}</span>

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
                                                className="flex items-center gap-2 w-full px-4 py-2 text-black  rounded-md hover:bg-[#1BBFCA] hover:text-white"
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
                                                onClick={() => {
                                                    setCardData((prev) => prev.filter((c) => c.id !== row.id));
                                                    setOpenCardId(null);
                                                }}
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
                </table>
            </div>
            {showWarning && (
                <>

                    {!showSuccess && (
                        <div className="fixed inset-0 bg-black  bg-opacity-15 backdrop-blur-sm flex justify-center items-center z-50">
                            <div className="bg-white rounded-xl shadow-lg p-6 w-[320px] text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="text-red-500 text-5xl">
                                        <FaExclamationTriangle />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-1">Confirm Action</h2>
                                <p className="text-sm text-gray-600 mb-6">Are you sure you want to change the status?</p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md shadow"
                                        onClick={() => { setShowSuccess(true) }}
                                    >
                                        Yes, Status
                                    </button>
                                    <button
                                        onClick={close}
                                        className="border border-cyan-500 text-cyan-500 hover:bg-cyan-50 px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {showSuccess && (
                        <div className="fixed inset-0 flex items-center justify-center bg-opacity-15 backdrop-blur-sm bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-green-500 rounded-full p-3">
                                        <CheckCircle className="text-white w-10 h-10" />
                                    </div>
                                </div>
                                <h2 className="text-gray-700 text-lg font-semibold mb-6">Success!</h2>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-md transition"
                                    onClick={() => {
                                        setShowSuccess(false);   // close success modal
                                        setShowWarning(false);   // close warning modal
                                    }}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    )}

                </>
            )}

            {showEditPanel && (
                <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-15 backdrop-blur-sm z-50 flex justify-end">
                    <div className="w-full xl:w-[35%] bg-white p-4 mt-4 h-[95%] overflow-y-auto shadow-lg">
                        <p className="font-semibold text-2xl">Edit Salary</p>

                        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmitAndClose}>
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
                                    <option value=""></option>
                                    <option value="1">Chennai</option>
                                    <option value="2">Madurai</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label>Select Staff</label>
                                <input
                                    type="text"
                                    className="border p-2 rounded h-10"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
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
                                    onClick={() => { setShowWarning(true) }}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SalaryTable;