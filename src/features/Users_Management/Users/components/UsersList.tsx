import { ChevronDownIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { COLORS, FONTS } from "../../../../constants/uiConstants";
import { GetImageUrl } from "../../../../utils/helper";
import { SlOptionsVertical } from "react-icons/sl";
import CardOptions from "./CardOptions";
import { useEffect, useRef, useState } from "react";
import { updateUserStatus } from "../service";
import warning from "../../../../assets/warningimg.png";
import { Card } from "../../../../components/ui/card";
import ContentLoader from "react-content-loader";

interface UserDetail {
  image?: any;
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
  uuid: string;
}

type props = {
  Users: UserDetail[];
  loading: boolean;
};

const UsersList: React.FC<props> = ({ Users, loading }) => {
  const [cardOptionsShow, setCardOptionsShow] = useState<number | null>(null);
  const [statusValue, setStatusValue] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStatusValue = (value: string, userId: string) => {
    setAlertModal(true);
    setStatusValue(value);
    setUserId(userId);
  };

  const handleUpdateStatus = async () => {
    const userStatus = statusValue === "active" ? true : false;
    const data = {
      is_active: userStatus,
      userId: userId,
    };

    await updateUserStatus(data);
    setAlertModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCardOptionsShow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 px-3 sm:px-4 md:px-0">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 col-span-full">
          {[...Array(6)].map((_, index) => (
            <ContentLoader
              speed={1}
              width="100%"
              height="100%"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              className="w-full h-[220px] sm:h-[230px] md:h-[240px] lg:h-[250px] p-4 sm:p-5 rounded-2xl border shadow-md"
              key={index}
            >
              <rect x="0" y="0" rx="6" ry="6" width="80" height="20" />
              <rect x="220" y="0" rx="6" ry="6" width="60" height="20" />

              <rect x="0" y="36" rx="10" ry="10" width="100%" height="100" />

              <rect x="0" y="150" rx="6" ry="6" width="50%" height="18" />

              <rect x="0" y="180" rx="4" ry="4" width="70" height="14" />
              <rect x="220" y="180" rx="4" ry="4" width="50" height="18" />
            </ContentLoader>
          ))}
        </div>
      ) : Users.length ? (
        Users?.map((card, index) => (
          <div
            key={index}
            className="shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] p-4 sm:p-5 md:p-5 lg:p-6 grid gap-4 sm:gap-4 md:gap-5 bg-white"
          >
            {/* Header Section */}
            <div className="flex gap-3 sm:gap-3 md:gap-4 items-start justify-between relative">
              <div className="flex gap-3 sm:gap-3 md:gap-4 flex-1 min-w-0">
                <img
                  src={GetImageUrl(card?.image) ?? undefined}
                  className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] md:w-[60px] md:h-[60px] lg:w-[62px] lg:h-[62px] rounded-full object-cover flex-shrink-0"
                  alt="Student"
                />
                <div className="grid gap-1 sm:gap-1.5 md:gap-2 min-w-0 flex-1">
                  <p
                    className={`text-[${COLORS.gray_dark_02}] !font-semibold truncate text-sm sm:text-base md:text-base`}
                    style={{ ...FONTS.heading_06 }}
                  >
                    {card?.first_name + " " + card?.last_name}
                  </p>
             
<p
  className="w-full truncate text-xs email-text-768"
  style={{ color: COLORS.gray_light, ...FONTS.heading_12, fontSize: undefined }}
>
  {card?.email}
</p>



                  <p
                    className={`text-[${COLORS.gray_light}] text-xs sm:text-sm md:text-sm`}
                    style={{ ...FONTS.heading_12 }}
                  >
                    {card?.phone_number}
                  </p>
                </div>
              </div>

              <div className="flex items-start h-full flex-shrink-0">
                <button
                  className="bg-white p-1 sm:p-1.5"
                  onClick={() =>
                    setCardOptionsShow(cardOptionsShow === index ? null : index)
                  }
                >
                  <SlOptionsVertical className={`text-[${COLORS.primary}] text-lg sm:text-xl`} />
                </button>
                {cardOptionsShow === index && (
                  <div ref={dropdownRef} className="absolute right-0 top-8 sm:top-9 z-10">
                    <CardOptions uuid={card?.uuid} />
                  </div>
                )}
              </div>
            </div>

            {/* Role and Status Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-3 md:gap-4">
              <p className={`text-[${COLORS.light_green}] text-xs sm:text-sm md:text-sm`}>
                <span style={{ ...FONTS.heading_12 }}>Role : </span>
                <span className="font-bold">{card?.role?.identity}</span>
              </p>

              <Select onValueChange={(value) => handleStatusValue(value, card.uuid)}>
  <SelectTrigger
    className={`w-full sm:w-[105px] md:w-[115px] lg:w-[120px] 
    h-[42px] sm:h-[44px] md:h-[48px] lg:h-[50px] 
    border text-white rounded-[8px] px-3 sm:px-3.5 md:px-4 
    bg-[${COLORS.primary}] text-sm md:text-[13px]`}
  >
    <SelectValue
      placeholder={card?.is_active ? "Active" : "Inactive"}
      style={{ ...FONTS.heading_08 }}
    />
    <ChevronDownIcon className="size-4 opacity-50 text-[#FFFFFF]" />
  </SelectTrigger>

  <SelectContent className="bg-white text-black border p-2 rounded-[8px] min-w-[120px] md:min-w-[130px]">
    <SelectItem
      value="active"
      className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] 
      bg-white focus:bg-[${COLORS.primary}] p-2 my-1.5 
      focus:text-white rounded-[8px] cursor-pointer text-sm`}
      style={{ ...FONTS.heading_08 }}
    >
      Active
    </SelectItem>
    <SelectItem
      value="inactive"
      className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] 
      bg-white focus:bg-[${COLORS.primary}] p-2 my-1.5 
      focus:text-white rounded-[8px] cursor-pointer text-sm`}
      style={{ ...FONTS.heading_08 }}
    >
      Inactive
    </SelectItem>
  </SelectContent>
</Select>
            </div>
          </div>
        ))
      ) : (
        <Card className="col-span-full mt-6 sm:mt-6 md:mt-8 lg:mt-10 p-6 sm:p-7 md:p-8">
          <p className="text-base sm:text-base md:text-lg text-gray-900 text-center">
            No Users available
          </p>
        </Card>
      )}

    
          {alertModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="fixed z-50 w-[90%] max-w-[402px] sm:w-[380px] md:w-[402px] min-h-[250px] sm:min-h-[279px] bg-white rounded-[12px] flex flex-col gap-5 sm:gap-[30px] p-4 sm:p-5 md:p-6 justify-center items-center shadow-2xl">
            {/* Warning Content */}
            <div className="grid gap-2 sm:gap-3 w-full">
              <img
                className="w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] mx-auto"
                src={warning}
                alt="Warning"
              />
              <h2
                className={`text-[${COLORS.gray_dark_02}] text-center text-lg sm:text-xl md:text-2xl px-2`}
                style={{ ...FONTS.heading_04_bold }}
              >
                Confirm Action
              </h2>
              <p
                className={`text-[${COLORS.gray_light}] text-center text-sm sm:text-base px-2`}
                style={{ ...FONTS.heading_07 }}
              >
                Are you sure you want to change the status?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto">
              <button
                onClick={() => setAlertModal(false)}
                style={{ ...FONTS.heading_08_bold }}
                className={`bg-[#D7F6F5] border border-[#1BBFCA] px-4 sm:px-5 md:px-6 h-[38px] sm:h-[40px] rounded-[8px] flex items-center justify-center gap-2 text-[#1BBFCA] text-sm sm:text-base hover:bg-[#C5EAE9] transition-colors duration-200 min-w-[120px] sm:min-w-[100px]`}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                type="submit"
                style={{ ...FONTS.heading_08_bold }}
                className="bg-[#1BBFCA] px-4 sm:px-5 md:px-6 h-[38px] sm:h-[40px] rounded-[8px] flex items-center justify-center gap-2 text-white text-sm sm:text-base hover:bg-[#169BA5] transition-colors duration-200 min-w-[120px] sm:min-w-[100px]"
              >
                 Yes, Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;