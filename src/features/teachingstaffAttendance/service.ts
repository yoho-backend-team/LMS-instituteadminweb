/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../apis/index'

export const getStaffAttendaceAll = async () => {
    try {
        const response = await Client.attedence.get_all_staff_attedence()
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}