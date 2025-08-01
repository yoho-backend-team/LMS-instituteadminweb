import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import ModuleSlice from '../features/Content_Management/reducers/moduleSlice';

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		ModuleSlice:ModuleSlice
	},
});

export default store;
