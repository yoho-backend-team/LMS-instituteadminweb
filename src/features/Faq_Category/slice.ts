import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface FaqCategory {
  uuid: string;
  name: string;
  description?: string;
}

interface FaqCategoryState {
  data: FaqCategory[];
}

const initialState: FaqCategoryState = {
  data: [],
};


const FaqCategorySlice = createSlice({
  name: "faqCategory",
  initialState,
  reducers: {
   getFaqCategory: (state, action: PayloadAction<any[]>) => {
  state.data = action.payload;
},
    addFaqCategory: (state, action: PayloadAction<FaqCategory>) => {
      state.data.push(action.payload);
    },
    updateFaqCategory: (state, action: PayloadAction<FaqCategory>) => {
      const updated = action.payload;
      const index = state.data.findIndex((item) => item.uuid === updated.uuid);
      if (index !== -1) {
        state.data[index] = updated;
      }
    },
    deleteFaqCategory: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
  },
});

export const {
  getFaqCategory,
  addFaqCategory,
  updateFaqCategory,
  deleteFaqCategory,
} = FaqCategorySlice.actions;

export default FaqCategorySlice.reducer;
