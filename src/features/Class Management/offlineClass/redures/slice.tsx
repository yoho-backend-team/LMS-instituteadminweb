import { createSlice } from "@reduxjs/toolkit";

const OfflineSlice=createSlice({
    name:'OfflineSlice',
    initialState:{
        offlineclass:[],
        loading:false,

    },
    reducers:{
        setOfflineClass:(state,action)=>{
            state.offlineclass=action.payload;
        },
        setLoading:(state,action) => {
            state.loading = action.payload;
        }
    }
})

export const {setOfflineClass,setLoading}=OfflineSlice.actions;
export default OfflineSlice.reducer;