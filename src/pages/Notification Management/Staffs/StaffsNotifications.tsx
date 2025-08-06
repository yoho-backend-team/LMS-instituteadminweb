import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { selectBranch, selectStaff } from "../../../features/staff/reducers/selector";
import { getBranchDetailsData, getStaffDetailsData } from "../../../features/staff/reducers/thunks";
import { getAllStaffNotifications } from "../../../features/staffNotification/reducers/thunks";
import { getInstituteDetails, getSelectedBranchId } from "../../../apis/httpEndpoints";
import { selectStaffNotification } from '../../../features/staffNotification/reducers/selector';
import { createStaffNotifications } from "../../../features/staffNotification/services";

const StaffsNotification: React.FC = () => {
  const [open, setOpen] = useState(false);

  const instituteId = getInstituteDetails() ?? '973195c0-66ed-47c2-b098-d8989d3e4529';
  const branchId = getSelectedBranchId() ?? '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4';

  const dispatch = useDispatch<any>();
  const classData = useSelector(selectStaff)?.data || [];
  const branchData = useSelector(selectBranch);
  const staffNotificationData = useSelector(selectStaffNotification);
  const notifications = staffNotificationData?.data || [];

  const totalNotifications = notifications.length;
  const readNotifications = notifications.filter((n: any) => n.status === "read").length;
  const unreadNotifications = notifications.filter((n: any) => n.status === "unread").length;

  const stats = [
    { title: "Total Notifications", count: totalNotifications, color: "bg-[#DB55D233]", image: purpleImg },
    { title: "Read notifications", count: readNotifications, color: "bg-green-100", image: greenImg },
    { title: "Unread Notification", count: unreadNotifications, color: "bg-[#E3418F33]", image: classImg },
  ];

  const [formData, setFormData] = useState({
    institute: instituteId,
    branch: branchId,
    title: "",
    body: "",
    link: "",
    type: "",
    staff: [] as any[]
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Final Payload:", formData);
     try{
    console.log("🚀 Notification Payload:", formData);
    await createStaffNotifications(formData)
    setOpen(false);
    }
    catch(error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    dispatch(getStaffDetailsData({}));
    dispatch(getBranchDetailsData({}));
    dispatch(getAllStaffNotifications({ institute: instituteId, branch: branchId, page: 1 }));
  }, [dispatch, instituteId, branchId]);

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

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            
            {/* Notification Type */}
            <div className="flex flex-col">
              <Label>Notification Type</Label>
              <Select onValueChange={(v) => handleChange("type", v)}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Placement">Placement</SelectItem>
                  <SelectItem value="Alerts">Alerts</SelectItem>
                  <SelectItem value="Reminder">Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Staff */}
            <div className="flex flex-col">
              <Label>Select Staff</Label>
              <Select
                onValueChange={(uuid) => {
                  const selectedStaff = classData.find((s: any) => s.uuid === uuid);
                  if (selectedStaff) {
                    handleChange("staff", [selectedStaff]); // ✅ send full object
                  }
                }}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Choose Staff" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {classData.map((staff: any) => (
                    <SelectItem key={staff.uuid} value={staff.uuid}>
                      {staff.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <Label>Title</Label>
              <Input className="mt-1" onChange={(e) => handleChange("title", e.target.value)} />
            </div>

            {/* Body */}
            <div className="flex flex-col">
              <Label>Body</Label>
              <Textarea className="mt-1" onChange={(e) => handleChange("body", e.target.value)} />
            </div>

            {/* Link */}
            <div className="flex flex-col">
              <Label>Link</Label>
              <Input className="mt-1" onChange={(e) => handleChange("link", e.target.value)} />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <Button type="button" onClick={() => setOpen(false)} variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-50">
                Cancel
              </Button>
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white">Add Notification</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Summary Cards */}
      <div className="flex gap-6 flex-wrap mb-5">
        {stats.map((stat, index) => (
          <Card key={index} className={`w-[250px] h-[160px] p-4 rounded-xl shadow-md ${stat.color} relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}>
            <div className="absolute -top-3 left-3">
              <img src={stat.image} alt={stat.title} className="w-15 h-15 mt-3 object-contain" />
            </div>
            <CardContent className="pt-10">
              <p className="text-gray-700 mr-10 font-medium text-sm">{stat.title}</p>
              <p className="text-xl font-bold text-gray-800 mt-2">{stat.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notifications List */}
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notifications.map((n: any, index: number) => (
          <Card key={n._id || index} className="p-4 rounded-2xl shadow-md flex flex-col justify-between min-h-[220px] overflow-hidden">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="flex items-center w-full mb-2">
                <img src={instructorImg} alt="" className="w-12 h-12 rounded-full mr-2" />
                <div className="flex-1">
                  <span className="text-gray-500 block truncate">{n.staff?.[0]?.full_name || "Staff"}</span>
                  <p className="text-sm">Instructor</p>
                </div>
                <div className="text-xs text-gray-500">ID: {n.id}</div>
              </div>

              <div className="text-sm mb-1">
                <span className={`font-semibold ${n.status === "read" ? "text-green-600" : "text-red-600"}`}>
                  Status: {n.status}
                </span>
              </div>

              <h3 className="font-semibold text-gray-800 mb-1 truncate">{n.title}</h3>
              <p className="text-gray-500 text-sm mb-2 line-clamp-3 break-words">{n.body}</p>

              {n.link && (
                <a href={n.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs mb-2 break-all">
                  {n.link}
                </a>
              )}

              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded px-4 py-1 self-end mt-auto">
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
