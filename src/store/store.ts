import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import liveClassReducer from '../features/Class Management/Live Class/reducers/slices';
import batchReducer from '../features/batchManagement/reducers/slices';

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		liveClassReducer: liveClassReducer,
		batchReducer: batchReducer,
	},
});

export default store;
