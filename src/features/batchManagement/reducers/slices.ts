import { createSlice } from "@reduxjs/toolkit";




const batchSlice = createSlice({
    name :"batchSlice",
   initialState : {
      batch : []

   }, reducers:{
    getwithIdBatch:(state,actions)=>{
        state.batch = actions.payload;
    }
   }


});

export const {getwithIdBatch} =  batchSlice.actions;
export default batchSlice.reducer;