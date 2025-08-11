/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../apis/index";

// Type definitions
interface GetAllBranchesParams {
  institute_id: string;
  page?: number;
}

interface GetBranchByIdParams {
  uuid: string;
}
interface CreateBranchParams {
  branch_identity: string;
  phone_number: string;
  alternate_number?: string;
  address: string;
  pincode: string;
  landmark?: string;
  city: string;
  state: string;
  status?: "active" | "inactive";
  institute_id?: string;
}

interface UpdateBranchParams {
  uuid: string;
  data: Partial<CreateBranchParams>;
}

interface UpdateStatusParams {
  uuid: string;
  status: "active" | "inactive";
}

// Get all branches
export const GetAllBranches = async (params: GetAllBranchesParams) => {
  const response = await Client.branch.getAll(params.institute_id);
  return response;
};

// Get branch by ID
export const GetBranchById = async (params: GetBranchByIdParams) => {
  const response = await Client.branch.getByid(params.uuid);
  return response.data;
};

// Create new branch
export const CreateBranch = async (data: CreateBranchParams) => {
  try {
    const response = await Client.branch.create(data);
    return response.data;
  } catch (error) {
    console.error("Error creating branch:", error);
    throw error;
  }
};

// Update branch
export const EditBranch = async (params: string, data: UpdateBranchParams) => {
  const response = await Client.branch.edit(params, data);
  console.log("update data service:", response);
  return response.data;
};

// Update branch status
export const ToggleBranchStatus = async (params: UpdateStatusParams) => {
  const response = await Client.branch.updatestatus(params.uuid, {
    status: params.status,
  });
  return response.data;
};

// Delete branch service
export const DeleteBranch = async ( uuid: string ) => {
  const response = await Client.branch.delete({uuid});
  return response.data;
};
