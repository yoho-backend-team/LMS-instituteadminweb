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
    <div className="p-4 shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] rounded-lg h-auto w-[30%] ml-0">
      <h2 className="mb-1 text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>
        Description:
      </h2>
      <p className="mb-15 text-[#716F6F]" style={{ ...FONTS.heading_09 }}>
        {user.description}
      </p>

      <h3 className="mt-8 text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>
      Priority:
      </h3>
      <p className="mb-2 text-[#716F6F]" style={{ ...FONTS.heading_09 }}>
        {user.priority}
      </p>

      <h3 className="mt-14 text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>
      Query:
      </h3>
      <p className="cursor-pointer text-[#716F6F]" style={{ ...FONTS.heading_09 }}>
        {user.query}
      </p>

      <h3 className="mt-4 mb-4 text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>
        Status:
      </h3>
      <button className="bg-[#1BBFCA] text-white text-[16px] text-center font-medium h-[30px] w-[80px] rounded-lg">
         {user.is_active ? 'Active Now' : 'Inactive'}
      </button>
    </div>
  );
};

export default Sidebar;
