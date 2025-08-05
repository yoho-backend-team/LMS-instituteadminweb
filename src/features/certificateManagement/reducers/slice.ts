import { createSlice } from "@reduxjs/toolkit";

const CertificateSlice=createSlice({
    name:'CertificateSlice',
    initialState:{
        data:[],

    },
    reducers:{
        setCertificateClass:(state,action)=>{
            state.data=action.payload;
        },
    }
})

export const {setCertificateClass}=CertificateSlice.actions;
export default CertificateSlice.reducer;