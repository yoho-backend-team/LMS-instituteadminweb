import {
	getBranchData,
	getDataActivity,
	getDataClasses,
	getStaffData,
	getStaffDataId,
} from '../services';
import {
	getActivity,
	getBranch,
	getClass,
	getStaffDetails,
	getStaffDetailsId,
	setLoading,
} from './slices';

export const getStaffDetailsData = (query: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await getStaffData(query);
		dispatch(getStaffDetails(response));
		dispatch(setLoading(false));
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(setLoading(false));
	}
};

export const getStaffDetailsDataId = (params: any) => async (dispatch: any) => {
	try {
		const response = await getStaffDataId(params);
		dispatch(getStaffDetailsId(response));
	} catch (error) {
		console.log(error);
	}
};

export const getClassesData = (params: any) => async (dispatch: any) => {
	try {
		const response = await getDataClasses(params);
		dispatch(getClass(response));
	} catch (error) {
		console.log(error);
	}
};

export const getActivityData = (params: any) => async (dispatch: any) => {
	try {
		const response = await getDataActivity(params);
		dispatch(getActivity(response));
	} catch (error) {
		console.log(error);
	}
};

export const getBranchDetailsData = (data: any) => async (dispatch: any) => {
	try {
		const response = await getBranchData(data);
		dispatch(getBranch(response));
	} catch (error) {
		console.log(error);
	}
};
