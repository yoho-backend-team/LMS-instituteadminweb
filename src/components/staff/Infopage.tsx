/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import { Label } from "../ui/label"
import { COLORS, FONTS } from "../../constants/uiConstants"
import { useDispatch, useSelector } from "react-redux"
import { getStaffDetailsDataId } from "../../features/staff/reducers/thunks"
import { selectStaffId } from "../../features/staff/reducers/selector"
import { GetImageUrl } from "../../utils/helper"
import { deleteStaff, updateStaff } from "../../features/staff/services"

interface Staff {
  _id: any
  uuid: any
  id: number
  full_name: string
  email: string
  status: "Active" | "Inactive"
  avatar: string
  dob?: string
  gender?: string
  course?: string
  designation?: string
  qualification?: string
  contact_info: {
    state?: string
    city?: string
    pinCode?: string
    address1?: string
    address2?: string
    phone_number?: string
    alternate_phone_number?: string
  }
}

interface InfopageProps {
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  staff: Staff
}

const Infopage: React.FC<InfopageProps> = ({ isEditing, setIsEditing, staff }) => {
  const staffId = useSelector(selectStaffId)
  const staffIdData = staffId?.data?.staff
  const course = staffIdData?.userDetail?.course;
  const filcategory = course?.map((item: any) => item?.category?.category_name)
  const fildescription = course?.map((item: any) => item?.overview)
  const filthumbnail = course?.map((item: any) => item?.thumbnail)

  const [formData, setFormData] = useState({
    fullName: staffIdData?.full_name || "",
    email: staffIdData?.email || "",
    role: staffIdData?.designation || "Senior Advisor To The President",
    gender: staffIdData?.gender || "Male",
    dob: staffIdData?.dob || "06-08-2000",
    primaryNumber: staffIdData?.contact_info?.phone_number || "3804348004",
    altNumber: staffIdData?.contact_info?.alternate_phone_number || "3903858390",
    qualification: staffIdData?.qualification || "Physics",
    address1: staffIdData?.contact_info?.address1 || "Texas: Near The SpaceX Starbase",
    address2: staffIdData?.contact_info?.address2 || "Pretoria, Texas",
    city: staffIdData?.contact_info?.city || "Boca Chica",
    state: staffIdData?.contact_info?.state || "Texas",
    pinCode: staffIdData?.contact_info?.pinCode || "78521",
    course: staffIdData?.course || "MEAN STACK 2024",
    designation: staffIdData?.designation || "Senior Professor",
    category: filcategory || "Development",
    thumbnail: filthumbnail,
    module: "number of modules",
    price: "$",
    courseDescription: fildescription || "The MEAN Stack is a Collection Of Technologies For Building Web Applications Including Front-End And Back-End Using JavaScript. It Stands For MongoDB, Express JS, Angular, Node JS.",
  })

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      fullName: staffIdData?.full_name || "",
      email: staffIdData?.email || "",
      // role: staffIdData?.designation || "Senior Advisor To The President",
      role: "Staff",
      gender: staffIdData?.gender || "Male",
      dob: staffIdData?.dob || "06-08-2000",
      primaryNumber: staffIdData?.contact_info?.phone_number || "3804348004",
      altNumber: staffIdData?.contact_info?.alternate_phone_number || "3903858390",
      qualification: staffIdData?.qualification || "Physics",
      address1: staffIdData?.contact_info?.address1 || "Texas: Near The SpaceX Starbase",
      address2: staffIdData?.contact_info?.address2 || "Pretoria, Texas",
      city: staffIdData?.contact_info?.city || "Boca Chica",
      state: staffIdData?.contact_info?.state || "Texas",
      pinCode: staffIdData?.contact_info?.pinCode || "78521",
      course: staffIdData?.course || "MEAN STACK 2024",
      designation: staffIdData?.designation || "Senior Professor",
      category: filcategory || "Development",
      thumbnail: filthumbnail,
      module: "number of modules",
      price: "$",
      courseDescription: fildescription || "The MEAN Stack is a Collection Of Technologies For Building Web Applications Including Front-End And Back-End Using JavaScript. It Stands For MongoDB, Express JS, Angular, Node JS.",
    })

  }

   const id = staff?.uuid

  const handleSubmit = async () => {
    setIsEditing(false)

    const payload = {
      contact_info: {
        state: formData.state,
        city: formData.city,
        pincode: formData.pinCode,
        address1: formData.address1,
        address2: formData.address2,
        phone_number: formData.primaryNumber,
        alternate_phone_number: formData.altNumber
      },
      course: ['67f3b7fcb8d2634300cc87b6'], 
      designation: formData.designation,
      dob: formData.dob,
      email: formData.email,
      full_name: formData.fullName,
      gender: formData.gender,
      id: staffIdData?._id, // Keep existing ID
      image: staffIdData?.image || "staticfiles/lms/default-image.png", // Keep existing image or default
      qualification: formData.qualification,
      user_details: "InstituteTeachingStaff", // Hardcoded as per requirement
      username: staffIdData?.userDetail?.username || formData.fullName.replace(/\s+/g, '').toLowerCase() // Generate username if not available
     
    };
     const staffId = {
        staffId : id
       }
    console.log("payload",payload)
    try {  
      const response = await updateStaff(staffId,payload)
    }
    catch (error) {
      console.log(error);
    }

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

 


  const handleDelete = async () => {
    try {
      await deleteStaff({
        staffId: id
      });
     
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }


  const dispatch = useDispatch<any>()
  const fetchClassDataId = () => {
    dispatch(
      getStaffDetailsDataId({
        staffId: id,
      }),
    )
  }

  useEffect(() => {
    fetchClassDataId()
  }, [])




  // Update formData when staffIdData changes
  useEffect(() => {
    if (staffIdData) {
      setFormData({
        fullName: staffIdData.full_name || "",
        email: staffIdData.email || "",
        // role: staffIdData.designation || "Senior Advisor To The President",
        role: "Staff",
        gender: staffIdData.gender || "Male",
        dob: staffIdData.dob || "06-08-2000",
        primaryNumber: staffIdData.contact_info?.phone_number || "3804348004",
        altNumber: staffIdData.contact_info?.alternate_phone_number || "3903858390",
        qualification: staffIdData.qualification || "Physics",
        address1: staffIdData.contact_info?.address1 || "Texas: Near The SpaceX Starbase",
        address2: staffIdData.contact_info?.address2 || "Pretoria, Texas",
        city: staffIdData.contact_info?.city || "Boca Chica",
        state: staffIdData.contact_info?.state || "Texas",
        pinCode: staffIdData.contact_info?.pinCode || "78521",
        course: staffIdData.course || "MEAN STACK 2024",
        designation: staffIdData.designation || "Senior Professor",
        category: filcategory || "Development",
        thumbnail: filthumbnail,
        module: "number of modules",
        price: "$",
        courseDescription: fildescription ||
          "The MEAN Stack is a Collection Of Technologies For Building Web Applications Including Front-End And Back-End Using JavaScript. It Stands For MongoDB, Express JS, Angular, Node JS.",
      })
    }
  }, [staffIdData])

  return (
    <div className="">
      {isEditing ? (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6">
            <h2 style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>Personal Information</h2>
            <p style={{ ...FONTS.heading_09, color: COLORS.gray_dark_02 }}>Enter The Staff Member's Personal Details</p>
            <hr className="my-3" />
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
            <hr className="my-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Address Line 1</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                <Label className="mb-1">Address Line 2</Label>
                <Input
                  className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                  name="address2"
                  value={formData.address2}
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
            <hr className="my-3" />
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
                    defaultValue={staffIdData?.full_name || ""}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Email
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staffIdData?.email || ""}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Role
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staffIdData?.designation || "Senior Advisor To The President"}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Gender
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staffIdData?.gender || "Male"}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Date Of Birth
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staffIdData?.dob || "06-08-2000"}
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
                    defaultValue={staffIdData?.contact_info?.phone_number || "3804348004"}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Alternative Number
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staffIdData?.contact_info?.alternate_phone_number || "3903858390"}
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
                    defaultValue={staffIdData?.qualification || "Physics"}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
                  Address
                  <Input
                    className="w-full h-10 border border-[#716F6F] hover:border-[#716F6F] focus:border-[#716F6F] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#716F6F]"
                    defaultValue={staffIdData?.contact_info?.address1 || "Texas: Near The SpaceX Starbase"}
                    readOnly
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mb-8">
            <Button onClick={handleDelete} variant="destructive" className="text-[#1bbfca] border border-[#1bbfca] bg-[#1bbfca]/20">
              Delete
            </Button>
            <Button className="bg-[#1bbfca] text-white" onClick={handleEditClick}>
              Edit
            </Button>
          </div>
          <hr className="mb-4" />
          <Card className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <div style={{ backgroundImage: `url(${GetImageUrl(filthumbnail)})` }} className="relative h-64 rounded-md bg-contain bg-no-repeat bg-center">

              <span className="bg-[#3abe65] absolute top-5 right-5 text-white text-xs font-medium px-3 py-1 rounded">
                Online
              </span>
            </div>
            <div>
              <div className="space-y-2">
                <span className="bg-[#0400ff] text-white text-xs font-medium px-3 py-1 rounded">{filcategory}</span>
                <h4 style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>
                  {staffIdData?.course || "MEAN STACK 2024"}
                </h4>
                <p style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>{formData.courseDescription}</p>
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
                    className={`text-white px-5 py-1 ${staffIdData?.status === "Active" ? "bg-[#3abe65]" : "bg-red-500"}`}
                  >
                    {staffIdData?.status}
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
  )
}

export default Infopage
