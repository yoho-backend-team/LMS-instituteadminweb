
import { Search } from "lucide-react";
import call from "../../assets/call.png";
import email from "../../assets/mail.png";
import locations from "../../assets/location.png"
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { COLORS, FONTS } from "../../constants/uiConstants";
import { Card } from "../ui/card";
import { GetImageUrl } from "../../utils/helper";
import { Button } from "../ui/button";


export default function StudentDashboardMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const { batchData } = location.state || {};

  return (
    <div className="p-6  min-h-screen">
       {/* <div 
       onClick={() => navigate(-1)}
      className=' text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit'>
				<ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
			</div> */}
       <div className="flex items-center justify-between mb-8">
                <Button
                   onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300"
                >
                  <ArrowLeft size={50} style={{ width: "40px", height: "40px" }} />
                </Button>
            </div>

      <h2 className="mb-4 mt-4" style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_02 }}>MERN 2025</h2>
      <Card className="p-6 bg-white shadow-lg rounded-xl mb-8 space-y-4">

        <Card className="p-4 bg-white shadow-sm rounded-xl">
          <div className="grid grid-cols-3" style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}>
            <span>Course Name</span>
            <span>Duration</span>
            <span className="ml-45">Days</span>
          </div>
        </Card>


        <div className="space-y-4">

          <Card
            className="p-4 bg-white shadow-sm rounded-xl flex flex-row items-center justify-between"
          >
            <div className=" w-1/3" style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}>
              {batchData?.course?.course_name}
            </div>
            <div className=" w-1/3" style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}>{batchData?.course?.duration}</div>
            <div className="flex items-center gap-2 justify-end w-1/3">
              <div className="bg-blue-600  px-3 py-1 rounded-md" style={{ ...FONTS.heading_08_bold, color: COLORS.white }}>
                {batchData?.start_date.split("T")[0]}
              </div>
              <div className="flex items-center justify-center w-16 relative">
                <div className="absolute -top-[3px] left-2 right-2 h-[2px] bg-[#1BBFCA] rounded-full -translate-y-1/2" />
                <div className="absolute w-2 h-2 bg-[#1BBFCA] rounded-full left-2 -translate-y-1/2 top-1/2" />
                <div className="absolute w-2 h-2 bg-[#1BBFCA] rounded-full right-2 -translate-y-1/2 top-1/2" />          </div>
              <div className="bg-blue-600  px-3 py-1 rounded-md" style={{ ...FONTS.heading_08_bold, color: COLORS.white }}>
                {batchData?.end_date.split("T")[0]}
              </div>
            </div>
          </Card>

        </div>
      </Card>




      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Search Student"
          className="border border-[#1BBFCA] pl-10 p-2 rounded-md " style={{ ...FONTS.heading_11, color: COLORS.gray_dark_03 }}
        />
        <Search className="absolute left-3 top-7.5 -translate-y-1/2 h-4 w-4 text-[#1BBFCA]" />
      </div>


      <div className="space-y-4">
        {batchData?.student?.map((student: any, i: any) => (
          <Card
            key={i}
            className="p-4 rounded-2xl bg-white shadow-md flex flex-row items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={GetImageUrl(student?.image) ?? undefined}
                alt={student?.full_name}
                title={student?.full_name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h4 style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}>{student?.full_name}</h4>
                <p style={{ ...FONTS.heading_12, color: COLORS.gray_dark_02 }}>Student ID : {student?.id}</p>
              </div>
            </div>


            <div className="flex items-center gap-40  text-sm text-gray-700">
              <div className="flex items-center gap-2  w-50">
                <img src={email} alt="email" className="w-4 h-4" />
                <span className="font-medium text-gray-600" style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>{student?.email}</span>
              </div>
              <div className="flex items-center ml-0  gap-2 w-50">
                <img src={call} alt="call" className="w-4 h-4" />
                <span className="font-medium text-gray-600" style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>{student?.contact_info?.phone_number}</span>
              </div>
              <div className="flex items-center gap-2 w-50">
                <img src={locations} alt="location" className="w-4 h-4" />
                <span className="font-medium text-gray-600" style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_02 }}>{student?.contact_info?.city}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
