import Client from '../../../apis/index'

export const getCertificate = async (params:any)=>{
    const response = await Client.certificate.getAll(params)
     if(response){
    return response
   }
}
