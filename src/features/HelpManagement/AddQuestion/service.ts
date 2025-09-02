/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../apis/index"



export const getAddQuestionAll = async (params: any) => {
    try {

        const response = await Client.faq_category.getAll(params)
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}