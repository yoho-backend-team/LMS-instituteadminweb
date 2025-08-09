// store/slices/timelineSlice.ts

import { createSlice } from '@reduxjs/toolkit';

const timelineSlice = createSlice({
    name: 'timelineSlice',
    initialState: {
        data: [],
    },
    reducers: {
        gettimeline: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { gettimeline } = timelineSlice.actions;
export default timelineSlice.reducer;

