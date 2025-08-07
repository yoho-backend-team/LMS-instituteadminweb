import { getcoursedataservice, getstudentdata } from '../services/Student';
import { getcoursedetails, getstudentdetails } from './StudenSlicet';

export const getStudentmanagement = (params: any) => async (dispatch: any) => {
	try {
		const response = await getstudentdata(params);
		dispatch(getstudentdetails(response));
	} catch (error) {
		console.log(error);
	}
};

export const getcoursesdata = (params: any) => async (dispatch: any) => {
	try {
		const response = await getcoursedataservice(params);
		if (response) {
			dispatch(getcoursedetails(response));
		}
	} catch (error) {
		console.log(error);
	}
};
