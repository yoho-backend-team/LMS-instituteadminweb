import Client from '../../apis/index'


export const getStudyMaterialsAll = async (params:any) => {
    try {
       
        const response = await Client.study_material.getAll(params)
        console.log("Backend data comming",response)
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}