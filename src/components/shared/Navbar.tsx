import { FiBell } from "react-icons/fi";
import titleIcon from "../../assets/navbar/titleIcon.png";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import NotificationPopup from "../Notification/NotificationPopup";
import { useAuth } from "../../pages/Auth/AuthContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthThunks } from '../../features/Auth/reducer/thunks';
import toast from "react-hot-toast";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const { logout } = useAuth();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    setActiveTab("logout");
    setDropdownOpen(false);
    // your logout logic here
    localStorage.removeItem("token");
    logout();
    // dispatch(AuthThunks.logOutUser?.());
    toast.success("Logged out Successfully");
    navigate("/login", { replace: true });
  }, [logout, dispatch, navigate]);


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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75N_tftPWlyK4Q5-QDx_QZtLFJAG7JiDM3A&s"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-50">
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm text-gray-500">Good evening</p>
                    <p className="text-lg font-bold text-gray-800">Surya S</p>
                  </div>
                  <button className="bg-green-500 text-white text-xs px-2 py-1 rounded-sm">
                    Active
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
                        setShowModal(true);
                      }}
                      className={`block rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-gray-200 ${activeTab === "logout"
                        ? "bg-[#1BBFCA] text-white font-semibold"
                        : ""
                        }`}
                    >
                      <button
                        type="button"
                        onClick={handleLogout}
                        className={`w-full text-left rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-gray-200 ${activeTab === "logout" && "bg-[#1BBFCA] text-white"
                          }`}
                      >
                        <div className="flex gap-2"><TbLogout /> Logout</div>
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {/* Logout modal message .......[start]........... */}
            {showModal && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-modal-title"
                onClick={() => setShowModal(false)}
              >
                <div
                  className="bg-white p-6 rounded-md max-w-xs w-full shadow"
                  onClick={e => e.stopPropagation()}
                >
                  <h2 id="logout-modal-title" className="text-lg font-semibold mb-2">Success</h2>
                  <p className="text-gray-700">Logged out successfully.</p>
                  <button
                    onClick={() => navigate("/login", { replace: true })}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
            {/* Logout modal message .......[End]........... */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
