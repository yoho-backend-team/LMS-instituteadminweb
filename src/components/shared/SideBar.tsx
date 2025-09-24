
import { useState } from "react";
import type { ReactElement } from "react";
import { ChevronDown, Menu, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import dashboard from "../../assets/Dashboard/Mask group (3).png";
import courses from "../../assets/Dashboard/Mask group (4).png";
import teachingstaff from "../../assets/Dashboard/Mask group (5).png";
import studentmanagement from "../../assets/Dashboard/Mask group (6).png";
import attendencemanagement from "../../assets/Dashboard/Mask group (7).png";
import usermanagement from "../../assets/Dashboard/Mask group (8).png";
import classmanagement from "../../assets/Dashboard/class mannagement.png";
import batchmanagement from "../../assets/Dashboard/batch management.png";
import paymentmanagement from "../../assets/Dashboard/payment management.png";
import branchmanagement from "../../assets/Dashboard/Branch Management (1).png"
import dashboardnew from "../../assets/Dashboard/dashboardfigmanew normal.png"
import community from "../../assets/Dashboard/communityfigmanew normal.png"

import communityhighlited from "../../assets/Dashboard/communityhighlited.png"
import dashboardnewhighlited from "../../assets/Dashboard/dashboardfigmanew.png"
import courseshighlited from "../../assets/Dashboard/courseshighlited.png"
import teachingstaffhighlited from "../../assets/Dashboard/teachinhstaff highlited.png"
import studentmanagementhighlited from "../../assets/Dashboard/studentmanagement highlited.png"
import attendencemanagementhighlited from "../../assets/Dashboard/attendencemanagement highlited.webp"
import usermanagementhighlited from "../../assets/Dashboard/usermanagement highlited.png"
import classmanagementhighlited from "../../assets/Dashboard/classmanagement highlited.png"
import batchmanagementhighlited from "../../assets/Dashboard/batchmanagement highlited.webp"
import paymentmanagementhighlited from "../../assets/Dashboard/paymentmanagement highlited.webp"
import branchmanagementhighlited from "../../assets/Dashboard/branchmanagement highlited.png"


import Notification from "../../assets/Dashboard/notification image normal.webp";
import certificate from "../../assets/Dashboard/certificate image normal.webp";
import refund from "../../assets/Dashboard/refund image normal.webp";
import idcard from "../../assets/Dashboard/Idcard image normal.webp";
import placement from "../../assets/Dashboard/placement image normal.webp";
import helpcenter from "../../assets/Dashboard/helpcenter image normal.webp";
import ticket from "../../assets/Dashboard/ticket image normal.webp";
import faq from "../../assets/Dashboard/faq image normal.webp";

import Notificationhighlited from "../../assets/Dashboard/notification image highlited.webp";
import certificatehighlited from "../../assets/Dashboard/certificate image highlited.webp";
import refundhighlited from "../../assets/Dashboard/refund image highlited.webp";
import idcardhighlited from "../../assets/Dashboard/idcard image highlited.webp";
import placementhighlited from "../../assets/Dashboard/placement image highlited.webp";
import helpcenterhighlited from "../../assets/Dashboard/helpcenter image highlited.webp";
import tickethighlited from "../../assets/Dashboard/ticket image highlited.webp";
import faqhighlited from "../../assets/Dashboard/faq image highlited.webp";
import React from "react";

const SideBar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={`h-screen z-40 scrollbar-hide flex flex-col p-1 origin-left  
              ${isOpen ? "w-64 scale-100 opacity-100 pb-6" : "w-22 pb-6 scale-y-100 opacity-80"}`}
    >
      <div className="flex items-center justify-between px-2 h-16 py-5">
        <div className="relative group flex items-center overflow-visible px-4">
          <button
            onClick={handleToggle}
            className="rounded-md transition duration-200 hover:bg-white/10 outline-none border-none"
            title="Toggle Sidebar"
          >
            <Menu size={36} className="text-[#ffffff]" />
          </button>
        </div>
      </div>

      <nav className="overflow-y-auto overflow-x-hidden px-2  space-y-3 mb-15 scrollbar-hide">
        <SidebarLink
          to="/"
          icon={<DynamicIcon defaultIcon={dashboardnew} highlightedIcon={dashboardnewhighlited} childRoutes={["/"]} />}
          label="Dashboard"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/community"
          icon={<DynamicIcon defaultIcon={community} highlightedIcon={communityhighlited} childRoutes={["/community"]} />}
          label="Community"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />

        {/* <SidebarLink to="/community" icon={<Home />} label="Community" isOpen={isOpen} onClick={handleLinkClick} /> */}

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={branchmanagement} highlightedIcon={branchmanagementhighlited} childRoutes={["/branch"]} />}
          label="Branch Management"
          isOpen={isOpen}
          childRoutes={["/branch"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          {[<SidebarLink1 to="/branch" label="Branch" isOpen={isOpen} onClick={handleLinkClick} icon={<Building2 size={16} />} />]}
        </SidebarDropdown>


        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={usermanagement} highlightedIcon={usermanagementhighlited} childRoutes={["/group", "/users"]} />}
          label="User Management"
          isOpen={isOpen}
          childRoutes={["/group", "/users"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/group" label="Group" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/users" label="Users" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={courses} highlightedIcon={courseshighlited} childRoutes={["/categories", "/courses"]} />}
          label="Course Management"
          isOpen={isOpen}
          childRoutes={["/categories"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/categories" label="Categories" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1
            to="/courses"
            label="Courses"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>

        <SidebarDropdown
          // icon={<img src={dashboard} alt="Dashboard" className="w-7 h-7" />}
          icon={<DynamicIcon defaultIcon={dashboard} highlightedIcon={courseshighlited} childRoutes={["/categories", "/courses"]} />}

          label="Content Management"
          isOpen={isOpen}
          childRoutes={["/study-materials", "/modules", "/notes"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to="/study-materials"
            label="Study Material"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1 to="/modules" label="Modules" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/notes" label="Notes" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={classmanagement} highlightedIcon={classmanagementhighlited} childRoutes={["/offine-classes", "/live-classes"]} />}
          label="Class Management"
          isOpen={isOpen}
          childRoutes={["/offine-classes", "/live-classes"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1
            to="/offine-classes"
            label="OffLine Class"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink1
            to="/live-classes"
            label="Live Class"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
        </SidebarDropdown>

        <SidebarLink
          to="/staffs"
          icon={<DynamicIcon defaultIcon={teachingstaff} highlightedIcon={teachingstaffhighlited} childRoutes={["/staffs"]} />}
          label="Teaching Staff"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />

        <SidebarLink
          to="/students"
          icon={<DynamicIcon defaultIcon={studentmanagement} highlightedIcon={studentmanagementhighlited} childRoutes={["/students"]} />}
          label="Student Management"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />

        <SidebarLink
          to="/batch"
          icon={<DynamicIcon defaultIcon={batchmanagement} highlightedIcon={batchmanagementhighlited} childRoutes={["/batch"]} />}
          label="Batch Management"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={attendencemanagement} highlightedIcon={attendencemanagementhighlited} childRoutes={["/students-attendance", "/staffs-attendance"]} />}
          label="Attendance Management"
          isOpen={isOpen}
          childRoutes={["/students-attendance", "/staffs-attendance"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/students-attendance" label="Student Attendance" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/staffs-attendance" label="Staff Attendance" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={paymentmanagement} highlightedIcon={paymentmanagementhighlited} childRoutes={["/student-fees", "/staff-salaries", "/subscriptions"]} />}
          label="Payment Management"
          isOpen={isOpen}
          childRoutes={["/student-fees", "/staff-salaries", "/subscriptions"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/student-fees" label="Fees" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/staff-salaries" label="Salaries" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/subscriptions" label="Subscription" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={Notification} highlightedIcon={Notificationhighlited} childRoutes={["/student-notifications", "/staff-notifications", "/notifications"]} />}
          label="Notification Management"
          isOpen={isOpen}
          childRoutes={["/student-notifications", "/staff-notifications", "/notifications"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/student-notifications" label="Student Notification" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/staff-notifications" label="Staff Notification" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/notifications" label="All Notification" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>

        <SidebarLink
          to="/students-certificate"
          icon={<DynamicIcon defaultIcon={certificate} highlightedIcon={certificatehighlited} childRoutes={["/students-certificate"]} />}
          label="Student Certificate"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />

        <SidebarLink
          to="/refund-fees"
          icon={<DynamicIcon defaultIcon={refund} highlightedIcon={refundhighlited} childRoutes={["/refund-fees"]} />}
          label="Refund Fees"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={idcard} highlightedIcon={idcardhighlited} childRoutes={["/students-id_card", "/staffs-id_card"]} />}
          label="ID Card Management"
          isOpen={isOpen}
          childRoutes={["/students-id_card", "/staffs-id_card"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/students-id_card" label="Student ID Card" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/staffs-id_card" label="Staff ID Card" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>

        <SidebarLink
          to="/placement"
          icon={<DynamicIcon defaultIcon={placement} highlightedIcon={placementhighlited} childRoutes={["/placement"]} />}
          label="Placement Management"
          isOpen={isOpen}
          onClick={handleLinkClick}
        />

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={ticket} highlightedIcon={tickethighlited} childRoutes={["/staff-tickets", "/student-tickets", "/your-tickets"]} />}
          label="Ticket Management"
          isOpen={isOpen}
          childRoutes={["/staff-tickets", "/student-tickets", "/your-tickets"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/staff-tickets" label="Staff Ticket" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/student-tickets" label="Student Ticket" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/your-tickets" label="Your Ticket" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>

        <SidebarDropdown
          icon={<DynamicIcon defaultIcon={helpcenter} highlightedIcon={helpcenterhighlited} childRoutes={["/help-faqs", "/add-questions"]} />}
          label="Help Center"
          isOpen={isOpen}
          childRoutes={["/help-faqs", "/add-questions"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/help-faqs" label="Help FAQ" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/add-questions" label="Add Question" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>

        <SidebarDropdown
          icon={<FaqIcon childRoutes={["/faq-category", "/faqs"]} />}
          label="FAQ Management"
          isOpen={isOpen}
          childRoutes={["/faq-category", "/faqs"]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsOpen={setIsOpen}
        >
          <SidebarLink1 to="/faq-category" label="Category" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink1 to="/faqs" label="FAQs" isOpen={isOpen} onClick={handleLinkClick} />
        </SidebarDropdown>
      </nav>
    </div>
  );
};

const DynamicIcon = ({ defaultIcon, highlightedIcon, childRoutes = [] as string[] }: { defaultIcon: string; highlightedIcon: string; childRoutes?: string[] }) => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const isActive = childRoutes.some((route) => currentPathname === route) || currentPathname === childRoutes[0];
  return <img src={isActive ? highlightedIcon : defaultIcon} alt="icon"  className={`${isActive ? "w-[50px] h-[50px]" : "w-[24px] h-[24px]"}`} />;
};

const FaqIcon = ({ childRoutes }: { childRoutes: string[] }) => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const isChildActive = childRoutes.some((route) => currentPathname === route);
  return <img src={isChildActive ? faqhighlited : faq} alt="FAQ Management" className="w-[24px] h-[24px]"  />;
};

const SidebarLink1 = ({ to, label, isOpen, onClick, icon }: { to: string; label: string; isOpen: boolean; onClick: () => void; icon?: ReactElement }) => {
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
      className={`group flex items-center py-3 rounded-full ${isActive ? "bg-[#1BBFCA] text-white" : isHovered ? "bg-[rgba(202,64,111,0.1)]" : "hover:bg-white/10"} ${isOpen ? "justify-start gap-3 px-2" : "justify-center"}`}
    >
      <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      {isOpen && <span className={`font-medium text-sm ${isActive ? "text-white" : "text-black"}`}>{label}</span>}
      {!isOpen && (
        <span className="absolute top-1/2 left-16 -translate-y-1/2 whitespace-nowrap rounded-3xl bg-[#1BBFCA] text-white text-sm px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 z-50">
          {label}
        </span>
      )}
    </Link>
  );
};

const SidebarLink = ({ to, icon, label, isOpen, onClick }: { to: string; icon: ReactElement; label: string; isOpen: boolean; onClick: () => void }) => {
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
      className={`group flex items-center py-3 rounded-full  ${isActive ? "bg-white text-[#1BBFCA]" : isHovered ? "bg-[rgba(212,231,235,0.3)]" : ""} ${isOpen ? "justify-start gap-3 px-2" : "justify-center"}`}
    >
      <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      {isOpen && <span className="font-medium text-sm">{label}</span>}
    </Link>
  );
};

const SidebarDropdown = ({ icon, label, children, isOpen, childRoutes, activeDropdown, setActiveDropdown, setIsOpen }: { icon: ReactElement; label: string; children: ReactElement[]; isOpen: boolean; childRoutes: string[]; activeDropdown: string | null; setActiveDropdown: (label: string | null) => void; setIsOpen: (open: boolean) => void }) => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const isChildActive = childRoutes.some((route) => currentPathname === route);

  const toggleDropdown = () => {
    setActiveDropdown(activeDropdown === label ? null : label);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div>
      <div
        onClick={toggleDropdown}
        className={`group flex items-center justify-between py-3 px-2 rounded-full cursor-pointer ${isChildActive ? "bg-[#1BBFCA] text-white" : "hover:bg-white/10"}`}
      >
        <div className={`flex items-center gap-3 ${!isOpen ? "justify-center w-full" : ""}`}>
          {icon}
          {isOpen && <span className="font-medium text-sm">{label}</span>}
        </div>
        {isOpen && <ChevronDown size={16} className={`transition-transform ${activeDropdown === label ? "rotate-180" : ""}`} />}
      </div>
      {activeDropdown === label && isOpen && (
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
