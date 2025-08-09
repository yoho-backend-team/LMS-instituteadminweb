import Client from "../../../apis/index";
export const GetAllModule = async (params: any) => {
  const response = await Client.course_module.getAll(params);
  console.log("Module data getting", response);
  if (response) {
    return response;
  }
};

export const DeleteModule = async (params: { uuid: string }) => {
  const response = await Client.course_module.delete(params); 
  console.log("Data deleted completely", response);
  return response.data;
};

export const EditModule = async (data: { uuid: string; [key: string]: any }) => {
  const response = await Client.course_module.update(data); 
  console.log("Module updated successfully", response.data);
  return response.data;
};

export const UploadFile = async (data: FormData) => {
  const response = await Client.file.upload(data);
  console.log("File uploaded successfully", response.data);
  return response.data;
};




export const ToggleModuleStatus = async (data: any) => {
  const response = await Client.course_module.update_status(data)
  console.log("Module status updated successfully in services", response.data);
  return response.data;
};


export const AddModule = async (data: any) => {
  try {
    const response = await Client.course_module.create(data);
    console.log("Module added successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding module:", error);
    throw error;
  }
};

export const GetBranch = async (params: any) => {
  const response = await Client.branch.getAll(params);
  // console.log("Branch data getting", response);
  if (response) {
    return response;
  }
};

export const GetBranchCourse = async (branchname: string) => {
  try {
    const response = await Client.course.getWithBranch(branchname); 
    console.log("Branch course data getting in services", response);
    return response;
  } catch (error: any) {
    console.error("Error in GetBranchCourse:", error.response?.data || error.message);
    throw error;
  }
};










