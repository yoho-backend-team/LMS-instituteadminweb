/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../apis/index'

export const getStaffAttendaceAll = async () => {
    try {
        const data = {
            type: 'teaching',
            branch: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
            institute: '973195c0-66ed-47c2-b098-d8989d3e4529',
            page: 1
        }
        const response = await Client.attedence.get_all_staff_attedence(data)
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const GetStaffAttandaceByID = async (data: string) => {
    try {
        const response = await Client.attedence.get_staff_attedence_with_id(data)
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}