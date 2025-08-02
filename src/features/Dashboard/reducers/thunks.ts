import { getDashboard } from '../services'; 
import { getDashboardData } from './DashboardSlice';

export const getDashboardthunks =
    (params:any) => async (dispatch: any) => {
        try {
            const response = await getDashboard(params);
            dispatch(getDashboardData(response.data));
            console.log(response.data,"Dashboard Response")
        } catch (error) {
            console.log(error);
        }
    };
