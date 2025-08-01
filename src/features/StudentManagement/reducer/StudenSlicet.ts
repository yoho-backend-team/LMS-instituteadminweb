import { createSlice } from '@reduxjs/toolkit';

const   StudentSlice = createSlice({
	name: 'StudentSlice',
	initialState: {
		data: [],
        
	},
	reducers: {
		getstudentdetails: (state, action) => {
			state.data = action.payload;

		},
		
		
	},
});
export const { getstudentdetails } = StudentSlice.actions;


export default StudentSlice.reducer;
