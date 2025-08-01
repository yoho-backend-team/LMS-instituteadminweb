import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/ContentMangement/Notes/Reducer/noteSlice';
import staffattendance from '../features/teachingstaffAttendance/slice';
import ModuleSlice from '../features/Content_Management/reducers/moduleSlice';

const store = configureStore({
  reducer: {
    staffAttendace: staffattendance,
    ModuleSlice: ModuleSlice,
    note: noteReducer,
  },
});

export default store;
