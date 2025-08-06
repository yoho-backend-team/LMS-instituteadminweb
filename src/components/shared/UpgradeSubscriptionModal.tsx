import React from 'react';

interface UpgradeModalProps {
	onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50'>
			<div className='bg-black text-white p-6 rounded-lg flex flex-col md:flex-row gap-6 w-full max-w-3xl shadow-lg'>
				{/* Left Side: Warning + Message */}
				<div className='flex-1'>
					<div className='bg-red-800 text-red-300 text-sm p-4 rounded mb-6 border border-red-600'>
						<p className='flex items-center'>
							<span className='mr-2'>⚠️</span> Your current subscription plan
							limit has been reached.
						</p>
					</div>
					<h2 className='text-2xl font-semibold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-transparent bg-clip-text'>
						Unlock Your LMS Potential with the Pro Plan!
					</h2>
				</div>

				{/* Right Side: Upgrade Panel */}
				<div className='flex-1 bg-gray-900 p-6 rounded-lg relative'>
					<button
						onClick={onClose}
						className='absolute top-2 right-2 text-gray-400 hover:text-white text-xl font-bold'
					>
						&times;
					</button>
					<h3 className='text-xl font-semibold mb-4'>Upgrade Your Plan</h3>
					<ul className='space-y-3 text-sm'>
						<li className='flex items-start'>
							<span className='text-green-400 mr-2'>✔</span> Unlimited Course
							Creation
						</li>
						<li className='flex items-start'>
							<span className='text-green-400 mr-2'>✔</span> Advanced Analytics
							& Reporting
						</li>
						<li className='flex items-start'>
							<span className='text-green-400 mr-2'>✔</span> Enhanced
							Collaboration Tools
						</li>
						<li className='flex items-start'>
							<span className='text-green-400 mr-2'>✔</span> Priority Customer
							Support
						</li>
					</ul>
					<button className='mt-6 w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded'>
						Upgrade Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpgradeModal;
