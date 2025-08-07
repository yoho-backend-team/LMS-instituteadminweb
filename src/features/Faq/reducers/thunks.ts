import { GetAllFaqs } from "../service";
import { getFaqs } from "./slice";

// ✅ Use a clear, meaningful name for the thunk
export const getAllFaqsThunk = (params: any) => async (dispatch: any) => {
  try {
    const response = await GetAllFaqs(params); // Service/API call
    dispatch(getFaqs(response.data ?? response)); // Dispatch to store
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
  }
};
