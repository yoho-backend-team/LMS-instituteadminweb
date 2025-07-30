
import React from "react";
// import icon1img from '../../src/assets/Icon1.png';

const AccountProfile: React.FC = () => {
	return (
		<div className="flex h-screen w-screen bg-gray-100 p-4 w-auto ">
			{/* Sidebar */}
			<div className="w-58 bg-white rounded-lg shadow-md p-4 ">
				<h2 className="text-lg font-semibold mb-6">Account</h2>
				<ul className="space-y-3">
					<li className="flex items-center bg-cyan-500 text-white p-2 rounded cursor-pointer">
						
						{/* <img src={icon1img} alt="Account Icon" className="w-5 h-5 mr-2" /> */}


						<span className="material-icons mr-2 "></span> Account
					</li>
					<li className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
						<span className="material-icons mr-2"></span> Security
					</li>
					<li className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
						<span className="material-icons mr-2"></span> Timeline
					</li>
				</ul>
			</div>

			{/* Profile Content */}
			<div className="relative flex-6 ml-6 bg-white  rounded-lg shadow-md p-6">
				{/* Header Section */}
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-4">
						<img
							src="https://via.placeholder.com/80"
							alt="Profile"
							className="w-16 h-16 rounded"
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
		</div>
	);
};

export default AccountProfile;

