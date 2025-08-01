
import Client from '../../../apis/index'

export const getStaffData = async(data:any) => {
    const response = await Client.staff.get(data)
    if (response) return response;
}

