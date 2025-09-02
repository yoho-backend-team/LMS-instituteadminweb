// services/getFaqCategoriesAll.ts (or any path you prefer)
import Client from '../../apis/index';


export const getFaqQuestionsAll = async (params: any) => {
  try {
    const response = await Client.helpcenter.getall(params);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const createHelpCenter = async (data: any) => {
  try {
    const response = await Client.helpcenter.post(data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create Help Center FAQ");
  }
};


export const updateHelpCenter = async (data: any, uuid: string) => {
  try {
    const response = await Client.helpcenter.update(data, uuid);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update Help Center FAQ");
  }
};



export const deleteHelpCenter = async (id: string) => {
  try {
    const response = await Client.helpcenter.delete(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete Help Center FAQ");
  }
};
