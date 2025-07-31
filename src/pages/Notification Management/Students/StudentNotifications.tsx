import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Bell, Check, MessageSquare, Plus } from "lucide-react"
import  Flower  from "../../../assets/flower.png"

const StudentNotifications = () => {
  const notifications = [
    {
      id: 30,
      user: {
        name: "Elon Musk",
        email: "musk@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      course: "HTML Live Class",
      description: "This email confirms your upcoming live class for MERN course on 10/07/2025 at 02:30 PM",
    },
    {
      id: 30,
      user: {
        name: "Elon Musk",
        email: "musk@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      course: "HTML Live Class",
      description: "This email confirms your upcoming live class for MERN course on 10/07/2025 at 02:30 PM",
    },
    {
      id: 30,
      user: {
        name: "Elon Musk",
        email: "musk@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      course: "HTML Live Class",
      description: "This email confirms your upcoming live class for MERN course on 10/07/2025 at 02:30 PM",
    },
  ]

  return (
    <div className="p-6  min-h-screen">
      {/* Header with Add Notification Button */}
      <div className="flex justify-end mb-6">
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Notification
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Notifications */}
        <Card className="bg-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium mb-2">Total Notifications</p>
                <p className="text-3xl font-bold text-purple-800">0</p>
              </div>
              <div className="bg-purple-200 p-3 rounded-lg">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seen Notifications */}
        <Card className="bg-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-medium mb-2">Seen notifications</p>
                <p className="text-3xl font-bold text-green-800">0</p>
              </div>
              <div className="bg-green-200 p-3 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unseen Notifications */}
        <Card className="bg-pink-100 border-pink-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-700 text-sm font-medium mb-2">Unseen Notification</p>
                <p className="text-3xl font-bold text-pink-800">0</p>
              </div>
              <div className="bg-pink-200 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

     {/* Notifications Section */}
<div>
  <h2 className="text-xl font-semibold text-gray-800 mb-6">Notifications</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {notifications.map((notification, index) => (
      <Card key={index} className="bg-white shadow-lg hover:shadow-md transition-shadow flex flex-col h-[255px] border">
        <CardContent className="p-6 flex flex-col flex-grow">
          {/* User Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={Flower || "/placeholder.svg"} alt={notification.user.name} />
                <AvatarFallback>
                  {notification.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{notification.user.name}</p>
                <p className="text-sm text-gray-500">{notification.user.email}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">ID : {notification.id}</span>
          </div>

          {/* Course Info */}
          <div className="mb-4 flex-grow">
            <h3 className="font-semibold text-gray-900 mb-2">{notification.course}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{notification.description}</p>
          </div>

          {/* Resend Button - Bottom Left */}
          <div className="mt-auto flex justify-end">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Resend</Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</div>    
</div>
  )
}

export default StudentNotifications

