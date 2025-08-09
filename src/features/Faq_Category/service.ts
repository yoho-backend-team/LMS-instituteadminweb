import Client from "../../apis/index";

export const getFaqCategories = async (params: any) => {
  try {
    const response = await Client.faq_category.getAll(params); 
    return response.data;
  } catch (error: any) {
    console.error("FAQ fetch error:", error?.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch FAQ categories");
  }
};


export const createFaqCategories = async (data: any) => {
  try {
    const response = await Client.faq_category.create(data);
    console.log("FAQ category created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create FAQ category");
  }
};


export const updateFaqCategories = async (uuid: string, data: any) => {
  try {
    const response = await Client.faq_category.update(uuid, data);
    console.log("FAQ category updated successfully:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update FAQ category");
  }
};


export const deleteFaqCategories = async (uuid: string) => {
  try {
    const response = await Client.faq_category.delete({ uuid });
    console.log("FAQ category deleted:", response);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete FAQ category");
  }
};
