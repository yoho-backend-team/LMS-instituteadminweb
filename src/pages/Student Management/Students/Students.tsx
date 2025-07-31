import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import { FaSlidersH } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import location from '../../../assets/studentmanagement/location.jpeg';
import call from '../../../assets/studentmanagement/call.png';
import msg from '../../../assets/studentmanagement/msg.png';
import person from '../../../assets/studentmanagement/person.png';
import send from '../../../assets/studentmanagement/send.png';
import { RiUploadCloudFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const studentData = [
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
];

const Students = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [showAddStudent, setShowAddStudent] = useState(false);
	const [courseFilter, setCourseFilter] = useState("");
	const [batchFilter, setBatchFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [searchInput, setSearchInput] = useState("");
	
const navigate = useNavigate();

	const toggleFilters = () => setShowFilters(!showFilters);
	const toggleAddStudent = () => setShowAddStudent(!showAddStudent);

	if (showAddStudent) {
		return (
			<div className="p-6">
				<div className="flex justify-between items-center mb-6">

					<Button
						variant="outline"
						onClick={toggleAddStudent}
						className="px-4 py-2 pr-16px pl-16px w-[153px] h-[48px] bg-[#1BBFCA] text-white text-[16px] hover:bg-[#1BBFCA]/90 flex items-center gap-2"

					>
						Back to Students
					</Button>
				</div>

				<Card className="mb-6 shadow-md">
					<CardHeader>
						<h1 className="text-[20px] text-[#1BBFCA] font-bold">Add New Student</h1><hr></hr>
						<CardTitle className="text-[20px] font-semibold">Upload Profile Picture</CardTitle>
						<p className="text-[14px] text-gray-500">Allowed PNG or JPEG. Max size of 2MB.</p>
					</CardHeader>
					<CardContent>
						<div className="border-2  border-black rounded-lg p-12 text-center"
						
						>
							<RiUploadCloudFill className="mx-auto  text-[#1BBFCA] text-3xl mb-2" />
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
							<label className="text-[16px] font-medium ">Full Name</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]" />
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">Last Name</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">Email</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
								type="email" />
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">Date of Birth</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">Gender</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>


						<div className="space-y-2">
							<label className="text-[16px] font-medium">Qualification</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-[16px] font-medium">Select Branch</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>


						<div className="space-y-2">
							<label className="text-[16px] font-medium">Select Course</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
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
							<label className="text-[16px] font-medium">Address Line 1</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">Address Line 2</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">City</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">State</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">Pin Code</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">Phone Number</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[16px] font-medium">Alt Phone Number</label>
							<Input className="w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end mt-4 space-x-3">
						<Button 
						 onClick={toggleAddStudent}
						className="bg-[#1BBFCA]/10 text-[#1BBFCA] hover:bg-[#1BBFCA]/10 pr-16px pl-16px">
							Cancel
						</Button>
						<Button className="bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]/90 pr-16px pl-16px">
							Add Student
						</Button>
					</CardFooter>

				</Card>
			</div>
		);
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
								<SelectTrigger
									className="w-full h-10 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150 "
								>
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
			<div className="flex justify-around overflow-x-auto pb-4">
				{studentData.map((student, index) => (
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
								<img className="w-5 h-5" src={location} alt="Location" />
								<span>{student.location}</span>
							</div>
						</CardContent>
						<CardFooter className="flex justify-center gap-[30px] items-center px-4 pb-4">
							<img className='w-8 h-8' src={call} alt="Call" />
							<img className='w-8 h-8' src={msg} alt="Message" />
							<img className='w-8 h-8' src={person} alt="Profile" />
							<img className='w-8 h-8' src={send} alt="Send" />
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Students;