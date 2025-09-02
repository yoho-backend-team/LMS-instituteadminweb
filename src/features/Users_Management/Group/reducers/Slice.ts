import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Group {
	id: number;
	name: string;
	// Add other properties if needed
}

// Define the slice state type
interface GroupCardState {
	groupdata: Group[];
	viewdata: Group[];
	deletedata: Group[];
	loading: boolean;
}

// Explicitly type initialState
const initialState: GroupCardState = {
	groupdata: [],
	viewdata: [],
	deletedata: [],
	loading: false,
};

const GroupCardSlice = createSlice({
	name: 'GroupCardSlice',
	initialState,
	reducers: {
		getGroupcard: (state, action: PayloadAction<Group[]>) => {
			state.groupdata = action.payload;
		},
		getViewcard: (state, action: PayloadAction<Group[]>) => {
			state.viewdata = action.payload;
		},
		deleteGroup: (state, action: PayloadAction<number>) => {
			state.deletedata = state.deletedata.filter(
				(item) => item.id !== action.payload
			);
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { getGroupcard, getViewcard, deleteGroup, setLoading } =
	GroupCardSlice.actions;
export default GroupCardSlice.reducer;
