import Client from "../../../../apis/index.ts"
import { GetLocalStorage } from "../../../../utils/localStorage"
const branch = GetLocalStorage('branch') ?? '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4'
const institute = GetLocalStorage('institute') ?? '973195c0-66ed-47c2-b098-d8989d3e4529'

export const getGroupAll = async () => {
    try {
        const data = {
            type: 'group',
            branch,
            institute,
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

export const UpdateStaffAttendance = async (data: any) => {
    try {
        data.institute = institute
        data.branch = branch
        const response = await Client.attedence.mark_staff_attedence(data)
        return response
    } catch (error: any) {
        console.log(error)
    }
}