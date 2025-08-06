import Client from '../../../apis/index.js';

export const getstudentdata = async (data: any) => {
	const response = await Client.student.class(data)
	if (response) {
		return response;
	}
};
export const getcoursedataservice = async (data: any) => {
	const response = await Client.student.getWithId(data)
	if (response) {
		return response;
	}
};
export const updatestudentdata = async (data: any) => {
	const response = await Client.student.update(data)
	if (response) {
		return response;
	}
};
export const deletestudentdata = async (data: any) => {
	const response = await Client.student.delete(data)
	if (response) {
		return response;
	}
};