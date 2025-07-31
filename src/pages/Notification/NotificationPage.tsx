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

  const toggleReadStatus = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "read") return n.isRead;
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const getLabel = (type: string) => {
    switch (type) {
      case "all":
        return "All Notification";
      case "read":
        return "Read";
      case "unread":
        return "Unread";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      <div className="flex gap-3 mb-6">
        {["all", "read", "unread"].map((type) => (
          <button
            key={type}
            className={`border px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === type
                ? "bg-cyan-500 text-white border-cyan-500"
                : "text-cyan-500 border-cyan-500 hover:bg-cyan-50"
            }`}
            onClick={() => setFilter(type as "all" | "read" | "unread")}
          >
            {getLabel(type)}
          </button>
        ))}
      </div>

      {filteredNotifications.length > 0 ? (
        filteredNotifications.map((n) => (
          <div
            key={n.id}
            onClick={() => toggleReadStatus(n.id)}
            className={`border rounded p-4 mb-4 cursor-pointer transition ${
              n.isRead
                ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                : "bg-white text-black hover:bg-cyan-50"
            }`}
          >
            <h3 className="text-lg font-semibold mb-1">{n.title}</h3>
            <p className="text-sm">
              {n.date} at {n.time}
            </p>
            <p className="text-xs mt-1 italic">
              {n.isRead ? "unread" : "read"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-6">No notifications found.</p>
      )}
    </div>
  );
};

export default NotificationPage;
