import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchNotesThunk,
  createNoteThunk,
  updateNoteThunk,
  deleteNoteThunk,
} from "./noteThunk";

interface NoteState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  data: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchNotesThunk.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchNotesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      })
      .addCase(
        createNoteThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.data.push(action.payload);
        }
      )

      .addCase(
        updateNoteThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.data = state.data.map((note) =>
            note.uuid === action.payload.uuid
              ? { ...note, ...action.payload }
              : note
          );
        }
      )
      .addCase(
        deleteNoteThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter(
            (note) => note.uuid !== action.payload
          );
        }
      );
  },
});

export default noteSlice.reducer;
