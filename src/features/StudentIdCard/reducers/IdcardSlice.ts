import { createSlice } from '@reduxjs/toolkit';

const IDcardSlice = createSlice({
    name: 'IDcardSlice',
    initialState: {
        data: [],
    },
    reducers: {
        getIDcard: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { getIDcard } = IDcardSlice.actions;
export default IDcardSlice.reducer;
