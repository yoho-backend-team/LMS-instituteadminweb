import React, { useState } from "react";
import TicketCard from "../../Ticket Management/Your Ticket/TicketsPage";
import iconticket from '../../../assets/navbar/ticketicon.png';
import ChatWindow from '../../../components/TicketManagement/ChatWindow';
import Sidebar from "../../../components/TicketManagement/Sidebar";
import closeicon from '../../../assets/navbar/Cancel.png';
import { FONTS } from '../../../constants/uiConstants';
import { Bold } from "lucide-react";
import fileimg from '../../../assets/navbar/fileicon.png';

const TicketsPage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");
  const [showChatWindow, setShowChatWindow] = useState(false); // ✅ new state
  const [viewShowModal, setviewShowModal] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-auto p-0">
      {/* Header */}
      <div className="flex bg-[#1BBFCA] rounded-lg justify-between items-center mb-4 h-[55px]">
        <h1 className="flex text-lg text-white bg-[#1BBFCA]  px-4 py-2 rounded" style={{ ...FONTS.heading_07_bold }}>
          <img className="mr-2" src={iconticket} />
          YOUR TICKET
        </h1>
        <button onClick={() => {
          setShowChatWindow(false); // Close dropdown men
          setviewShowModal(true); // Open modal
        }} className="bg-white text-[#1BBFCA] px-4 py-1 mr-2 rounded-lg shadow" style={{ ...FONTS.heading_07_bold }}>CREATE</button>
      </div>

      {/* Tabs */}
      <div className="mb-6 mt-7 " style={{ ...FONTS.heading_08 }}>
        <button
          onClick={() => {
            setActiveTab("open");
            setShowChatWindow(false); // Reset when tab changes
          }}
          className={`mr-2 rounded-lg w-[157px] h-[35px] ${activeTab === "open"
            ? "bg-[#1BBFCA] text-white"
            : "bg-white text-teal-500 border border-teal-500"
            }`}

        >
          Opened Tickets
        </button>
        <button
          onClick={() => {
            setActiveTab("closed");
            setShowChatWindow(false);
          }}
          className={`rounded-lg w-[157px] h-[35px] items-center ${activeTab === "closed"
            ? "bg-[#1BBFCA] text-white"
            : "bg-white text-[#1BBFCA] border border-teal-500"
            }`}
        >
          Closed Tickets
        </button>
      </div>

      {/* Show TicketCard or ChatWindow */}
      {activeTab === "open" && !showChatWindow && (
        <TicketCard
          name="Elon Musk"
          email="Musk@Gmail.Com"
          message="This ticket created from student mobile app"
          date="5-7-2025"
          time="6:03 AM"
          priority="High"
          avatarUrl="https://i.pravatar.cc/100"
          onView={() => setShowChatWindow(true)} // 👈 pass handler to TicketCard
        />
      )}

      {showChatWindow && (
        <div className="flex h-screen font-sans">
          <ChatWindow />
          <Sidebar />
        </div>
      )}

      {/* View Create Modal ---> Start */}
      {viewShowModal && (
        <div className="fixed inset-0 z-30 mt-22 shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)]">
          <div className="absolute top-0 right-5  max-w-sm min-w-[350px] h-auto overflow-auto p-2 rounded-lg bg-white shadow-lg z-40 no-scrollbar">
            {/* Close Button */}

            <div className="flex justify-between items-center mb-0 " >
              <h2 className="text-lg font-semibold mb-4 text-[#716F6F]" style={{ ...FONTS.heading_05_bold }}>Create Ticket</h2>
              <button onClick={() => setviewShowModal(false)} className="text-xl mb-3 font-bold text-gray-600 hover:text-black">
                <img src={closeicon} alt="Close" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Query */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 text-[#716F6F]" style={{ ...FONTS.heading_08 }}>Query</label>
                <textarea
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  rows={2}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 text-[#716F6F]" style={{ ...FONTS.heading_08 }}>Description</label>
                <textarea
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  rows={2}
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 text-[#716F6F]" style={{ ...FONTS.heading_08 }}>Priority</label>
                <select
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  required
                >
                  <option value="" ></option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 text-[#716F6F]" style={{ ...FONTS.heading_08 }}>Upload</label>
                <label className="w-full h-20 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    className="hidden"
                  // onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                 
                  <span className="text-sm text-gray-500">
                     <img className="mx-auto" src={fileimg}></img> Drop Files Here Or Click To Upload
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-5 mt-6">
                <button
                  type="button"
                  onClick={() => setviewShowModal(false)}
                  className="border border-[#1BBFCA] text-[#1BBFCA] px-4 py-1 rounded-lg hover:bg-[1BBFCA] "style={{ ...FONTS.heading_08 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1BBFCA] text-white px-4 py-1 rounded-lg hover:bg-[#17a4b0]"style={{ ...FONTS.heading_08 }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Create Modal ---> End */}
    </div>
  );
};

export default TicketsPage;
