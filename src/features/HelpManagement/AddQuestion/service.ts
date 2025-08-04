import Client from "../../../apis/index"



export const getAddQuestionAll = async (params:any) => {
    try {
       
        const response = await Client. faq_category.getAll(params)
        console.log("Backend data comming",response)
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}