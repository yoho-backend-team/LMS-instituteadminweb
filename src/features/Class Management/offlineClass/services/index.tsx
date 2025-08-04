import Client from '../../../../apis/index'
export const getAllOfflineClass = async (params:any) => {
    const response = await Client.offline_class.getAll(params)
   if(response){
    return response
   }
}


export const deleteOfflineClass = async (data:any)=>{
    
    try{
const response = await Client.offline_class.delete(data)
    if(response){
        return response
    }
    }
    catch(error){
        console.log(error)
    }
}

export const updateOfflineClass = async (data:any)=>{
    try{
    const response = await Client.offline_class.update(data)
    if(response){
        return response
    }}
    catch(error){
        console.log (error)
    }
}
