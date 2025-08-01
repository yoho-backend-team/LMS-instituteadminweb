import Client from '../../../apis/index';

export const getStaffIdcard = async (params: any) => {
    const response = await Client.id_cards.staff.getAll(params);
    if (response) {
        return response;
    }
};
