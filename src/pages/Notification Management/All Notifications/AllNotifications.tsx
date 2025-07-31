import { Card, CardContent } from "../../../components/ui/card";
import purpleImg from "../../../assets/purple icon.png";
import greenImg from "../../../assets/green icon.png";
import classImg from "../../../assets/classimg (1).png";
import { AddNotificationDrawer } from "../../../components/AllNotification/addNotification";
import { Button } from "../../../components/ui/button";
import instructorImg from "../../../assets/image 108.png";

interface NotificationItem {
  id: number;
  name: string;
  status: string;
  title: string;
  message: string;
}

const notifications: NotificationItem[] = [
  {
    id: 13,
    name: "Abdul kalam",
    status: "Unread",
    title: "Dress Code Reg",
    message: "All should maintain the dress code",
  },
  {
    id: 14,
    name: "Einstein",
    status: "read",
    title: "Dress Code Reg",
    message: "All should maintain the dress code",
  },
  {
    id: 15,
    name: "William",
    status: "Unread",
    title: "Dress Code Reg",
    message: "All should maintain the dress code",
  },
];

// 👉 Calculate counts dynamically
const totalCount = notifications.length;
const readCount = notifications.filter((n) => n.status.toLowerCase() === "read").length;
const unreadCount = notifications.filter((n) => n.status.toLowerCase() === "unread").length;

const stats = [
  {
    title: "Total Notifications",
    count: totalCount,
    color: "bg-[#DB55D233]",
    iconBg: "bg-white",
    image: purpleImg,
  },
  {
    title: "Read notifications",
    count: readCount,
    color: "bg-green-100",
    iconBg: "bg-[#7ED74F33]",
    image: greenImg,
  },
  {
    title: "Unread Notification",
    count: unreadCount,
    color: "bg-[#E3418F33]",
    iconBg: "bg-white",
    image: classImg,
  },
];

export default function AllNotifications() {
  return (
    <div className="p-6 w-full">
      <div className="flex justify-end mb-4">
        <AddNotificationDrawer />
      </div>

      {/* Stats Cards */}
      <div className="flex gap-6 flex-wrap">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`w-[250px] h-[160px] p-4 rounded-xl shadow-md ${stat.color} relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}
          >
            <div className="absolute -top-3 left-3">
              <img
                src={stat.image}
                alt={stat.title}
                className="w-15 h-15 mt-3 object-contain"
              />
            </div>
            <CardContent className="pt-10">
              <p className="text-gray-700 mr-10 font-medium text-sm">
                {stat.title}
              </p>
              <p className="text-xl font-bold text-gray-800 mt-2">
                {stat.count}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-4">Notifications</h2>

      {/* Notification List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {notifications.map((n, index) => (
          <Card
            key={index}
            className="p-4 rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-103 hover:shadow-xl"
          >
            <CardContent className="p-0 flex flex-col items-start">
              <div className="flex items-center w-full mb-2">
                <img
                  src={instructorImg}
                  alt={n.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="w-full">
                  <span className="text-gray-500">{n.name}</span>
                  <p>Instructor</p>
                </div>
                <div className="flex justify-end w-full">
                  <span className="text-gray-500">ID : {n.id}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm w-full mb-2">
                <span
                  className={`font-semibold ${
                    n.status.toLowerCase() === "read"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  Status : {n.status}
                </span>
              </div>

              <h3 className="font-semibold text-gray-800">{n.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{n.message}</p>

              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded px-4 py-1 self-end">
                Resend
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
