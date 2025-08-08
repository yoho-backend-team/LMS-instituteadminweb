import { IoMdClose } from "react-icons/io";

interface ViewSalaryProps {
  onClose: () => void;
  salary: any;
}

const Viewsalary: React.FC<ViewSalaryProps> = ({ onClose, salary }) => {
  return (
    <div className="relative text-[#716F6F] p-3 h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Salary Details</h2>
        <button
          onClick={onClose}
          className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
        >
          <IoMdClose size={16} />
        </button>
      </div>

      {/* Profile Image */}
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-30 h-30 border rounded-full overflow-hidden">
          <img
            src={salary?.image}
            alt={salary?.staff?.username}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-[#716F6F]">{salary?.staff?.username}</p>
          <p className="font-medium text-[#7D7D7D]">{salary?.email}</p>
        </div>
      </div>

      {/* Staff Details */}
      <div className="text-[#716F6F] font-semibold">
        <p>Staff Details</p>
      </div>

      {/* Details Form */}
      <form className="flex flex-col gap-4 overflow-y-auto h-[85vh] scrollbar-hide">
        <div className="flex flex-col">
          <label>Transaction ID</label>
          <input
            value={salary?.transaction_id || ""}
            readOnly
            className="h-10 border rounded-xl"
          />
        </div>

        <div className="flex flex-col">
          <label>Staff ID</label>
          <input value={salary?.staff?.id || ""} readOnly className="h-10 border rounded-xl" />
        </div>

        <div className="flex flex-col">
          <label>Staff Name</label>
          <input
            value={salary?.staff?.username || ""}
            readOnly
            className="h-10 border rounded-xl"
          />
        </div>

        <div className="flex flex-col">
          <label>Staff Email</label>
          <input
            value={salary?.email || ""}
            readOnly
            className="h-10 border rounded-xl"
          />
        </div>

        <div className="flex flex-col">
          <label>Salary Amount</label>
          <input
            value={salary?.salary_amount || ""}
            readOnly
            className="h-10 border rounded-xl"
          />
        </div>

        <div className="flex flex-col">
          <label>Paid Date</label>
          <input
            value={salary?.payment_date || ""}
            readOnly
            className="h-10 border rounded-xl"
          />
        </div>
      </form>
    </div>
  );
};

export default Viewsalary;
