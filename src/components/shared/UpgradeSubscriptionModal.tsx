import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FONTS } from '../../constants/uiConstants';

let showUpgradeModalFn: (() => void) | undefined;
let hideUpgradeModalFn: (() => void) | undefined;

interface UpgradeModalProps {
	onClose: () => void;
	onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onUpgrade }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50'>
			<div className='bg-black text-white p-6 rounded-lg flex flex-col md:flex-row gap-6 w-full max-w-3xl shadow-lg'>
				{/* Left Side: Warning + Message */}
				<div className='flex-1'>
					<div className='bg-red-800 text-sm p-4 rounded mb-6 border border-red-800'>
						<p
							className='flex items-center text-white'
							style={{ ...FONTS.heading_09 }}
						>
							<span className='mr-2'>⚠️</span> Your current subscription plan
							limit has been reached.
						</p>
					</div>
					<div className='p-2'>
						{' '}
						{/* Added padding container */}
						<h2
							className='bg-gradient-to-r from-green-400 via-blue-500 to-purple-500  inline-block'
							style={{
								...FONTS.heading_04,
								fontWeight: 'bold',
								textAlign: 'center',
							}}
						>
							Unlock Your LMS Potential with the Pro Plan!
						</h2>
					</div>
				</div>

				{/* Right Side: Upgrade Panel */}
				<div className='flex-1 bg-gray-900 p-6 rounded-lg relative'>
					<button
						onClick={onClose}
						className='absolute top-2 right-2 text-gray-400 hover:text-white text-xl font-bold'
					>
						&times;
					</button>
					<h3 className='mb-4' style={{ ...FONTS.heading_06_bold }}>
						Upgrade Your Plan
					</h3>
					<ul className='space-y-3 text-sm'>
						<li className='flex items-start' style={{ ...FONTS.heading_09 }}>
							<span className='text-green-400 mr-2'>✔</span> Unlimited Course
							Creation
						</li>
						<li className='flex items-start' style={{ ...FONTS.heading_09 }}>
							<span className='text-green-400 mr-2'>✔</span> Advanced Analytics
							& Reporting
						</li>
						<li className='flex items-start' style={{ ...FONTS.heading_09 }}>
							<span className='text-green-400 mr-2'>✔</span> Enhanced
							Collaboration Tools
						</li>
						<li className='flex items-start' style={{ ...FONTS.heading_09 }}>
							<span className='text-green-400 mr-2'>✔</span> Priority Customer
							Support
						</li>
					</ul>
					<button
						onClick={onUpgrade}
						className='mt-6 w-full bg-green-500 hover:bg-green-600 py-2 px-4 rounded'
						style={{ ...FONTS.heading_08_bold }}
					>
						Upgrade Now
					</button>
				</div>
			</div>
		</div>
	);
};

export const UpgradeModalWrapper = () => {
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();

	const isVisibleRef = useRef(isVisible);

	useEffect(() => {
		isVisibleRef.current = isVisible;
	}, [isVisible]);

	useEffect(() => {
		showUpgradeModalFn = () => {
			if (!isVisibleRef.current) {
				setIsVisible(true);
			}
		};
		hideUpgradeModalFn = () => setIsVisible(false);

		return () => {
			showUpgradeModalFn = undefined;
			hideUpgradeModalFn = undefined;
		};
	}, []);

	const handleUpgrade = () => {
		setIsVisible(false);
		navigate('/subscriptions');
	};

	const handleClose = () => {
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return <UpgradeModal onClose={handleClose} onUpgrade={handleUpgrade} />;
};

export function showUpgradeModal() {
	if (showUpgradeModalFn) showUpgradeModalFn();
}

export function hideUpgradeModal() {
	if (hideUpgradeModalFn) hideUpgradeModalFn();
}
