// services/getFaqCategoriesAll.ts (or any path you prefer)
import Client from '../../apis/index';


export const getFaqQuestionsAll = async (params: any) => {
  try {
    const response = await Client.helpcenter.getall(params);
    console.log("Backend FAQ Category data:", response.data);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const createHelpCenter = async (data: any) => {
  try {
    const response = await Client.helpcenter.post(data);
    console.log("Help Center FAQ created successfully", response.data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create Help Center FAQ");
  }
};


export const updateHelpCenter = async (data: any, uuid: string) => {
  try {
    const response = await Client.helpcenter.update(data, uuid);
    console.log("Help Center FAQ updated successfully", response.data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update Help Center FAQ");
  }
};



export const deleteHelpCenter = async (id: string) => {
  try {
    const response = await Client.helpcenter.delete(id);
    console.log("Help Center FAQ deleted successfully", response.data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete Help Center FAQ");
  }
};
