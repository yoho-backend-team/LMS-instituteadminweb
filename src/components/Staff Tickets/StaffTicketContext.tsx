import React, { createContext, useContext, useState } from "react";

export interface Ticket {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
  priority: "High" | "Low";
  status: "opened" | "closed";
}

interface TicketContextType {
  tickets: Ticket[];
  updateTicketStatus: (id: number, status: "opened" | "closed") => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const initialTickets: Ticket[] = [
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
    status: "opened",
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

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const updateTicketStatus = (id: number, newStatus: "opened" | "closed") => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
    <TicketContext.Provider value={{ tickets, updateTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) throw new Error("useTicketContext must be used within TicketProvider");
  return context;
};
