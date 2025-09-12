import { addCourse, setCCourses } from "./CourseSlice"
import { createCourse, getCourse } from "../Services/index"; 

export const GetAllCoursesThunk = (params: any) => async (dispatch: any) => {
  try {
    const data = await getCourse(params);
  
    dispatch(setCCourses(data?.data?.data)); 
  } catch (error: any) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
};


export const CreateCourseThunk = (courseData: any) => async (dispatch: any) => {
  try {
    const newCourse = await createCourse(courseData);
    dispatch(addCourse(newCourse)); 
  } catch (error: any) {
    console.error("Failed to create course:", error);
    throw error;
  }
};
