

import Client from "../../../apis/index";

export const getTimeline = async (params: any) => {
  try {
    const response = await Client.activity.get(params); 
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getsecurity = async (params: any) => {
  try {
    const response = await Client.admin.change_password(params); 
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const uploadImageOrFile = async (data: FormData) => {
  try {
    const response = await Client.file.upload(data);

    if (response) {
      return response;
    }

    throw new Error("No response from file upload");
  } catch (error) {
    console.error("File upload error:", error);
    throw error; // rethrow so calling code can handle it
  }
};

