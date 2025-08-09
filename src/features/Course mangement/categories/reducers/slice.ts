// reducers/slice.ts
import { createSlice } from "@reduxjs/toolkit";

interface Category {
  id: string;
  name: string;
}

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const CategoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = CategoriesSlice.actions;

// ✅ Correct selector
export const selectCategories = (state: any) => state.categoriesSlice.categories;

export default CategoriesSlice.reducer;
