import { getAllNotificationsService } from '../Services';
import { allNotification, setLoading } from './slices';

export const getAllNotifications = (params: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await getAllNotificationsService(params);
		if (response) {
			dispatch(allNotification(response));
		}
		dispatch(setLoading(false));
	} catch (error) {
		console.log(error);
		return null;
	} finally {
		dispatch(setLoading(false));
	}
};
