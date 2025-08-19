import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  uuid: string;
  name: string;
  description?: string;
  // Add any other fields if your category model has more
}

interface CategoryState {
  data: Category[];
}

const initialState: CategoryState = {
  data: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.data = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.data.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const updated = action.payload;
      const index = state.data.findIndex((item) => item.uuid === updated.uuid);
      if (index !== -1) {
        state.data[index] = updated;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
  },
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
