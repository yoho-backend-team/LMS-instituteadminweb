import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "Module",
  initialState: {
    data: [],
    upload_editdata: [],
    branch:[],
    branch_course:[],
  },
  reducers: {
    getModule: (state, action) => {
      state.data = action.payload;
    },

     getBranchCourse: (state, action) => {
      state.branch_course = action.payload;
    },

    addModules: (state: any, action) => {
      state.data = [...state.data, ...action.payload];
    },

    deleteModule: (state: any, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((module: any) => module.id !== idToDelete);
    },
    editModule: (state: any, action) => {
      const updatedModule = action.payload;
      const index = state.data.findIndex(
        (module: any) => module.uuid === updatedModule.uuid
      );
      if (index !== -1) {
        state.data[index] = updatedModule;
      }
    },
    updateModuleStatus: (state:any, action) => {
      console.log("Reducer payload:", action.payload); 
      const updatedModule = action.payload;

      if (!updatedModule || !updatedModule.module_id) return; 

      const index = state.data.findIndex(
        (item:any) => item.module_id === updatedModule.module_id
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          status: updatedModule.status,
        };
      }
    },

    upload_editdata: (state, action) => {
      state.upload_editdata = action.payload;
    },
        getBranches(state, action) {
      state.branch = action.payload;
    },

  },
});
export const {
  getModule,
  deleteModule,
  editModule,
  upload_editdata,
  updateModuleStatus,
  addModules,
  getBranches,
  getBranchCourse,
} = ModuleSlice.actions;
export default ModuleSlice.reducer;
