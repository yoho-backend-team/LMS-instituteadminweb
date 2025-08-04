import { createSlice } from '@reduxjs/toolkit';

const StaffIDcardSlice = createSlice({
    name: 'StaffIDcardSlice',
    initialState: {
        data: [],
    },
    reducers: {
        getStaffIDcard: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { getStaffIDcard } = StaffIDcardSlice.actions;
export default StaffIDcardSlice.reducer;
