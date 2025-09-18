import { createSlice } from "@reduxjs/toolkit";




const batchSlice = createSlice({
    name :"batchSlice",
   initialState : {
      batch : [],
      loading:false,
      branchId: [],
      courseId: []
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
    getCourseId: (state,action) => {
        state.courseId = action.payload
    }
   }


});

export const {getwithIdBatch,setLoading,getBranchId,getCourseId} =  batchSlice.actions;
export default batchSlice.reducer;