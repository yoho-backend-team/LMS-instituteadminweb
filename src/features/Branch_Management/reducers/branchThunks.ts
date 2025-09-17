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

export const GetAllBranchesThunk = () => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await GetAllBranches();
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
	(params: { instituteId: any; branchUuid: string }) =>
		async (dispatch: any) => {
			try {
				console.log(params)
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
	(data: any) => async (dispatch: any) => {
		try {
			await ToggleBranchStatus(data);
			dispatch(
				updateBranchStatus({
					id: data.branch_id,
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
		dispatch(addBranch(result?.newBranch));
		return result;
	} catch (error) {
		console.error('Error adding branch:', error);
		throw error;
	}
};
