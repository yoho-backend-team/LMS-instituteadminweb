import Client from '../../../apis/index.js';

export const getstudentdata = async (data: any) => {
	const response = await Client.student.class(data)
	if (response) {
		return response;
	}
};