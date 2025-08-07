// src/features/branch/branchSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Branch } from '../../components/BranchManagement/types';
import { fetchBranches, createBranch } from './branchThunks';

interface BranchState {
  branches: Branch[];
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  branches: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {},  // You can add normal reducers here if needed
  extraReducers: (builder) => {
    builder
      // Fetch Branches
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Branch
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches.push(action.payload);
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default branchSlice.reducer;
