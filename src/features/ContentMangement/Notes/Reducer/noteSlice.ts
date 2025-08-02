import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    data: [],
    loading: false,
    error: null,
    branches: [],
    courses: [],
  },

  reducers: {
    setLoading: (state: any, action) => {
      state.loading = action.payload;
    },
    setError: (state: any, action) => {
      state.error = action.payload;
    },
    setNotes: (state: any, action) => {
      state.data = action.payload;
    },
    addNote: (state: any, action) => {
      state.data.push(action.payload);
    },
    EditsNote: (state: any, action) => {
      state.data = state.data.map((note: any) =>
        note.uuid === action.payload.uuid
          ? { ...note, ...action.payload }
          : note
      );
    },
    deleteNote: (state, action) => {
      state.data = state.data.filter(
        (note: any) => note.uuid !== action.payload
      );
    },
    setBranches: (state: any, action) => {
      state.branches = action.payload;
    },
    setCourses: (state: any, action) => {
      state.courses = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setNotes,
  addNote,
  EditsNote,
  deleteNote,
  setBranches,
  setCourses,
} = noteSlice.actions;

export default noteSlice.reducer;

export const GetNotes = (state: any) => state.noteSlice.data;
