import React from 'react';
import { Link } from 'react-router-dom';

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
    return (
        <div className="absolute right-0 top-10 w-80 bg-white rounded-lg shadow-lg z-50">
            <div className="bg-[#1BBFCA] text-white text-lg font-semibold px-4 py-2 rounded-t-lg">
                Notifications
            </div>
            <ul className="divide-y">
                {notifications.map((notification) => (
                    <li key={notification.id} className="px-4 py-3 hover:bg-gray-100">
                        <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                        <p className="text-xs text-gray-500">
                            {notification.date} at {notification.time}
                        </p>
                    </li>
                ))}
            </ul>

            <div className="text-center py-2 border-t">
                <Link
                    to="/noti"
                    onClick={onClose}
                    className="text-[#1BBFCA] text-sm font-medium hover:underline"
                >
                    View All Notifications
                </Link>
            </div>
        </div>
    );
};

export default NotificationPopup;
