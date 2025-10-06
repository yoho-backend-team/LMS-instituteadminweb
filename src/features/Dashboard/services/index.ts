/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../apis/index';

export const getDashboard = async (params: any) => {
	const response = await Client.reports.get(params);
	// const res = await Client.branch.getByid(params.branchid);
	// console.log(res, "branch details")
	if (response) {
		return response;
	}
};

export const getActivity = async (params: any) => {
	const response = await Client.activity.get(params);
	if (response) {
		return response;
	}
};
