/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../apis/index";

// Type definitions

interface GetAllBranchesParams {
  institute_id: string;
  page?: number;
}

interface GetBranchByIdParams {
  id: string;
  uuid?: string;
}

interface CreateBranchParams {
  branch_name: string;
  phone_number: string;
  alternate_number?: string;
  address: string;
  pincode: string;
  landmark?: string;
  city: string;
  state: string;
  status?: 'active' | 'inactive';
  institute_id: string;
}

interface UpdateBranchParams {
  id: string;
  uuid: string;
  data: Partial<CreateBranchParams>;
}

interface UpdateStatusParams {
  branch_id: string;
  status: 'active' | 'inactive';
  uuid: string;
}

interface DeleteBranchParams {
  id: string;
  uuid: string;
}

// Get all branches
export const GetAllBranches = async (params: GetAllBranchesParams) => {
  const response = await Client.branch.getAll(params);
  if (response) {
    return response;
  }
};

// Get branch by ID
export const GetBranchById = async (params: GetBranchByIdParams) => {
  const response = await Client.branch.getByid(params);
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
export const EditBranch = async (data: UpdateBranchParams) => {
  const response = await Client.branch.update(data);
  return response.data;
};

// Update branch status
export const ToggleBranchStatus = async (data: UpdateStatusParams) => {
  const response = await Client.branch.update_status(data);
  return response.data;
};

// Delete branch
export const DeleteBranch = async (params: DeleteBranchParams) => {
  const response = await Client.branch.delete(params);
  return response.data;
};