import { createSlice } from '@reduxjs/toolkit';

const allNotificationSlice = createSlice({
	name: 'allNotificationSlice',
	initialState: {
		allNotification: [],
		loading: false,
	},
	reducers: {
		allNotification: (state, actions) => {
			state.allNotification = actions.payload;
		},
		setLoading: (state, actions) => {
			state.loading = actions.payload;
		},
	},
});

export const { allNotification, setLoading } = allNotificationSlice.actions;
export default allNotificationSlice.reducer;
