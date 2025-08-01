import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/ContentMangement/Notes/Reducer/noteSlice';
import staffattendance from '../features/teachingstaffAttendance/slice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
    staffAttendance: staffattendance,
  },
});

export default store;
