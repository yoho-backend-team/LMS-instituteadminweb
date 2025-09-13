import { createSlice } from "@reduxjs/toolkit";




const batchSlice = createSlice({
    name :"batchSlice",
   initialState : {
      batch : [],
      loading:false,
      branchId: [],
   }, reducers:{
    getwithIdBatch:(state,actions)=>{
        state.batch = actions.payload;
    },
    setLoading : (state,action) => {
        state.loading = action.payload;
    },
    getBranchId: (state,action) => {
        state.branchId = action.payload;
    },
   }


});

export const {getwithIdBatch,setLoading,getBranchId} =  batchSlice.actions;
export default batchSlice.reducer;