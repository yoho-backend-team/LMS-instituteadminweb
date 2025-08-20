import { createSlice } from '@reduxjs/toolkit';

const StudentNotificationSlice = createSlice({
	name: 'StudentNotificationSlice',
	initialState: {
		notificationdata: [],
		coursedata: [],
		loading: false,
	},
	reducers: {
		getstudentnotificationdetails: (state, action) => {
			state.notificationdata = action.payload;
		},
		getcoursedetails: (state, action) => {
			state.coursedata = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { getstudentnotificationdetails, getcoursedetails, setLoading } =
	StudentNotificationSlice.actions;

export default StudentNotificationSlice.reducer;
