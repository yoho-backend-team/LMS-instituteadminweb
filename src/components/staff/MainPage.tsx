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
import { useNavigate, useLocation } from "react-router-dom";
import { GetImageUrl } from "../../utils/helper";
import { ArrowLeft } from "lucide-react";

const TABS = ["Info", "Security", "Classes", "Attendance", "Activity"];

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Info");
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const staffMember = location.state?.staff;
  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  if (!staffMember) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div
          onClick={handleback}
          className='text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit p-2 rounded-lg transition-colors duration-200'
        >
          <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <Card className="p-4 sm:p-6 text-center mt-4">
          <p className="text-sm sm:text-base">
            No staff member selected. Please go back and select a staff member.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Back Button */}
      <div
        onClick={handleback}
        className='text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit p-2 rounded-lg transition-colors duration-200 mb-4 sm:mb-6'
      >
        <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      </div>

      {/* Profile Header Card */}
      <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4">
          {/* Left Section - Avatar and Name */}
          <div className="flex items-center gap-3 sm:gap-4 w-full xs:w-auto">
            <Avatar className="!w-12 !h-12 sm:!w-16 sm:!h-16 md:!w-[70px] md:!h-[70px] flex-shrink-0">
              <AvatarImage
                src={GetImageUrl(staffMember?.image) ?? undefined}
                alt={staffMember?.full_name}
              />
            </Avatar>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <h3
                style={{ ...FONTS.heading_02, color: COLORS.gray_dark_02 }}
                className="text-lg sm:text-xl md:text-2xl font-semibold break-words truncate sm:whitespace-normal"
              >
                {staffMember?.full_name}
              </h3>
              {/* Status Badge - Visible on all screens */}
              <div className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium w-fit ${
                staffMember?.is_active 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {staffMember?.is_active ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          {/* Right Section - Action Button */}
          <Button
            className={`w-full xs:w-auto text-sm sm:text-base px-4 py-2 min-w-[120px] ${
              staffMember?.is_active === "true"
                ? "bg-[#3ABE65] hover:bg-[#3ABE65]/90"
                : "bg-destructive hover:bg-destructive/90"
            } text-white`}
          >
            {staffMember?.is_active ? "Active" : "Inactive"}
          </Button>
        </div>
      </Card>

      {/* Tabs Navigation */}
      {!isEditing && (
        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {TABS.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto min-w-[70px] sm:min-w-[80px] ${
                activeTab === tab
                  ? "bg-[#3ABE65] text-white border-[#3ABE65] hover:bg-[#3ABE65]/90"
                  : "bg-white text-[#716F6F] border border-[#716F6F] hover:bg-gray-50 hover:border-[#3ABE65] hover:text-[#3ABE65]"
              } transition-colors duration-200 flex-shrink-0`}
            >
              {tab}
            </Button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "Info" && (
          <Infopage
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            staff={staffMember}
          />
        )}
        {activeTab === "Security" && <Securitypage />}
        {activeTab === "Classes" && <Classespage classId={staffMember._id} />}
        {activeTab === "Attendance" && <Attendancepage />}
        {activeTab === "Activity" && (
          <Activitypage activityId={staffMember._id} />
        )}
      </div>
    </div>
  );
};

export default MainPage;