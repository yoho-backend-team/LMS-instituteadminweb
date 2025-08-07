import { getFaqCategories } from "./service";
import { getFaqCategory } from "./slice";

export const fetchFaqCategoryThunk = (params: any) => async (dispatch: any) => {
  try {
    const response = await getFaqCategories(params);
    dispatch(getFaqCategory(response));
  } catch (error) {
    console.error("Failed to fetch FAQ categories:", error);
  }
};
