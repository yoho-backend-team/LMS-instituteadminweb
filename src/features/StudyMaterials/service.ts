import Client from '../../apis/index'


export const getStudyMaterialsAll = async (params:any) => {
    try {
       
        const response = await Client.study_material.getAll(params)
        console.log("Backend data comming",response)
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}



export const updateStudyMaterial = async (data: { uuid: string; [key: string]: any }) => {
  try {
    const response = await Client.study_material.update(data, data.uuid);
    console.log("Study material updated successfully", response.data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update study material");
  }
};



export const getBranch = async (params: any) => {
  try {
    const response = await Client.branch.getAll(params);
    console.log("branches",response)
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch branches");
  }
};

export const getCourse = async (params: any) => {
  try {
    const response = await Client.course.getWithBranch(params);
    console.log("courses", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};



export const createStudyMaterial = async (data: any) => {
  try {
    const response = await Client.study_material.create(data);
    console.log("Study material created successfully", response.data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create study material");
  }
};


export const deleteStudyMaterial = async (id: string) => {
  try {
    const response = await Client.study_material.delete({ id });
    console.log("Deleted study material:", response);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete study material");
  }
};




export const updateStudyMaterialStatus = async (data: { id: string; is_active: boolean }) => {
  try {
    const response = await Client.study_material.update_status(data);
    return response;
  } catch (error) {
    console.error("Failed to update status:", error);
    throw error;
  }
};
