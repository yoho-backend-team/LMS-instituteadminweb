/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../apis/index';

export const getCommunity = async (params: any) => {
    try {
        const response = await Client.community.getAll(params);
        if (response) {
            return response;
        }
    } catch (error) {
        console.error(" communication Fetch Error:", error)
        return null;
    }
}

export const getcommunityById = async (data: any) => {
    try {
        const response = await Client.community.getMessages(data);
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error fetching community by ID:", error);
        return null;
    }
}