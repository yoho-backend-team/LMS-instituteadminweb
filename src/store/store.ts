import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import StaffSlice from '../features/staff/reducers/slices'

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		StaffSlice : StaffSlice, 
	},
});

export default store;
