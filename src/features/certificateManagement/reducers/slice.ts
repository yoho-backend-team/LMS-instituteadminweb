import { createSlice } from '@reduxjs/toolkit';

const CertificateSlice = createSlice({
	name: 'CertificateSlice',
	initialState: {
		data: [],
		loading: false,
	},
	reducers: {
		setCertificateClass: (state, action) => {
			state.data = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { setCertificateClass, setLoading } = CertificateSlice.actions;
export default CertificateSlice.reducer;
