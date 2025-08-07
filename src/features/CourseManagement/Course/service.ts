import Client from '../../../apis/index'

export const getCourses = async (data: any) => {
  try {
    const response: any = await Client.course.getAllcourse(data)
    return response;
  } catch (error: any) {
    console.error("Course fetch error:", error?.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};

export const deleteCourse = async (category: string, courseId: string) => {
  try {
    const response = await Client.course.delete({ category, id: courseId });
    console.log("Course deleted:", response);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete course");
  }
};


export const createCourse = async (data: any, p0: {}) => {
  try {
    const response = await Client.course.create(data, undefined);
    console.log("Course created:", response);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create course");
  }
};