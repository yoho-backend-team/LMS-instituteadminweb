import { getAllPlan, getInstituteSubscription, getSubscriptionStatus, updateRequest } from "./services"
import { setAllPlan, setInstituteSubscription, setSubscriptionStatus, setUpgradeResponse } from "./slice";

export const getAllPlanThunk = () => async (dispatch: any) => {
  try {
    const response = await getAllPlan();
    dispatch(setAllPlan(response.data));
    console.log("plans : ",response.data )
  } catch (error) {
    console.error("Error fetching plans:", error);
  }
};

export const getInstituteSubcriptionThunk = (params:any) => async (dispatch: any) =>{
  try{
    const response = await getInstituteSubscription(params)
    dispatch(setInstituteSubscription(response.data))
    console.log("Subscriptions : ",response.data)
  } catch(error){
    console.error("Error fetching subscriptions:", error)
  }
}

export const getSubscriptionStatusThunk = (params:any) => async (dispatch: any) => {
  try {
    const response = await getSubscriptionStatus(params);
    dispatch(setSubscriptionStatus(response.data));
    console.log("Sub status: ", response.data);
  } catch (error) {
    console.error("Error fetching subscriptionStatus:", error);
  }
};

export const updateRequestThunk = (params: any) => async (dispatch: any) => {
  try {
    console.log("Sending upgrade request with params:", params);
    const response = await updateRequest(params);
    dispatch(setUpgradeResponse(response)); // <-- Store in Redux
    console.log("Upgrade request sent:", response);
  } catch (error) {
    console.error("Error updatingRequest:", error);
  }
};