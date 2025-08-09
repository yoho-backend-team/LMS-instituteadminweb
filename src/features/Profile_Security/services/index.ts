

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
