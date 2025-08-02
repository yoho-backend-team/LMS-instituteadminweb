import Client from '../../../apis/index';

export const getDashboard = async (params: any) => {
    const response = await Client.reports.get(params);
    if (response) {
        return response;
    }
};
