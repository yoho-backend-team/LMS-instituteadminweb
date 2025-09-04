// store/slices/timelineSlice.ts

import { createSlice } from '@reduxjs/toolkit';

const communitySlice = createSlice({
	name: 'communitySlice',
	initialState: {
		data: [],
		community: [],
		loading: false,
	},
	reducers: {
		getcommunity: (state, action) => {
			state.data = action.payload;
		},
		getMessage: (state, action) => {
			state.community = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { getcommunity, getMessage, setLoading } = communitySlice.actions;
export default communitySlice.reducer;
