import Client from '../../apis/index'
import { GetLocalStorage } from '../../utils/localStorage'


const institute = GetLocalStorage('institute') ?? '973195c0-66ed-47c2-b098-d8989d3e4529'


export const getAllPlan = async()=>{
    try{
        const response = await Client.subscription.get_all_plans()
        return response
    }catch(error:any){
        throw new Error(error.message)
    }
}

export const getInstituteSubscription = async(params:any)=>{
    try{
        const data = { ...params, institute }; 
        const response = await Client.subscription.get_subscription(data)
        return response
    }catch(error:any){
        throw new Error(error.message)
    }
}

export const getSubscriptionStatus = async(params:any)=>{
    try{
        const data = { ...params, institute };
        console.log("Status Payload:", data);
        if (!institute) throw new Error("Missing institute ID");
        const response = await Client.subscription.get_subscription_status(data)
        return response
    }catch(error:any){
        console.error("Backend Error Response for status:", error?.response?.data || error.message);
        throw new Error(error.message)
    }
}

export const updateRequest = async (params: any) => {
  try {
    const data = { ...params, institute };
    console.log("Final Upgrade Payload:", data);
    const response = await Client.subscription.upgrade_request(data);
    return response;
  } catch (error: any) {
    console.error("Backend Error Response:", error?.response?.data || error.message);
    throw new Error(error.message);
  }
};
