
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

import bell from "../../../assets/bell.png";
import purpleImg from "../../../assets/purple icon.png";
import greenImg from "../../../assets/green icon.png";
import classImg from "../../../assets/classimg (1).png";
import { AddNotificationDrawer } from "../../../components/AllNotification/addNotification";

const stats = [
  {
    title: "Total Notifications",
    count: 0,
    color: "bg-[#DB55D233]",
    iconBg: "bg-white",
    image: purpleImg,
  },
  {
    title: "Seen notifications",
    count: 0,
    color: "bg-green-100",
    iconBg: "bg-[#7ED74F33]",
    image: greenImg,
  },
  {
    title: "Unseen Notification",
    count: 0,
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

      <div className="flex gap-6 flex-wrap">
        {stats.map((stat, index) => (
          <Card
  key={index}
  className={`w-[250px] h-[160px] p-4 rounded-xl shadow-md ${stat.color} relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}
>

            <div className="absolute -top-3 left-3">
              <div>
                <img
                  src={stat.image}
                  alt={stat.title}
                  className="w-15 h-15 mt-3 object-contain"
                />
              </div>
            </div>
            <CardContent className="pt-10">
              <p className="text-gray-700  mr-10 font-medium text-sm">
                {stat.title}
              </p>
              <p className="text-xl font-bold text-gray-800 mt-2">
                {stat.count}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-gray-700">Notifications</h2>
    </div>
  );
}
