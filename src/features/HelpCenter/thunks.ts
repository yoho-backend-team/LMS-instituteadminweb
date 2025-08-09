import { getFaqQuestionsAll } from "./service";
import { setFaqItems } from "./slice";

export const fetchHelpCenterThunk = (params: any) => async (dispatch: any) => {
  try {
   
    const response = await getFaqQuestionsAll(params);
    console.log("Thunk", response)
    dispatch(setFaqItems(response)); 
  } catch (error: any) {
   
    console.error("Failed to fetch Help Center data:", error);
  } finally {
   
  }
};