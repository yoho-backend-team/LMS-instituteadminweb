// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { HttpClient } from '../../utils/api';
// import { HTTP_END_POINTS } from '../../constants/http-endpoints';

// // Branch Interface
// export interface Branch {
//   id: string;
//   cityName: string;
//   address: string;
//   status: 'Active' | 'Inactive';
//   imageSrc?: string;
//   phoneNumber: string;
//   alternateNumber?: string;
//   pinCode: string;
//   landMark?: string;
//   city: string;
//   state: string;
// }

// interface BranchState {
//   branches: Branch[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: BranchState = {
//   branches: [],
//   loading: false,
//   error: null,
// };

// // Async Thunks
// export const fetchBranches = createAsyncThunk<
//   Branch[],
//   { instituteId: string; params?: string },
//   { rejectValue: string }
// >(
//   'branch/fetchBranches',
//   async ({ instituteId, params = '' }, { rejectWithValue }) => {
//     try {
//       const response = await HttpClient.get(`${HTTP_END_POINTS.branch.getAll(instituteId)}${params}`);
//       if (!Array.isArray(response.data)) throw new Error('Invalid branches data format');
//       return response.data as Branch[];
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch branches');
//     }
//   }
// );

// export const createNewBranch = createAsyncThunk<
//   Branch,
//   { instituteId: string; branchData: Omit<Branch, 'id'> },
//   { rejectValue: string }
// >(
//   'branch/createNewBranch',
//   async ({ instituteId, branchData }, { rejectWithValue }) => {
//     try {
//       const response = await HttpClient.post(HTTP_END_POINTS.branch.create(instituteId), branchData);
//       return response.data as Branch;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message || 'Failed to create branch');
//     }
//   }
// );

// export const updateBranchStatus = createAsyncThunk<
//   { id: string; status: 'Active' | 'Inactive' },
//   { instituteId: string; id: string; status: 'Active' | 'Inactive' },
//   { rejectValue: string }
// >(
//   'branch/updateStatus',
//   async ({ instituteId, id, status }, { rejectWithValue }) => {
//     try {
//       await HttpClient.patch(HTTP_END_POINTS.branch.updateStatus(instituteId, id), { status });
//       return { id, status };
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update branch status');
//     }
//   }
// );

// export const deleteBranch = createAsyncThunk<
//   string,
//   { instituteId: string; id: string },
//   { rejectValue: string }
// >(
//   'branch/deleteBranch',
//   async ({ instituteId, id }, { rejectWithValue }) => {
//     try {
//       await HttpClient.delete(HTTP_END_POINTS.branch.delete(instituteId, id));
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete branch');
//     }
//   }
// );

// // Slice
// const branchSlice = createSlice({
//   name: 'branch',
//   initialState,
//   reducers: {
//     clearBranches: (state) => {
//       state.branches = [];
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBranches.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBranches.fulfilled, (state, action) => {
//         state.loading = false;
//         state.branches = action.payload;
//       })
//       .addCase(fetchBranches.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch branches';
//       })

//       .addCase(createNewBranch.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createNewBranch.fulfilled, (state, action) => {
//         state.loading = false;
//         state.branches.push(action.payload);
//       })
//       .addCase(createNewBranch.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to create branch';
//       })

//       .addCase(updateBranchStatus.fulfilled, (state, action) => {
//         const branch = state.branches.find(b => b.id === action.payload.id);
//         if (branch) branch.status = action.payload.status;
//       })

//       .addCase(deleteBranch.fulfilled, (state, action) => {
//         state.branches = state.branches.filter(b => b.id !== action.payload);
//       });
//   }
// });

// // Export actions
// export const { clearBranches, setError } = branchSlice.actions;

// // Export selectors
// export const selectAllBranches = (state: { branch: BranchState }) => state.branch.branches;
// export const selectBranchLoading = (state: { branch: BranchState }) => state.branch.loading;
// export const selectBranchError = (state: { branch: BranchState }) => state.branch.error;

// // Export reducer
// export default branchSlice.reducer;
