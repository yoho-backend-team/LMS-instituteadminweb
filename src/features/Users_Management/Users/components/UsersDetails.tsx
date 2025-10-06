import { useEffect, useState } from "react";
import { COLORS, FONTS } from "../../../../constants/uiConstants";
import EditDetails from "./EditDetails";
import { getUserById } from "../service";
import { useNavigate, useParams } from "react-router-dom";
import { GetImageUrl } from "../../../../utils/helper";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface UserDetail {
  image?: string;
  first_name?: string;
  last_name?: string;
  role?: {
    identity?: string;
  };
  is_active?: boolean;
  username?: string;
  email?: string;
  designation?: string;
  phone_number?: string;
  contact_info?: {
    city?: string;
  };
}

const UsersDetails = () => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserById({ id });

        setUserDetail(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, [id]);

  const handleBack = () => {
    navigate("/users");
  };

  return (
    <div className="px-2 sm:px-4 lg:px-0">
      {/* Back Button Section */}
      <div className="pb-3 sm:pb-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
          <Button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300 p-1 sm:p-2"
          >
            <ArrowLeft 
              size={50} 
              style={{ width: "30px", height: "30px" }} 
              className="sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]" 
            />
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="p-3 sm:p-4 md:p-6 border rounded-xl sm:rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] bg-white">
        {/* Header Section with Profile and Status */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 p-2 pb-6 sm:pb-8 border-b">
          <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center sm:items-start">
            <img
              src={GetImageUrl(userDetail?.image ?? "") ?? undefined}
              className="w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] md:w-[60px] md:h-[60px] rounded-full object-cover flex-shrink-0"
              alt="profile"
            />
            <div className="flex-1">
              <h1
                className={`text-[${COLORS.gray_dark_02}] text-base sm:text-lg md:text-xl break-words`}
                style={{ ...FONTS.heading_04_bold }}
              >
                {userDetail?.first_name + " " + userDetail?.last_name}
              </h1>
              <p
                className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base mt-1 break-words`}
                style={{ ...FONTS.heading_07 }}
              >
                {userDetail?.role?.identity}
              </p>
            </div>
          </div>
          
          {/* Status Badge */}
          <div
            className={`w-[70px] sm:w-[80px] h-[28px] sm:h-[30px] flex justify-center items-center rounded-md flex-shrink-0 self-start sm:self-center ${
              userDetail?.is_active
                ? `bg-[${COLORS.light_green}]`
                : "bg-red-500"
            }`}
            style={{ ...FONTS.heading_13 }}
          >
            <span className="text-white text-xs sm:text-sm">
              {userDetail?.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="p-2 mt-6 sm:mt-8 md:mt-10 grid gap-3 sm:gap-4">
          <h1
            className={`text-[${COLORS.gray_dark_02}] text-lg sm:text-xl md:text-xl`}
            style={{ ...FONTS.heading_05_bold }}
          >
            Profile Details
          </h1>
          
          {/* Details Grid - Responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3 sm:p-4 md:p-5 gap-5 sm:gap-6 md:gap-8">
            {/* User Name */}
            <div className="space-y-1 sm:space-y-2">
              <label
                className={`text-[${COLORS.gray_light}] text-xs sm:text-sm md:text-sm block`}
                style={{ ...FONTS.heading_12 }}
              >
                User Name
              </label>
              <p
                className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base md:text-base break-words`}
                style={{ ...FONTS.heading_06_bold }}
              >
                {userDetail?.username || "--"}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1 sm:space-y-2">
              <label
                className={`text-[${COLORS.gray_light}] text-xs sm:text-sm md:text-sm block`}
                style={{ ...FONTS.heading_12 }}
              >
                Email
              </label>
              <p
                className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base md:text-base break-words`}
                style={{ ...FONTS.heading_06_bold }}
              >
                {userDetail?.email || "--"}
              </p>
            </div>

            {/* Designation */}
            <div className="space-y-1 sm:space-y-2">
              <label
                className={`text-[${COLORS.gray_light}] text-xs sm:text-sm md:text-sm block`}
                style={{ ...FONTS.heading_12 }}
              >
                Designation
              </label>
              <p
                className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base md:text-base break-words`}
                style={{ ...FONTS.heading_06_bold }}
              >
                {userDetail?.designation || "--"}
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-1 sm:space-y-2">
              <label
                className={`text-[${COLORS.gray_light}] text-xs sm:text-sm md:text-sm block`}
                style={{ ...FONTS.heading_12 }}
              >
                Phone
              </label>
              <p
                className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base md:text-base break-words`}
                style={{ ...FONTS.heading_06_bold }}
              >
                {userDetail?.phone_number || "--"}
              </p>
            </div>

            {/* Location */}
            <div className="space-y-1 sm:space-y-2">
              <label
                className={`text-[${COLORS.gray_light}] text-xs sm:text-sm md:text-sm block`}
                style={{ ...FONTS.heading_12 }}
              >
                Location
              </label>
              <p
                className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base md:text-base break-words`}
                style={{ ...FONTS.heading_06_bold }}
              >
                {userDetail?.contact_info?.city || "--"}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div 
          className="flex justify-center sm:justify-end mt-4 sm:mt-0 px-2" 
          style={{ ...FONTS.heading_07 }}
        >
          <button
            onClick={() => setShowEditModal(true)}
            className={`bg-[${COLORS.light_green}] text-white w-full sm:w-[112px] md:w-[130px] h-[40px] sm:h-[40px] md:h-[44px] flex justify-center items-center rounded-lg text-sm sm:text-base md:text-base hover:opacity-90 transition-opacity`}
          >
            Edit Details
          </button>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40">
            <div className="fixed top-0 right-0 sm:right-0 w-full sm:w-auto h-full overflow-y-auto z-50">
              <EditDetails
                setShowEditModal={setShowEditModal}
                userDetail={userDetail}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDetails;