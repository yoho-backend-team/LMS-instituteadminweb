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
