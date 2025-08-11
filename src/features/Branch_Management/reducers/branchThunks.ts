// src/features/BranchManagement/reducers/branchThunks.ts
import {
  CreateBranch,
  DeleteBranch,
  EditBranch,
  GetAllBranches,
  ToggleBranchStatus,
} from "../services/index";
import {
  addBranch,
  deleteBranch,
  editBranch,
  getBranches,
  updateBranchStatus,
} from "./branchSlice";

interface BranchParams {
  institute_id: string;
  page?: number;
}

interface StatusUpdateParams {
  branch_id: string;
  status: "active" | "inactive";
  uuid: string;
}

export const GetAllBranchesThunk =
  (params: BranchParams) => async (dispatch: any) => {
    try {
      const response = await GetAllBranches(params);
      console.log("branchall.....", response.data);
      dispatch(getBranches(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching branches:", error);
      throw error;
    }
  };

export const DeleteBranchThunk =
  (branchUuid: string) => async (dispatch: any) => {
    try {
      await DeleteBranch(branchUuid );
      dispatch(deleteBranch(branchUuid)); 
    } catch (error) {
      console.error("Error deleting branch:", error);
      throw error;
    }
  };

export const EditBranchThunk =
  (params: string, data: any) => async (dispatch: any) => {
    try {
      const res = await EditBranch(params, data);
      console.log("Edit API response", res);
      // if (!res?.data) {
      //   await dispatch(GetAllBranchesThunk({ institute_id: params.data.institute_id }));
      //   return;
      // }

      dispatch(editBranch(res.data));
      return res.data;
    } catch (error) {
      console.error("Error editing branch:", error);
      throw error;
    }
  };

export const UpdateBranchStatusThunk =
  (data: StatusUpdateParams) => async (dispatch: any) => {
    try {
      await ToggleBranchStatus(data);
      dispatch(
        updateBranchStatus({
          branch_id: data.branch_id,
          status: data.status,
        })
      );
    } catch (error) {
      console.error("Error toggling branch status:", error);
      throw error;
    }
  };

export const AddBranchThunk = (data: any) => async (dispatch: any) => {
  try {
    const result = await CreateBranch(data);
    console.log("Create branch ", data);
    dispatch(addBranch(result));
    return result;
  } catch (error) {
    console.error("Error adding branch:", error);
    throw error;
  }
};
