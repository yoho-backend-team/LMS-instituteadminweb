import { createSlice } from '@reduxjs/toolkit';

const ModuleSlice = createSlice({
	name: 'fees-paymanagement',
	initialState: {
		fees: [],
		branch: [],
		branch_course: [],
		batch: [],
		student: [],
		loading: false,
	},
	reducers: {
		getcreat: (state, action) => {
			state.fees = action.payload;
		},

		getallfees: (state, action) => {
			state.fees = action.payload;
		},

		getBranches(state, action) {
			state.branch = action.payload;
		},

		getBranchCourse: (state, action) => {
			state.branch_course = action.payload;
		},

		getbatchwith_id: (state, action) => {
			state.batch = action.payload;
		},
		getstudent: (state, action) => {
			state.student = action.payload;
		},
		deletestudent: (state, action) => {
			state.fees = action.payload;
		},
		editstudent: (state, action) => {
			state.fees = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const {
	getcreat,
	getBranches,
	getBranchCourse,
	getbatchwith_id,
	getstudent,
	getallfees,
	deletestudent,
	editstudent,
	setLoading,
} = ModuleSlice.actions;

export default ModuleSlice.reducer;
