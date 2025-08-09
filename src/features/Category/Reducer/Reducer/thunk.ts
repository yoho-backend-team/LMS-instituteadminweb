import { getCategory  } from '../services';
import { getCategory as getCategoryAction } from './categoryslice';

export const getCategoryThunks =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getCategory(params);
            dispatch(getCategoryAction(response.data.data));
            console.log(response.data.data, "category Response");
            return response;
        } catch (error) {
            console.log(error);
        }
    };