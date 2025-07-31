import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import IdcardSlice from '../features/StudentIdCard/reducers/IdcardSlice'

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		IdcardSlice:IdcardSlice,
	},
});

export default store;
