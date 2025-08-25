import { createSlice } from '@reduxjs/toolkit';

const liveClassSlice = createSlice({
	name: 'liveClassSlice',
	initialState: {
		liveClass: [],
		loading:false,
	},
	reducers: {
		getLiveClass: (state, actions) => {
			state.liveClass = actions.payload;
		},
		setLoading:(state,actions) => {
			state.loading = actions.payload;
		}
		
	},
});

export const { getLiveClass,setLoading } = liveClassSlice.actions;
export default liveClassSlice.reducer;
