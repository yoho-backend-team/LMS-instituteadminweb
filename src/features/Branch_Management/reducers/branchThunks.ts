// src/features/Branch_Management/reducers/branchThunks.ts
import {
  fetchBranches,
  addBranch,
  // editBranch,
  deleteBranch,
} from "../services/index";

import { allbranchSlice } from "./branchSlice"; // Make sure you have this action

// GET ALL BRANCHES
export const fetchBranch = (params: any) => async (dispatch: any) => {
  try {
    const response = await fetchBranches(params);
    if (response) {
      dispatch(allbranchSlice(response.data));
      return { payload: response.data };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// CREATE BRANCH
export const createBranch = (params: any) => async () => {
  try {
    const response = await addBranch(params);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// UPDATE BRANCH
export const updateBranch = (params: { id: string; data: any }) => async () => {
  try {
    const response = await editBranch(params);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// DELETE BRANCH
export const deleteBranchAction = (id: string) => async () => {
  try {
    const response = await deleteBranch(id);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
