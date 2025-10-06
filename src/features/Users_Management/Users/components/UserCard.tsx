import { COLORS, FONTS } from "../../../../constants/uiConstants";
import card1 from "../../../../assets/profileion1.png";
import card2 from "../../../../assets/Frame 5825blue.png";
import card4 from "../../../../assets/Frame 5825green.png";
import card3 from "../../../../assets/cardimg3.png";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "../../../../components/ui/select";
import filter from "../../../../assets/SHFilter.png";
import add from "../../../../assets/Add.png";
import AddForm from "./AddForm";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

type props = {
  Users: () => void;
};

const UserCard: React.FC<props> = ({ Users }) => {
  const [showForm, SetShowForm] = useState<boolean>(false);
  const [showFilter, SetShowFilter] = useState<boolean>(false);

  const filterToggle = () => SetShowFilter(!showFilter);

  return (
    <div className="grid gap-4 sm:gap-5">
      {/* Top Section - Cards */}
      <div className="grid gap-5 sm:gap-6 md:gap-7 p-1.5">
        <h1
          className={`text-lg sm:text-xl md:text-2xl text-[${COLORS.gray_dark_01}]`}
          style={{ ...FONTS.heading_05_bold }}
        >
          Admin User
        </h1>

        {/* Responsive cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-[30px]">
          {/* Total Users */}
          <div className="rounded-[12px] grid gap-[10px] bg-[#EA745F]/20 pr-3 sm:pr-3.5 pb-3 sm:pb-3.5">
            <div className="flex items-center" style={{ ...FONTS.heading_05 }}>
              <img 
                className="w-[60px] sm:w-[70px] md:w-[80px] lg:w-[92px] h-[60px] sm:h-[70px] md:h-[80px] lg:h-[92px]" 
                src={card3} 
                alt="Total Users"
              />
              <h3 className={`text-sm sm:text-base md:text-lg text-[${COLORS.gray_dark_02}] ml-2 md:ml-3`}>
                Total Users
              </h3>
            </div>
            <div className="flex justify-end">
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl text-[${COLORS.gray_light}] !font-semibold pr-2 sm:pr-3 md:pr-3.5`}
                style={{ ...FONTS.heading_01 }}
              >
                {Users?.length}
              </h1>
            </div>
          </div>

          {/* Total Groups */}
          <div className="rounded-[12px] grid gap-[10px] bg-[#6454E2]/20 pr-3 sm:pr-3.5 pb-3 sm:pb-3.5">
            <div className="flex items-center" style={{ ...FONTS.heading_05 }}>
              <img 
                className="w-[60px] sm:w-[70px] md:w-[80px] lg:w-[92px] h-[60px] sm:h-[70px] md:h-[80px] lg:h-[92px]" 
                src={card2} 
                alt="Total Groups"
              />
              <h3 className={`text-sm sm:text-base md:text-lg text-[${COLORS.gray_dark_02}] ml-2 md:ml-3`}>
                Total Groups
              </h3>
            </div>
            <div className="flex justify-end">
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl text-[${COLORS.gray_light}] !font-semibold pr-2 sm:pr-3 md:pr-3.5`}
                style={{ ...FONTS.heading_01 }}
              >
                0
              </h1>
            </div>
          </div>

          {/* Active Users */}
          <div className="rounded-[12px] grid gap-[10px] bg-[#D7F6F5] pr-3 sm:pr-3.5 pb-3 sm:pb-3.5">
            <div className="flex items-center" style={{ ...FONTS.heading_05 }}>
              <img 
                className="w-[60px] sm:w-[70px] md:w-[80px] lg:w-[92px] h-[60px] sm:h-[70px] md:h-[80px] lg:h-[92px]" 
                src={card1} 
                alt="Active Users"
              />
              <h3 className={`text-sm sm:text-base md:text-lg text-[${COLORS.gray_dark_02}] ml-2 md:ml-3`}>
                Active Users
              </h3>
            </div>
            <div className="flex justify-end">
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl text-[${COLORS.gray_light}] !font-semibold pr-2 sm:pr-3 md:pr-3.5`}
                style={{ ...FONTS.heading_01 }}
              >
                0
              </h1>
            </div>
          </div>

          {/* Blocked Users */}
          <div className="rounded-[12px] grid gap-[10px] bg-[#DEF6D7] pr-3 sm:pr-3.5 pb-3 sm:pb-3.5">
            <div className="flex items-center" style={{ ...FONTS.heading_05 }}>
              <img 
                className="w-[60px] sm:w-[70px] md:w-[80px] lg:w-[92px] h-[60px] sm:h-[70px] md:h-[80px] lg:h-[92px]" 
                src={card4} 
                alt="Blocked Users"
              />
              <h3 className={`text-sm sm:text-base md:text-lg text-[${COLORS.gray_dark_02}] ml-2 md:ml-3`}>
                Blocked Users
              </h3>
            </div>
            <div className="flex justify-end">
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl text-[${COLORS.gray_light}] !font-semibold pr-2 sm:pr-3 md:pr-3.5`}
                style={{ ...FONTS.heading_01 }}
              >
                0
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="grid gap-5 sm:gap-6 md:gap-7 p-1.5">
        <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
          <button
            onClick={filterToggle}
            className="bg-[#1BBFCA] text-[#FFFFFF] px-4 sm:px-[16px] h-[42px] sm:h-[45px] rounded-[8px] flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
            style={{ ...FONTS.heading_08 }}
          >
            <img src={filter} className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px]" alt="Filter" />
            {showFilter ? "Hide" : "Show Filter"}
          </button>

          <button
            onClick={() => SetShowForm(true)}
            className="bg-[#1BBFCA] px-4 sm:px-[16px] h-[42px] sm:h-[45px] rounded-[8px] flex items-center justify-center gap-2 text-[#FFFFFF] w-full sm:w-auto text-sm sm:text-base"
            style={{ ...FONTS.heading_08 }}
          >
            <img src={add} className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px]" alt="Add" />
            Add User
          </button>
        </div>

        {showFilter && (
          <div className="grid gap-4 sm:gap-5">
            <Input
              className={`w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border-2 border-[${COLORS.primary}] h-[42px] sm:h-[45px] text-sm sm:text-base px-3 sm:px-4`}
              placeholder="Search Admin User"
            />
            <div className="flex flex-col md:flex-row justify-between gap-4 sm:gap-5 w-full p-4 sm:p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px]">
              {/* Filter 1 */}
              <div className="w-full grid gap-2">
                <label
                  className={`text-sm sm:text-base text-[${COLORS.gray_dark_02}] font-semibold`}
                >
                  Status
                </label>
                <Select>
                  <SelectTrigger
                    style={{ height: "45px" }}
                    className={`w-full border rounded-[8px] border-[${COLORS.gray_dark_02}] px-3 sm:px-[16px] text-sm sm:text-base text-[${COLORS.gray_dark_02}]`}
                  >
                    <SelectValue placeholder="Select" className={`p-2`} />
                    <ChevronDownIcon className="size-4 opacity-50 text-[#716F6F]" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border p-3 w-full rounded-[8px]">
                    <SelectItem
                      value="batch"
                      className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2 my-1.5 rounded-[8px] cursor-pointer text-sm sm:text-base`}
                      style={{ ...FONTS.heading_08 }}
                    >
                      No results found...
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter 2 */}
              <div className="w-full grid gap-2">
                <label
                  className={`text-sm sm:text-base text-[${COLORS.gray_dark_02}] font-semibold`}
                >
                  Role
                </label>
                <Select>
                  <SelectTrigger
                    style={{ height: "45px" }}
                    className={`w-full border rounded-[8px] border-[${COLORS.gray_dark_02}] px-3 sm:px-[16px] text-sm sm:text-base text-[${COLORS.gray_dark_02}]`}
                  >
                    <SelectValue placeholder="Select" className={`p-2`} />
                    <ChevronDownIcon className="size-4 opacity-50 text-[#716F6F]" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border p-3 w-full rounded-[8px]">
                    <SelectItem
                      value="batch"
                      className={`hover:bg-[${COLORS.primary}] text-white bg-[${COLORS.primary}] focus:bg-[${COLORS.primary}] p-2 my-1.5 rounded-[8px] cursor-pointer text-sm sm:text-base`}
                      style={{ ...FONTS.heading_08 }}
                    >
                      No results found...
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Form Drawer */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
          <div
            className={`fixed top-0 right-0 rounded-l-[8px] overflow-y-auto h-full w-full sm:w-[90vw] md:w-[500px] lg:w-[450px] xl:w-[400px] bg-white shadow-lg transition-transform duration-300 z-50 ${
              showForm ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <AddForm setShowForm={SetShowForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;