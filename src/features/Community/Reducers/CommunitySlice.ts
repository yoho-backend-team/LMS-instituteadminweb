// store/slices/timelineSlice.ts

import { createSlice } from "@reduxjs/toolkit";


const communitySlice = createSlice({
  name: "communitySlice",
  initialState: {
    data: [],
    community: []
  },
  reducers: {
    getcommunity: (state, action) => {
      state.data = action.payload;
    },
     
    getMessage: (state, action) => {
      state.community = action.payload;
    },
  
  },
  
});

export const { getcommunity, getMessage } = communitySlice.actions;
export default communitySlice.reducer;
