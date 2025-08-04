import Client from "../../../../apis/index.ts";
import type { CreateGroupParams } from "../../../../types/group.ts";

export const  GetAllGroupCard = async(params:any)=>{

    const response =await Client.group.getAll(params);
    console.log("Card data getting", response)
    if(response){
        return response;
    }
}
export const UpdateStatusCard = async (params: any) => {
  console.log("UpdateStatusCard called with", params);
  try {
    const response = await Client.group.updateStatus(params);
    console.log("UpdateStatusCard response", response);
    return response.data;
  } catch (err) {
    console.error("UpdateStatusCard error", err);
    throw err; 
  }
}

export const CreateGroup = async (params:any) => {
  console.log("Create Group payload:", params);
  try {
 
    const response = await Client.group.create(params);
    console.log("Group created", response);
    return response.data;
  } catch (err) {
    console.error("Can't create group", err);
    throw err;
  }
};
export const  GetViewCard = async(data:any)=>{

    const response =await Client.group.permissionWithRole(data);
    console.log("view group getting", response)
    if(response){
        return response;
    }
}