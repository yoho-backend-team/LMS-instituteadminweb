import { FiBell } from 'react-icons/fi';
import titleIcon from '../../assets/navbar/titleIcon.png';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
const Navbar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<string | null>(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!(dropdownRef.current as HTMLElement).contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div>
			<nav className='w-full bg-gradient-to-r from-[#1BBFCA] to-[#1BBFCA] p-3 flex items-center justify-between'>
				<div className='flex items-center'>
					<img src={titleIcon} alt='Logo' className='h-10 w-auto' />
					<span className='ml-2 text-xl font-bold text-gray-800'></span>
				</div>

				<div className='flex items-center gap-4 relative'>
					<button className='px-1 text-white bg-blue-800 rounded-2xl h-[35px] w-[35px]'>
						<FiBell size={28} className='p-1' />
					</button>

					<div className='relative' ref={dropdownRef}>
						<button
							onClick={() => setDropdownOpen(!dropdownOpen)}
							className='h-[40px] w-[40px] rounded-full overflow-hidden border-2 border-gray-300'
						>
							<img
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75N_tftPWlyK4Q5-QDx_QZtLFJAG7JiDM3A&s'
								alt='Profile'
								className='h-full w-full object-cover'
							/>
						</button>
						{dropdownOpen && (
							<div className='absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-50'>
								{/* Header */}
								<div className='flex items-center justify-between px-4 py-3 '>
									<div>
										<p className='text-sm text-gray-500'>Good evening</p>
										<p className='text-lg font-bold text-gray-800'>Surya S</p>
									</div>
									<div>
										<button className='bg-green-500 text-white text-xs px-2 py-1 rounded-sm'>
											Active
										</button>
									</div>
								</div>

								<ul className='p-2 '>
									<li>
										<Link
											to='/accprof'
											onClick={() => {
												setActiveTab('profile');
												setDropdownOpen(false);
											}}
											className={`block rounded-lg px-4 py-2 text-sm text-left hover:bg-gray-200 hover:text-black ${
												activeTab === 'profile'
													? 'bg-[#1BBFCA] font-semibold text-white'
													: ''
											}`}
										>
											<div className='flex items-center gap-2'>
												<FaRegUser />
												Profile
											</div>
										</Link>
									</li>
									<li>
										<Link
											to='/settings'
											onClick={() => {
												setActiveTab('settings');
												setDropdownOpen(false);
											}}
											className={`block rounded-lg px-4 py-2 text-sm text-left hover:bg-gray-200 hover:text-black ${
												activeTab === 'settings'
													? 'bg-[#1BBFCA] font-semibold text-white'
													: ''
											}`}
										>
											<div className='flex items-center gap-2'>
												<IoSettingsOutline />
												Settings
											</div>
										</Link>
									</li>
									<li>
										<Link
											to='/logout'
											onClick={() => {
												setActiveTab('logout');
												setDropdownOpen(false);
											}}
											className={`block rounded-lg px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-200 hover:text-red-700 ${
												activeTab === 'logout'
													? 'bg-[#1BBFCA] font-semibold text-white'
													: ''
											}`}
										>
											<div className='flex items-center gap-2'>
												<TbLogout />
												Logout
											</div>
										</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
