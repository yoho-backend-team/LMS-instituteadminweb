import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { useState } from "react";
import {
  Home,
  ChevronDown,
  Menu,
  UserSearch,
  Briefcase,
  Building2,
  LayoutDashboard,
  User,
  GraduationCap,
  Files,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import dashboard from "../../assets/Dashboard/Mask group (3).png"
import courses from "../../assets/Dashboard/Mask group (4).png"
import teachingstaff from "../../assets/Dashboard/Mask group (5).png"
import studentmanagement from "../../assets/Dashboard/Mask group (6).png"
import attendencemanagement from "../../assets/Dashboard/Mask group (7).png"
const SideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-screen z-40 scrollbar-hide flex flex-col p-1 origin-left  
              ${isOpen
          ? 'w-64 scale-100 opacity-100 pb-6 '
          : 'w-22 pb-6 scale-y-100 opacity-80'
        }`}
    >
      <div className='flex items-center justify-between px-2 h-16 py-5'>
        <div className='relative group flex items-center overflow-visible px-0.5'>
          <button
            onClick={handleToggle}
            className='rounded-md transition duration-200 hover:bg-white/10 outline-none border-none'
            title='Toggle Sidebar'
          >
            <Menu size={25} className='text-[#ffffff]' />
          </button>
          {/* <span className="absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap rounded-3xl bg-[#1BBFCA] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 z-50">
                        Toggle Sidebar
                    </span> */}
        </div>
      </div>
      <nav className='overflow-y-auto overflow-x-hidden px-2  space-y-3 mb-15 scrollbar-hide '>
        <SidebarLink
          to='/'
          icon={<LayoutDashboard />}
          label='Dashboard'
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to='/community'
          icon={<Home />}
          label='Community'
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarDropdown
          icon={<Building2 />}
          label='Branch Management'
          isOpen={isOpen}
          childRoutes={['/branch']}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to='/branch'
            label='Branch'
            isOpen={isOpen}
            onClick={handleLinkClick}
            icon={<Building2 size={16} />}
          />
        </SidebarDropdown>
        <SidebarDropdown
          icon={<User />}
          label='User Management'
          isOpen={isOpen}
          childRoutes={['/group']}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to='/group'
            label='Group'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        <SidebarLink
          to='/users'
          icon={<UserSearch />}
          label='Users'
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarDropdown
          icon={<GraduationCap />}
          label='Course Management'
          isOpen={isOpen}
          childRoutes={['/categories']}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to='/categories'
            label='Categories'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        <SidebarLink
          to='/courses'
          icon={<img src={courses} alt="Courses" className="w-7 h-7" />}
          label='Courses'
          isOpen={isOpen}
          onClick={handleLinkClick}
        />

        <SidebarDropdown
          icon={<img src={dashboard} alt="Dashboard" className="w-7 h-7" />} label='Content Management'
          isOpen={isOpen}
          childRoutes={['/study-materials']}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to='/study-materials'
            label='Study Material'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to='/modules'
            label='modules'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to='/notes'
            label='Notes'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        <SidebarDropdown
          icon={<UserSearch />}
          label='Class Management'
          isOpen={isOpen}
          childRoutes={['/offine-classes', '/live-classes']}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to='/offine-classes'
            label='OffLine Class'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to='/live-classes'
            label='Live Class'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>

        <SidebarLink
          to='/staffs'
          icon={<img src={teachingstaff} alt="Teaching Staff" className="w-7 h-7" />}
          label='Teaching Staff'
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to='/students'
          icon={<img src={studentmanagement} alt="Student Management" className="w-7 h-7" />}
          label='Student Management'
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to='/batch'
          icon={<Files />}
          label='Batch management'
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarDropdown
          icon={<img src={attendencemanagement} alt="Attendance Management" className="w-7 h-7" />}
          label='Attendence Management'
          isOpen={isOpen}
          childRoutes={['/students-attendance', '/staffs-attendance']}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to='/students-attendance'
            label='Student Attendence'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to='/staffs-attendance'
            label='Staff Attendence'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        <SidebarDropdown
          icon={<UserSearch />}
          label='Payment Management'
          isOpen={isOpen}
          childRoutes={['/student-fees', '/staff-salaries', '/subscriptions']}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to='/student-fees'
            label='Fees'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to='/staff-salaries'
            label='Salaries'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to='/subscriptions'
            label='Subscription'
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        {/* <SidebarLink
					to='/Threeplans'
					icon={<Briefcase />}
					label='3 Plans'
					isOpen={isOpen}
					onClick={handleLinkClick}
				/> */}
        {/* <SidebarLink to="/Refund_Fees" icon={<Briefcase />} label="Fees" isOpen={isOpen} onClick={handleLinkClick} /> */}
        <SidebarDropdown
          icon={<UserSearch />}
          label="Notification Management"
          isOpen={isOpen}
          childRoutes={[
            "/student-notifications",
            "/staff-notifications",
            "/notifications",
          ]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to="/student-notifications"
            label="Studentnotification"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to="/staff-notifications"
            label="Staffnotification"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to="/notifications"
            label="Allnotification"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        <SidebarLink
          to="/students-certificate"
          icon={<Briefcase />}
          label="Studentcertificate"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/refund-fees"
          icon={<Briefcase />}
          label="Refund-Fees"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarDropdown
          icon={<UserSearch />}
          label="Id Crad Management"
          isOpen={isOpen}
          childRoutes={["/students-id_card", "/staffs-id_card"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to="/students-id_card"
            label="StudentIdCard"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to="/staffs-id_card"
            label="StaffIdCard"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        <SidebarLink
          to="/placement"
          icon={<Briefcase />}
          label="Placement Management"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarDropdown
          icon={<UserSearch />}
          label="Help Center"
          isOpen={isOpen}
          childRoutes={["/help-faqs", "/add-questions"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to="/help-faqs"
            label="HelpFQA"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to="/add-questions"
            label="AddQust"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        <SidebarDropdown
          icon={<UserSearch />}
          label="Ticket Management"
          isOpen={isOpen}
          childRoutes={["/staff-tickets", "/student-tickets", "/your-tickets"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to="/staff-tickets"
            label="Staffticket"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to="/student-tickets"
            label="StudentTicket"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to="/your-tickets"
            label="Yourticket"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
        <SidebarDropdown
          icon={<UserSearch />}
          label="FQA Category"
          isOpen={isOpen}
          childRoutes={["/faq-category", "/faqs"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to="/faq-category"
            label="Category"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to="/faqs"
            label="FQAs"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>
      </nav>
    </div>
  );
};
const SidebarLink1 = ({
  to,
  label,
  isOpen,
  onClick,
  icon,
}: {
  to: string;
  label: string;
  isOpen: boolean;
  onClick: () => void;
  icon?: ReactElement;
}) => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const [isHovered, setIsHovered] = useState(false);
  const isActive = currentPathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-center py-3 rounded-full ${isActive
        ? 'bg-[#1BBFCA] text-white'
        : isHovered
          ? 'bg-[rgba(202,64,111,0.1)]'
          : 'hover:bg-white/10'
        } ${isOpen ? 'justify-start gap-3 px-2' : 'justify-center'}`}
    >
      <div className='relative group flex items-center overflow-visible'>
        <div
          className={`text-lg flex-shrink-0 transform scale-100 transition-transform duration-200 min-w-[16px] min-h-[16px] flex items-center justify-center
                        group-hover:animate-[grow-from-dot-on-hover_1.5s_ease-out]
                        ${isActive ? 'text-white' : 'text-[#1BBFCA]'}`}
        >
          {icon || '🏢'}
        </div>
        {!isOpen && (
          <span className='absolute top-1/2 -translate-y-4 ml-10 whitespace-nowrap rounded-3xl bg-[#1BBFCA] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 z-50'>
            {label}
          </span>
        )}
      </div>
      {isOpen && (
        <span
          className={`font-medium text-sm ${isActive ? 'text-white' : 'text-black'
            }`}
        >
          {label}
        </span>
      )}
    </Link>
  );
};

