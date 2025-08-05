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

export const createOfflineClass = async (data:any)=>{
    try{
        const response = await Client.offline_class.create(data)
   if(response){
    return response ;
   }
    }
    catch(error){
        console.log(error)
    }
}

export const getAllBranches = async (params:any)=>{
    try{
        const response = await Client.branch.getAll(params)
   if(response){
    return response 
   }
    }
    catch(error){
        console.log(error)
    }
}

export const getAllBatches = async (params: any) => {
    try {
        const response = await Client.batch.getWithId(params);
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getAllCourses = async (params: any) => {
    try {
        const response = await Client.staff.getCourse(params);
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};
