// store/slices/timelineSlice.ts

import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "communitySlice",
  initialState: {
    data: [],
  },
  reducers: {
    getcommunity: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getcommunity } = communitySlice.actions;
export default communitySlice.reducer;
