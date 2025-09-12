import React, { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiMoreVertical,
  FiCheckCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import avatarimg from "../../assets/navbar/avatarimg.png";

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
  id,
  name,
  email,
  message,
  date,
  time,
  priority,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleResolve = () => {
    setShowMenu(false);
    navigate(`/staff-tickets/${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative border-2">
      <div className="flex items-center justify-between mb-2 relative">
        <div className="flex items-center gap-3">
          <img
            src={avatarimg}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-gray-800 font-semibold">{name}</h2>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>

        <div className="relative">
          <FiMoreVertical
            className="text-gray-400 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 z-10 w-25">
              <button
                className="w-full px-2 py-2 text-sm text-white bg-[#14b8c6] rounded-xl flex items-center gap-2"
                onClick={handleResolve}
              >
                <FiCheckCircle /> Resolve
              </button>
            </div>
          )}
        </div>
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
