import Client from '../../../apis/index';

export const getAllNotificationsService = async (params: any) => {
	try {
		const response =
			await Client.notification.institute.get_institute_notification(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in getAllNotificationsService:', error);
		return null;
	}
};

export const createAllNotificationsService = async (params: any) => {
	try {
		const response =
			await Client.notification.institute.add_institute_notification(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in createAllNotificationsService:', error);
		return null;
	}
};

export const resendAllNotificationsService = async (data: any) => {
	try {
		const response =
			await Client.institute_notification.resend_institute_notification(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in resendAllNotificationsService:', error);
		return null;
	}
};
