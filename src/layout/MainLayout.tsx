import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import SideBar from '../components/shared/SideBar';

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 250 : 87;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#1BBFCA]">
      <div className="h-16 w-full flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
       
        <div
          className="transition-all duration-300	"
          style={{ width: `${sidebarWidth}px` }}
        >
          <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-white rounded-tl-[35px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
