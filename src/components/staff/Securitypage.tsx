import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Securitypage: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto mt-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">New Password</label>
          <Input type="password" placeholder="********" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Confirm New Password</label>
          <Input type="password" placeholder="********" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-[#3abe65] text-white">Change Password</Button>
      </div>
    </div>
  );
};

export default Securitypage;
