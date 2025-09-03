import { createSlice } from '@reduxjs/toolkit';

const ModuleSlice = createSlice({
	name: 'Salary',
	initialState: {
		salary: [],
		branch: [],
		staffname: [],
		loading: false,
	},
	reducers: {
		getSalary: (state, action) => {
			state.salary = action.payload;
		},
		getBranches(state, action) {
			state.branch = action.payload;
		},
		addSalary: (state, action) => {
			state.salary = action.payload;
		},
		getstaffnamewithbranch(state, action) {
			state.staffname = action.payload;
		},
		updateSalary: (state, action) => {
			state.salary = action.payload;
		},
		deleteSalary: (state, action) => {
			state.salary = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});
export const {
	getSalary,
	getBranches,
	addSalary,
	getstaffnamewithbranch,
	updateSalary,
	deleteSalary,
	setLoading,
} = ModuleSlice.actions;
export default ModuleSlice.reducer;
