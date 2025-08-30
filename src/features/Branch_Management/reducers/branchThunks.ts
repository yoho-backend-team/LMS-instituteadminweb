/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/BranchManagement/reducers/branchThunks.ts
import {
	CreateBranch,
	DeleteBranch,
	EditBranch,
	GetAllBranches,
	ToggleBranchStatus,
} from '../services/index';
import {
	addBranch,
	deleteBranch,
	editBranch,
	getBranches,
	setLoading,
	updateBranchStatus,
} from './branchSlice';

interface BranchParams {
	institute_id: string;
	page?: number;
}

interface DeleteBranchParams {
	id: string;
	uuid: string;
}

interface StatusUpdateParams {
	branch_id: string;
	status: 'active' | 'inactive';
	uuid: string;
}

export const GetAllBranchesThunk = (params: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await GetAllBranches(params);
		dispatch(getBranches(response.data));
		dispatch(setLoading(false));
		return response.data;
	} catch (error) {
		console.error('Error fetching branches:', error);
		throw error;
	} finally {
		dispatch(setLoading(false));
	}
};

export const DeleteBranchThunk =
	(params: { instituteId: string; branchUuid: string }) =>
		async (dispatch: any) => {
			try {
				await DeleteBranch({
					institute_id: params.instituteId,
					uuid: params.branchUuid,
				});
				dispatch(deleteBranch(params.branchUuid));
			} catch (error) {
				console.error('Error deleting branch:', error);
				throw error;
			}
		};

export const EditBranchThunk =
	(params: { branchuuid: string; data: any; }) =>
		async (dispatch: any) => {
			try {
				const updatedData = await EditBranch(params);
				dispatch(editBranch(updatedData));
				return updatedData;
			} catch (error) {
				console.error('Error editing branch:', error);
				throw error;
			}
		};

export const UpdateBranchStatusThunk =
	(data: StatusUpdateParams) => async (dispatch: any) => {
		try {
			await ToggleBranchStatus(data);
			dispatch(
				updateBranchStatus({
					branch_id: data.branch_id,
					status: data.status,
				})
			);
		} catch (error) {
			console.error('Error toggling branch status:', error);
			throw error;
		}
	};

export const AddBranchThunk = (data: any) => async (dispatch: any) => {
	try {
		const result = await CreateBranch(data);
		dispatch(addBranch(result));
		return result;
	} catch (error) {
		console.error('Error adding branch:', error);
		throw error;
	}
};
