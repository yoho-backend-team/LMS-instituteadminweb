import { getStudentIdcard } from '../services'; 
import { getIDcard } from './IdcardSlice';

export const getIdcardthunks =
    () => async (dispatch: any) => {
        try {
            const response = await getStudentIdcard();
            dispatch(getIDcard(response.data));
            console.log(response,"IDcard Response")
        } catch (error) {
            console.log(error);
        }
    };
