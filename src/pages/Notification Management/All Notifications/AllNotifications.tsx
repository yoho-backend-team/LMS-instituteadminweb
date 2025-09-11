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
import { resendAllNotificationsService } from "../../../features/AllNotifications/Services";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../../features/AllNotifications/Reducers/thunks";
import { useSelector } from "react-redux";
import {
  selectAllNotification,
  selectLoading,
} from "../../../features/AllNotifications/Reducers/selectors";
import ContentLoader from "react-content-loader";

export default function AllNotifications() {
  const notifications = useSelector(selectAllNotification);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch<any>();
  const loading = useSelector(selectLoading);

  const fetchAllNotifications = useCallback(async () => {
    try {
      const params = {
        branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
        institute: "973195c0-66ed-47c2-b098-d8989d3e4529",
        page: 1,
      };
      dispatch(getAllNotifications(params));
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAllNotifications();
  }, [dispatch]);

  const totalCount = notifications.length;
  const readCount = notifications.filter(
    (n: any) => n.status?.toLowerCase() === "read"
  ).length;
  const unreadCount = notifications.filter(
    (n: any) => n.status?.toLowerCase() === "unread"
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

  const handleResend = async (notification: any) => {
    try {
      const resendData = {
        branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
        notification_id: notification?.uuid,
        institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
      };

      const response = await resendAllNotificationsService(resendData);

      if (response) {
        toast.success("Notification resent successfully!");
      } else {
        toast.error("Failed to resend notification.");
      }
    } catch (error) {
      console.error("Resend Error:", error);
      toast.error("Something went wrong while resending.");
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Add Notification Button */}
      <div className="flex justify-end mb-4">
        <AddNotificationDrawer fetchAllNotifications={fetchAllNotifications} />
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

      {/* Notifications Heading + Search */}
      <div className="flex justify-between items-center my-5">
        <h2 style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}>
          Notifications
        </h2>
        <div className="relative w-72">
          {/* Search Icon */}
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
              />
            </svg>
          </span>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search by title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-9 pr-8 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-red-500"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-5 col-span-3">
            {[...Array(6)].map((_, index) => (
              <ContentLoader
                speed={1}
                width="100%"
                height="100%"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="w-full h-[110px] p-4 rounded-2xl border shadow-md"
                key={index}
              >
                <rect x="0" y="0" rx="6" ry="6" width="100" height="24" />
                <rect x="270" y="0" rx="6" ry="6" width="80" height="24" />

                <rect x="0" y="36" rx="10" ry="10" width="100%" height="120" />

                <rect x="0" y="170" rx="6" ry="6" width="60%" height="20" />

                <rect x="0" y="200" rx="4" ry="4" width="80" height="16" />
                <rect x="280" y="200" rx="4" ry="4" width="60" height="20" />

                <rect x="0" y="240" rx="6" ry="6" width="100" height="32" />

                <rect x="260" y="240" rx="6" ry="6" width="80" height="32" />
              </ContentLoader>
            ))}
          </div>
        ) : notifications.length ? (
          notifications?.filter((n: any) =>
            n.title?.toLowerCase().includes(searchText.toLowerCase())
          ).length > 0 ? (
            notifications
              .filter((n: any) =>
                n.title?.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((n: any, index: any) => (
                <Card key={index} className="p-4 rounded-2xl shadow-md">
                  <CardContent className="p-0 flex flex-col items-start">
                    <div className="flex items-center w-full mb-2">
                      <img
                        src={
                          n.role === "Instructor" ? instructorImg : studentImg
                        }
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
                      {n.body}
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
                      onClick={() => handleResend(n)}
                    >
                      Resend
                    </Button>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className="flex items-center justify-center col-span-full py-10">
              <p className="text-gray-500 text-center">
                "No notifications found"
              </p>
            </div>
          )
        ) : (
          <Card className="col-span-3 mt-8">
            <p className="font-lg text-gray-900 text-center">
              No Notifications available
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
