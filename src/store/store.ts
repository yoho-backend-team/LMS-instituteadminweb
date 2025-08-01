import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import OfflineClassSlice from  '../features/Class Management/offlineClass/redures/slice'

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		OfflineClassSlice:OfflineClassSlice,
	},
});

export default store;
