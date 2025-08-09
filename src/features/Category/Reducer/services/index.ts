import Client from '../../../../apis/index';


export const getCategory = async (params: any) => {
    const response = await Client.category.get(params);
    if (response) {
        return response;
    }
};