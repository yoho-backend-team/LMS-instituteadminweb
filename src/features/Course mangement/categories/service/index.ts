import Client from "../../../../apis/index.ts";

export const GetAllCategories = async (params: { branch_id: string; page: number }) => {
  try {
    const response = await Client.category.get({ params });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const CreateCategories = async (params:any) => {
  console.log("Created categories payload:", params);
  try {
    const response = await Client.category.create(params);
    console.log("created categories", response);
    return response.data;
  } catch (err) {
    console.error("Can't create categories", err);
    throw err;
  }
};
export const UpdateCategories = async (params:any) => {
  console.log("update categories payload:", params);
  try {
    const response = await Client.category.update(params);
    console.log("update categories", response);
    return response.data;
  } catch (err) {
    console.error("Can't update categories", err);
    throw err;
  }
};
export const UpdateCategoriesStatus = async (params:any) => {
  console.log("update status payload:", params);
  try {
    const response = await Client.category.update(params);
    console.log("update status categories", response);
    return response.data;
  } catch (err) {
    console.error("Can't update status categories", err);
    throw err;
  }
};
export const deleteCategories = async (instituteId:string ,uuid: string) => {
  try {
    const response = await Client.category.delete({instituteId, uuid});
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete category");
  }
}

