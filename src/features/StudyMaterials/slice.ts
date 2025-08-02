import { createSlice } from "@reduxjs/toolkit";

    const StudyMaterialSlice = createSlice({
        name: 'StudyMaterialSlice',
        initialState: {
            data: [],  
        loading: false,
        error: null,
        },
        reducers: {
            getStudyMaterial: (state, action) => {
                state.data = action.payload;
            },

        },
    });

    export const {getStudyMaterial} = StudyMaterialSlice.actions;
    export default StudyMaterialSlice.reducer;