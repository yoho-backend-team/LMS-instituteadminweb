import Client from "../../../apis/index.ts";

export const  GetAllFaqs = async(params:any)=>{

    const response =await Client.faq.getAll(params);
    console.log("Card data getting", response)
    if(response){
        return response;
    }
}
export const CreateFaq = async (params:any) => {
  console.log("Created faq payload:", params);
  try {
    const response = await Client.faq.create(params);
    console.log("created faq", response);
    return response.data;
  } catch (err) {
    console.error("Can't create faq", err);
    throw err;
  }
};
export const UpdateFaq = async (uuid: string, data: any) => {
  console.log("Update Faq", data);
  try {
    const response = await Client.faq.update(uuid, data);
    console.log("Update faq response", response);
    return response.data;
  } catch (err) {
    console.error("error", err);
    throw err;
  }
};
export const UpdateStatusFaq = async (params: { id: string; is_active: boolean }) => {
  console.log("UpdateStatus called with", params);
  try {
    const response = await Client.faq.statusupdate(params.id, {
      is_active: params.is_active,
    });
    console.log("UpdateStatus response", response);
    return response.data;
  } catch (err) {
    console.error("UpdateStatus error", err);
    throw err;
  }
};
export const deleteFaq = async (uuid: any) => {
  try {
    const response = await Client.faq.delete(uuid);
    console.log("Deleted FAQ:", response);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete faq");
  }
};
