import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Infopage from "./Infopage";
import Securitypage from "./Securitypage";
import Classespage from "./Classespage";
import Activitypage from "./Activitypage";
import Attendancepage from "./Attendancepage";
import { COLORS, FONTS } from "../../constants/uiConstants";
import { Avatar, AvatarImage } from "../ui/avatar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { GetImageUrl } from "../../utils/helper";

const TABS = ["Info", "Security", "Classes", "Attendance", "Activity"];

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Info");
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const staffMember = location.state?.staff;
  console.log("staffselect :", staffMember);
  const navigate = useNavigate();


  const handleback = () => {
    navigate(-1);
  };

  if (!staffMember) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <IoMdArrowRoundBack onClick={handleback} className="h-10 w-10 text-[#1BBFCA] mb-2 cursor-pointer" />
        <Card className="p-6 text-center">
          <p>No staff member selected. Please go back and select a staff member.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <IoMdArrowRoundBack onClick={handleback} className="h-10 w-10 text-[#1BBFCA] mb-2 cursor-pointer" />
      <Card className="p-6 mb-6 flex flex-col md:flex-row justify-between items-center bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
        <div className="flex items-
        center gap-4">
          <Avatar className='!w-[70px] !h-[70px]'> 
            <AvatarImage src={GetImageUrl(staffMember?.image)} alt={staffMember?.full_name} />
          </Avatar>
          <h3 style={{...FONTS.heading_02,color:COLORS.gray_dark_02}}>{staffMember?.full_name}</h3>
        </div>
        <Button className={`${staffMember?.is_active === 'true' ? 'bg-[#3ABE65]' : 'bg-destructive'} text-white`}>
          {staffMember?.is_active}
        </Button>
      </Card>

      {!isEditing && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab ? "bg-[#3ABE65] text-white" : "bg-white text-[#716F6F] border border-[#716F6F]"}`}
            >
              {tab}
            </Button>
          ))}
        </div>
      )}

      <div className="p-4">
        {activeTab === "Info" && <Infopage isEditing={isEditing} setIsEditing={setIsEditing} staff={staffMember} />}
        {activeTab === "Security" && <Securitypage />}
        {activeTab === "Classes" && <Classespage classId = {staffMember._id} />}
        {activeTab === "Attendance" && <Attendancepage />}
        {activeTab === "Activity" && <Activitypage activityId = {staffMember._id} />}
      </div>
    </div>
  );
};

export default MainPage;