import Client from '../../../apis/index';

export const getStudentIdcard = async () => {
    const response = await Client.id_cards.student.get_all();
    if (response) {
        return response;
    }
};
