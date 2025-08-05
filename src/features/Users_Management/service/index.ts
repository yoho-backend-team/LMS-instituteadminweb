/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../apis/index'

export const GetAllAdminuser = async (data: any) => {
    try {
        const response = await Client.user.getAll(data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const CreateAdminUser = async (data: any) => {
    try {
        const response = await Client.user.add(data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const DeleteAdminUSer = async (data: any) => {
    try {
        const response = await Client.user.delete(data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const UpdateAdminUSer = async (data: any) => {
    try {
        const response = await Client.user.update(data)
        return response
    } catch (error) {
        console.log(error)
    }
}