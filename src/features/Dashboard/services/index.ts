import Client from '../../../apis/index';
import { GetLocalStorage } from '../../../utils/localStorage';

export const getDashboard = async (params: any) => {
    const instituteId = GetLocalStorage('instituteId')
    params.instituteId = instituteId
    const response = await Client.reports.get(params);
    if (response) {
        return response;
    }
};


export const getActivity = async (params: any) => {
    const response = await Client.activity.get(params);
    if (response) {
        return response;
    }
}