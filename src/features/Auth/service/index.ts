/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../apis/index'

export const AuthLogin = async (data: { email?: string, password?: string }) => {
    try {
        const response = await Client.admin.login(data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const AuthLogOut = async (data: any) => {
    try {
        const response = await Client.admin.logout(data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const AuthOtp = async (data: any) => {
    try {
        const response = await Client.admin.verfiy_otp(data)
        return response
    } catch (error) {
        console.log(error)
    }
}