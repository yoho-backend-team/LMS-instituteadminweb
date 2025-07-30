import React, { useState } from 'react';
import { FaUser, FaLock, FaClock } from 'react-icons/fa';

const SecurityProfile: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h1 className="text-lg font-semibold mb-4">Security</h1>
      <div className="flex gap-4 h-full">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl shadow p-4 space-y-2">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-left rounded-md hover:bg-gray-100">
            <FaUser />
            <span>Account</span>
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-left rounded-md bg-cyan-500 text-white">
            <FaLock />
            <span>Security</span>
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-left rounded-md hover:bg-gray-100">
            <FaClock />
            <span>Timeline</span>
          </button>
        </div>

        {/* Main Panel */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          <div className="text-gray-700 mb-6">
            <p className="font-medium mb-2">Passwords Must Contain:</p>
            <ul className="space-y-1 ml-4 text-sm">
              <li>✓ At Least 6 Characters</li>
              <li>✓ At Least 1 Uppercase Letter (A-Z)</li>
              <li>✓ At Least 1 Lowercase Letter (a-z)</li>
              <li>✓ At Least 1 Number (0-9)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded-md">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityProfile;
