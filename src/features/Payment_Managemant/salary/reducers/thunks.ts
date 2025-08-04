import { GetAllSalary } from "../services/index"; // update the import path as needed
import { getSalary } from "../reducers/moduleSlice"; // update with your slice path



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
