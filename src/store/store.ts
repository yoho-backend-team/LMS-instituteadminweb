import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import GroupCardSlice from "../features/Users_Management/Group/reducers/Slice"

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		GroupCardSlice: GroupCardSlice

	},
});

export default store;
