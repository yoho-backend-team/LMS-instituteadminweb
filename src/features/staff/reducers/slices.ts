import { createSlice } from "@reduxjs/toolkit";

const StaffSlice = createSlice({
    name : 'staffSlice',
    initialState : {
        data:[],
    },
    reducers : {
        getStaffDetails : (state,action) => {
            state.data = action.payload;
        },
        
    }, 
});

export default StaffSlice.reducer;
export const { getStaffDetails } = StaffSlice.actions