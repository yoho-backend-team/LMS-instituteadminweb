// Define the shape of your branches state
interface BranchesState {
	data: any[]; // Replace 'any' with your Branch type if available
	loading: boolean;
	error: string | null;
}

// Selector to get all branches data
export const selectBranches = (state: any): BranchesState['data'] =>
	state.branches.data;

// Selector to get loading status
export const selectBranchesLoading = (state: any): BranchesState['loading'] =>
	state.branches.loading;

// Selector to get error message
export const selectBranchesError = (state: any): BranchesState['error'] =>
	state.branches.error;

export const selectLoading = (state: any) => state.branches.loading;

// Combined selector that matches your original GetBranches
export const GetBranches = selectBranches;

// Memoized selector example using createSelector
// import { createSelector } from '@reduxjs/toolkit';
// export const selectActiveBranches = createSelector(
//   [selectBranches],
//   (branches) => branches.filter(branch => branch.status === 'active')
// );
