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
		const response = await Client.batch.create(params);
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
