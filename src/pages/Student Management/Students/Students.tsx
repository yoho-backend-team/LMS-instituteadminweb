"use client" // This component uses client-side hooks like useState and useNavigate

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { FaSlidersH } from "react-icons/fa" // Keeping original react-icons import as requested
import { BsPlusLg } from "react-icons/bs" // Keeping original react-icons import as requested
import location from "../../../assets/studentmanagement/location.jpeg" // Keeping original local image import as requested
import call from "../../../assets/studentmanagement/call.png" // Keeping original local image import as requested
import msg from "../../../assets/studentmanagement/msg.png" // Keeping original local image import as requested
import person from "../../../assets/studentmanagement/person.png" // Keeping original local image import as requested
import send from "../../../assets/studentmanagement/send.png" // Keeping original local image import as requested
import { RiUploadCloudFill } from "react-icons/ri" // Keeping original react-icons import as requested
import { useNavigate } from "react-router-dom" // Keeping original react-router-dom import as requested

const initialStudentData = [
  // Renamed to initialStudentData for clarity
  {
    name: "Elon Musk",
    email: "elonmusk@gmail.com",
    location: "Boca Chica, Undefined",
  },
  {
    name: "Elon Musk",
    email: "elonmusk@gmail.com",
    location: "Hello, Chennai",
  },
  {
    name: "Elon Musk",
    email: "elonmusk@gmail.com",
    location: "Boca Chica, Undefined",
  },
]

