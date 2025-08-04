import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import subscriptionReducer from '../components/subscription/slice'

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		subscription : subscriptionReducer
	},
});

export default store;
