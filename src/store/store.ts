import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import liveClassReducer from '../features/Class Management/Live Class/reducers/slices';

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		liveClassReducer: liveClassReducer,
	},
});

export default store;
