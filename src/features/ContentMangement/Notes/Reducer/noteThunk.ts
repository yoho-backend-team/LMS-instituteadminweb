import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNotes, createNote, updateNote, deleteNote } from '../Services/index';

// Fetch Notes
export const fetchNotesThunk = createAsyncThunk(
  'note/fetch',
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await getNotes(params);
      return res.data.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch notes';
      return rejectWithValue(message);
    }
  }
);

// Create Note
export const createNoteThunk = createAsyncThunk(
  'note/createNote',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await createNote(data);
      return response.data.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to create note';
      return rejectWithValue(message);
    }
  }
);

// Update Note
export const updateNoteThunk = createAsyncThunk(
  'note/updateNote',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await updateNote(data);
      return response.data.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to update note';
      return rejectWithValue(message);
    }
  }
);

// Delete Note
export const deleteNoteThunk = createAsyncThunk(
  'note/deleteNote',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteNote(id);
      return id;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to delete note';
      return rejectWithValue(message);
    }
  }
);
