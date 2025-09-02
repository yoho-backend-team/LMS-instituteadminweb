import { createSlice } from '@reduxjs/toolkit';

const StaffNotificationSlice = createSlice({
	name: 'staffNotificationSlice',
	initialState: {
		staffNotification: [],
		loading: false,
	},
	reducers: {
		selectStaffNotification: (state, actions) => {
			state.staffNotification = actions.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { selectStaffNotification, setLoading } =
	StaffNotificationSlice.actions;
export default StaffNotificationSlice.reducer;
