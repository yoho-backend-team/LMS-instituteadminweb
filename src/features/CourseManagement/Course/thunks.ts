import { getCourse } from "./service";
import { setCourses } from "./slice";


export const GetAllCoursesThunk = (params: any) => async (dispatch: any) => {

  try {
    const data = await getCourse(params);
    
    dispatch( setCourses(data)); 
  } catch (error: any) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
};