const Students = () => {
  const [students, setStudents] = useState(initialStudentData) // Now managing student data in state [^3]
  const [showFilters, setShowFilters] = useState(false)
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [courseFilter, setCourseFilter] = useState("")
  const [batchFilter, setBatchFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const navigate = useNavigate() // Keeping original react-router-dom's useNavigate as requested

  // State for the new student form inputs [^1]
  const [newStudentForm, setNewStudentForm] = useState({
    fullName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    qualification: "",
    branch: "",
    course: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    phoneNumber: "",
    altPhoneNumber: "",
  })

  const toggleFilters = () => setShowFilters(!showFilters)
  const toggleAddStudent = () => setShowAddStudent(!showAddStudent)

  // Handle input changes for the new student form [^1]
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewStudentForm((prev) => ({ ...prev, [id]: value }))
  }

  // Function to handle adding a new student
  const handleAddNewStudent = () => {
    const studentToAdd = {
      name: `${newStudentForm.fullName} ${newStudentForm.lastName}`,
      email: newStudentForm.email,
      location: `${newStudentForm.city}, ${newStudentForm.state}`,
      // You can add more fields from newStudentForm here if you want them displayed on the card
    }
    setStudents((prevStudents) => [...prevStudents, studentToAdd]) // Add new student to the list [^3]
    setNewStudentForm({
      // Reset form fields
      fullName: "",
      lastName: "",
      email: "",
      dob: "",
      gender: "",
      qualification: "",
      branch: "",
      course: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
      phoneNumber: "",
      altPhoneNumber: "",
    })
    setShowAddStudent(false) // Go back to the student list view
  }

  if (showAddStudent) {
    return (
      <div className="p-6">
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <h1 className="text-[20px] text-[#1BBFCA] font-bold">Add New Student</h1>
            <hr></hr>
            <CardTitle className="text-[20px] font-semibold">Upload Profile Picture</CardTitle>
            <p className="text-[14px] text-gray-500">Allowed PNG or JPEG. Max size of 2MB.</p>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-black rounded-lg p-12 text-center">
              <RiUploadCloudFill className="mx-auto text-[#1BBFCA] text-3xl mb-2" />
              <p className=" text-[14px] text-gray-500">Drop files here or click to upload</p>
            </div>
          </CardContent>
        </Card>
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-[20px] font-semibold">Student Details</CardTitle>
            <p className="text-[14px] text-gray-500">Add User Details Here</p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-[16px] font-medium ">
                Full Name
              </label>
              <Input
                id="fullName"
                value={newStudentForm.fullName}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-[16px] font-medium">
                Last Name
              </label>
              <Input
                id="lastName"
                value={newStudentForm.lastName}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[16px] font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email" // Changed to type="email" for better UX
                value={newStudentForm.email}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dob" className="text-[16px] font-medium">
                Date of Birth
              </label>
              <Input
                id="dob"
                type="date" // Changed to type="date" for better UX
                value={newStudentForm.dob}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="gender" className="text-[16px] font-medium">
                Gender
              </label>
              <Input
                id="gender"
                value={newStudentForm.gender}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="qualification" className="text-[16px] font-medium">
                Qualification
              </label>
              <Input
                id="qualification"
                value={newStudentForm.qualification}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="branch" className="text-[16px] font-medium">
                Select Branch
              </label>
              <Input
                id="branch"
                value={newStudentForm.branch}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="course" className="text-[16px] font-medium">
                Select Course
              </label>
              <Input
                id="course"
                value={newStudentForm.course}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-[20px] font-semibold">Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="addressLine1" className="text-[16px] font-medium">
                Address Line 1
              </label>
              <Input
                id="addressLine1"
                value={newStudentForm.addressLine1}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="addressLine2" className="text-[16px] font-medium">
                Address Line 2
              </label>
              <Input
                id="addressLine2"
                value={newStudentForm.addressLine2}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-[16px] font-medium">
                City
              </label>
              <Input
                id="city"
                value={newStudentForm.city}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="state" className="text-[16px] font-medium">
                State
              </label>
              <Input
                id="state"
                value={newStudentForm.state}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="pinCode" className="text-[16px] font-medium">
                Pin Code
              </label>
              <Input
                id="pinCode"
                value={newStudentForm.pinCode}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-[16px] font-medium">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                value={newStudentForm.phoneNumber}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="altPhoneNumber" className="text-[16px] font-medium">
                Alt Phone Number
              </label>
              <Input
                id="altPhoneNumber"
                value={newStudentForm.altPhoneNumber}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end mt-4 space-x-3">
            <Button
              onClick={toggleAddStudent}
              className="bg-[#1BBFCA]/10 text-[#1BBFCA] hover:bg-[#1BBFCA]/10 pr-16px pl-16px"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddNewStudent}
              className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]/90 pr-16px pl-16px"
            >
              Add Student
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Original student list view
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[24px] font-semibold">Student</h4>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          className="px-4 py-2 pr-16px pl-16px w-[153px] h-[48px] bg-[#1BBFCA] text-white text-[16px] hover:bg-[#1BBFCA]/90 flex items-center gap-2"
          onClick={toggleFilters}
        >
          <FaSlidersH className="text-white text-[18px]" />
          {showFilters ? "Hide Filter" : "Show Filter"}
        </Button>
        <Button
          className="px-4 py-2 pr-16px pl-16px w-[205px] h-[48px] bg-[#1BBFCA] text-white text-[16px] hover:bg-[#1BBFCA]/90 flex items-center gap-2"
          onClick={toggleAddStudent}
        >
          <BsPlusLg className="text-white text-[18px]" />
          Add New Student
        </Button>
      </div>
      {/* Filter Section - Two filters per row */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-6 border border-gray-200 ">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[16px] font-medium text-gray-700 ">Filter by Course</label>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-full h-10 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150 ">
                  <SelectValue className="text-gray-500" />
                </SelectTrigger>
                <SelectContent className="border-gray-300 shadow-md bg-white">
                  <SelectItem value="web-dev ">Web Development</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-[16px] font-medium text-gray-700">Filter by Batches</label>
              <Select value={batchFilter} onValueChange={setBatchFilter}>
                <SelectTrigger className="w-full h-10 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150">
                  <SelectValue className="text-gray-500" />
                </SelectTrigger>
                <SelectContent className="border-gray-300 shadow-md bg-white">
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[16px] font-medium text-gray-700">Filter by Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full h-10 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150">
                  <SelectValue className="text-gray-500" />
                </SelectTrigger>
                <SelectContent className="border-gray-300 shadow-md bg-white">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-transparent select-none">Hidden Label</div>
              <Input
                type="text"
                placeholder="Search Student"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
              />
            </div>
          </div>
        </div>
      )}
      {/* Scrollable Row of Cards */}
      <div className="grid grid-cols-3 justify-around overflow-x-auto gap-5 pb-4">
        {students.map(
          (
            student,
            index, // Using the state variable 'students'
          ) => (
            <Card
              key={index}
              className="min-w-[380px] max-w-[300px] flex-shrink-0 shadow-md"
              onClick={() => navigate("/students/Profile")}
            >
              <CardContent className="p-4">
                <div className="bg-gray-300 h-32 rounded-md mb-4" />
                <h5 className="text-[20px] font-semibold">{student.name}</h5>
                <p className="text-[16px] text-gray-500">{student.email}</p>
                <div className="flex items-center mt-2 text-[16px] text-gray-700 gap-[16px]">
                  <img className="w-5 h-5" src={ location || "/placeholder.svg"} alt="Location" />{" "}
                  {/* Using .src for local image */}
                  <span>{student.location}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-[30px] items-center px-4 pb-4">
                <img className="w-8 h-8" src={call || "/placeholder.svg"} alt="Call" />{" "}
                {/* Using .src for local image */}
                <img className="w-8 h-8" src={msg || "/placeholder.svg"} alt="Message" />{" "}
                {/* Using .src for local image */}
                <img className="w-8 h-8" src={person|| "/placeholder.svg"} alt="Profile" />{" "}
                {/* Using .src for local image */}
                <img className="w-8 h-8" src={send || "/placeholder.svg"} alt="Send" />{" "}
                {/* Using .src for local image */}
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </div>
  )
}

export default Students
