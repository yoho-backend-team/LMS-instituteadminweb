import Client from '../../../apis/index'

export const getCertificate = async (params:any)=>{
    const response = await Client.certificate.getAll(params)
     if(response){
    return response
   }
}


export const updateCertificate = async (params:any)=>{
try{
    const response = await Client.certificate.update(params)
    if(response){
        return response 
    }
}
catch(error){
    console.log(error)
    return null;
}

}

export const deleteCertificate = async (data:any)=>{
    try{
    const response = await Client.certificate.delete(data)
    
   if(response){
        return response 
    }
}
catch(error){
    console.log(error)
    return null;
}
}

export const createCertificate = async (data:any)=>{
    try{
        const response = await Client.certificate.create(data)
   if(response){
        return response 
    }
}
catch(error){
    console.log(error)
    return null;
}
}
