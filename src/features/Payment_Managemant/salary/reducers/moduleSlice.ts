import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "Salary",
  initialState: {
    salary: [],
    branch:[],
    staffname:[],
    
  },
  reducers: {
    getSalary: (state, action) => {
      state.salary= action.payload;
    },
   getBranches(state, action) {
      state.branch = action.payload;
    },
     addSalary: (state, action) => {
      state.salary= action.payload;
    },
    getstaffnamewithbranch(state, action) {
      state.staffname = action.payload;
    },

  },
});
export const {
  getSalary,getBranches,addSalary,getstaffnamewithbranch
} = ModuleSlice.actions;
export default ModuleSlice.reducer;
