/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetAllCategories } from "../service";
import { setCategories } from "./slice";

export const getAllCategoriesThunk = (params: any) => async (dispatch: any) => {
  try {
    const response = await GetAllCategories(params); // API call
    dispatch(setCategories(response.data ?? response)); // Dispatch to reducer
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};
