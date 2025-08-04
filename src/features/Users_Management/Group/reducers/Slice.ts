import { createSlice } from "@reduxjs/toolkit";

const GroupCardSlice = createSlice({
    name:"GroupCardSlice",
    initialState:{
        groupdata:[],
        viewdata:[],
    },

    reducers:{
        getGroupcard:(state,action) =>{
            state.groupdata = action.payload;     
        },
        getViewcard:(state,action) =>{
            state.viewdata=action.payload
        }
    }
});

export const {getGroupcard,getViewcard} = GroupCardSlice.actions;
export default GroupCardSlice.reducer
