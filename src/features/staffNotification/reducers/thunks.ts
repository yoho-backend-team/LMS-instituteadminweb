import { getStaffNotifications } from '../services';
import { selectStaffNotification, setLoading } from './slices';

export const getAllStaffNotifications =
	(query: any) => async (dispatch: any) => {
		try {
			dispatch(setLoading(true));
			const response = await getStaffNotifications(query);
			if (response) {
				dispatch(selectStaffNotification(response));
				dispatch(setLoading(false));
			}
		} catch (error) {
			console.log(error);
			return null;
		} finally {
			dispatch(setLoading(false));
		}
	};
