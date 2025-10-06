/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../apis/index";
export const GetAllModule = async (params: any) => {
  const response = await Client.course_module.getAll(params);
  
  if (response) {
    return response;
  }
};

export const DeleteModule = async (params: { uuid: string }) => {
  const response = await Client.course_module.delete(params);
  return response.data;
};

export const EditModule = async (data: { uuid: string;[key: string]: any }) => {
  const response = await Client.course_module.update(data);
  return response.data;
};

export const UploadFile = async (data: FormData) => {
  const response = await Client.file.upload(data);
  return response.data;
};




export const ToggleModuleStatus = async (data: any) => {
  const response = await Client.course_module.update_status(data)
  return response.data;
};


export const AddModule = async (data: any) => {
  try {
    const response = await Client.course_module.create(data);
    return response.data;
  } catch (error) {
    console.error("Error adding module:", error);
    throw error;
  }
};

export const GetBranch = async (params: any) => {
  const response = await Client.branch.getAll(params);
  if (response) {
    return response;
  }
};

export const GetBranchCourse = async (branchid?: string) => {
  try {
    const response = await Client.course.getWithBranch({branch_id:branchid});
   
    return response;
  } catch (error: any) {
    console.error("Error in GetBranchCourse:", error.response?.data || error.message);
    throw error;
  }
};










