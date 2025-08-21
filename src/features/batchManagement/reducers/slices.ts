import { createSlice } from "@reduxjs/toolkit";




const batchSlice = createSlice({
    name :"batchSlice",
   initialState : {
      batch : [],
      loading:false

   }, reducers:{
    getwithIdBatch:(state,actions)=>{
        state.batch = actions.payload;
    },
    setLoading : (state,action) => {
        state.loading = action.payload;
    }
   }


});

export const {getwithIdBatch,setLoading} =  batchSlice.actions;
export default batchSlice.reducer;