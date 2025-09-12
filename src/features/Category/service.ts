import Client from '../../apis/index'

export const getCategory = async () => {
  try {
    const response: any = await Client.category.get('');
    
    return response.data; 
  } catch (error) {
    console.error("Getting Course Error:", error);
    throw error;
  }
};


