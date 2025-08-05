import Client from '../../../apis/index.js';


export const createpaymentdata = async (data:any) => {
    const response = await Client.payment.student_fee.create(data)
    if (response) {
        return response;
    }
};