const SidebarLink = ({
  to,
  icon,
  label,
  isOpen,
  onClick,
}: {
  to: string;
  icon: ReactElement;
  label: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const [isHovered, setIsHovered] = useState(false);
  const isActive = currentPathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-center py-3 rounded-full ${isActive
        ? 'bg-white text-[#1BBFCA]'
        : isHovered
          ? 'bg-[rgba(212,231,232,0.67)]'
          : 'hover:bg-white/10'
        } ${isOpen ? 'justify-start gap-3 px-2' : 'justify-center px-5'}`}
    >
      <div className='relative group flex items-center overflow-visible'>
        <div
          className={`text-lg flex-shrink-0 transform scale-100 transition-transform duration-200
                        group-hover:animate-[grow-from-dot-on-hover_1.5s_ease-out]
                        ${isActive ? 'text-[#1BBFCA]' : 'text-white'}`}
        >
          {icon}
        </div>
        {!isOpen && (
          <span className='absolute top-1/2 -translate-y-4 ml-10 whitespace-nowrap rounded-3xl bg-[#1BBFCA] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 z-99'>
            {label}
          </span>
        )}
      </div>
      {isOpen && (
        <span
          className={`font-medium text-sm ${isActive ? 'text-[#1BBFCA]' : 'text-black'
            }`}
        >
          {label}
        </span>
      )}
    </Link>
  );
};

const SidebarDropdown = ({
  icon,
  label,
  children,
  isOpen,
  childRoutes = [],
  activeDropdown,
  setActiveDropdown,
  setIsOpen,
}: {
  icon: ReactElement;
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  childRoutes?: string[];
  activeDropdown: string | null;
  setActiveDropdown: (label: string | null) => void;
  setIsOpen: (open: boolean) => void;
}) => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const isChildActive = childRoutes.some((route) => currentPathname === route);
  const expanded = activeDropdown === label;

  useEffect(() => {
    if (isChildActive) {
      setActiveDropdown(label);
    }
  }, [currentPathname, isChildActive, label, setActiveDropdown]);

  return (
    <div
      className={`w-full relative ${isChildActive && !isOpen
        ? 'bg-[#1BBFCA] text-white rounded-4xl'
        : 'hover:backdrop-blur-md rounded-xl'
        }`}
    >
      <button
        onClick={() => {
          if (isOpen) {
            setActiveDropdown(expanded ? null : label);
          } else {
            setIsOpen(true);
            setActiveDropdown(label);
          }
        }}
        title={!isOpen ? label : ''}
        className={`group flex items-center w-full py-2 transition-all ${isOpen
          ? 'justify-start gap-3 px-2 rounded-md'
          : 'justify-center rounded-md px-5'
          }`}
      >
        <div className='relative group flex items-center overflow-visible'>
          <div
            className={`text-lg flex-shrink-0 transform scale-100 transition-colors duration-200
                            group-hover:animate-[grow-from-dot-on-hover_1.5s_ease-out]
                            ${isChildActive || expanded
                ? isOpen
                  ? 'text-[#ffffff]'
                  : 'text-white'
                : 'text-[#ffffff]'
              }`}
          >
            {icon}
          </div>
          {!isOpen && (
            <span className='absolute top-1/2 -translate-y-4 ml-10 whitespace-nowrap rounded-3xl bg-[#1BBFCA] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100'>
              {label}
            </span>
          )}
        </div>
        {isOpen && (
          <>
            <span
              className={`font-medium text-sm flex-1 text-left transition-colors ${isChildActive
                ? 'text-black'
                : expanded
                  ? 'text-black/50'
                  : 'text-black'
                }`}
            >
              {label}
            </span>
            <span
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''
                } ${isChildActive ? 'text-black' : 'text-black'}`}
            >
              <ChevronDown />
            </span>
          </>
        )}
      </button>

      {expanded && isOpen && (
        <div className="flex flex-col space-y-1">
          <div className="relative px-6 left-2">
            {React.Children.map(children, (child, index) => (
              <div key={index} className="relative">
                <div className="absolute left-6 top-1 translate-x-[-50%]">
                  <svg
                    width="80"
                    height="60"
                    viewBox="0 0 80 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M45 0 C40 30, 60 30, 70 30"
                      stroke="white"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="70" cy="30" r="4" fill="white" />
                  </svg>
                </div>
                <div className="relative left-5 px-4 mb-2 top-3">{child}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;

// import React, { useEffect } from "react"
// import type { ReactElement } from "react"
// import { useState } from "react"
// import { Home, ChevronDown, Menu, UserSearch, Briefcase, Building2, LayoutDashboard } from "lucide-react"
// import { Link, useLocation } from "react-router"

// const SideBar = ({
//     isOpen,
//     setIsOpen,
// }: {
//     isOpen: boolean
//     setIsOpen: (open: boolean) => void
// }) => {
//     const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

//     const handleLinkClick = () => {
//         if (isOpen) {
//             setIsOpen(false)
//         }
//           setActiveDropdown(null)
//     }

//     const handleToggle = () => {
//         setIsOpen(!isOpen)
//     }

//     return (
//         <div
//             className={`h-screen z-40 flex flex-col p-1 bg-gradient-to-  via-[#FFFFFF]
//               transform transition-all duration-500 ease-in-out origin-left
//               ${isOpen ? "w-64 scale-100 opacity-100 pb-6 " : "w-17 pb-6  scale-y-100 opacity-80  "}`}
//         >
//             <div className="flex items-center justify-between px-4 h-16 py-5">
//                 <div className="relative group flex items-center overflow-visible px-0.5">
//                     <button
//                         onClick={handleToggle}
//                         className="rounded-md transition duration-200 hover:bg-black/10"
//                     >
//                         <Menu size={20} className="text-[#ffffff]" />
//                     </button>
//                     {/* <span className="absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap rounded-3xl bg-[#CA406F] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 z-50">
//                         Toggle Sidebar
//                     </span> */}
//                 </div>
//             </div>
//             <nav className="overflow-y-auto px-2  space-y-3 mb-15 no-scrollbar">
//                 <SidebarLink
//                     to="/dashboard"
//                     icon={<LayoutDashboard />}
//                     label="Dashboard"
//                     isOpen={isOpen}
//                     onClick={handleLinkClick}

//                 />
//                 <SidebarLink to="/community" icon={<Home />} label="Community" isOpen={isOpen} onClick={handleLinkClick} />
//                 <SidebarDropdown
//                     icon={<Building2 />}
//                     label="Branch-management"
//                     isOpen={isOpen}
//                     childRoutes={["/branch"]}
//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/branch" label="Branch" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="User Management"
//                     isOpen={isOpen}
//                     childRoutes={["/group"]}
//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/group" label="Group" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarLink to="/users" icon={<Briefcase />} label="Users" isOpen={isOpen} onClick={handleLinkClick} />
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Course Management"
//                     isOpen={isOpen}
//                     childRoutes={["/categories"]}
//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/categories" label="Categories" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarLink to="/courses" icon={<Briefcase />} label="Courses" isOpen={isOpen} onClick={handleLinkClick} />
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Content Management"
//                     isOpen={isOpen}
//                     childRoutes={["/studymaterial"]}
//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/studymaterial" label="Study Material" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarLink to="/notes" icon={<Briefcase />} label="Notes" isOpen={isOpen} onClick={handleLinkClick} />
//                 <SidebarLink to="/modules" icon={<Briefcase />} label="Modules" isOpen={isOpen} onClick={handleLinkClick} />
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Class Management"
//                     isOpen={isOpen}
//                     childRoutes={["/OffLine Class", "/Live Class"]}
//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/offlinemanagement" label="OffLine Class" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/Liveclasses" label="Live Class" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>

//                 <SidebarLink
//                     to="/Teachingstaff"
//                     icon={<Briefcase />}
//                     label="Teaching Staff"
//                     isOpen={isOpen}
//                     onClick={handleLinkClick}
//                 />
//                 <SidebarLink
//                     to="/Studentmanagement"
//                     icon={<Briefcase />}
//                     label="Student management"
//                     isOpen={isOpen}
//                     onClick={handleLinkClick}
//                 />
//                 <SidebarLink
//                     to="/Batchmanagement"
//                     icon={<Briefcase />}
//                     label="Batch management"
//                     isOpen={isOpen}
//                     onClick={handleLinkClick}
//                 />
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Attendence Management"
//                     isOpen={isOpen}
//                     childRoutes={["/Studentattendence", "/Staffattendence"]}

//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/Studentattendence" label="Student Attendence" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/Staffattendence" label="Staff Attendence" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Payment Management"
//                     isOpen={isOpen}
//                     childRoutes={["/Fees", "/Slaries", "/Subscription"]}

//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/Fees" label="Fees" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/Slaries" label="Slaries" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/Subscription" label="Subscription" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarLink to="/Threeplans" icon={<Briefcase />} label="3 Plans" isOpen={isOpen} onClick={handleLinkClick} />
//                 {/* <SidebarLink to="/Refund_Fees" icon={<Briefcase />} label="Fees" isOpen={isOpen} onClick={handleLinkClick} /> */}
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Notification Management"
//                     isOpen={isOpen}
//                     childRoutes={["/Studentnotification", "/Staffnotification", "/Allnotification",]}

//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/Studentnotification" label="Studentnotification" isOpen={isOpen} onClick={handleLinkClick}/>
//                     <SidebarLink1 to="/Staffnotification" label="Staffnotification" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/Allnotification" label="Allnotification" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarLink
//                     to="/Studentcertificate"
//                     icon={<Briefcase />}
//                     label="Studentcertificate"
//                     isOpen={isOpen}
//                     onClick={handleLinkClick}
//                 />
//                 <SidebarLink to="/Refund_Fees" icon={<Briefcase />} label="Fees" isOpen={isOpen} onClick={handleLinkClick} />
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Id Crad Management"
//                     isOpen={isOpen}
//                     childRoutes={["/StudentIdCard", "/StaffIdCard"]}

//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/StudentIdCard" label="StudentIdCard" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/StaffIdCard" label="StaffIdCard" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarLink
//                     to="/Placement"
//                     icon={<Briefcase />}
//                     label="Placement Management"
//                     isOpen={isOpen}
//                     onClick={handleLinkClick}
//                 />
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Help Center"
//                     isOpen={isOpen}
//                     childRoutes={["/HelpFQA", "/AddQust"]}

//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/HelpFQA" label="HelpFQA" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/AddQust" label="AddQust" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="Ticket Management"
//                     isOpen={isOpen}
//                     childRoutes={["/Staffticket", "/StudentTicket", "/Yourticket"]}

//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/Staffticket" label="Staffticket" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/StudentTicket" label="StudentTicket" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/Yourticket" label="Yourticket" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//                 <SidebarDropdown
//                     icon={<UserSearch />}
//                     label="FQA Category"
//                     isOpen={isOpen}
//                     childRoutes={["/Category", "/FQA"]}

//                     activeDropdown={activeDropdown}
//                     setActiveDropdown={setActiveDropdown}
//                     setIsOpen={setIsOpen}
//                 >
//                     <SidebarLink1 to="/Category" label="Category" isOpen={isOpen} onClick={handleLinkClick} />
//                     <SidebarLink1 to="/FQA" label="FQA" isOpen={isOpen} onClick={handleLinkClick} />
//                 </SidebarDropdown>
//             </nav>
//         </div>
//     )
// }

// export default SideBar

// const SidebarLink1 = ({
//     to,
//     label,
//     isOpen,
//     onClick,
// }: {
//     to: string
//     label: string
//     isOpen: boolean
//     onClick: () => void
// }) => {
//     const location = useLocation()
//     const currentPathname = location.pathname
//     const [isHovered, setIsHovered] = useState(false)
//     const isActive = currentPathname === to

//     return (
//         <Link
//             to={to}
//             onClick={onClick}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             className={`group flex items-center py-3 rounded-full ${isActive ? "bg-[#1BBFCA] text-white" :
//                 isHovered ? "bg-[rgba(27,191,202,0.1)]" :
//                     "hover:bg-white/10"
//                 } ${isOpen ? "justify-start gap-3 px-2" : "justify-center"}`}
//         >
//             <div className="relative group flex items-center overflow-visible">
//                 <div
//                     className={`text-lg flex-shrink-0 transform scale-100 transition-transform duration-200
//                         group-hover:animate-[grow-from-dot-on-hover_1.5s_ease-out]
//                         ${isActive ? "text-white" : "text-[#1BBFCA]"}`}
//                 ></div>
//                 {!isOpen && (
//                     <span className="absolute top-1/2 -translate-y-4 ml-10 whitespace-nowrap rounded-3xl bg-[#1BBFCA] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 z-50">
//                         {label}
//                     </span>
//                 )}
//             </div>
//             {isOpen && (
//                 <span className={`font-medium text-sm ${isActive ? "text-white" : "text-black"}`}>{label}</span>
//             )}
//         </Link>
//     )
// }

// const SidebarLink = ({
//     to,
//     icon,
//     label,
//     isOpen,
//     onClick,
// }: {
//     to: string
//     icon: ReactElement
//     label: string
//     isOpen: boolean
//     onClick: () => void
// }) => {
//     const location = useLocation()
//     const currentPathname = location.pathname
//     const [isHovered, setIsHovered] = useState(false)
//     const isActive = currentPathname === to

//     return (
//         <Link
//             to={to}
//             onClick={onClick}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             className={`group flex items-center py-3 rounded-full ${isActive ? "bg-[#1BBFCA] text-white" :
//                 isHovered ? "bg-[rgba(27,191,202,0.1)]" :
//                     "hover:bg-white/10"
//                 } ${isOpen ? "justify-start gap-3 px-2" : "justify-center px-5"}`}
//         >
//             <div className="relative group flex items-center overflow-visible">
//                 <div
//                     className={`text-lg flex-shrink-0 transform scale-100 transition-transform duration-200
//                         group-hover:animate-[grow-from-dot-on-hover_1.5s_ease-out]
//                         ${isActive ? "text-white" : "text-[#ffffff]"}`}
//                 >
//                     {icon}
//                 </div>
//                 {!isOpen && (
//                     <span className="absolute top-1/2 -translate-y-4 ml-10 whitespace-nowrap rounded-3xl bg-[#ffffff] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100">
//                         {label}
//                     </span>
//                 )}
//             </div>
//             {isOpen && (
//                 <span className={`font-medium text-sm ${isActive ? "text-white" : "text-black"}`}>{label}</span>
//             )}
//         </Link>
//     )
// }

// const SidebarDropdown = ({
//     icon,
//     label,
//     children,
//     isOpen,
//     childRoutes = [],
//     activeDropdown,
//     setActiveDropdown,
//     setIsOpen,
// }: {
//     icon: ReactElement
//     label: string
//     children: React.ReactNode
//     isOpen: boolean
//     childRoutes?: string[]
//     activeDropdown: string | null
//     setActiveDropdown: (label: string | null) => void
//     setIsOpen: (open: boolean) => void
// }) => {
//     const location = useLocation()
//     const currentPathname = location.pathname
//     const isChildActive = childRoutes.some((route) => currentPathname === route)
//     const expanded = activeDropdown === label

//     useEffect(() => {
//         if (isChildActive) {
//             setActiveDropdown(label)
//         }
//     }, [currentPathname, isChildActive, label, setActiveDropdown])

//     return (
//         <div
//             className={`w-full relative ${isChildActive && !isOpen ? "bg-[#ffffff] text-white rounded-4xl" : "hover:backdrop-blur-md rounded-xl"
//                 }`}
//         >
//             <button
//                 onClick={() => {
//                     if (isOpen) {
//                         setActiveDropdown(expanded ? null : label)
//                     } else {
//                         setIsOpen(true)
//                         setActiveDropdown(label)
//                     }
//                 }}
//                 title={!isOpen ? label : ""}
//                 className={`group flex items-center w-full py-2 transition-all ${isOpen ? "justify-start gap-3 px-2 rounded-md" : "justify-center rounded-md px-5"
//                     }`}
//             >
//                 <div className="relative group flex items-center overflow-visible">
//                     <div
//                         className={`text-lg flex-shrink-0 transform scale-100 transition-colors duration-200
//                             group-hover:animate-[grow-from-dot-on-hover_1.5s_ease-out]
//                             ${isChildActive || expanded
//                                 ? isOpen
//                                     ? "text-[#fffffff]"
//                                     : "text-white "
//                                 : "text-[#ffffff]"
//                             }`}
//                     >
//                         {icon}
//                     </div>
//                     {!isOpen && (
//                         <span className="absolute top-1/2 -translate-y-4 ml-10 whitespace-nowrap rounded-3xl bg-[#1BBFCA] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100">
//                             {label}
//                         </span>
//                     )}
//                 </div>
//                 {isOpen && (
//                     <>
//                         <span className={`font-medium text-sm flex-1 text-left transition-colors ${isChildActive ? "text-black" : expanded ? "text-black/50" : "text-black"
//                             }`}>
//                             {label}
//                         </span>
//                         <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""
//                             } ${isChildActive ? "text-black" : "text-black"}`}>
//                             <ChevronDown />
//                         </span>
//                     </>
//                 )}
//             </button>

//             {expanded && isOpen && (
//                 <div className="flex flex-col space-y-1">
//                     <div className="relative px-6 left-2">
//                         {React.Children.map(children, (child, index) => (
//                             <div key={index} className="relative">
//                                 <div className="absolute -left-2 top-1 translate-x-[-50%]">
//                                     <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path
//                                             d="M45 0 C40 30, 60 30, 70 30"
//                                             stroke="#CA406F"
//                                             strokeOpacity="0.5"
//                                             strokeWidth="2"
//                                             fill="none"
//                                         />
//                                         <circle cx="70" cy="30" r="4" fill="#CA406F" />
//                                     </svg>
//                                 </div>
//                                 <div className="relative left-5 px-4 mb-2 top-3">{child}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }
