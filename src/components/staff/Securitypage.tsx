import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { COLORS, FONTS } from "../../constants/uiConstants";

const Securitypage: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditToggle = () => {
    setIsEditable(true);
  };

  const handleConfirmToggle = () => {
    setIsEditable(false);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6 w-full max-w-5xl mx-auto mt-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* New Password */}
        <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
          <label className="mb-1 block">New Password</label>
          <Input
            className="border border-[#716F6F]"
            type="password"
            placeholder="********"
            disabled={!isEditable}
          />
        </div>

        {/* Confirm New Password */}
        <div style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}>
          <label className="block text-sm text-gray-700 mb-1">Confirm New Password</label>
          <Input
            className="border border-[#716F6F]"
            type="password"
            placeholder="********"
            disabled={!isEditable}
          />
        </div>
      </div>

      <div className="flex justify-end gap-5">
        <Button
          className="bg-[#3abe65] text-white"
          onClick={handleConfirmToggle}
          disabled={!isEditable}    
        >
          Confirm
        </Button>
        <Button
          className="bg-[#3abe65] text-white"
          onClick={handleEditToggle}
          disabled={isEditable} 
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default Securitypage;
