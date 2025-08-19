import { getActivityStudentdata, getcoursedataservice, getLiveClassData, getstudentdata } from '../services/Student';
import { getActivityDetails, getcoursedetails, getLiveClassDetails, getstudentdetails } from './StudenSlicet';

export const getStudentmanagement = (params: any) => async (dispatch: any) => {
    try {
        const response = await getstudentdata(params);
        dispatch(getstudentdetails(response));
    } catch (error) {
        console.log(error);
    }
};

export const getcoursesdata =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getcoursedataservice(params);
            console.log(response, "Thunk")
            if (response) {
                dispatch(getcoursedetails(response));
            }
        } catch (error) {
            console.log(error);
        }
    };

export const getLiveClassDataSet =
    (query: any) => async (dispatch: any) => {
        try {
            const response = await getLiveClassData(query);
            console.log(response, "Live Class")
            if (response) {
                dispatch(getLiveClassDetails(response));
            }
        } catch (error) {
            console.log(error);
        }
    };

export const getStudentActivityData =
    (data: any) => async (dispatch: any) => {
        try {
            const response = await getActivityStudentdata(data);
            console.log(response, "Live Class")
            if (response) {
                dispatch(getActivityDetails(response));
            }
        } catch (error) {
            console.log(error);
        }
    };


