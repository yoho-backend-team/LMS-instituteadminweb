/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../apis/index';

export const getStudyMaterialsAll = async (params: any) => {
	try {
		const response = await Client.study_material.getAll(params);

		return response;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const updateStudyMaterial = async (data: {
	uuid: string;
	[key: string]: any;
}) => {
	try {
		const response = await Client.study_material.update(data, data?.uuid);

		return response?.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || 'Failed to update study material'
		);
	}
};

export const getBranch = async (params: any) => {
	try {
		const response = await Client.branch.getAll(params);

		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || 'Failed to fetch branches'
		);
	}
};

export const getCourse = async (params: any) => {
	try {
		const response = await Client.course.getWithBranch(params);

		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to fetch courses');
	}
};

export const createStudyMaterial = async (data: any) => {
	try {
		const response = await Client.study_material.create(data);

		return response?.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || 'Failed to create study material'
		);
	}
};

export const deleteStudyMaterial = async (id: string) => {
	try {
		const response = await Client.study_material.delete({ id });

		return response;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || 'Failed to delete study material'
		);
	}
};

export const updateStudyMaterialStatus = async (data: {
	id: string;
	is_active: boolean;
}) => {
	try {
		const response = await Client.study_material.update_status(data);
		return response;
	} catch (error) {
		console.error('Failed to update status:', error);
		throw error;
	}
};
