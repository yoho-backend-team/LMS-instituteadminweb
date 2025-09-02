import Client from "../../../apis/index";

export const getCourse = async (params: any) => {
  try {
    const response: any = await Client.course.getAll(params);
    console.log("Service Res", response)
    return response;
  } catch (error) {
    console.error("Getting Course Error:", error);
    throw error;
  }
};



export const createCourse = async (data: any, options?: any) => {
  try {
    const response = await Client.course.create(data, options);
    console.log("Created course:", response);
    return response;
  } catch (error) {
    console.error("Create Course Error:", error);
    throw error;
  }
};
