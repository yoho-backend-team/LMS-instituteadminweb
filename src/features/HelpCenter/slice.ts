import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FAQItem {
  id: string;
  category: string;
  videoLink: string;
  status: string;
  description: string;
}


interface FAQState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FAQState = {
  data: [],
  loading: false,
  error: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setFaqItems: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    addFaqItem: (state, action: PayloadAction<FAQItem>) => {
      state.data.push(action.payload);
    },
    updateFaqItem: (state, action: PayloadAction<FAQItem>) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setFaqItems, 
  addFaqItem, 
  updateFaqItem, 
 
  setLoading,
  setError
} = faqSlice.actions;

export default faqSlice.reducer;