import { getAllPlan, getInstituteSubscription, getSubscriptionStatus, upgradeRequest, } from "./services"
import { setAllPlan, setInstituteSubscription, setSubscriptionStatus, setUpgradeRequest, } from "./slice";


export const getAllPlanThunk = () => async (dispatch: any) => {
  try {
    const response = await getAllPlan();
    dispatch(setAllPlan(response.data));
  } catch (error) {
    console.error("Error fetching plans:", error);
  }
};

export const getInstituteSubcriptionThunk = (params?: any) => async (dispatch: any) => {
  try {
    const response = await getInstituteSubscription(params)
    dispatch(setInstituteSubscription(response.data))
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
  }
}

export const getSubscriptionStatusThunk = (params?: any) => async (dispatch: any) => {
  try {
    const response = await getSubscriptionStatus(params);
    dispatch(setSubscriptionStatus(response.data));
  } catch (error) {
    console.error("Error fetching subscriptionStatus:", error);
  }
};

// export const upgradeRequestThunk = (params:any) => async (dispatch: any) =>{
//   try{
//     const response = await upgradeRequest(params)
//     dispatch(setUpgradeRequest(response.data))
//   } catch(error){
//     console.error("Error updating request:", error)
//   }
// }

export const upgradeRequestThunk = (planId: string, instituteId: string) => async (dispatch: any) => {
  try {
    const response = await upgradeRequest(planId, instituteId);
    dispatch(setUpgradeRequest(response.data));
  } catch (error) {
    console.error("Error updating request:", error);
  }
};

