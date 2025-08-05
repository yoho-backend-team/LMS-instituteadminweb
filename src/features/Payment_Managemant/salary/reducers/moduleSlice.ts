import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "Salary",
  initialState: {
    salary: [],
    
  },
  reducers: {
    getSalary: (state, action) => {
      state.salary= action.payload;
    },
   

  },
});
export const {
  getSalary
} = ModuleSlice.actions;
export default ModuleSlice.reducer;
