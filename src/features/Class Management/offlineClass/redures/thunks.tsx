import { getAllOfflineClass } from "../services"
import { setOfflineClass } from "./slice"


export const getAllOffline = (params:any)=>async (dispatch:any)=>{
    try{
        const response = await getAllOfflineClass(params)
        dispatch (setOfflineClass(response))
    }
    catch (error){
        console.log(error)
    }
}