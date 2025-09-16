
import {
	getActivityStudentdata,
	getcoursedataservice,
	getLiveClassData,
	getStudentClass,
	getstudentdata,
} from '../services/Student';
import {
	getActivityDetails,
	getcoursedetails,
	getLiveClassDetails,
	getstudentdetails,
	setClassdetails,
	setLoading,
} from './StudenSlicet';

export const getStudentmanagement = (params: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await getstudentdata(params);
		dispatch(getstudentdetails(response));
		dispatch(setLoading(false));
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(setLoading(false));
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

export const getLiveClassDataSet = (query: any) => async (dispatch: any) => {
	try {
		const response = await getLiveClassData(query);
		if (response) {
			dispatch(getLiveClassDetails(response));
		}
	} catch (error) {
		console.log(error);
	}
};

export const getStudentActivityData = (data: any) => async (dispatch: any) => {
	try {
		const response = await getActivityStudentdata(data);
		if (response) {
			dispatch(getActivityDetails(response));
		}
	} catch (error) {
		console.log(error);
	}
};


export const getclassstudentData =(params:any)=>async(dispatch:any)=>{
	try{
		const response =await getStudentClass(params);
		if(response){
			dispatch(setClassdetails(response?.data))
		}
		return response?.data?.data
	}
	catch(err){
		console.log(err)
	}
}