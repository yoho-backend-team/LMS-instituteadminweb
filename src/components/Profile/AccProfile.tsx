
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import profileimg from '../../assets/navbar/AEicon.png';
import icon1 from '../../assets/navbar/Icon1.png';
import icon2 from '../../assets/navbar/Icon2.png';
import icon3 from '../../assets/navbar/Icon3.png';
import actimg from '../../assets/navbar/activeimg.png';
import insadmin from '../../assets/navbar/insadminimg.png';
import { FONTS } from '../../../src/constants/uiConstants';
import noteimg from '../../assets/navbar/notescreated.png';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { GetImageUrl } from '../../utils/helper';

const AccountProfile: React.FC = () => {
	const [activePanel, setActivePanel] = useState<'first' | 'second' | 'third'>('first');
	const navigate = useNavigate();
	const handleEdit = () => {
		navigate('/Editprof'); // Replace with your desired route
	};

	const profile = useSelector((state: any) => state.authuser?.user)

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
	const [activeIndex, setActiveIndex] = useState<number | null>(0);
	return (
		<div>
			{/* <span className="text-[18px] font-semibold mb-6 ml-5 text-[#3B3939]" style={{ ...FONTS.heading_06_bold }}>Account</span> */}
			<div>
				{activeIndex === 0 && (
					<span className="text-[18px] font-semibold mb-6 ml-5 text-[#3B3939]" style={{ ...FONTS.heading_06_bold }}>Account</span>
				)}
				{activeIndex === 1 && (
					<span className="text-[18px] font-semibold mb-6 ml-5 text-[#3B3939]" style={{ ...FONTS.heading_06_bold }}>Security</span>
				)}
				{activeIndex === 2 && (
					<span className="text-[18px] font-semibold mb-6 ml-5 text-[#3B3939]" style={{ ...FONTS.heading_06_bold }}>Timeline</span>
				)}
			</div>
			<div className="flex  p-0 w-auto mr-5 ml-1">

				<div className="w-68 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-4 ml-3 mt-5 ">

					<ul className="space-y-3">
						<button
							className={`flex items-center justify-left gap-5 px-4 py-2 rounded-2xl w-full h-[48px] font-semibold border border-[#716F6F] ${activePanel === 'first' ? 'bg-cyan-500 text-white' : 'bg-white text-[#716F6F]'
								} `}
							onClick={() => {
								setActivePanel('first');
								setActiveIndex(0);
							}}
						>
							<img src={icon1} alt="icon" className="w-4 h-4 font-semibold" />
							<span style={{ ...FONTS.heading_06_bold }}>Account</span>
						</button>
						<button
							className={`flex items-center justify-left gap-5 px-4 py-2 rounded-2xl w-full h-[48px] font-semibold border border-[#716F6F] ${activePanel === 'second' ? 'bg-cyan-500 text-white' : 'bg-white text-[#716F6F]'
								}`}
							onClick={() => {
								setActivePanel('second');
								setActiveIndex(1);
							}}
						>
							<img src={icon2} alt="icon" className="w-4 h-4 font-semibold text-[#716F6F]" />
							<span style={{ ...FONTS.heading_06_bold }}>Security</span>
						</button>
						<button
							className={`flex items-center justify-left gap-5 px-4 py-2 rounded-2xl w-full h-[48px] font-semibold border border-[#716F6F] ${activePanel === 'third' ? 'bg-cyan-500 text-white' : 'bg-white text-[#716F6F]'
								}`}
							onClick={() => {
								setActivePanel('third');
								setActiveIndex(2);
							}}
						>
							<img src={icon3} alt="icon" className="w-4 h-4 font-semibold" />
							<span style={{ ...FONTS.heading_06_bold }}>Timeline</span>
						</button>
					</ul>
				</div>

				{/* Account Page Content */}
				{activePanel === 'first' && (
					<div className="relative flex-4 ml-6 bg-white  rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-4 mt-5">
						<div className="flex items-top justify-between mb-6">
							<div className="flex items-center space-x-4">
								<img
									src={GetImageUrl(profile?.image) ?? undefined}
									alt="Profile"
									className="w-[166px] h-[166px] rounded"
								/>
								<div>
									<h3 className="mb-1 mt-1 font-semibold text-[#716F6F]" style={{ ...FONTS.heading_05_bold }}>{profile?.first_name + ' ' + profile?.last_name}</h3>
									{/* <p className="mb-8 text-[#716F6F]" style={{ ...FONTS.heading_07_light }}>Trainee ID : LMSTRN231</p> */}
									<img
										src={actimg}// replace with your actual image path
										alt="Active"
										className="inline-block mt-2 w-[90px] h-[38px] rounded-lg"
										style={{ objectFit: "cover" }} // Optional styling
									/>
								</div>
							</div>
							<span>
								<img
									src={insadmin}// replace with your actual image path
									alt="Active"
									className="inline-block mt-2 w-[173px] h-[48px] rounded-lg"
									style={{ objectFit: "cover" }} // Optional styling
								/>
							</span>
						</div>
						<div className="border-t border border-[#A9A7A7] my-4"></div>
						{/* User Details */}
						<div className="p-1 mr-5 flex-2">
							<h4 className="font-semibold mb-6 text-[#716F6F] mr-5" style={{ ...FONTS.heading_04_bold }}>User Details</h4>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm">
								<div>
									<p className="text-[#716F6F] font-medium mb-1" style={{ ...FONTS.heading_06_light }}>Name</p>
									<p className="text-[#716F6F] font-semibold text-base" style={{ ...FONTS.heading_06_bold }}>{profile?.first_name + ' ' + profile?.last_name}</p>
								</div>
								<div>
									<p className="text-[#716F6F] font-medium mb-1" style={{ ...FONTS.heading_06_light }}>Email</p>
									<p className="text-[#716F6F] font-semibold text-base" style={{ ...FONTS.heading_06_bold }}>{profile?.email}</p>
								</div>
								<div>
									<p className="text-[#716F6F] font-medium mb-1 ml-12" style={{ ...FONTS.heading_06_light }}>Status</p>
									<p className="text-[#3ABE65] font-semibold text-base ml-12" style={{ ...FONTS.heading_06_bold }}>{profile?.is_active ? 'Active' : 'Inactive'}</p>
								</div>
								<div>
									<p className="text-[#716F6F] font-medium mb-1 ml-8" style={{ ...FONTS.heading_06_light }}>Contact</p>
									<p className="text-[#716F6F] font-semibold text-base ml-8" style={{ ...FONTS.heading_06_bold }}>{profile?.phone_number}</p>
								</div>
							</div>
						</div>


						{/* Edit Profile Button */}
						<div className="text-right mb-0 mt-31">
							<button onClick={handleEdit} className="bg-green-500 h-[48px] w-[137px] text-white px-4 py-2 rounded-lg hover:bg-green-600" style={{ ...FONTS.heading_06 }}>
								Edit Profile
							</button>
						</div>
					</div>
				)}
				{/* Security Page Content */}
				{activePanel === 'second' && (
					<div className="relative h-[530px] flex-6 ml-6 mt-5 bg-white  rounded-lg shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] p-2">
						<div className="flex flex-col md:flex-row bg-white p-1 rounded-lg  max-w-5xl">
							<div className=" lg:w-1/2 mb-5 md:mb-0">
								<h2 className="mb-2 mt-8 text-[#000000] " style={{ ...FONTS.heading_11 }}>Change Password</h2>
								<p className="text-[#716F6F]font-medium text-gray-700 mb-2 mt-6 font-semibold " style={{ ...FONTS.heading_09 }}>Passwords Must Contain:</p>
								<ul className="text-sm text-gray-600 space-y-2 ml-2 mt-6">
									<li className="flex items-start gap-5 mb-6" style={{ ...FONTS.heading_07 }}>
										<span className="text-green-500">✓</span>
										<span>At Least 6 Characters</span>
									</li>
									<li className="flex items-start gap-5 mt-10 mb-20" style={{ ...FONTS.heading_07 }}>
										<span className="text-green-500">✓</span>
										<span>At Least 1 Uppercase Letter (A-Z)</span>
									</li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<li className="flex items-start gap-5 mt-10 mb-20" style={{ ...FONTS.heading_07 }}>
										<span className="text-green-500">✓</span>
										<span>At Least 1 Lowercase Letter (a-z)</span>
									</li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<li className="flex items-start gap-5 mt-10 mb-20" style={{ ...FONTS.heading_07 }}>
										<span className="text-green-500 ">✓</span>
										<span>At Least 1 Number (0-9)</span>
									</li>&nbsp;&nbsp;
								</ul>

							</div>

							<div className="w-full md:w-1/2 mt-8 space-y-8 ml-1 font-semibold" style={{ ...FONTS.heading_07 }}>
								<div className="relative">
									<input
										type={showPassword.current ? 'text' : 'password'}
										placeholder="Current Password"
										className="w-full border px-4 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" style={{ ...FONTS.heading_12 }}
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
										className="w-full border px-4 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" style={{ ...FONTS.heading_12 }}
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
										className="w-full border px-4 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" style={{ ...FONTS.heading_12 }}
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

								<button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 mt-20 rounded-lg" style={{ ...FONTS.heading_09 }}>
									Change Password
								</button>
							</div>
						</div>
					</div>
				)}
				{/* TimeLine Page Content */}
				{activePanel === 'third' && (
					<div className="relative h-[530px] flex-6 ml-6 mt-5 bg-white shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)]  rounded-lg p-6">
						<div className="relative z-10 ml-5 overflow-y-auto px-9 py-2 max-h-[calc(100vh-180px)] scrollbar-hidden">

							{timelineData.map((item, index) => (
								<div key={index} className="mb-1 ml-4 relative">
									<div className="absolute -left-[50px] top-0">
										<div className="flex bg-green-500 mr-20 text-white text-xs font-semibold px-1 py-1 rounded-2xl mb-2 mt-0 shadow" style={{ ...FONTS.heading_07 }}>

											<img src={noteimg} className='h-[42px] w-[144px]' />
										</div>
										<div className='w-3 h-3 bg-green-500 rounded-full mt-3 ml-16'></div>
										<div className=' border-l-4 border-green-500 h-35 w-0 ml-17 mb-20'></div>

									</div>
									<br></br>
									<div className="ml-38 mt-15 h-[150px] shadow-[0_0_10px_rgba(0,1,1,0.1)] text-[#716F6F] bg-white rounded-lg shadow-md px-4 py-4 w-[500px]" >
										<h3 className="text-md font-semibold" style={{ ...FONTS.heading_05_bold }}>{item.title}</h3>&nbsp;
										<p className="text-sm text-gray-600 ">
											<span className='block mb-3' style={{ ...FONTS.heading_06_light }}>Create</span>
											<span className="block font-medium" style={{ ...FONTS.heading_06_bold }} >{item.description}</span>
										</p>
										<p className="text-sm text-gray-500 text-right mt-0" >{item.date}</p>
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

