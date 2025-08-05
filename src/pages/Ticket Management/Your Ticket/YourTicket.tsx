import React, { useState } from "react";
import TicketCard from "../../Ticket Management/Your Ticket/TicketsPage";
import iconticket from '../../../assets/navbar/ticketicon.png';
import ChatWindow from '../../../components/TicketManagement/ChatWindow';
import Sidebar from "../../../components/TicketManagement/Sidebar";
import closeicon from '../../../assets/navbar/Cancel.png';
import { FONTS } from '../../../constants/uiConstants';
import fileimg from '../../../assets/navbar/fileicon.png';

const TicketsPage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showbuttonWindow, setShowbuttonWindow] = useState(true);
  const [viewShowModal, setviewShowModal] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(true);
   const [showBackButton, setShowBackButton] = useState(false);

  const [query, setQuery] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const date = now.toLocaleDateString("en-GB"); 
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const newTicket = {
      name: "Elon Musk",
      email: "Musk@Gmail.Com",
      message: description || query,
      date,
      time,
      priority,
      avatarUrl: "https://i.pravatar.cc/100"
    };

    setTickets((prev) => [...prev, newTicket]);
   
    setQuery("");
    setDescription("");
    setPriority("High");
    setviewShowModal(false);
  };


  const [tickets, setTickets] = useState([
    {
      name: "Elon Musk",
      email: "Musk@Gmail.Com",
      message: "This ticket created from student mobile app",
      date: "5-7-2025",
      time: "6:03 AM",
      priority: "High",
      avatarUrl: "https://i.pravatar.cc/100"
    }
  ]);

  const handleCreateTicket = (newTicket: any) => {
    setTickets((prev) => [...prev, newTicket]);
  };

  return (
    <div className="h-auto p-0">
      {/* Header */}
      <div className="flex bg-[#1BBFCA] rounded-lg justify-between items-center mb-4 h-[55px]">
        <h1 className="flex text-lg text-white bg-[#1BBFCA]  px-4 py-2 rounded" style={{ ...FONTS.heading_07_bold }}>
          <img className="mr-2" src={iconticket} />
          YOUR TICKET
        </h1>
        {showCreateButton && (
          <button onClick={() => {
            setShowChatWindow(false); // Close dropdown men
            setviewShowModal(true); // Open modal
          }} className="bg-white text-[#1BBFCA] px-4 py-1 mr-2 rounded-lg shadow" style={{ ...FONTS.heading_08_bold }}>CREATE</button>
        )}
         {showBackButton && (
         <button onClick={() => {
            setShowChatWindow(false); // Close dropdown men
            setviewShowModal(false);
            setShowCreateButton(true); // Open modal
            setShowBackButton(false);
            setShowbuttonWindow(true);
          }} className="bg-white text-[#1BBFCA] px-4 py-1 mr-2 rounded-lg shadow" style={{ ...FONTS.heading_08_bold }}>Back</button>
        )}
      </div>

      {/* Tabs */}
      {showbuttonWindow && (
        <div className="mb-6 mt-2 " style={{ ...FONTS.heading_08 }}>
          <button
            onClick={() => {
              setActiveTab("open");
              setShowChatWindow(false); 
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
      )}

      {/* Show TicketCard or ChatWindow */}
      {activeTab === "open" && !showChatWindow && (
        <div className="grid md:grid-cols-3 gap-4">
          {tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              name={ticket.name}
              email={ticket.email}
              message={ticket.message}
              date={ticket.date}
              time={ticket.time}
              priority={ticket.priority as "High" | "Medium" | "Low"}
              avatarUrl={ticket.avatarUrl}
              onView={() => {
                setShowChatWindow(true);
                setShowbuttonWindow(false);
                setShowCreateButton(false);
                setShowBackButton(true);
              }}
            />
          ))}
        </div>
      )}

      {showChatWindow && (
        <div className="flex h-[50vh] md:h-[71vh]  font-sans">
          <ChatWindow />
          <Sidebar />
        </div>
      )}

      {/* View Create Modal ---> Start */}
      {viewShowModal && (
        <div className="fixed inset-0 z-30 mt-22 shadow-[0_4px_10px_3px_rgba(0,0,0,0.10)] h-full rounded-lg">
          <div className="absolute top-0 right-5  max-w-sm min-w-[300px] h-auto overflow-auto p-2 rounded-lg bg-white shadow-lg z-40 no-scrollbar">
            {/* Close Button */}

            <div className="flex justify-between items-center mb-0 " >
              <h2 className="text-lg font-semibold mb-2 text-[#716F6F]" style={{ ...FONTS.heading_07 }}>Create Ticket</h2>
              <button onClick={() => setviewShowModal(false)} className="text-xl mb-3 font-bold text-gray-600 hover:text-black">
                <img src={closeicon} alt="Close" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Query */}
              <div style={{ ...FONTS.heading_09 }}>
                <label className="text-gray-700 block mb-2 text-[#716F6F]" >Query</label>
                <textarea value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  rows={2}
                  required
                />
              </div>

              {/* Description */}
              <div style={{ ...FONTS.heading_09 }}>
                <label className="text-gray-700 block mb-2 text-[#716F6F]">Description</label>
                <textarea value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]"
                  rows={2}
                  required
                />
              </div>

              {/* Priority */}
              <div style={{ ...FONTS.heading_09 }}>
                <label className="text-gray-700 block mb-2 text-[#716F6F]">Priority</label>
                <select value={priority}
                  onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
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
                <label className="block mb-1 text-sm font-medium text-gray-700 text-[#716F6F]" style={{ ...FONTS.heading_09 }}>Upload</label>
                <label className="w-full h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
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
              <div className="flex justify-end gap-3 pt-5 mt-0">
                <button
                  type="button"
                  onClick={() => setviewShowModal(false)}
                  className="border border-[#1BBFCA] text-[#1BBFCA] px-4 py-1 rounded-lg hover:bg-[1BBFCA] " style={{ ...FONTS.heading_08 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1BBFCA] text-white px-4 py-1 rounded-lg hover:bg-[#17a4b0]" style={{ ...FONTS.heading_08 }}
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
