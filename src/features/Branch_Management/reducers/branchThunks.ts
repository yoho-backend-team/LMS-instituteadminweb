// src/features/branch/branchThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { branchService } from '../../../features/Branch_Management/services/branchService';
import { Branch } from '../../components/BranchManagement/types';

// Fetch All Branches
export const fetchBranches = createAsyncThunk<
  Branch[],                               // Return Type
  { instituteId: string; params?: any },  // Argument Type
  { rejectValue: string }                 // Rejection Type
>(
  'branch/fetchBranches',
  async ({ instituteId, params }, { rejectWithValue }) => {
    try {
      const response = await branchService.getAll(instituteId, params);
      return response.data;  // Branch[]
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch branches');
    }
  }
);

// Create a Branch
export const createBranch = createAsyncThunk<
  Branch,  // Return type
  { instituteId: string; data: any },  // Payload type
  { rejectValue: string }  // Reject type
>(
  'branch/createBranch',
  async ({ instituteId, data }, { rejectWithValue }) => {
    try {
      const response = await branchService.create(`/branches`, {
        institute_id: instituteId,
        ...data
      });
      return response.data;  // Assuming API returns the created branch object
    } catch (error: any) {
      console.error("Create Branch API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to create branch');
    }
  }
);