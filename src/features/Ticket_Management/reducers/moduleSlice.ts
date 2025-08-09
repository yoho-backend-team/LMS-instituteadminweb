import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "StaffTicket",
  initialState: {
    data: [],
    
  },
  reducers: {
    getstaffticket: (state, action) => {
      state.data = action.payload;
    },

    getindividualStaffdata: (state, action) => {
      state.data = action.payload;
    },


  
   
  },
});
export const {
  getstaffticket,
  getindividualStaffdata
 
} = ModuleSlice.actions;
export default ModuleSlice.reducer;
