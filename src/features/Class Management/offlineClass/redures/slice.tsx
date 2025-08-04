import { createSlice } from "@reduxjs/toolkit";

const OfflineSlice=createSlice({
    name:'OfflineSlice',
    initialState:{
        data:[],

    },
    reducers:{
        setOfflineClass:(state,action)=>{
            state.data=action.payload;
        },
    }
})

export const {setOfflineClass}=OfflineSlice.actions;
export default OfflineSlice.reducer;