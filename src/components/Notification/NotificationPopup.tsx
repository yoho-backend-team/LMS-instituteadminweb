// src/components/NotificationPopup.tsx
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
    <div className="absolute right-0 top-[60px] w-72 bg-white shadow-lg rounded-md border z-50">
      <div className="bg-[#1BBFCA] text-white font-bold p-2 rounded-t-md">
        Notifications
      </div>
      <div className="p-2 space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className="border-b pb-1">
            <p className="font-semibold">{n.title}</p>
            <p className="text-xs text-gray-500">{`${n.date} at ${n.time}`}</p>
          </div>
        ))}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              navigate("/noti/msg");
              setTimeout(onClose, 0);
            }}
            className="text-sm text-cyan-600 hover:underline"
          >
            View All Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
