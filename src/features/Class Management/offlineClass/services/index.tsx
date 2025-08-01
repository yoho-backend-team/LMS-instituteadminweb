import Client from '../../../../apis/index'
export const getAllOfflineClass = async (params:any) => {
    const response = await Client.offline_class.getAll(params)
   if(response){
    return response
   }
}