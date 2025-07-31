import React, { useState } from "react";

interface Notification {
  id: number;
  title: string;
  date: string;
  time: string;
  isRead: boolean;
}

const NotificationPage = () => {
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Branch Management",
      date: "05 Nov 2022",
      time: "10:32 AM",
      isRead: true,
    },
    {
      id: 2,
      title: "Student Management",
      date: "20 Aug 2025",
      time: "05:34 PM",
      isRead: false,
    },
    {
      id: 3,
      title: "Content Management",
      date: "17 Mar 2025",
      time: "06:09 PM",
      isRead: false,
    },
  ]);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "read") return n.isRead;
    if (filter === "unread") return !n.isRead;
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      <div className="flex gap-3 mb-4">
        <button
          className={`border px-4 py-1 rounded ${
            filter === "all"
              ? "bg-cyan-500 text-white border-cyan-500"
              : "text-cyan-500 border-cyan-500"
          }`}
          onClick={() => setFilter("all")}
        >
          All Notifications
        </button>
        <button
          className={`border px-4 py-1 rounded ${
            filter === "read"
              ? "bg-cyan-500 text-white border-cyan-500"
              : "text-cyan-500 border-cyan-500"
          }`}
          onClick={() => setFilter("read")}
        >
          Read
        </button>
        <button
          className={`border px-4 py-1 rounded ${
            filter === "unread"
              ? "bg-cyan-500 text-white border-cyan-500"
              : "text-cyan-500 border-cyan-500"
          }`}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div key={n.id} className="border-b py-2">
              <h3
                className={`font-medium ${
                  n.isRead ? "text-gray-800" : "text-black"
                }`}
              >
                {n.title}
              </h3>
              <p className="text-sm text-gray-500">
                {n.date} at {n.time}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
