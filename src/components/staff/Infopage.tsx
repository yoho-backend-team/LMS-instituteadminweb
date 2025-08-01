import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { COLORS, FONTS } from "../../constants/uiConstants";

interface Staff {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  avatar: string;
  dateOfBirth?: string;
  gender?: string;
  course?: string;
  designation?: string;
  qualification?: string;
  state?: string;
  city?: string;
  pinCode?: string;
  addressLine1?: string;
  addressLine2?: string;
  phoneNumber?: string;
  altPhoneNumber?: string;
}

interface InfopageProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  staff: Staff;
}

const Infopage: React.FC<InfopageProps> = ({ isEditing, setIsEditing, staff }) => {
  const [formData, setFormData] = useState({
    fullName: staff.name,
    email: staff.email,
    role: staff.designation || "Senior Advisor To The President",
    gender: staff.gender || "Male",
    dob: staff.dateOfBirth || "06-08-2000",
    primaryNumber: staff.phoneNumber || "3804348004",
    altNumber: staff.altPhoneNumber || "3903858390",
    qualification: staff.qualification || "Physics",
    addressLine1: staff.addressLine1 || "Texas: Near The SpaceX Starbase",
    addressLine2: staff.addressLine2 || "Pretoria, Texas",
    city: staff.city || "Boca Chica",
    state: staff.state || "Texas",
    pinCode: staff.pinCode || "78521",
    course: staff.course || "MEAN STACK 2024",
    designation: staff.designation || "Senior Professor",
    module: "number of modules",
    price: "$",
    courseDescription: "The MEAN Stack is a Collection Of Technologies For Building Web Applications Including Front-End And Back-End Using JavaScript. It Stands For MongoDB, Express JS, Angular, Node JS."
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: staff.name,
      email: staff.email,
      role: staff.designation || "Senior Advisor To The President",
      gender: staff.gender || "Male",
      dob: staff.dateOfBirth || "06-08-2000",
      primaryNumber: staff.phoneNumber || "3804348004",
      altNumber: staff.altPhoneNumber || "3903858390",
      qualification: staff.qualification || "Physics",
      addressLine1: staff.addressLine1 || "Texas: Near The SpaceX Starbase",
      addressLine2: staff.addressLine2 || "Pretoria, Texas",
      city: staff.city || "Boca Chica",
      state: staff.state || "Texas",
      pinCode: staff.pinCode || "78521",
      course: staff.course || "MEAN STACK 2024",
      designation: staff.designation || "Senior Professor",
      module: "number of modules",
      price: "$",
      courseDescription: "The MEAN Stack is a Collection Of Technologies For Building Web Applications Including Front-End And Back-End Using JavaScript. It Stands For MongoDB, Express JS, Angular, Node JS."
    });
  };

  const handleSubmit = () => {
    setIsEditing(false);
    // In a real app, you would update the staff data here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      {isEditing ? (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6">
            <h2 style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>Personal Information</h2>
            <p style={{ ...FONTS.heading_09, color: COLORS.gray_dark_02 }}>Enter The Staff Member's Personal Details</p>
            <hr className="my-3"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 ">
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Full Name</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Email</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Date Of Birth</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Gender</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Role</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Qualification</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Designation</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6">
            <h2 style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>Address Information</h2>
            <p className="text-xs text-gray-500 ">Enter The Staff Member's Address Details</p>
            <hr className="my-3"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Address Line 1</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Address Line 2</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">City</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">State</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Pin Code</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6">
            <h2 style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>Contact Information</h2>
            <p className="text-xs text-gray-500 ">Enter The Staff Member's Contact Details</p>
            <hr className="my-3"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Phone Number</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="primaryNumber"
                  value={formData.primaryNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Alt Phone Number</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="altNumber"
                  value={formData.altNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start gap-4">
            <Button
              variant="outline"
              className="ml-4 text-[#1bbfca] border border-[#1bbfca] bg-[#1bbfca]/10"
              onClick={handleCancel}
            >
              Back
            </Button>
            <Button className="bg-[#1bbfca] text-white" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ ...FONTS.heading_05 }} className="bg-[#1bbfca] text-white px-4 py-2 rounded-t-md mb-4">
            User Details
          </div>

          <div className="p-6 mb-4">
            <h3 style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} className="mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Full Name
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.name}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Email
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.email}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Role
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.designation || "Senior Advisor To The President"}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Gender
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.gender || "Male"}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Date Of Birth
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.dateOfBirth || "06-08-2000"}
                    readOnly
                  />
                </label>
              </div>
            </div>
          </div>

          <hr />

          <div className="p-6 mb-4">
            <h3 style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} className="mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Primary Number
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.phoneNumber || "3804348004"}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Alternative Number
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.altPhoneNumber || "3903858390"}
                    readOnly
                  />
                </label>
              </div>
            </div>
          </div>

          <hr />

          <div className="p-6 mb-4">
            <h3 style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }} className="mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Qualification
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.qualification || "Physics"}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Address
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staff.addressLine1 || "Texas: Near The SpaceX Starbase"}
                    readOnly
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mb-8">
            <Button variant="destructive" className="text-[#1bbfca] border border-[#1bbfca] bg-[#1bbfca]/20">
              Delete
            </Button>
            <Button className="bg-[#1bbfca] text-white" onClick={handleEditClick}>
              Edit
            </Button>
          </div>

          <hr className="mb-4" />

          <Card className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <div className="bg-gray-300 relative h-64 rounded-md">
              <span className="bg-[#3abe65] absolute top-5 right-5 text-white text-xs font-medium px-3 py-1 rounded">
                Online
              </span>
            </div>
            <div>
              <div className="space-y-2">
                <span className="bg-[#0400ff] text-white text-xs font-medium px-3 py-1 rounded">
                  Web Development
                </span>
                <h4 style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
                  {staff.course || "MEAN STACK 2024"}
                </h4>
                <p style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  {formData.courseDescription}
                </p>
                <div
                  style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
                  className="flex items-center justify-between space-y-5"
                >
                  <p>{formData.module}</p>
                  <p>{formData.price}</p>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <Button
                    style={{ ...FONTS.heading_08 }}
                    className={`text-white px-5 py-1 ${staff.status === "Active" ? "bg-[#3abe65]" : "bg-red-500"}`}
                  >
                    {staff.status}
                  </Button>
                  <Button style={{ ...FONTS.heading_08 }} className="text-white px-3 py-1 bg-[#3abe65]">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Infopage;