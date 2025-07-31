
import { Search } from "lucide-react";
import call from "../../assets/call.png";
import email from "../../assets/mail.png";
import flower from "../../assets/flower.png"
import location from "../../assets/location.png"
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { COLORS, FONTS } from "../../constants/uiConstants";
import { Card } from "../ui/card";



const batchData = [
  {
    name: "MERN STACK 2024",
    duration: "6 Month",
    startDate: "April 2, 2025",
    endDate: "April 3, 2025",
  },
  {
    name: "MERN STACK 2024",
    duration: "3 Month",
    startDate: "April 3, 2025",
    endDate: "April 4, 2025",
  },
  {
    name: "MERN STACK 2024",
    duration: "2 Month",
    startDate: "April 4, 2025",
    endDate: "April 5, 2025",
  },
  {
    name: "MERN STACK 2024",
    duration: "8 Month",
    startDate: "April 5, 2025",
    endDate: "April 6, 2025",
  },
];

const students = [
  {
    name: "Elon Musk",
    email: "elonmusk@gmail.com",
    phone: "+91 9876456783",
    location: "Boca Chica, Undefined",
    id: 54,
    img: "https://i.pravatar.cc/100?u=elon",
  },
  {
    name: "John",
    email: "johnronaldo@gmail.com",
    phone: "+91 9876456543",
    location: "Boca Chica, Chennai",
    id: 76,
    img: "https://i.pravatar.cc/100?u=john",
  },
];

export default function StudentDashboardMain() {
  const navigate = useNavigate(); 

  return (
    <div className="p-6  min-h-screen">
      <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-[#1BBFCA] hover:text-[#1BBFCA] transition-all mb-4"
>
  <ArrowLeft className="w-5 h-5" />
</button>

      <h2 className="mb-4"style={{...FONTS.heading_04_bold,color:COLORS.gray_dark_02}}>MERN 2025</h2>
      <Card className="p-6 bg-white shadow-lg rounded-xl mb-8 space-y-4">
  
  <Card className="p-4 bg-white shadow-sm rounded-xl">
    <div className="grid grid-cols-3"style={{...FONTS.heading_06_bold,color:COLORS.gray_dark_02}}>
      <span>Course Name</span>
      <span>Duration</span>
      <span className="ml-45">Days</span>
    </div>
  </Card>


  <div className="space-y-4">
    {batchData.map((batch, i) => (
      <Card
        key={i}
        className="p-4 bg-white shadow-sm rounded-xl flex flex-row items-center justify-between"
      >
        <div className=" w-1/3"style={{...FONTS.heading_06_bold,color:COLORS.gray_dark_02}}>
          {batch.name}
        </div>
        <div className=" w-1/3"style={{...FONTS.heading_06_bold,color:COLORS.gray_dark_02}}>{batch.duration}</div>
        <div className="flex items-center gap-2 justify-end w-1/3">
          <div className="bg-blue-600  px-3 py-1 rounded-md"style={{...FONTS.heading_08_bold,color:COLORS.white}}>
            {batch.startDate}
          </div>
         <div className="flex items-center justify-center w-16 relative">
            <div className="absolute -top-[3px] left-2 right-2 h-[2px] bg-[#1BBFCA] rounded-full -translate-y-1/2" />
            <div className="absolute w-2 h-2 bg-[#1BBFCA] rounded-full left-2 -translate-y-1/2 top-1/2" />
            <div className="absolute w-2 h-2 bg-[#1BBFCA] rounded-full right-2 -translate-y-1/2 top-1/2" />          </div>
          <div className="bg-blue-600  px-3 py-1 rounded-md"style={{...FONTS.heading_08_bold,color:COLORS.white}}>
            {batch.endDate}
          </div>
        </div>
      </Card>
    ))}
  </div>
</Card>

       

     
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Search Student"
          className="border border-[#1BBFCA] pl-10 p-2 rounded-md "style={{...FONTS.heading_11,color:COLORS.gray_dark_03}}
        />
        <Search className="absolute left-3 top-7.5 -translate-y-1/2 h-4 w-4 text-[#1BBFCA]" />
      </div>

    
     <div className="space-y-4">
  {students.map((student, i) => (
    <Card
      key={i}
      className="p-4 rounded-2xl bg-white shadow-md flex flex-row items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <img
          src={flower}
          alt={student.name}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h4 style={{...FONTS.heading_06_bold,color:COLORS.gray_dark_02}}>{student.name}</h4>
          <p style={{...FONTS.heading_12,color:COLORS.gray_dark_02}}>Student ID : {student.id}</p>
        </div>
      </div>

      
      <div className="flex items-center gap-40  text-sm text-gray-700">
        <div className="flex items-center gap-2 ">
          <img src={email} alt="email" className="w-4 h-4" />
          <span className="font-medium text-gray-600"style={{...FONTS.heading_07_bold,color:COLORS.gray_dark_02}}>{student.email}</span>
        </div>
        <div className="flex items-center ml-0  gap-2">
          <img src={call} alt="call" className="w-4 h-4" />
          <span className="font-medium text-gray-600"style={{...FONTS.heading_07_bold,color:COLORS.gray_dark_02}}>{student.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={location} alt="location" className="w-4 h-4" />
          <span className="font-medium text-gray-600"style={{...FONTS.heading_07_bold,color:COLORS.gray_dark_02}}>{student.location}</span>
        </div>
      </div>
    </Card>
  ))}
</div>

    </div>
  );
}
