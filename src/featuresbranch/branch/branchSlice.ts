// src/features/branch/branchSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HttpClient } from '../../utils/api';
import { HTTP_END_POINTS } from '../../constants/http-endpoints';

// Define Branch interface
export interface Branch {
  id: string;
  cityName: string;
  address: string;
  status: 'Active' | 'Inactive';
  imageSrc?: string;
  phoneNumber: string;
  alternateNumber?: string;
  pinCode: string;
  landMark?: string;
  city: string;
  state: string;
  // Add other fields as needed
}

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

// Fetch all branches with debugging
export const fetchBranches = createAsyncThunk<
  Branch[], // Return type
  string, // Parameters type (query params)
  { rejectValue: string }
>(
  'branch/fetchBranches',
  async (params = '', { rejectWithValue }) => {
    try {
      console.log('[Redux] Fetching branches with params:', params);
      const response = await HttpClient.get(`${HTTP_END_POINTS.branch.getAll}${params}`);
      console.log('[Redux] API Response:', response.data);
      
      // Validate response structure if needed
      if (!Array.isArray(response.data)) {
        console.error('[Redux] Unexpected API response structure');
        throw new Error('Invalid branches data format');
      }
      
      return response.data as Branch[];
    } catch (error: any) {
      console.error('[Redux] Error fetching branches:', error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch branches'
      );
    }
  }
);

// Create new branch
export const createNewBranch = createAsyncThunk(
  'branch/createNewBranch',
  async (branchData: Omit<Branch, 'id'>, { rejectWithValue }) => {
    try {
      console.log('[Redux] Creating new branch:', branchData);
      const response = await HttpClient.post(HTTP_END_POINTS.branch.create, branchData);
      return response.data as Branch;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to create branch'
      );
    }
  }
);

// Update branch status
export const updateBranchStatus = createAsyncThunk(
  'branch/updateStatus',
  async ({ id, status }: { id: string; status: 'Active' | 'Inactive' }, { rejectWithValue }) => {
    try {
      console.log(`[Redux] Updating branch ${id} status to ${status}`);
      await HttpClient.patch(`${HTTP_END_POINTS.branch.updateStatus}/${id}`, { status });
      return { id, status };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to update branch status'
      );
    }
  }
);

// Delete branch
export const deleteBranch = createAsyncThunk(
  'branch/deleteBranch',
  async (id: string, { rejectWithValue }) => {
    try {
      console.log(`[Redux] Deleting branch ${id}`);
      await HttpClient.delete(`${HTTP_END_POINTS.branch.delete}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to delete branch'
      );
    }
  }
);

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    // Synchronous actions
    clearBranches: (state) => {
      state.branches = [];
      console.log('[Redux] Branches cleared');
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Branches
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('[Redux] Fetch branches started');
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
        console.log('[Redux] Fetch branches succeeded', action.payload.length);
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error('[Redux] Fetch branches failed', action.payload);
      })
      
      // Create Branch
      .addCase(createNewBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches.push(action.payload);
        console.log('[Redux] Branch created', action.payload.id);
      })
      .addCase(createNewBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Status
      .addCase(updateBranchStatus.fulfilled, (state, action) => {
        const branch = state.branches.find(b => b.id === action.payload.id);
        if (branch) {
          branch.status = action.payload.status;
          console.log(`[Redux] Branch ${action.payload.id} status updated to ${action.payload.status}`);
        }
      })
      
      // Delete Branch
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.branches = state.branches.filter(branch => branch.id !== action.payload);
        console.log(`[Redux] Branch ${action.payload} deleted`);
      });
  },
});

export const { clearBranches, setError } = branchSlice.actions;

// Selectors
export const selectAllBranches = (state: { branch: BranchState }) => state.branch.branches;
export const selectBranchLoading = (state: { branch: BranchState }) => state.branch.loading;
export const selectBranchError = (state: { branch: BranchState }) => state.branch.error;

export default branchSlice.reducer;