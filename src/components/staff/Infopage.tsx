import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Label } from "../ui/label";

const Infopage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initial user data
  const [userData, setUserData] = useState({
    fullName: "Elon Musk",
    email: "Vacog7658@Eukusa.Com",
    role: "Senior Advisor To The President",
    gender: "Male",
    dob: "06-08-2000",
    primaryNumber: "3804348004",
    altNumber: "3903858390",
    qualification: "Physics",
    addressLine1: "Texas: Near The SpaceX Starbase",
    addressLine2: "Pretoria, Texas",
    city: "Boca Chica",
    state: "Texas",
    pinCode: "78521",
    course: "MEAN STACK 2024",
    designation: "Senior Professor",
    courseDescription: "The MEAN Stack is a Collection Of Technologies For Building Web Applications Including Front-End And Back-End Using JavaScript. It Stands For MongoDB, Express JS, Angular, Node JS."
  });

  // Form data state
  const [formData, setFormData] = useState({ ...userData });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...userData });
  };

  const handleSubmit = () => {
    setUserData({ ...formData });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      {isEditing ? (
        // Edit Form
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-sm font-semibold text-gray-800">Personal Information</h2>
            <p className="text-xs text-gray-500 mb-4">Enter The Staff Member's Personal Details</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Date Of Birth</Label>
                <Input 
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Input 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Role</Label>
                <Input 
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Qualification</Label>
                <Input 
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Designation</Label>
                <Input 
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-sm font-semibold text-gray-800">Address Information</h2>
            <p className="text-xs text-gray-500 mb-4">Enter The Staff Member's Address Details</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Address Line 1</Label>
                <Input 
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Address Line 2</Label>
                <Input 
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>City</Label>
                <Input 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>State</Label>
                <Input 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Pin Code</Label>
                <Input 
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-sm font-semibold text-gray-800">Contact Information</h2>
            <p className="text-xs text-gray-500 mb-4">Enter The Staff Member's Contact Details</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Phone Number</Label>
                <Input 
                  name="primaryNumber"
                  value={formData.primaryNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Alt Phone Number</Label>
                <Input 
                  name="altNumber"
                  value={formData.altNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="text-[#1bbfca] border border-[#1bbfca]" onClick={handleCancel}>Cancel</Button>
            <Button className="bg-[#1bbfca] text-white" onClick={handleSubmit}>Save Changes</Button>
          </div>
        </div>
      ) : (
        // Read-only View
        <>
          <div className="bg-[#1bbfca] text-white px-4 py-2 rounded-t-md font-medium mb-4">
            User Details
          </div>

          <div className="p-6 mb-4">
            <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <Input defaultValue={userData.fullName} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <Input defaultValue={userData.email} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Role</label>
                <Input defaultValue={userData.role} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Gender</label>
                <Input defaultValue={userData.gender} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Date Of Birth</label>
                <Input defaultValue={userData.dob} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Designation</label>
                <Input defaultValue={userData.designation} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Qualification</label>
                <Input defaultValue={userData.qualification} readOnly />
              </div>
            </div>
          </div>

          <hr />

          <div className="p-6 mb-4">
            <h3 className="font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Primary Number</label>
                <Input defaultValue={userData.primaryNumber} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Alternative Number</label>
                <Input defaultValue={userData.altNumber} readOnly />
              </div>
            </div>
          </div>

          <hr />

          <div className="p-6 mb-4">
            <h3 className="font-semibold text-gray-800 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Address Line 1</label>
                <Input defaultValue={userData.addressLine1} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Address Line 2</label>
                <Input defaultValue={userData.addressLine2} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">City</label>
                <Input defaultValue={userData.city} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">State</label>
                <Input defaultValue={userData.state} readOnly />
              </div>
              <div>
                <label className="block text-sm mb-1">Pin Code</label>
                <Input defaultValue={userData.pinCode} readOnly />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mb-8">
            <Button variant="destructive" className="text-[#1bbfca] border border-[#1bbfca]">
              Delete
            </Button>
            <Button className="bg-[#1bbfca] text-white" onClick={handleEditClick}>
              Edit
            </Button>
          </div>

          <hr className="mb-4" />

          <Card className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-300 relative h-48 rounded-md">
              <span className="bg-[#3abe65] absolute top-5 right-5 text-white text-xs font-medium px-3 py-1 rounded">
                Online
              </span>
            </div>
            <div className="space-y-2">
              <span className="bg-[#0400ff] text-white text-xs font-medium px-3 py-1 rounded">
                Web Development
              </span>
              <h4 className="text-lg font-semibold">{userData.course}</h4>
              <p className="text-sm text-gray-600">
                {userData.courseDescription}
              </p>
              <div className="flex justify-between items-center">
                <span className="bg-[#3abe65] text-white text-xs px-3 py-1 rounded">
                  Active
                </span>
                <Button className="text-xs text-white px-3 py-1 bg-[#3abe65]">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Infopage;