import Client from '../../../apis/index';

export const getCommunity = async (params: any) => {
    try{
    const response = await Client.community.getAll(params);
    if (response) {
        return response;
    }
} catch (error) {
    console.error(" communication Fetch Error:", error)
    return null;
}
}