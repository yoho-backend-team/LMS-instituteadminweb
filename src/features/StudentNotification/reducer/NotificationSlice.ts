import { createSlice } from '@reduxjs/toolkit';

const   StudentNotificationSlice = createSlice({
	name: 'StudentNotificationSlice',
	initialState: {
		notificationdata: [],
		coursedata:[],
        
	},
	reducers: {
		getstudentnotificationdetails: (state, action) => {
			state.notificationdata = action.payload;

		},
        getcoursedetails: (state, action) => { 	 	
			console.log("Reducer called with course data:", action.payload);
			state.coursedata = action.payload;

		},
	},
	
});
export const { getstudentnotificationdetails,getcoursedetails} = StudentNotificationSlice.actions;


export default StudentNotificationSlice.reducer;
