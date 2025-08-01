import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import IdcardSlice from '../features/StudentIdCard/reducers/IdcardSlice';
import StaffIDcardSlice from '../features/StaffIdCard/reducers/IdcardSlice';
import DashboardSlice from '../features/Dashboard/reducers/DashboardSlice';

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		IdcardSlice:IdcardSlice,
		StaffIDcardSlice:StaffIDcardSlice,
		DashboardSlice:DashboardSlice,
	},
});

export default store;
