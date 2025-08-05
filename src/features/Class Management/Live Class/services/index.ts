import Client from '../../../../apis/index';

export const getAllLiveClassService = async (params: any) => {
	try {
		const response = await Client.online_class.getAll(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAllCourses = async (params: any) => {
	try {
		const response = await Client.staff.getWithCourse(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAllBatches = async (params: any) => {
	try {
		const response = await Client.batch.getWithId(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAllBranches = async (params: any) => {
	try {
		const response = await Client.branch.getAll(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createLiveClass = async (data: any) => {
	try {
		const response = await Client.online_class.create(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateLiveClass = async (data: any) => {
	try {
		const response = await Client.online_class.update(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteLiveClass = async (params: any) => {
	try {
		const response = await Client.online_class.delete(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};
