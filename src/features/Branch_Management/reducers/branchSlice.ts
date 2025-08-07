import { createSlice } from '@reduxjs/toolkit';


const branchidSlice = createSlice({
     name: 'branchSlice',
    initialState: {
        data: [],
    },
    reducers: {
        branchSlice: (state, action) => {
            state.data = action.payload;
        },
         allbranchSlice: (state, action) => {
            state.data = action.payload;
        },
    },
});


 export const { branchSlice,allbranchSlice } = branchidSlice.actions;
 export default branchidSlice.reducer;
















// store/slices/timelineSlice.ts

// import { createSlice } from '@reduxjs/toolkit';

// const timelineSlice = createSlice({
//     name: 'timelineSlice',
//     initialState: {
//         data: [],
//     },
//     reducers: {
//         gettimeline: (state, action) => {
//             state.data = action.payload;
//         },
//     },
// });

// export const { gettimeline } = timelineSlice.actions;
// export default timelineSlice.reducer;