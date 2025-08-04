import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "Module",
  initialState: {
    data: [],
    upload_editdata:[]
  },
  reducers: {

    getModule: (state, action) => {
      state.data = action.payload;
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
     upload_editdata: (state, action) => {
      state.upload_editdata = action.payload;
    },
  },
});
export const { getModule, deleteModule, editModule,upload_editdata } = ModuleSlice.actions;
export default ModuleSlice.reducer;
