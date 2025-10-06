/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../apis/index';

export const getWithIdBatchService = async (params: any) => {
	try {
		const response = await Client.batch.getWithId(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in getWithIdBatchService:', error);
		return null;
	}
};

export const getCourseService = async (params: any) => {
	try {
		const response = await Client.staff.getCourse(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in getcourseService:', error);
		return null;
	}
};

export const getBranchService = async (params: any) => {
	try {
		const response = await Client.branch.getAll(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in getbranchService:', error);
		return null;
	}
};

export const getStudentService = async (params: any) => {
	try {
		const response = await Client.student.getall(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in getstudentService:', error);
		return null;
	}
};

export const getStudentBranchService = async () => {
	try {
		const response = await Client.student.getWithBranch();
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in getstudentService:', error);
		return null;
	}
};

export const getStaffService = async (params: any) => {
	try {
		const response = await Client.staff.getall(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in getstaffService:', error);
		return null;
	}
};

export const createBatches = async (params: any) => {
	try {
		const response = await Client.batch.create(params, {
			batch_name: params.batch_name,
			start_date: params.start_date,
			end_date: params.end_date,
			instructor: params.instructor,
			student: params.student,
		});
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in createbatches:', error);
		return null;
	}
};

export const updateBatches = async (params: any) => {
	try {
		const response = await Client.batch.update(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in updatebatches:', error);
		return null;
	}
};

export const deleteBatches = async (params: any) => {
	try {
		const response = await Client.batch.delete(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in deletebatches:', error);
		return null;
	}
};

//getBranch by id

export const GetBranchById = async (params: any) => {
	const response = await Client.branch.getByid(params);
	return response;
};
