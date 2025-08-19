/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../apis/index.ts";

export const GetAllFaqs = async (params: any) => {

  const response = await Client.faq.getAll(params);
  if (response) {
    return response;
  }
}
export const CreateFaq = async (params: any) => {
  try {
    const response = await Client.faq.create(params);
    return response.data;
  } catch (err) {
    console.error("Can't create faq", err);
    throw err;
  }
};
export const UpdateFaq = async (uuid: string, data: any) => {
  try {
    const response = await Client.faq.update(uuid, data);
    return response.data;
  } catch (err) {
    console.error("error", err);
    throw err;
  }
};
export const UpdateStatusFaq = async (params: { id: string; is_active: boolean }) => {
  try {
    const response = await Client.faq.statusupdate(params.id, {
      is_active: params.is_active,
    });
    return response.data;
  } catch (err) {
    console.error("UpdateStatus error", err);
    throw err;
  }
};
export const deleteFaq = async (uuid: any) => {
  try {
    const response = await Client.faq.delete(uuid);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete faq");
  }
};
