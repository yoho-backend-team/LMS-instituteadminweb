import { createSlice } from '@reduxjs/toolkit';

const CategorySlice = createSlice({
    name: 'CategorySlice',
    initialState: {
        data: [],
    },
    reducers: {
        getCategory: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { getCategory } = CategorySlice.actions;
export default CategorySlice.reducer;