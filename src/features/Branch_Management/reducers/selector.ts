// src/features/BranchManagement/reducers/selectors.ts

import type { RootState } from "../../../store/store";

// Selector to get all branches array
export const selectBranches = (state: RootState) => state.branches.branches;

// Selector to get loading status
export const selectBranchesLoading = (state: RootState) => state.branches.loading;

// Selector to get error message
export const selectBranchesError = (state: RootState) => state.branches.error;

// Optional: same as selectBranches for compatibility with old code
export const GetBranches = selectBranches;

// Example of a memoized selector for only active branches
// import { createSelector } from '@reduxjs/toolkit';
// export const selectActiveBranches = createSelector(
//   [selectBranches],
//   (branches) => branches.filter(branch => branch.status?.toLowerCase() === 'active')
// );
