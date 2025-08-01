import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Bell, Check, MessageSquare, Plus } from "lucide-react"
import Flower from "../../../assets/flower.png"

import purpleImg from "../../../assets/purple icon.png";
import greenImg from "../../../assets/green icon.png";
import classImg from "../../../assets/classimg (1).png";
import instructorImg from "../../../assets/image 108.png";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../../components/ui/drawer";
import { X } from "lucide-react";
import { useState } from "react";

const stats = [
  {
    title: "Total Notifications",
    count: 0,
    color: "bg-[#DB55D233]",
    image: purpleImg,
  },
  {
    title: "Read notifications",
    count: 0,
    color: "bg-green-100",
    image: greenImg,
  },
  {
    title: "Unread Notification",
    count: 0,
    color: "bg-[#E3418F33]",
    image: classImg,
  },
];

const StudentNotifications = () => {
  const [open, setOpen] = useState(false);
  
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
    <div className="p-6 min-h-screen">
      {/* Header with Add Notification Button */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded px-4 py-2 shadow"
        >
          Add Notification
        </Button>
      </div>

      {/* Drawer for Notification Form */}
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
          <DrawerHeader className="flex items-center justify-between p-0 mb-6 relative">
            <DrawerTitle className="text-lg font-semibold">Add Notification</DrawerTitle>
            <DrawerClose>
              <X className="w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 hover:text-black absolute top-0 right-0" />
            </DrawerClose>
          </DrawerHeader>

          <form className="flex flex-col space-y-4">
            {/* Select Course */}
            <div className="flex flex-col">
              <Label>Select Course</Label>
              <Select>
                <SelectTrigger className="mt-1 w-full ">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="course1">Course 1</SelectItem>
                  <SelectItem value="course2">Course 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Batch */}
            <div className="flex flex-col">
              <Label>Batch</Label>
              <Select>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue  />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="batch1">Batch 1</SelectItem>
                  <SelectItem value="batch2">Batch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Student */}
            <div className="flex flex-col">
              <Label>Student</Label>
              <Select>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue  />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="student1">Student 1</SelectItem>
                  <SelectItem value="student2">Student 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notification Type */}
            <div className="flex flex-col w-full">
              <Label>Notification Type</Label>
              <Select>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <Label>Title</Label>
              <Input  className="mt-1" />
            </div>

            {/* Body */}
            <div className="flex flex-col">
              <Label>Body</Label>
              <Textarea className="mt-1" />
            </div>

            {/* Link */}
            <div className="flex flex-col">
              <Label>Link</Label>
              <Input className="mt-1" />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="outline"
                className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 "
              >
                Cancel
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Add Notification
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Summary Cards */}
      <div className="flex gap-6 flex-wrap mb-5">
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

      {/* Notifications Section - Unchanged */}
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
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Resend</Button>
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