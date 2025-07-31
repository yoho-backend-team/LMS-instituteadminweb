
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import profileimg from '../../assets/navbar/AEicon.png';
import icon1 from '../../assets/navbar/Icon1.png';
import icon2 from '../../assets/navbar/Icon2.png';
import icon3 from '../../assets/navbar/Icon3.png';
import { FONTS } from '../../../src/constants/uiConstants';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountProfile: React.FC = () => {
	const [activePanel, setActivePanel] = useState<'first' | 'second' | 'third'>('first');
	const navigate = useNavigate();
	const handleEdit = () => {
  navigate('/Editprof'); // Replace with your desired route
};

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
		<div> <span className="text-[18px] font-semibold mb-6 ml-2 text-[#3B3939]">Account</span>
			<div className="flex h-screen p-0 w-auto mr-5">

				<div className="w-58 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-4 ml-0 mt-5 ">

					<ul className="space-y-3">
						<button
							className={`flex items-center justify-left gap-5 px-4 py-2 rounded-2xl w-full h-[48px] font-semibold border border-[#716F6F] ${activePanel === 'first' ? 'bg-cyan-500 text-white' : 'bg-white text-[#716F6F]'
								}`}
							onClick={() => setActivePanel('first')}
						>
							<img src={icon1} alt="icon" className="w-4 h-4" />
							<span style={{ ...FONTS.heading_07 }}>Account</span>
						</button>
						<button
							className={`flex items-center justify-left gap-5 px-4 py-2 rounded-2xl w-full h-[48px] font-semibold border border-[#716F6F] ${activePanel === 'second' ? 'bg-cyan-500 text-white' : 'bg-white text-[#716F6F]'
								}`}
							onClick={() => setActivePanel('second')}
						>
							<img src={icon2} alt="icon" className="w-4 h-4" />
							<span style={{ ...FONTS.heading_07 }}>Security</span>
						</button>
						<button
							className={`flex items-center justify-left gap-5 px-4 py-2 rounded-2xl w-full h-[48px] font-semibold border border-[#716F6F] ${activePanel === 'third' ? 'bg-cyan-500 text-white' : 'bg-white text-[#716F6F]'
								}`}
							onClick={() => setActivePanel('third')}
						>
							<img src={icon3} alt="icon" className="w-4 h-4" />
							<span style={{ ...FONTS.heading_07 }}>Timeline</span>
						</button>
					</ul>
				</div>

				{/* Account Page Content */}
				{activePanel === 'first' && (
					<div className="relative flex-4 ml-6 bg-white  rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-4 mt-5">
						<div className="flex items-top justify-between mb-6">
							<div className="flex items-center space-x-4">
								<img
									src={profileimg}
									alt="Profile"
									className="w-[166px] h-[166px] rounded"
								/>
								<div>
									<h3 className="mb-1 mt-1 text-[#716F6F]" style={{ ...FONTS.heading_05 }}>Albert Elnstein</h3>
									<p className="text-gray-500 mb-8 text-[#716F6F]" style={{ ...FONTS.heading_07 }}>Trainee ID : LMSTRN231</p>
									<span className="inline-block mt-1 px-2 py-0.5 text-center font-semibold text-white bg-green-500 rounded w-[90px] h-[38px]" style={{ ...FONTS.heading_06 }}>
										Active
									</span>
								</div>
							</div>
							<span className="p-2 mt-1 font-semibold text-center bg-cyan-500 text-white rounded-lg inline-block w-[173px] h-[48px]" style={{ ...FONTS.heading_06 }}>
								Institute Admin
							</span>
						</div>
						<div className="border-t border border-[#A9A7A7] my-4"></div> 
						{/* User Details */}
						<div className="p-6 flex-1">
							<h4 className="font-semibold mb-6 text-[#716F6F]" style={{ ...FONTS.heading_04 }}>User Details</h4>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm">
								<div>
									<p className="text-[#716F6F] font-medium mb-1">Name</p>
									<p className="text-[#716F6F] font-semibold text-base">Chandran R</p>
								</div>
								<div>
									<p className="text-[#716F6F] font-medium mb-1">Email</p>
									<p className="text-[#716F6F] font-semibold text-base">Chandran1@gmail.com</p>
								</div>
								<div>
									<p className="text-[#716F6F] font-medium mb-1">Status</p>
									<p className="text-[#716F6F] font-semibold text-base">Active</p>
								</div>
								<div>
									<p className="text-[#716F6F] font-medium mb-1">Contact</p>
									<p className="text-[#716F6F] font-semibold text-base">+91 9876556789</p>
								</div>
							</div>
						</div>


						{/* Edit Profile Button */}
						<div className="text-right mb-0 mt-60">
							<button onClick={handleEdit} className="bg-green-500 h-[48px] w-[127px] text-white px-4 py-2 rounded-lg hover:bg-green-600" style={{ ...FONTS.heading_06 }}>
								Edit Profile
							</button>
						</div>
					</div>
				)}
				{/* Security Page Content */}
				{activePanel === 'second' && (
					<div className="relative flex-6 ml-6 mt-5 bg-white  rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] shadow-md p-2">
						<div className="flex flex-col md:flex-row bg-white p-1 rounded-lg  max-w-2xl">
							<div className="w-full md:w-1/2 mb-6 md:mb-0">
								<h2 className="mb-2" style={{ ...FONTS.heading_06 }}>Change Password</h2>
								<p className="font-medium text-gray-700 mb-2">Passwords Must Contain:</p>
								<ul className="text-sm text-gray-600 space-y-2 ml-2">
									<li className="flex items-start gap-5" style={{ ...FONTS.heading_08 }}>
										<span className="text-green-500">✓</span>
										<span>At Least 6 Characters</span>
									</li>
									<li className="flex items-start gap-5" style={{ ...FONTS.heading_08 }}>
										<span className="text-green-500">✓</span>
										<span>At Least 1 Uppercase Letter (A-Z)</span>
									</li>
									<li className="flex items-start gap-5" style={{ ...FONTS.heading_08 }}>
										<span className="text-green-500">✓</span>
										<span>At Least 1 Lowercase Letter (a-z)</span>
									</li>
									<li className="flex items-start gap-5" style={{ ...FONTS.heading_08 }}>
										<span className="text-green-500">✓</span>
										<span>At Least 1 Number (0-9)</span>
									</li>
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
								<div key={index} className="mb-10 ml-4 relative">
									<div className="absolute -left-[38px] top-0">
										<div className="flex bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-md mb-5 shadow">
											{item.status}
										</div>
										<div className="w-2 h-2 bg-green-500 rounded-full mt-0 ml-3"></div>
									</div>
<br></br>
									<div className="ml-18 mt-10 bg-white rounded-lg shadow-md px-4 py-8 w-[600px]">
										<h3 className="text-md font-semibold">{item.title}</h3>
										<p className="text-sm text-gray-600">
											Create <span className="font-medium" >{item.description}</span>
										</p>
										<p className="text-sm text-gray-500 text-right mt-2" >{item.date}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AccountProfile;

