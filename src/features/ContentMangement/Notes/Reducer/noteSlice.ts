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
      state.data = [...state.data, ...action.payload];
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
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    updateNoteStatus: (state: any, action) => {
      const updatedNote = action.payload;

      if (!updatedNote || !updatedNote.uuid) return;

      const index = state.data.findIndex(
        (item: any) => item.uuid === updatedNote.uuid
      );

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          isActive: updatedNote.isActive,
        };
      }
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
  updateNoteStatus,
} = noteSlice.actions;

export default noteSlice.reducer;

export const GetNotes = (state: any) => state.noteSlice.data;
