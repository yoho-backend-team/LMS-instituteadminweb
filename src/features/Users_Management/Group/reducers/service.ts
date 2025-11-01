import Client from '../../../../apis/index.ts';

export const GetAllGroupCard = async (params: any) => {
	const response = await Client.group.getAll(params);

	if (response) {
		return response;
	}
};
export const UpdateStatusCard = async (params: any) => {
	try {
		const response = await Client.group.updateStatus(params);

		return response.data;
	} catch (err) {
		console.error('UpdateStatusCard error', err);
		throw err;
	}
};

export const CreateGroup = async (params: any) => {
	try {
		const response = await Client.group.create(params);

		return response.data;
	} catch (err) {
		console.error("Can't create group", err);
		throw err;
	}
};
export const GetViewCard = async (data: any) => {
	const response = await Client.group.permissionWithRole(data);

	if (response) {
		return response;
	}
};
export const deleteGroup = async (uuid: any) => {
	try {
		const response = await Client.group.delete(uuid);

		return response;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to delete group');
	}
};
export const UpdateGroup = async (params: any) => {
	try {
		const response = await Client.group.permissionWithRoleEdit(params);

		return response.data;
	} catch (err) {
		console.error('UpdateGroup error', err);
		throw err;
	}
};
