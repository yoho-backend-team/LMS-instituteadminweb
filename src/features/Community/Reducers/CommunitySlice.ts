import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "communitySlice",
  initialState: {
    data: [], 
    getCommunityMessage:[]
  },
  reducers: {
    getcommunity: (state, action) => {
      state.data = action.payload;
    },
    getCommunityMessage: (state, action) => {
      state.getCommunityMessage = action.payload;
    }
  },
});

export const { getcommunity, getCommunityMessage } = communitySlice.actions;
export default communitySlice.reducer;
