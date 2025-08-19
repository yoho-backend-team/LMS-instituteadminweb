import Client from '../../apis/index'
import { GetLocalStorage } from '../../utils/localStorage'

const institute = GetLocalStorage('institute') ?? '973195c0-66ed-47c2-b098-d8989d3e4529'

export const getAllPlan = async () => {
    try {
        const response = await Client.subscription.get_all_plans()
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getInstituteSubscription = async (params: any) => {
    try {
        const data = { ...params, institute };
        const response = await Client.subscription.get_subscription(data)
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getSubscriptionStatus = async (params: any) => {
    try {
        const data = { ...params, institute };
        if (!institute) throw new Error("Missing institute ID");
        const response = await Client.subscription.get_subscription_status(data)
        return response
    } catch (error: any) {
        console.error("Backend Error Response for status:", error?.response?.data || error.message);
        throw new Error(error.message)
    }
}

// export const upgradeRequest = async (params: any) => {
//   try {
//     const data = { ...params, institute };
//     if(!data.plan_id) throw new Error("Missing plan ID");
//     const response = await Client.subscription.upgrade_request(data);
//     return response;
//   } catch (error: any) {
//     console.error("Backend Error Response for status:", error?.response?.data || error.message);
//     throw new Error(error.message);
//   }
// };

export const upgradeRequest = async (planId: string, actualInstituteId: string) => {
    try {
        const response = await Client.subscription.upgrade_request({
            institute: actualInstituteId,
            body: { planId },
        });
        return response;
    } catch (error: any) {
        console.error("Backend Error Response for status:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || error.message || "Upgrade failed");
    }
};



