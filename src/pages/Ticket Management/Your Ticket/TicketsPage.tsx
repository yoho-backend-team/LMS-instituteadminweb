import React, { useState, useRef, useEffect } from "react";
import mask from '../../../assets/navbar/Mask-1.png';
import prfimg from '../../../assets/navbar/image.png';
import { FONTS } from '../../../constants/uiConstants';
import { FiCalendar, FiClock, FiMoreVertical, FiCheckCircle } from "react-icons/fi";
interface Message {
  sender: "user" | "admin";
  text: string;
  time: string;
}

type TicketCardProps = {
    name: string;
    email: string;
    message: Message;
    date: string;
    time: string;
    priority: "High" | "Medium" | "Low";
    avatarUrl?: string;
    onView: () => void;
};

const TicketCard: React.FC<TicketCardProps> = ({
    name,
    email,
    message,
    date,
    time,
    priority,
    avatarUrl,
    
    onView,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    console.log("name",name)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsPopupOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const priorityColor =
        priority === "High"
            ? "bg-[#1BBFCA]"
            : priority === "Medium"
                ? "bg-yellow-500"
                : "bg-gray-400";

    return (
        <div className="bg-white shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] rounded-lg p-4 w-full relative">
            <div className="flex items-center mb-2">
                <img
                    src={prfimg}
                    alt={name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h2 className="text-gray-500" style={{ ...FONTS.heading_07_bold }}>{name}</h2>
                    
                    <p className="text-gray-500" style={{ ...FONTS.heading_12 }}>Email: {email}</p>
                </div>

                {/* ⋮ icon */}
                <div className="ml-auto relative" ref={popupRef}>
                    <div
                        className="text-red text-2xl cursor-pointer text-[#1BBFCA] "
                        onClick={() => setIsPopupOpen(!isPopupOpen)}
                    >
                        ⋮
                    </div>

                    {/* Popup Button */}
                    {isPopupOpen && (
                        <div className="absolute right-0 left-[-3] top-7  bg-gray-100  rounded shadow z-3">
                            <button
                                onClick={() => {
                                    
                                    onView();
                                }}
                                className=" w-[90px] ml-1 mt-1 mr-1 border mb-1 h-[34px] text-sm text-white bg-[#1BBFCA] hover:bg-[#1BBFCA] rounded-md hover:text-white"
                            >
                                View
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-gray-500 mb-6 mt-4" style={{ ...FONTS.heading_13 }}>{message}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex justify-between items-center w-full" style={{ ...FONTS.heading_10 }}>
                    <span className="flex items-center gap-1">
                        <FiCalendar />
                        {date}
                    </span>
                    <span className="flex items-center gap-1">
                        <FiClock />
                        {time}
                    </span>
                </div>

            </div>
            <div
                className={`flex mt-4 px-3 w-[150px] h-[34px] py-1 text-white text-xs rounded ${priorityColor}`}
            >
                <span>
                    <img src={mask} />
                </span>
                <span className="mt-1 ml-1" style={{ ...FONTS.heading_09 }}>Priority: {priority}</span>
            </div>
        </div>
    );
};

export default TicketCard;
