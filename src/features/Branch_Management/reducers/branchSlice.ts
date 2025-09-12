import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Branch {
	id?: string;
	_id?: string;
	cityName?: string;
	branch_identity?: string;
	contact_info?: {
		address?: string;
		phone_no?: string;
	};
	status?: string;
	is_active?: boolean;
}

interface BranchState {
	searchTerm: any;
	branches: Branch[];
	loading: boolean;
	error: string | null;
}

const initialState: BranchState = {
	branches: [],
	loading: false,
	error: null,
	searchTerm: undefined,
};

const branchSlice = createSlice({
	name: 'branch',
	initialState,
	reducers: {
		getBranches: (state, action: PayloadAction<Branch[]>) => {
			state.branches = action.payload || [];
		},
		addBranch: (state, action: PayloadAction<Branch | Branch[]>) => {
			const newBranches = Array.isArray(action.payload)
				? action.payload
				: [action.payload];
			state.branches = [...state.branches, ...newBranches];
		},
		deleteBranch: (state, action: PayloadAction<string>) => {
			const idToDelete = action.payload;
			state.branches = state.branches.filter(
				(branch) => branch._id === idToDelete
			);
		},

		editBranch: (state, action: PayloadAction<Branch>) => {
			const updatedBranch = action.payload;
			const index = state.branches.findIndex(
				(branch) =>
					branch.id === updatedBranch.id || branch._id === updatedBranch._id
			);
			if (index !== -1) {
				state.branches[index] = updatedBranch;
			}
		},

		updateBranchStatus: (
			state,
			action: PayloadAction<{ id: string; status: string }>
		) => {
			const { id, status } = action.payload;
			const index = state.branches.findIndex(
				(branch) => branch.id === id || branch._id === id
			);
			if (index !== -1) {
				state.branches[index] = {
					...state.branches[index],
					status,
					is_active: status.toLowerCase() === 'active',
				};
			}
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const {
	getBranches,
	addBranch,
	deleteBranch,
	editBranch,
	updateBranchStatus,
	setLoading,
	setError,
} = branchSlice.actions;

export default branchSlice.reducer;
