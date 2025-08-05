import React, { useState } from "react";
import TicketCard from "./TicketCard";

interface Ticket {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
  priority: "High" | "Low";
  status: "opened" | "closed";
}

const Tickets: Ticket[] = [
  {
    id: 1,
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    message: "This ticket created from student mobile app",
    date: "5-7-2025",
    time: "6:03 AM",
    priority: "High",
    status: "opened",
  },
  {
    id: 2,
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    message: "This ticket created from student mobile app",
    date: "5-7-2025",
    time: "6:03 AM",
    priority: "Low",
    status: "closed",
  },
  {
    id: 3,
    name: "Elon Musk",
    email: "Musk@Gmail.Com",
    message: "This ticket created from student mobile app",
    date: "5-7-2025",
    time: "6:03 AM",
    priority: "Low",
    status: "opened",
  },
];

const StudTickets: React.FC = () => {
  const [filter, setFilter] = useState<"opened" | "closed">("opened");

  const filteredTickets = Tickets.filter((ticket) => ticket.status === filter);

  return (
    <div>
     
      <div className="bg-[#14b8c6] text-white px-4 py-2 rounded-md inline-flex items-center gap-2 font-semibold text-lg mb-6">

        STAFF TICKETS
      </div>

     
      <div className="flex gap-4 mb-6">
        {["opened", "closed"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md font-semibold capitalize ${
              filter === type
                ? "bg-[#14b8c6] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter(type as "opened" | "closed")}
          >
            {type} Tickets
          </button>
        ))}
      </div>

      {/* Ticket Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))
        ) : (
          <p className="text-gray-500">No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default StudTickets;
