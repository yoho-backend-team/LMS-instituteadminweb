import Client from '../../apis/index'

export const getCategory = async () => {
  try {
    const response: any = await Client.category.get('');
    console.log("Service Res", response)
    return response.data; 
  } catch (error) {
    console.error("Getting Course Error:", error);
    throw error;
  }
};


