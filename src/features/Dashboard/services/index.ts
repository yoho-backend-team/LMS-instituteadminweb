import Client from '../../../apis/index';
import { GetLocalStorage } from '../../../utils/localStorage';

export const getDashboard = async (params: any) => {
<<<<<<< HEAD
    const instituteId = GetLocalStorage('instituteId')
    params.instituteId = instituteId
=======
    const instituteid = GetLocalStorage('instituteId')
    params.institute = instituteid
>>>>>>> 792d31db2b2bf76980698f6521db8f6f92e2e697
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