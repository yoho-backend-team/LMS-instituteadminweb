/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const data: any[] = []

const ModuleSlice = createSlice({
	name: 'Module',
	initialState: {
		data,
		upload_editdata: [],
		branch: [],
		branch_course: [],
		loading: false,
	},
	reducers: {
		getModule: (state, action) => {
			state.data = action.payload;
		},

		getBranchCourse: (state, action) => {
			state.branch_course = action.payload;
		},

		addModules: (state, action) => {
			const data = action.payload
			state.data.unshift(data)
		},

		deleteModule: (state: any, action) => {
			const idToDelete = action.payload;
			state.data = state.data.filter(
				(module: any) => module.uuid !== idToDelete
			);
		},
		editModule: (state: any, action) => {
			const updatedModule = action.payload;
			const index = state.data.findIndex(
				(module: any) => module.uuid === updatedModule.uuid
			);
			if (index !== -1) {
				state.data[index] = updatedModule;
			}
		},
		updateModuleStatus: (state: any, action) => {
			const updatedModule = action.payload;

			if (!updatedModule || !updatedModule.module_id) return;

			const index = state.data.findIndex(
				(item: any) => item.module_id === updatedModule.module_id
			);
			if (index !== -1) {
				state.data[index] = {
					...state.data[index],
					status: updatedModule.status,
				};
			}
		},

		upload_editdata: (state, action) => {
			state.upload_editdata = action.payload;
		},
		getBranches: (state, action) => {
			state.branch = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});
export const {
	getModule,
	deleteModule,
	editModule,
	upload_editdata,
	updateModuleStatus,
	addModules,
	getBranches,
	getBranchCourse,
	setLoading,
} = ModuleSlice.actions;
export default ModuleSlice.reducer;
