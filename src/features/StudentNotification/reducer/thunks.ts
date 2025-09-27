import {
	getAllcoursedata,
	getcoursedata,
	getstudentnotificationdata,
} from '../services/Notification';
import {
	getAllcoursedetails,
	getcoursedetails,
	getstudentnotificationdetails,
	setLoading,
} from './NotificationSlice';

export const getStudentnotification =
	(params: any) => async (dispatch: any) => {
		try {
			dispatch(setLoading(true));
			const response = await getstudentnotificationdata(params);
			dispatch(getstudentnotificationdetails(response));
			dispatch(setLoading(false));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

export const getcourse = (data: any) => async (dispatch: any) => {
	try {
		const response = await getcoursedata(data);
		dispatch(getcoursedetails(response));
	} catch (error) {
		console.log(error);
	}
};

export const getAllcourse = (data: any) => async (dispatch: any) => {
	try {
		const response = await getAllcoursedata(data);
		dispatch(getAllcoursedetails(response));
	} catch (error) {
		console.log(error);
	}
};
