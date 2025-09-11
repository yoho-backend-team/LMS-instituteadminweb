/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppDispatch } from '../../../store/store';
import { GetLocalStorage, StoreLocalStorage } from '../../../utils/localStorage';
import { getAllBranches } from '../../Class Management/Live Class/services';
import { GetProfileDetail, UserProfileUpdate } from '../service';
import { setAllBranch, setAuthData, setUpdateData, setUSerDetails } from './slice';

export const AuthThunks = (data: any) => async (dispatch: any) => {
	try {
		dispatch(setAuthData(data));
	} catch (error) {
		console.log(error);
	}
};

export const GetProfileThunk = () => async (dispatch: any) => {
	try {
		const response = await GetProfileDetail();
		dispatch(setUSerDetails(response));
		return response.institute_id;
	} catch (error) {
		console.log(error);
	}
};

export const GetBranchThunks = () => async (dispatch: any) => {
	try {
		const response = await getAllBranches();
		const branch = GetLocalStorage("selectedBranchId")
		if (!branch) {
			StoreLocalStorage('selectedBranchId', response?.data?.[0]?.uuid);
		}
		dispatch(setAllBranch(response?.data));
	} catch (error) {
		console.log(error);
	}
};

export const UpdateProfileThunks = (params: string, data: any) => async (dispatch: AppDispatch) => {
	try {
		await UserProfileUpdate(params, data)
		dispatch(setUpdateData(data))
	} catch (error) {
		console.log(error)
	}
}