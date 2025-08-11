import { getActivity, getDashboard } from '../services'; 
import { getActivityData, getDashboardData } from './DashboardSlice';

export const getDashboardthunks =
    (params:any) => async (dispatch: any) => {
        try {
            const response = await getDashboard(params);
            dispatch(getDashboardData(response));
        } catch (error) {
            console.log(error);
        }
    };

export const getActivitythunks = (params:any)=> async (dispatch:any)=>{
    try {
        const response = await getActivity(params);
        dispatch(getActivityData(response.data));
        console.log(response.data,"Activity Data")
    } catch (error) {
            console.log(error);
        }
}