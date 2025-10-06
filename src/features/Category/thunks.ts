import { getCategory } from "./service";
import { setCategories } from "./slice";


export const GetAllCategoryThunk = () => async (dispatch: any) => {
  try {
    const data = await getCategory();
    
    dispatch( setCategories(data)); 
  } catch (error: any) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
};