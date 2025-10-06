import { createSlice } from '@reduxjs/toolkit';

const StudentSlice = createSlice({
	name: 'StudentSlice',
	initialState: {
		data: [],
		data2: [],
		liveClassdata: [],
		activitydata: [],
		class:[],
		loading: false,
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
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
       setClassdetails:(state,action)=>{
		state.class=action.payload;
	   }
	},
});
export const {
	getstudentdetails,
	getcoursedetails,
	getLiveClassDetails,
	getActivityDetails,
	setLoading,
	setClassdetails,
} = StudentSlice.actions;

export default StudentSlice.reducer;
