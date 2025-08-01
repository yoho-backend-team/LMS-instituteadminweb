import Client from '../../../apis/index';

export const getStudentIdcard = async (params: any) => {
    const response = await Client.id_cards.student.get_all(params);
    if (response) {
        return response;
    }
};
