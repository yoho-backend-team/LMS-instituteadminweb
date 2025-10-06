import React from "react";
import { FONTS } from "../../../src/constants/uiConstants";

interface SidebarProps {
  user: {
    description: string;
    is_active: boolean;
    status: string;
    priority: string;
    institute_name?: string;
    query: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="p-4 grid sm:grid-cols-4 lg:grid-cols-1 shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] rounded-lg h-auto w-full ml-0">

      <div>
        <h2 className=" text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>
          Description:
        </h2>
        <p className=" text-[#716F6F]" style={{ ...FONTS.heading_09 }}>
          {user.description}
        </p>
      </div>

      <div>
        <h3 className=" text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>
          Priority:
        </h3>
        <p className="text-[#716F6F]" style={{ ...FONTS.heading_09 }}>
          {user.priority}
        </p>
      </div>

      <div>
        <h3 className=" text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>
          Query:
        </h3>
        <p className="cursor-pointer text-[#716F6F]" style={{ ...FONTS.heading_09 }}>
          {user.query}
        </p>
      </div>

      <div>
        <h3 className=" text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>
          Status:
        </h3>
        <button className="bg-[#1BBFCA] text-white text-[16px] text-center font-medium h-[30px] w-[80px] rounded-lg">
          {user.is_active ? 'Active Now' : 'Inactive'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
