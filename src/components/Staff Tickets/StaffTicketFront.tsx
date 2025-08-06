
import React, { useState } from "react";
import TicketCard from "./TicketCard";
import ticket1 from "../../assets/ticket1.png";
import { useTicketContext } from "../../components/Staff Tickets/StaffTicketContext";

const StudTicketFront: React.FC = () => {
  const [filter, setFilter] = useState<"opened" | "closed">("opened");
  const { tickets } = useTicketContext();

  const filteredTickets = tickets.filter((ticket) => ticket.status === filter);

  return (
    <div>
      <div className="bg-[#14b8c6] text-white px-4 py-2 rounded-md inline-flex items-center gap-2 font-semibold text-lg mb-6 w-full">
        <img src={ticket1} alt="Ticket Icon" className="w-5 h-5" />
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

      <div className="grid md:grid-cols-3 gap-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => <TicketCard key={ticket.id} {...ticket} />)
        ) : (
          <p className="text-gray-500 col-span-3 text-center">No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default StudTicketFront;