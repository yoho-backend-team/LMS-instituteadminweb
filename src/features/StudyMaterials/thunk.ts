
import { createStudyMaterial, deleteStudyMaterial, getBranch, getCourse, getStudyMaterialsAll, updateStudyMaterial } from "./service"; 
import { addStudyMaterials, editStudyMaterial, getAllCourses, getBranches, getStudyMaterial } from "./slice";


export const fetchStudyMaterialsThunk = (params:any) => async (dispatch: any) => {
  try {
    const response = await getStudyMaterialsAll(params);
    dispatch(getStudyMaterial(response.data.data));
        console.log(" fetch study materials:",response.data.data);

  } catch (error) {
    console.error("Failed to fetch study materials:", error);
  }
};

export const updateStudyMaterialThunk = (data: any) => async (dispatch: any) => {
  try {
    const updated = await updateStudyMaterial(data);
    dispatch(editStudyMaterial(updated.data)); 
  } catch (error) {
    console.error("Error updating study material:", error);
  }
};

export const GetBranchThunks = (params: any) => async (dispatch: any) => {
  try {
    const result = await getBranch(params); 
    dispatch(getBranches(result)); 
    return result.data;
  } catch (error: any) {
    console.error("Error fetching branches:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch branches");
  }
};


export const GetCourseThunks = (params: any) => async (dispatch: any) => {
  try {
    const result = await getCourse(params); // should hit /{branch_id}/courses
    dispatch(getAllCourses(result)); 
    return result.data;
  } catch (error: any) {
    console.error("Error fetching courses:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};


export const createStudyMaterialThunk = (data: any) => async (dispatch: any) => {
  try {
    const response = await createStudyMaterial(data); 
    dispatch(addStudyMaterials([response.data])); 
    console.log("Created material:", response.data);
  } catch (error) {
    console.error("Error creating study material:", error);
  }
};


export const deleteStudyMaterialThunk = (id: string) => async (dispatch: any) => {
  try {
    await deleteStudyMaterial(id);
    
    dispatch(fetchStudyMaterialsThunk({ branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4", page: 1 }));
  } catch (error: any) {
    console.error("Delete failed:", error.message);
    throw error;
  }
};


