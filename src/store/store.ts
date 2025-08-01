import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import StudentSlice from "../features/StudentManagement/reducer/StudenSlicet"

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		StudentSlice: StudentSlice,

	},
});

export default store;
