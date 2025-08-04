import { createSlice } from '@reduxjs/toolkit';

const DashboardSlice = createSlice({
    name: 'DashboardSlice',
    initialState: {
        data: [],
        activityData:[],
    },
    reducers: {
        getDashboardData: (state, action) => {
            state.data = action.payload;
        },
        getActivityData: (state, action) => {
            state.activityData = action.payload;
        },
    },
});

export const { getDashboardData, getActivityData } = DashboardSlice.actions;
export default DashboardSlice.reducer;
