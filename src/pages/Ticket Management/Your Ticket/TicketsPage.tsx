import React, { useState } from "react";
import mask from '../../../assets/navbar/Mask-1.png';
import prfimg from '../../../assets/navbar/image.png';

type TicketCardProps = {
    name: string;
    email: string;
    message: string;
    date: string;
    time: string;
    priority: "High" | "Medium" | "Low";
    avatarUrl?: string;
};
const priorities = ["Low", "Medium", "High"] as const;
type Priority = typeof priorities[number];
const TicketCard: React.FC<TicketCardProps> = ({
    name,
    email,
    message,
    date,
    time,

    avatarUrl,
}) => {
    const [priority, setPriority] = useState<Priority>("High");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const priorityColor =
        priority === "High"
            ? "bg-[#1BBFCA]"
            : priority === "Medium"
                ? "bg-yellow-500"
                : "bg-gray-400";

    return (

        <div className="bg-white shadow-md rounded-lg p-4 w-80">
            <div className="flex items-center mb-2">
                <img
                    src={prfimg}
                    alt={name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h2 className="text-sm font-bold">{name}</h2>
                    <p className="text-xs text-gray-500">{email}</p>
                </div>
                <div
                    className="ml-auto text-gray-500 text-xl cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ⋮
                </div>
            </div>
            <p className="text-sm mb-3 mt-8">{message}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <span>📅 {date}</span>
                    <span>🕕 {time}</span>
                </div>
            </div>
            <div className={`flex mt-8 px-3 w-[140px] h-[34px] py-1 text-white text-xs rounded ${priorityColor}`}>
                <span><img src={mask} /></span>
                <span className="mt-1 ml-2">Priority: {priority}</span>
            </div>

            {/* Priority Selection Menu */}
            {isMenuOpen && (
                <div className="absolute top-68 left-114 w-48 bg-white border rounded-lg shadow-md p-2 z-10">
                    {priorities.map((level) => (
                        <button
                            key={level}
                            onClick={() => {
                                setPriority(level);
                                setIsMenuOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 rounded mb-2 ${level === priority ? "bg-teal-400 text-white" : "border"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            )}
        </div>

    );
};

export default TicketCard;