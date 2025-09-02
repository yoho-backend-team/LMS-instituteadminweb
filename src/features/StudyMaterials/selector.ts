export const selectStudyMaterials = (state: any) => state.studyMaterial?.data;
export const selectBranches = (state: any) => state.studyMaterial?.branch;
export const selectCourses = (state: any) => state.studyMaterial?.courses;
export const EditStudyMaterial = (state: any) =>
	state.studyMaterial.upload_editdata;
export const selectLoading = (state: any) => state.studyMaterial.loading;
