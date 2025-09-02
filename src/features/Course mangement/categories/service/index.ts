/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../../apis/index.ts";

export const GetAllCategories = async (params: { branch_id: string; page: number }) => {
  try {
    const response = await Client.category.get(params);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const CreateCategories = async (params: any) => {
  try {
    const response = await Client.category.create(params);
    return response.data;
  } catch (err) {
    console.error("Can't create categories", err);
    throw err;
  }
};
export const UpdateCategories = async (params: any) => {
  try {
    const response = await Client.category.update(params);
    return response.data;
  } catch (err) {
    console.error("Can't update categories", err);
    throw err;
  }
};
export const UpdateCategoriesStatus = async (params: any) => {
  try {
    const response = await Client.category.update(params);
    return response.data;
  } catch (err) {
    console.error("Can't update status categories", err);
    throw err;
  }
};
export const deleteCategories = async (instituteId: any, uuid: string) => {
  try {
    const response = await Client.category.delete({ instituteId, uuid });
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete category");
  }
}

