import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const tabs = ["Mobile", "Order Id"];

export default function TrackOrder() {
  const [activeTab, setActiveTab] = useState("Mobile");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
   navigate("/help-faqs");
  };

  return (
    <div>
      <div onClick={() => handleNavigate()} className="">
        {" "}
        <IoArrowBackOutline className="h-6 w-6 bg-[#1BBFCA] rounded text-white" />
      </div>
      <div className="bg-[#1BBFCA] p-5 mt-5 text-white text-lg rounded-md font-bold">
        Track Order
      </div>

      <div className="bg-white rounded-xl mt-6 p-20 shadow-2xl">
        <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-6 ">
          <h2 className="text-2xl text-[#716F6F] font-semibold text-center mb-6">
            Track <span className="text-[#716F6F]">your</span> order
          </h2>

          {/* Tab Buttons */}
          <div className="flex justify-between bg-gray-100 rounded-lg overflow-hidden mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "bg-[#1BBFCA] text-white"
                    : "text-[#716F6F] "
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Input */}
          <input
            type={activeTab === "Mobile" ? "tel" : "text"}
            placeholder={`Enter your ${activeTab.toLowerCase()} number`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Button */}
          <button
            onClick={() => alert(`${activeTab} Tracking: ${inputValue}`)}
            className="w-full bg-[#1BBFCA] text-white py-2 rounded-md  transition"
          >
            Track
          </button>
        </div>
      </div>
    </div>
  );
}
