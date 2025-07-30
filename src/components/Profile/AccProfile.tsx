
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import profileimg from '../../assets/navbar/AEicon.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountProfile: React.FC = () => {
	const [activePanel, setActivePanel] = useState<'first' | 'second' | 'third'>('first');
	const navigate = useNavigate();

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const toggleVisibility = (field: 'current' | 'new' | 'confirm') => {
		setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	type TimelineItem = {
		title: string;
		description: string;
		date: string;
		status: string;
	};

	const timelineData: TimelineItem[] = [
		{
			title: 'Note',
			description: 'JhgfdsA - Notes Created',
			date: 'July 17, 2025 At 06:13:23 Pm',
			status: 'Notes Created',
		},
		{
			title: 'Note',
			description: 'JhgfdsA - Notes Created',
			date: 'July 17, 2025 At 06:13:23 Pm',
			status: 'Notes Created',
		},
	];

	return (
		<div className="flex h-screen w-screen bg-gray-100 p-4 w-auto ">
			{/* Sidebar */}
			<div className="w-58 bg-white rounded-lg shadow-md p-4 ">
				<h2 className="text-lg font-semibold mb-6">Account</h2>
				<ul className="space-y-3">
					<button
						className={`px-4 py-2 rounded-md w-full ${activePanel === 'first' ? 'bg-cyan-500 text-white' : 'bg-gray-200'
							}`}
						onClick={() => setActivePanel('first')}
					>
						Account
					</button>
					<button
						className={`px-4 py-2 rounded-md w-full ${activePanel === 'second' ? 'bg-cyan-500 text-white' : 'bg-gray-200'
							}`}
						onClick={() => setActivePanel('second')}
					>
						Security
					</button>
					<button
						className={`px-4 py-2 rounded-md w-full ${activePanel === 'third' ? 'bg-cyan-500 text-white' : 'bg-gray-200'
							}`}
						onClick={() => setActivePanel('third')}
					>
						Timeline
					</button>
				</ul>
			</div>

			{/* Account Page Content */}
			{activePanel === 'first' && (
				<div className="relative flex-6 ml-6 bg-white  rounded-lg shadow-md p-6">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-4">
							<img
								src={profileimg}
								alt="Profile"
								className="w-[166px] h-[166px] rounded"
							/>
							<div>
								<h3 className="text-lg font-semibold">Albert Elnstein</h3>
								<p className="text-sm text-gray-500">Trainee ID : LMSTRN231</p>
								<span className="inline-block mt-1 px-2 py-0.5 text-sm text-white bg-green-500 rounded">
									Active
								</span>
							</div>
						</div>
						<span className="px-3 mr-30 py-1 text-sm bg-cyan-500 text-white rounded-full">
							Institute Admin
						</span>
					</div>

					{/* User Details */}
					<div className="p-6 flex-1">
						<h4 className="text-md font-semibold mb-3">User Details</h4>
						<div className="grid grid-cols-4 gap-y-2 text-sm">
							<div>
								<p className="text-gray-500">Name</p>
								<p className="font-medium">Chandran R</p>
							</div>
							<div>
								<p className="text-gray-500">Email</p>
								<p className="font-medium">Chandran1@gmail.com</p>
							</div>
							<div>
								<p className="text-gray-500">Status</p>
								<p className="text-green-600 font-medium">Active</p>
							</div>
							<div>
								<p className="text-gray-500">Contact</p>
								<p className="font-medium">+91 9876556789</p>
							</div>
						</div>
					</div>

					{/* Edit Profile Button */}
					<div className="text-right mr-30">
						<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
							Edit Profile
						</button>
					</div>
				</div>
			)}
			{/* Security Page Content */}
			{activePanel === 'second' && (
				<div className="relative flex-6 ml-6 bg-white  rounded-lg shadow-md p-6">
					<div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-md max-w-2xl">
						<div className="w-full md:w-1/2 mb-6 md:mb-0">
							<h2 className="text-lg font-bold mb-2">Change Password</h2>
							<p className="font-medium text-gray-700 mb-2">Passwords Must Contain:</p>
							<ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
								<li>✓ At Least 6 Characters</li>
								<li>✓ At Least 1 Uppercase Letter (A-Z)</li>
								<li>✓ At Least 1 Lowercase Letter (a-z)</li>
								<li>✓ At Least 1 Number (0-9)</li>
							</ul>
						</div>

						<div className="w-full md:w-1/2 space-y-4">
							<div className="relative">
								<input
									type={showPassword.current ? 'text' : 'password'}
									placeholder="Current Password"
									className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
									value={currentPassword}
									onChange={(e) => setCurrentPassword(e.target.value)}
								/>
								<button
									type="button"
									onClick={() => toggleVisibility('current')}
									className="absolute right-3 top-2.5 text-gray-600"
								>
									{showPassword.current ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>

							<div className="relative">
								<input
									type={showPassword.new ? 'text' : 'password'}
									placeholder="New Password"
									className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
								<button
									type="button"
									onClick={() => toggleVisibility('new')}
									className="absolute right-3 top-2.5 text-gray-600"
								>
									{showPassword.new ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>

							<div className="relative">
								<input
									type={showPassword.confirm ? 'text' : 'password'}
									placeholder="Confirm New Password"
									className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
								<button
									type="button"
									onClick={() => toggleVisibility('confirm')}
									className="absolute right-3 top-2.5 text-gray-600"
								>
									{showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>

							<button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded-md">
								Change Password
							</button>
						</div>
					</div>
				</div>
			)}
			{/* TimeLine Page Content */}
			{activePanel === 'third' && (
				<div className="relative flex-6 ml-6 bg-white  rounded-lg shadow-md p-6">
					<div className="relative border-l-4 border-green-500 ml-10 mt-10">
						{timelineData.map((item, index) => (
							<div key={index} className="mb-14 ml-4 relative">
								<div className="absolute -left-[38px] top-1">
									<div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-md mb-2 shadow">
										{item.status}
									</div>
									<div className="w-2 h-2 bg-green-500 rounded-full mt-1 ml-3"></div>
								</div>

								<div className="ml-8 bg-white rounded-lg shadow-md px-6 py-4 w-[300px]">
									<h3 className="text-md font-semibold">{item.title}</h3>
									<p className="text-sm text-gray-600">
										Create <span className="font-medium">{item.description}</span>
									</p>
									<p className="text-sm text-gray-500 text-right mt-2">{item.date}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default AccountProfile;

