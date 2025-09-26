import { createSlice } from '@reduxjs/toolkit';

const StaffSlice = createSlice({
	name: 'staffSlice',
	initialState: {
		allData: [],
		singleData: [],
		classData: [],
		activityData: [],
		branchData: [],
		loading: false,
		classgetid:[],
	},
	reducers: {
		getStaffDetails: (state, action) => {
			state.allData = action.payload;
		},
		getStaffDetailsId: (state, action) => {
			state.singleData = action.payload;
		},
		getClass: (state, action) => {
			state.classData = action.payload;
		},
		getActivity: (state, action) => {
			state.activityData = action.payload;
		},
		getBranch: (state, action) => {
			state.branchData = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		getWithIdClass:(state,action)=>{
			state.classgetid=action.payload;
		}
	},
});

export default StaffSlice.reducer;
export const {
	getStaffDetails,
	getStaffDetailsId,
	getClass,
	getActivity,
	getBranch,
	setLoading,
	getWithIdClass
} = StaffSlice.actions;
