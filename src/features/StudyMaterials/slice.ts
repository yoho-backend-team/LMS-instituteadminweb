import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface StudyMaterial {
	id: number;
	uuid: string;
	title: string;
	description: string;
	course: string;
	branch: string;
	status: 'Active' | 'Completed';
	file?: any;
	video?: string;
}
interface Branch {
	uuid: string;
	name: string;
}

interface StudyMaterialState {
	courses: any[];
	data: StudyMaterial[];
	upload_editdata: StudyMaterial[];
	branch: Branch[];
	loading: boolean;
}

const initialState: StudyMaterialState = {
	data: [],
	upload_editdata: [],
	branch: [],
	courses: [],
	loading: false,
};

const StudyMaterialSlice = createSlice({
	name: 'StudyMaterial',
	initialState,
	reducers: {
		getStudyMaterial: (state, action: PayloadAction<StudyMaterial[]>) => {
			state.data = action.payload;
		},
		addStudyMaterials: (state, action: PayloadAction<StudyMaterial[]>) => {
			state.data = [...state.data, ...action.payload];
		},
		deleteStudyMaterial: (state, action: PayloadAction<number>) => {
			state.data = state.data.filter((item) => item.id !== action.payload);
		},
		editStudyMaterial: (state, action: PayloadAction<StudyMaterial>) => {
			const updatedItem = action.payload;
			const index = state.data.findIndex(
				(item) => item.uuid === updatedItem.uuid
			);
			if (index !== -1) {
				state.data[index] = updatedItem;
			}
		},
		updateStudyMaterialStatus: (
			state,
			action: PayloadAction<{ id: number; status: 'Active' | 'Completed' }>
		) => {
			const { id, status } = action.payload;
			const index = state.data.findIndex((item) => item.id === id);
			if (index !== -1) {
				state.data[index].status = status;
			}
		},
		upload_editdata: (state, action: PayloadAction<StudyMaterial[]>) => {
			state.upload_editdata = action.payload;
		},
		getAllCourses: (state, action: PayloadAction<any[]>) => {
			state.courses = action.payload;
		},
		getBranches: (state, action: PayloadAction<Branch[]>) => {
			state.branch = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const {
	getStudyMaterial,
	addStudyMaterials,
	deleteStudyMaterial,
	editStudyMaterial,
	updateStudyMaterialStatus,
	upload_editdata,
	getBranches,
	getAllCourses,
	setLoading,
} = StudyMaterialSlice.actions;

export default StudyMaterialSlice.reducer;
