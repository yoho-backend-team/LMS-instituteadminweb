import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import studentAttendance from '../features/Attendance_Managemenet/Student_Attendance/redux/slice'

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		studentAttendance: studentAttendance
	},
});

export default store;
