import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import OfflineClassSlice from  '../features/Class Management/offlineClass/redures/slice'
import liveClassReducer from '../features/Class Management/Live Class/reducers/slices';

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		OfflineClassSlice:OfflineClassSlice,
		liveClassReducer: liveClassReducer,
	},
});

export default store;
