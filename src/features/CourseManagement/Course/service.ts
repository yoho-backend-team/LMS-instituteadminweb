/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../apis/index'

export const getCourse = async (params: any) => {
  try {
    const response: any = await Client.course.getAll(params);
    
    return response?.data;
  } catch (error) {
    console.error("Getting Course Error:", error);
    throw error;
  }
};

export const deleteCourse = async (category: string, courseId: string) => {
  try {
    const response = await Client.course.delete({ category, id: courseId });
   
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete course");
  }
};


export const createCourse = async (data: any) => {
  try {
    const response = await Client.course.create(data, undefined);
   
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create course");
  }
};

export const updateCourse = async (data: any) => {
  try {
    const response = await Client.course.update(data);
   
    return response;
  } catch (error: any) {
    console.error("Failed to update course:", error);
    throw new Error(error.response?.data?.message || "Failed to update course");
  }
};
