import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "fees-paymanagement",
  initialState: {
    fees: [],
    branch: [],
    branch_course: [],
    batch:[],
    student:[]
  },
  reducers: {
    getcreat: (state, action) => {
      state.fees = action.payload;
    },

    getallfees: (state, action) => {
      state.fees = action.payload;
    },

    getBranches(state, action) {
      state.branch = action.payload;
    },

    getBranchCourse: (state, action) => {
      state.branch_course = action.payload;
    },

     getbatchwith_id: (state, action) => {
      state.batch = action.payload;
    },
    getstudent: (state, action) => {
      state.student = action.payload;
    },
    
  },
});
export const { getcreat,getBranches,getBranchCourse,getbatchwith_id,getstudent,getallfees } = ModuleSlice.actions;
export default ModuleSlice.reducer;
