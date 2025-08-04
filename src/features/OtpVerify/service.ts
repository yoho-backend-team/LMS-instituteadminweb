import Client from '../../apis/index'

export const SubmitOtpVerify = async (data: any) => {
    try {
        const response = await Client.admin.verfiy_otp(data)
        return response
    } catch (error) {
        console.log(error)
    }
}