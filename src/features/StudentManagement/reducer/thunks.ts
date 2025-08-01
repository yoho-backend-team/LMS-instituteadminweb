import {  getstudentdata } from '../services/Student';
import { getstudentdetails } from './StudenSlicet';



export const getStudentmanagement =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getstudentdata(params);
            console.log(response, 'login response');
            dispatch(getstudentdetails(response));
        } catch (error) {
            console.log(error);
        }
    };
   
