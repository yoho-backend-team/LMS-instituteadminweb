import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import batchReducer from '../features/batchManagement/reducers/slices';



const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		batchReducer:batchReducer,
	},
});

export default store;
