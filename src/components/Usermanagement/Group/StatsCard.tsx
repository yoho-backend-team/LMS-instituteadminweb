import  { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { ChevronDown } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const dummycard = [
  { name: "John William", totalusers: "0" },
  { name: "Diago", totalusers: "0" },
  { name: "Sally", totalusers: "0" },
];

function StatsCard() {
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const toggleMenu = (index: number) => {
    setOpenMenu(openMenu === index ? null : index);
  };

   const [status, setStatus] = useState("Active")
  const [isOpen, setIsOpen] = useState(false)

  const options = ["Active", "Inactive"]
  const navigate = useNavigate();


  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummycard.map((card, idx) => {
          // const currentStatus = statusMap[idx] || "Active";

          return (
            <div key={idx} className="relative rounded-lg bg-white shadow-md p-4 pt-6">
              {/* Three Dots Dropdown */}
              <div className="absolute top-3 right-3 z-20">
                <button onClick={() => toggleMenu(idx)}>
                  <FiMoreVertical className="h-5 w-5 text-[#1BBFCA]" />
                </button>
                {openMenu === idx && (
                  <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-30 rounded-lg text-sm p-2 space-y-2">
                    <button className="flex items-center gap-2 w-full px-3 py-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition" onClick={() => navigate("/group/view")}>
                    
                    <div > <FaEye className="w-5 h-5" /></div>
                      <span>View</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition" onClick={() => navigate("/group/edit")}>
                     
                      <div ><LuNotebookPen className="w-5 h-5"/></div>
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 border rounded-md hover:bg-[#1BBFCA] hover:text-white transition">
                     
                      <div><AiOutlineDelete className="w-5 h-5"/></div>
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <h2 className="text-lg text-[#716F6F] font-semibold mb-1 mt-4 bg-[#F7F7F7] px-3 py-2">{card.name}</h2>
              <p className="text-sm text-[#716F6F] mb-4">
                Total {card.totalusers} Users
              </p>

              {/* Status Dropdown Inside Card */}
              <div className=" flex justify-end">
      <div className="relative inline-block">
        {/* Trigger Button */}
  <button
  onClick={() => setIsOpen(!isOpen)}
  className="px-3 py-2 rounded-xl text-white font-medium flex items-center gap-1 hover:opacity-90 transition-opacity duration-200"
  style={{ backgroundColor: "#1BBFCA" }}
>
  <span className="text-sm mr-1">{status}</span>
  <ChevronDown
    className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
  />
</button>
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg z-10 min-w-[140px] p-3">
            <div className="space-y-2">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setStatus(option)
                    setIsOpen(false)
                  }}
                  className="w-full"
                >
                  <span
                    className="block px-4 py-2 rounded-xl text-white text-sm font-medium text-center hover:opacity-90 transition-opacity duration-150"
                    style={{ backgroundColor: "#1BBFCA" }}
                  >
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Backdrop */}
        {isOpen && <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />}
      </div>
    </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default StatsCard;
