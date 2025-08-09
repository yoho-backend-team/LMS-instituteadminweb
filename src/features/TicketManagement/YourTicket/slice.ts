import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Ticket {
  id: string;
  uuid: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed"; // adjust as per your backend
  category: string;
  createdAt?: string;
  updatedAt?: string;
  // Add more fields as needed
}

interface TicketAdminState {
  data: any[];
  selected: Ticket | null;
}

const initialState: TicketAdminState = {
  data: [],
  selected: null,
};

const TicketAdminSlice = createSlice({
  name: "ticketAdmin",
  initialState,
  reducers: {
  
    setTickets: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },

   
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.data.push(action.payload);
    },

   
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const updated = action.payload;
      const index = state.data.findIndex((item) => item.id === updated.id);
      if (index !== -1) {
        state.data[index] = updated;
      }
    },

   
    deleteTicket: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },

   
    setSelectedTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.selected = action.payload;
    },
  },
});

export const {
  setTickets,
  addTicket,
  updateTicket,
  deleteTicket,
  setSelectedTicket,
} = TicketAdminSlice.actions;

export default TicketAdminSlice.reducer;
