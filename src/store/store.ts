import { configureStore } from '@reduxjs/toolkit';
import staffattendance from '../features/teachingstaffAttendance/slice';
import studyMaterial from "../features/StudyMaterials/slice"
import addQuestion from "../features/HelpManagement/AddQuestion/slice"

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		studyMaterial: studyMaterial,
		addQuestion: addQuestion,
	},
});

export default store;
