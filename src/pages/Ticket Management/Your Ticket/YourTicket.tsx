import React, { useState } from "react";
import TicketCard from "../../Ticket Management/Your Ticket/TicketsPage";
import iconticket from '../../../assets/navbar/ticketicon.png';

const TicketsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");

  return (
    <div className="min-h-screen p-2">
      {/* Header */}
      <div className="flex bg-[#1BBFCA] rounded-lg justify-between items-center mb-4 h-[55px]">
		
        <h1 className="flex text-lg font-bold text-white bg-[#1BBFCA]  px-4 py-2 rounded"><img className="mr-2" src={iconticket}/>YOUR TICKET</h1>
        <button className="bg-white text-[#1BBFCA] px-4 py-1 mr-2 rounded-lg shadow">CREATE</button>
      </div>

      {/* Tabs */}
      <div className="mb-6 mt-7">
        <button
          onClick={() => setActiveTab("open")}
          className={`px-4 py-2 mr-2 rounded w-[157px] h-[42px] ${activeTab === "open" ? "bg-[#1BBFCA] text-white" : "bg-white text-teal-500 border border-teal-500"}`}
        >
          Opened Tickets
        </button>
        <button
          onClick={() => setActiveTab("closed")}
          className={`px-4 py-2 rounded w-[157px] h-[42px] ${activeTab === "closed" ? "bg-[#1BBFCA] text-white" : "bg-white text-[#1BBFCA] border border-teal-500"}`}
        >
          Closed Tickets
        </button>
      </div>

      {/* Ticket Card */}
      {activeTab === "open" && (
        <TicketCard
          name="Elon Musk"
          email="Musk@Gmail.Com"
          message="This ticket created from student mobile app"
          date="5-7-2025"
          time="6:03 AM"
          priority="High"
          avatarUrl="https://i.pravatar.cc/100"
        />
      )}
    </div>
  );
};

export default TicketsPage;
