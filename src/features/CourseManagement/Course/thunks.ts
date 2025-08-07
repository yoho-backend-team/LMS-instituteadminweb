import { getCourses } from "./service";
import { setCourses } from "./slice";

export const fetchCoursesThunk = (data: any) => async (dispatch: any) => {
  try {
    const response = await getCourses(data);
    console.log('thunks response', response)
    dispatch(setCourses(response));
  } catch (error) {
    console.error("Failed to fetch courses:", error);
  }
};