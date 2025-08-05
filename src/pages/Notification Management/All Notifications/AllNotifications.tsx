import { Card, CardContent } from "../../../components/ui/card";
import purpleImg from "../../../assets/purple icon.png";
import greenImg from "../../../assets/green icon.png";
import classImg from "../../../assets/classimg (1).png";
import { AddNotificationDrawer } from "../../../components/AllNotification/addNotification";
import { Button } from "../../../components/ui/button";
import instructorImg from "../../../assets/image 108.png";
import studentImg from "../../../assets/image 109.png";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { getAllNotificationsService } from "../../../features/AllNotifications/Services";
import { useDispatch } from "react-redux";

export default function AllNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const dispatch = useDispatch();


  const fetchAllNotifications = useCallback(
    async () => {
      try {
        const params = {
          branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
          institute: "973195c0-66ed-47c2-b098-d8989d3e4529",
          page: 1,
        };
        const response = await getAllNotificationsService(params);
        if (response && Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.log("Error fetching notifications:", error);
        setNotifications([]);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllNotifications();
  }, [dispatch]);

  
  const totalCount = notifications.length;
  const readCount = notifications.filter(
    (n) => n.status?.toLowerCase() === "read"
  ).length;
  const unreadCount = notifications.filter(
    (n) => n.status?.toLowerCase() === "unread"
  ).length;

  const stats = [
    {
      title: "Total Notifications",
      count: totalCount,
      color: "bg-[#DB55D233]",
      image: purpleImg,
    },
    {
      title: "Read Notifications",
      count: readCount,
      color: "bg-green-100",
      image: greenImg,
    },
    {
      title: "Unread Notifications",
      count: unreadCount,
      color: "bg-[#E3418F33]",
      image: classImg,
    },
  ];

  return (
    <div className="p-6 w-full">
      {/* Add Notification Button */}
      <div className="flex justify-end mb-4">
        <AddNotificationDrawer fetchAllNotifications ={fetchAllNotifications} />
      </div>
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
            <CardContent className="pt-12 -ml-4">
              <p
                style={{
                  ...FONTS.heading_08_bold,
                  color: COLORS.gray_dark_02,
                }}
              >
                {stat.title}
              </p>
              <p
                style={{
                  ...FONTS.heading_04_bold,
                  color: COLORS.gray_dark_01,
                }}
                className="mt-2"
              >
                {stat.count}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notifications List */}
      <h2
        style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}
        className="my-5"
      >
        Notifications
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {notifications?.length > 0 ? (
          notifications?.map((n: any, index) => (
            <Card key={index} className="p-4 rounded-2xl shadow-md">
              <CardContent className="p-0 flex flex-col items-start">
                <div className="flex items-center w-full mb-2">
                  <img
                    src={n.role === "Instructor" ? instructorImg : studentImg}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="w-full ml-3">
                    <span
                      style={{
                        ...FONTS.heading_08_bold,
                        color: COLORS.gray_dark_02,
                      }}
                    >
                      {n.name}
                    </span>
                    <p
                      style={{
                        ...FONTS.heading_09,
                        color: COLORS.gray_dark_03,
                      }}
                    >
                      {n.role}
                    </p>
                  </div>
                  <div className="flex justify-end w-full">
                    <span
                      style={{
                        ...FONTS.heading_09,
                        color: COLORS.gray_dark_03,
                      }}
                      className="border-2 px-1 py-0.5 rounded-md border-gray-400"
                    >
                      ID : {n.id}
                    </span>
                  </div>
                </div>
                <h3
                  style={{
                    ...FONTS.heading_08_bold,
                    color: COLORS.gray_dark_02,
                  }}
                >
                  {n.title}
                </h3>
                <p
                  style={{ ...FONTS.heading_09, color: COLORS.black }}
                  className="mb-2"
                >
                  {n.message}
                </p>
                <div className="flex justify-between text-sm w-full mb-2">
                  <span
                    className={`${
                      n.status === "read" ? "bg-green-600" : "bg-red-600"
                    } text-white px-2 py-0.5 rounded-md`}
                    style={{ ...FONTS.heading_09 }}
                  >
                    Status : {n.status}
                  </span>
                </div>
                <Button
                  className="bg-[#1BBFCA] hover:bg-cyan-600 text-white rounded px-3 py-0.5 self-end"
                  onClick={() => toast.success("Resend Notification")}
                >
                  Resend
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center col-span-full py-10">
    <p className="text-gray-500 text-center">"No notifications found"</p>
  </div>

        )}
      </div>
    </div>
  );
}
