import { createSlice } from '@reduxjs/toolkit';

const   StudentSlice = createSlice({
	name: 'StudentSlice',
	initialState: {
		data: [],
		data2:[],
		liveClassdata:[],
		activitydata:[],        
	},
	reducers: {
		getstudentdetails: (state, action) => {
			state.data = action.payload;

		},
		getcoursedetails: (state, action) => {
			state.data2 = action.payload;

		},	
		getLiveClassDetails: (state, action) => {
			state.liveClassdata = action.payload;

		},	
		getActivityDetails: (state, action) => {
			state.activitydata = action.payload;

		},	
	},
	
});
export const { getstudentdetails,getcoursedetails,getLiveClassDetails,getActivityDetails } = StudentSlice.actions;


export default StudentSlice.reducer;
