import { createSlice } from '@reduxjs/toolkit';

const liveClassSlice = createSlice({
	name: 'liveClassSlice',
	initialState: {
		liveClass: [],
	},
	reducers: {
		getLiveClass: (state, actions) => {
			state.liveClass = actions.payload;
		},
	},
});

export const { getLiveClass } = liveClassSlice.actions;
export default liveClassSlice.reducer;
