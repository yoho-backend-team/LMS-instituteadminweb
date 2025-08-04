import { createSlice } from "@reduxjs/toolkit";

    const AddQuestionSlice = createSlice({
        name: 'AddQuestionSlice',
        initialState: {
            data: [],  
        loading: false,
        error: null,
        },
        reducers: {
            getAddQuestion: (state, action) => {
                state.data = action.payload;
            },

        },
    });

export const {getAddQuestion} = AddQuestionSlice.actions;
export default AddQuestionSlice.reducer;