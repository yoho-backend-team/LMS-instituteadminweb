import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import batchReducer from '../features/batchManagement/reducers/slices';
import AllNotificationReducer from '../features/AllNotifications/Reducers/slices';


const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		batchReducer:batchReducer,
		AllNotificationReducer:AllNotificationReducer, 
	},
});

export default store;
