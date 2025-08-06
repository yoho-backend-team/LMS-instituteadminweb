import { AddSalary, GetAllSalary, GetBranch } from "../services/index"; // update the import path as needed
import { addSalary, getBranches, getSalary } from "../reducers/moduleSlice"; // update with your slice path



export const GetAllSalaryThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await GetAllSalary(params);
    dispatch(getSalary(response.data));
    console.log("Salary data in thunks", response.data);
    return { payload: response.data }; // ✅ Return payload
  } catch (error) {
    console.log("Error in GetAllSalaryThunks:", error);
  }
};


export const GetBranchThunks = (params: any) => async (dispatch: any) => {
  try {
    const result = await GetBranch(params); // API call
    dispatch(getBranches(result.data)); // Update the reducer
    return { payload: result.data }; // ✅ Ensure payload is returned
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

