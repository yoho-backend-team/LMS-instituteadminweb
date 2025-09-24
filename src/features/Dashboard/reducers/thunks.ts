/* eslint-disable @typescript-eslint/no-explicit-any */
import { getActivity, getDashboard } from '../services';
import { getActivityData, getDashboardData } from './DashboardSlice';

export const getDashboardthunks = (params: any) => async (dispatch: any) => {
	try {
		const response = await getDashboard(params);
		dispatch(getDashboardData(response));
		return response
	} catch (error) {
		console.log(error);
	}
};

export const getActivitythunks = (params: any) => async (dispatch: any) => {
	try {
		const response = await getActivity(params);
		dispatch(getActivityData(response.data));
		return response
	} catch (error) {
		console.log(error);
	}
};
