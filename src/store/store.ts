import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/ContentMangement/Notes/Reducer/noteSlice';
import staffattendance from '../features/teachingstaffAttendance/slice';

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
	},
});

export default store;
