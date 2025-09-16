import { getStudentIdcard } from '../services'; 
import { getIDcard } from './IdcardSlice';

export const getIdcardthunks =
    (params:any) => async (dispatch: any) => {
        try {
            const response = await getStudentIdcard(params);
            dispatch(getIDcard(response?.data?.data));
           
            return response
        } catch (error) {
            console.log(error);
        }
    };
