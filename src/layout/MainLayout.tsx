import { Outlet } from 'react-router-dom';
import backgroundimage from '@/assets/Backgroundimage.png';
import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import SideBar from '../components/shared/SideBar';

export const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	

    const sidebarWidth = isSidebarOpen ? 250 : 87;

    return (
    <div className='flex flex-col h-screen w-screen overflow-hidden bg-[#1BBFCA]'>
            <div className=''>
                <Navbar />
            </div>

            <div className='flex  '>
                <div
                    className='flex  h-[calc(100vh-64px)] transition-all duration-300 '
                    style={{ width: `${sidebarWidth}px` }}
                >
                    <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                </div>

                <div
                    className='flex-1 overflow-auto p-6 bg-white rounded-tl-[35px]'
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};