import { useState } from "react";
import { X } from "lucide-react";

export const FeeDetailsDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const fee = {
    id: "student-001-abc",
    name: "John Doe",
    email: "john@example.com",
    transactionId: "TXN123456",
    amount: "₹5000",
    date: "2025-08-01",
  };

  if (!isOpen || !fee) return null;

  const handleClose = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("View form submitted (no actual data change)");
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-xl z-50 overflow-y-auto transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Fees Details</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-cyan-500 rounded-full overflow-hidden border-2 border-gray-200 mb-3 flex items-center justify-center text-white text-4xl font-bold">
            {fee?.name?.charAt(0).toUpperCase()}
          </div>
          <p className="font-semibold text-lg text-gray-800">{fee.name}</p>
          <p className="text-sm text-gray-500">{fee.email}</p>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Student Details:
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700">
              Transaction ID
            </label>
            <input
              type="text"
              value={fee.transactionId}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Student Name</label>
            <input
              type="text"
              value={fee.name}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Student Email</label>
            <input
              type="email"
              value={fee.email}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Student ID</label>
            <input
              type="text"
              value={fee.id.split("-")[0]}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Roll No</label>
            <input
              type="text"
              value={"N/A"}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Paid Amount</label>
            <input
              type="text"
              value={fee.amount}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Payment Date</label>
            <input
              type="date"
              value={fee.date === "N/A" ? "" : fee.date}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-cyan-400 text-cyan-600 hover:bg-cyan-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
