import React from "react";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface Props {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationPopup: React.FC<Props> = ({ notifications, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-14 right-14 w-[300px] bg-white rounded-md shadow-lg z-50">
      <div className="bg-[#1BBFCA] text-white px-4 py-2 rounded-t-md font-semibold">
        Notifications
      </div>
      <ul>
        {notifications.map((n) => (
          <li key={n.id} className="p-3 border-b hover:bg-gray-50">
            <p className="font-medium">{n.title}</p>
            <p className="text-xs text-gray-500">{n.date} at {n.time}</p>
          </li>
        ))}
      </ul>
      <div
        className="text-sm text-[#1BBFCA] text-center py-2 cursor-pointer hover:underline"
        onClick={() => {
            console.log("click")
          navigate("/NotificationPage");
          onClose();
        }}
      >
        View All Notifications
      </div>
    </div>
  );
};

export default NotificationPopup;
