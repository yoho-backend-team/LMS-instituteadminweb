import { AddSalary, DeleteSalary, GetAllSalary, GetBranch, updateSalary } from "../services/index";
import { addSalary, deleteSalary, getBranches, getSalary } from "../reducers/moduleSlice";



export const GetAllSalaryThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await GetAllSalary(params);
    dispatch(getSalary(response.data));
    console.log("Salary data in thunks", response.data);
    return { payload: response.data };
  } catch (error) {
    console.log("Error in GetAllSalaryThunks:", error);
  }
};


export const GetBranchThunks = (params: any) => async (dispatch: any) => {
  try {
    const result = await GetBranch(params);
    dispatch(getBranches(result.data));
    return { payload: result.data };
  } catch (error) {
    console.error("Error in GetBranchThunks", error);
    return { payload: [] };
  }
};




export const AddSalaryThunks = (data: any) => async (dispatch: any) => {
  try {
    const result = await AddSalary(data);
    dispatch(addSalary(result));
    return { payload: result };
  } catch (error) {
    console.error("Error in AddSalaryThunks", error);
    return { payload: null };
  }
};

export const UpdateAllSalaryThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await updateSalary(params);
    dispatch(updateSalary(response.data));
    return { payload: response.data };
  } catch (error) {
    console.log("Error in UpdateAllSalaryThunks:", error);
  }
};

export const DeleteSalaryThunk = (data: any) => async (dispatch: any) => {
  try {
    const response = await DeleteSalary(data);
    dispatch(deleteSalary(response.data));
    console.log("deelete successfully", response)
    return { payload: response.data };
  } catch (error) {
    console.log("Error in UpdateAllSalaryThunks:", error);
  }
};