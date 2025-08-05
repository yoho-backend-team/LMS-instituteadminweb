import { getCertificate } from "../services";
import { setCertificateClass } from "./slice";

export const  getStudentCertificate = (params:any)=> async (dispatch:any)=>{
    try{
        const response = await getCertificate(params)
        dispatch (setCertificateClass(response))
        console.log(response, ' certificate response');
    }
    catch (error){
        console.log(error)
    }
}

