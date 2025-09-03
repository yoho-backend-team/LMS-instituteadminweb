import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "StaffTicket",
  initialState: {
    data: [],
    individualData:[],
    loading: false
  },
  reducers: {
    getstaffticket: (state, action) => {
      state.data = action.payload;
    },

    
    getindividualStaffdata: (state, action) => {
      state.individualData = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const {
  getstaffticket,
  getindividualStaffdata,
  setLoading
} = ModuleSlice.actions;
export default ModuleSlice.reducer;
