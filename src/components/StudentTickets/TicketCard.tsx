import React, { useState } from "react";
import { FiCalendar, FiClock, FiMoreVertical, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import avatarimg from '../../assets/navbar/avatarimg.png'

interface TicketProps {
 data: any;
}

const TicketCard: React.FC<TicketProps> = ({
  data
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleResolve = () => {
    setShowMenu(false);
    navigate(`/tickets/${data?.uuid}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative border-2">
      <div className="flex items-center justify-between mb-2 relative">
        <div className="flex items-center gap-3">
          <img
            src={avatarimg}
            alt="Avatar"
            className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-gray-800 font-semibold">{data?.category}</h2>
            <p className="text-gray-500 text-sm">{data?.description}</p>
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
                onClick={handleResolve} >
                <FiCheckCircle /> Resolve
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4">{}</p>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <FiCalendar />
          {data?.date ? new Date(data?.date).toLocaleDateString() : 'N/A'}
        </div>
        <div className="flex items-center gap-1">
          <FiClock />
          {data?.date ? new Date(data?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
        </div>
      </div>

      <button
        className={`text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 ${
          data?.priority === "High" ? "bg-red-500" : data?.priority === "Medium" ? "bg-yellow-300" : "bg-green-400"
        }`} >
        <FiCalendar />
        Priority: {data?.priority}
      </button>
    </div>
  );
};

export default TicketCard;