import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../../components/ui/select";

const StaffsNotification: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const notifications = [
    { id: 13, status: "Unread", title: "Dress Code Reg", message: "All should maintain the dress code" },
    { id: 13, status: "Unread", title: "Dress Code Reg", message: "All should maintain the dress code" },
    { id: 13, status: "Unread", title: "Dress Code Reg", message: "All should maintain the dress code" },
  ];

  return (
    <div className="p-6">
      {/* Top Right Button */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded px-4 py-2 shadow"
        >
          Add Notification
        </Button>
      </div>

      {/* If showForm is true → Show Add Notification Form */}
      {showForm ? (
        <Card className="max-w-sm mx-auto p-6 shadow rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Add Notification</h2>

          <form className="flex flex-col space-y-4">
            {/* Select Course */}
            <div className="flex flex-col">
              <Label>Select Course</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Course 1</SelectItem>
                  <SelectItem value="course2">Course 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Batch */}
            <div className="flex flex-col">
              <Label>Batch</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="batch1">Batch 1</SelectItem>
                  <SelectItem value="batch2">Batch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Student */}
            <div className="flex flex-col">
              <Label>Student</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student1">Student 1</SelectItem>
                  <SelectItem value="student2">Student 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notification Type */}
            <div className="flex flex-col">
              <Label>Notification Type</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Notification Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <Label>Title</Label>
              <Input placeholder="Title" className="mt-1" />
            </div>

            {/* Body */}
            <div className="flex flex-col">
              <Label>Body</Label>
              <Textarea placeholder="Body" className="mt-1" />
            </div>

            {/* Link */}
            <div className="flex flex-col">
              <Label>Link</Label>
              <Input placeholder="Link" className="mt-1" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                variant="outline"
                className="border-cyan-500 text-cyan-500 hover:bg-cyan-50"
              >
                Cancel
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Add Notification</Button>
            </div>
          </form>
        </Card>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-12 mb-8 items-stretch">
            <Card className="bg-[#DB55D2]/20 p-4 rounded-2xl shadow-md flex flex-col justify-center items-start">
              <div className="w-6 h-6 bg-white rounded shadow mb-2"></div>
              <p className="text-gray-700 text-lg">Total Notifications</p>
              <p className="text-2xl font-bold">0</p>
            </Card>

            <Card className="bg-[#7ED74F]/20 p-6 rounded-2xl shadow-md flex flex-col justify-center items-start scale-110">
              <div className="w-10 h-10 bg-white rounded shadow mb-2"></div>
              <p className="text-gray-700 text-lg">Seen notifications</p>
              <p className="text-3xl font-bold">0</p>
            </Card>

            <Card className="bg-[#e3414f]/20 p-4 rounded-2xl shadow-md flex flex-col justify-center items-start">
              <div className="w-6 h-6 bg-white rounded shadow mb-2"></div>
              <p className="text-gray-700 text-lg">Unseen Notification</p>
              <p className="text-2xl font-bold">0</p>
            </Card>
          </div>

          {/* Notifications List */}
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {notifications.map((n, index) => (
              <Card key={index} className="p-4 rounded-2xl shadow-md">
                <CardContent className="p-0 flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mb-3 shadow"></div>
                  <div className="flex justify-between text-sm w-full mb-2">
                    <span className="text-green-600 font-semibold">Status : {n.status}</span>
                    <span className="text-gray-500">ID : {n.id}</span>
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
        </>
      )}
    </div>
  );
};

export default StaffsNotification;
