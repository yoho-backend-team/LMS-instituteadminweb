import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface Faqs {
	id: string;
}
interface FaqsState {
	faqsdata: Faqs[];
	loading: boolean;
}
const initialState: FaqsState = {
	faqsdata: [],
	loading: false,
};

const FaqsSlice = createSlice({
	name: 'FaqsSlice',
	initialState,
	reducers: {
		getFaqs: (state, action: PayloadAction<Faqs[]>) => {
			state.faqsdata = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});
export const { getFaqs, setLoading } = FaqsSlice.actions;
export default FaqsSlice.reducer;
