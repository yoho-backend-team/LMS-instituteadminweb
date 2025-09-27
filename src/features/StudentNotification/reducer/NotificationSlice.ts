import { createSlice } from '@reduxjs/toolkit';

const StudentNotificationSlice = createSlice({
	name: 'StudentNotificationSlice',
	initialState: {
		notificationdata: [],
		coursedata: [],
		loading: false,
		allCourse: []
	},
	reducers: {
		getstudentnotificationdetails: (state, action) => {
			state.notificationdata = action.payload;
		},
		getcoursedetails: (state, action) => {
			state.coursedata = action.payload;
		},
		getAllcoursedetails: (state, action) => {
			state.allCourse = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { getstudentnotificationdetails, getcoursedetails, setLoading, getAllcoursedetails } =
	StudentNotificationSlice.actions;

export default StudentNotificationSlice.reducer;
