import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface Faqs {
  id: string;
}
interface FaqsState {
  faqsdata: Faqs[];
}
const initialState: FaqsState = {
  faqsdata: [],
  
};

const FaqsSlice = createSlice({
  name: "FaqsSlice",
  initialState,
  reducers: {
    getFaqs: (state, action: PayloadAction<Faqs[]>) => {
      state.faqsdata = action.payload;
    },
    
  },
});
export const { getFaqs} = FaqsSlice.actions;
export default FaqsSlice.reducer;
