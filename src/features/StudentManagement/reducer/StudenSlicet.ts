import { createSlice } from '@reduxjs/toolkit';

const   StudentSlice = createSlice({
	name: 'StudentSlice',
	initialState: {
		data: [],
		data2:[]
        
	},
	reducers: {
		getstudentdetails: (state, action) => {
			state.data = action.payload;

		},
		getcoursedetails: (state, action) => {
			state.data2 = action.payload;

		},
		
		
		
	},
	
});
export const { getstudentdetails,getcoursedetails } = StudentSlice.actions;


export default StudentSlice.reducer;
