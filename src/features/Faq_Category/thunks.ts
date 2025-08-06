import { getFaqCategories } from "./service";
import { getFaqCategory } from "./slice";

export const fetchFaqCategoryThunk = (params: any) => async (dispatch: any) => {
  try {
    console.log("Params:", params); // Add this to debug
    const response = await getFaqCategories(params);
    dispatch(getFaqCategory(response.data));
  } catch (error) {
    console.error("Failed to fetch FAQ categories:", error);
  }
};
