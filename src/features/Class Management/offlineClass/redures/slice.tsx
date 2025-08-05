import { createSlice } from "@reduxjs/toolkit";

const OfflineSlice=createSlice({
    name:'OfflineSlice',
    initialState:{
        offlineclass:[],

    },
    reducers:{
        setOfflineClass:(state,action)=>{
            state.offlineclass=action.payload;
        },
    }
})

export const {setOfflineClass}=OfflineSlice.actions;
export default OfflineSlice.reducer;