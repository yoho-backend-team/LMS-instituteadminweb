import { FiBell } from "react-icons/fi";
import titleIcon from "../../assets/navbar/titleIcon.png";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import NotificationPopup from "../Notification/NotificationPopup";
import { useDispatch, useSelector } from "react-redux";
import { GetBranchThunks, GetProfileThunk } from "../../features/Auth/reducer/thunks";
import { GetImageUrl } from "../../utils/helper";
import { useAuth } from "../../pages/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Navbar = () => {
  const dispatch = useDispatch<any>()
  const profile = useSelector((state: any) => state?.authuser?.user)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleLogout = useCallback(() => {
    setActiveTab("logout");
    setDropdownOpen(false);
    localStorage.removeItem("token");
    logout();
    toast.success("Logout successful");
    navigate("/login", { replace: true });
  }, [logout, dispatch, navigate]);


  const nowDate = new Date().getHours()

  function GetWelcomeType(hour: number) {
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening'
    }
  }

  const notifications = [
    {
      id: 1,
      title: "Branch Management",
      date: "05 Nov 2022",
      time: "10:32 AM",
    },
    {
      id: 2,
      title: "Student Management",
      date: "20 Aug 2025",
      time: "05:34 PM",
    },
    {
      id: 3,
      title: "Content Management",
      date: "17 Mar 2025",
      time: "06:09 PM",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        profileDropdownRef.current &&
        !(profileDropdownRef.current as HTMLElement).contains(target)
      ) {
        setDropdownOpen(false);
      }

      if (
        notificationDropdownRef.current &&
        !(notificationDropdownRef.current as HTMLElement).contains(target)
      ) {
        setShowNotifications(false);
      }
    }

    (async () => {
      const institute = await dispatch(GetProfileThunk())
      await dispatch(GetBranchThunks(institute))
    })()

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div>
      <nav className='w-full p-3 flex items-center justify-between bg-[#1BBFCA] '>
        <div className='flex items-center'>
          <img src={titleIcon} alt='Logo' className='h-10 w-auto' />
        </div>

        <div className="flex items-center gap-4 relative">
          {/* 🔔 Notification Bell */}
          <div className="relative" ref={notificationDropdownRef}>
            <button
              className="px-1 text-white bg-blue-800 rounded-2xl h-[35px] w-[35px]"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FiBell size={28} className="p-1" />
            </button>

            {showNotifications && (
              <NotificationPopup
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          {/* 👤 Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-[40px] w-[40px] rounded-full overflow-hidden border-2 border-gray-300"
            >
              <img
                src={GetImageUrl(profile?.image) ?? undefined}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-50">
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm text-gray-500">{GetWelcomeType(nowDate)}</p>
                    <p className="text-lg font-bold text-gray-800">{profile?.first_name + ' ' + profile?.last_name}</p>
                  </div>
                  <button className="bg-green-500 text-white text-xs px-2 py-1 rounded-sm">
                    {profile?.is_active ? 'Active' : 'Inactive'}
                  </button>
                </div>
                <ul className="p-2">
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => {
                        setActiveTab("profile");
                        setDropdownOpen(false);
                      }}
                      className={`block rounded-lg px-4 py-2 text-sm hover:bg-gray-200 ${activeTab === "profile"
                        ? "bg-[#1BBFCA] text-white font-semibold"
                        : ""
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <FaRegUser /> Profile
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      onClick={() => {
                        setActiveTab("settings");
                        setDropdownOpen(false);
                      }}
                      className={`block rounded-lg px-4 py-2 text-sm hover:bg-gray-200 ${activeTab === "settings"
                        ? "bg-[#1BBFCA] text-white font-semibold"
                        : ""
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <IoSettingsOutline /> Settings
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      onClick={() => {
                        setActiveTab("logout");
                        setDropdownOpen(false);
                        setIsOpen(true);
                      }}
                      className={`block rounded-lg px-4 py-2 text-sm hover:bg-gray-200 ${activeTab === "logout"
                        ? "bg-[#1BBFCA] text-white font-semibold"
                        : ""
                        }`}
                    >

                      <div className="flex gap-2"><TbLogout /> Logout</div>

                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {/* Modal */}
            {isOpen && (
              <div
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden"
                role="dialog"
                aria-modal="true"
              >
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>

                    {/* Modal content */}
                    <div className="p-4 md:p-5 text-center">

                      <h3 className="mb-7 mt-10 text-[20px] font-normal text-gray-700 dark:text-gray-400">
                        Are you sure you want to Logout
                      </h3>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-white bg-[#1BBFCA] hover:bg-[#1BDFCA] focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
