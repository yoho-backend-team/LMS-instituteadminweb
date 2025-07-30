import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import SideBar from '../components/shared/SideBar';

export const MainLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const sidebarWidth = isSidebarOpen ? 250 : 85;

	return (
	<div className='flex flex-col h-screen w-screen overflow-hidden'>
			<div className=''>
				<Navbar />
			</div>

			<div className='flex  '>
				<div
					className=' top-[64px] left-0 z-40 h-[calc(100vh-64px)] transition-all duration-300 '
					style={{ width: `${sidebarWidth}px` }}
				>
					<SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
				</div>

				<div
					className='flex-1 overflow-auto p-4'
				>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
