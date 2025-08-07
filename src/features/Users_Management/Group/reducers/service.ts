import Client from "../../../../apis/index.ts";

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
export const deleteGroup = async (uuid: any) => {
  try {
    const response = await Client.group.delete(uuid);
    console.log("Deleted group:", response);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete group");
  }
};
export const UpdateGroup = async (params: any) => {
  console.log("UpdateGroup called with", params);
  try {
    const response = await Client.group.permissionWithRoleEdit(params);
    console.log("UpdateGroup response", response);
    return response.data;
  } catch (err) {
    console.error("UpdateGroup error", err);
    throw err; 
  }
};

