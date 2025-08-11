// src/features/BranchManagement/reducers/selectors.ts
import { RootState } from "../../store";

// Define the shape of your branches state
interface BranchesState {
  data: any[]; // Replace 'any' with your Branch type if available
  loading: boolean;
  error: string | null;
}

// Selector to get all branches data
export const selectBranches = (state: RootState): BranchesState['data'] => 
  state.branches.data;

// Selector to get loading status
export const selectBranchesLoading = (state: RootState): BranchesState['loading'] => 
  state.branches.loading;

// Selector to get error message
export const selectBranchesError = (state: RootState): BranchesState['error'] => 
  state.branches.error;

// Combined selector that matches your original GetBranches
export const GetBranches = selectBranches;

// Memoized selector example using createSelector
// import { createSelector } from '@reduxjs/toolkit';
// export const selectActiveBranches = createSelector(
//   [selectBranches],
//   (branches) => branches.filter(branch => branch.status === 'active')
// );