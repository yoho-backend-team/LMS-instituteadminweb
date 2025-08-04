// components/Sidebar.tsx
import React from "react";
import { FONTS } from '../../../src/constants/uiConstants';

const Sidebar: React.FC = () => {
  return (
    <div className="w-1/3 p-2 shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] rounded-lg h-auto w-auto ml-0">
      <h2 className="mb-1 text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>Issue Description:</h2>
      <p className="mb-15 text-[#716F6F]" style={{ ...FONTS.heading_09 }}>If You Can This Yes Successfully Mobile App On Android</p>
 
      <h3 className="mt-8 text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>Issue Category:</h3>
      <p className="mb-2 text-[#716F6F]" style={{ ...FONTS.heading_09 }}>Feedback</p>

      <h3 className="mt-14 text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>Attachments:</h3>
      <p className="cursor-pointer text-[#716F6F]" style={{ ...FONTS.heading_09 }}>View</p>

      <h3 className="mt-4 mb-4 text-[#716F6F]" style={{ ...FONTS.heading_08_bold }}>Status:</h3>
      {/* <span className="text-[16px] bg-blue-200 text-blue-700 h-[58px] w-[140px] ">Opened</span> */}
      <button className="bg-[#1BBFCA] text-white text-[16px] text-center font-medium h-[30px] w-[80px] rounded-lg">
  Opened
</button>
    </div>
  );
};

export default Sidebar;
