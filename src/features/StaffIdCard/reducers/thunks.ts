import { getStaffIdcard } from '../services'; 
import { getStaffIDcard } from './IdcardSlice';

export const getStaffIdcardthunks =
    (params:any) => async (dispatch: any) => {
        try {
            const response = await getStaffIdcard(params);
            dispatch(getStaffIDcard(response.data.data));
            console.log(response.data.data,"IDcard Response")
        } catch (error) {
            console.log(error);
        }
    };
