import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
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
import purpleImg from "../../../assets/purple icon.png";
import greenImg from "../../../assets/green icon.png";
import classImg from "../../../assets/classimg (1).png";
import instructorImg from "../../../assets/image 108.png";
import { X } from "lucide-react";






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



const StaffsNotification: React.FC = () => {
  const [open, setOpen] = useState(false);

  const notifications = [
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
      status: "Unread",
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

  return (
    <div className="p-6">
      {/* Top Right Button */}
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
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue  />
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
                  <SelectValue />
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
              <Select >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue   />
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
              <Textarea  className="mt-1" />
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
                className="border-cyan-500 text-cyan-500 hover:bg-cyan-50"
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

      {/* Notifications List */}
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {notifications.map((n, index) => (
          <Card key={index} className="p-4 rounded-2xl shadow-md">
            <CardContent className="p-0 flex flex-col items-start">
              <div className="flex items-center w-full mb-2">
                <img
                  src={instructorImg}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div className="w-full">
                  <span className="text-gray-500 ">{n.name}</span>
                  <p>Instructor</p>
                </div>
                <div className="flex justify-end w-full">
                  <span className="text-gray-500 ">ID : {n.id}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm w-full mb-2">
                <span className="text-green-600 font-semibold ">
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
};

export default StaffsNotification;
