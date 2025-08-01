import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice=createSlice({
    name:'Module',
    initialState:{
        data:[],
    },
    reducers:{
        getModule:(state,action)=>{
            state.data=action.payload;
        },
         addModules: (state:any, action) => {
        state.data = [...state.data, ...action.payload];
    }
    }

});
export const {getModule}=ModuleSlice.actions;
export default ModuleSlice.reducer;