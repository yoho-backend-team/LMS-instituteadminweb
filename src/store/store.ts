import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import studyMaterial from "../features/StudyMaterials/slice"


const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		studyMaterial: studyMaterial,
	},
});

export default store;
