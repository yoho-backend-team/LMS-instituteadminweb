import React from "react";
import { FiCalendar, FiClock, FiMoreVertical } from "react-icons/fi";

interface TicketProps {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
  priority: "High" | "Low";
}

const TicketCard: React.FC<TicketProps> = ({
  name,
  email,
  message,
  date,
  time,
  priority,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative border-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-gray-800 font-semibold">{name}</h2>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>
        <FiMoreVertical className="text-gray-400" />
      </div>

      <p className="text-gray-700 mb-4">{message}</p>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <FiCalendar />
          {date}
        </div>
        <div className="flex items-center gap-1">
          <FiClock />
          {time}
        </div>
      </div>

      <button
        className={`text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 ${
          priority === "High" ? "bg-[#14b8c6]" : "bg-[#14b8c6]"
        }`}
      >
        <FiCalendar />
        Priority: {priority}
      </button>
    </div>
  );
};

export default TicketCard;
