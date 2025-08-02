import { createSlice } from "@reduxjs/toolkit";

const SalarySlice=createSlice({
    name:'Salary',
    initialState:{
        data:[],
    },
    reducers:{
        getSalary:(state,action)=>{
            state.data=action.payload;
        },
         addSalary: (state:any, action) => {
        state.data = [...state.data, ...action.payload];
    }
    }

});
export const {getSalary}=SalarySlice.actions;
export default SalarySlice.reducer;