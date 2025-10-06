/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../apis/index';

export const getStaffData = async (query: any) => {
	const response = await Client.staff.get(query);
	if (response) return response;
};

export const getStaffDataId = async (params: any) => {
	const response = await Client.staff.getWithId(params);
	if (response) return response;
};

export const getDataClasses = async (params: any) => {
	const response = await Client.staff.getclasses(params);
	if (response) return response;
};

export const getDataActivity = async (params: any) => {
	const response = await Client.staff.getactivity(params);
	if (response) return response;
};

export const createStaff = async (data: any) => {
	const response = await Client.staff.create(data);
	if (response) return response;
};

export const updateStaff = async (params: any, data: any) => {
	const response = await Client.staff.update(params, data);
	if (response) return response;
};

export const deleteStaff = async (query: any) => {
	const response = await Client.staff.delete(query);
	if (response) return response;
};

export const uploadFile = async (data: any) => {
	const response = await Client.file.upload(data);
	if (response) return response;
};

export const getBranchData = async (data: any) => {
	const response = await Client.staff.getWithBranch(data);
	if (response) return response;
};


export const getWihtIdclass = async (data: any) => {
	try {
		const response = await Client.online_class.getWithId(data);
		if (response)
			return response;
	}
	catch (err) {
		console.log(err, 'error for class details');
	}
}