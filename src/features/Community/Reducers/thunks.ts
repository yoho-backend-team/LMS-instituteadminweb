import { getCommunity, getMessage, getMessages } from "../services/index";
import { getcommunity, getCommunityMessage } from "./CommunitySlice";

export const fetchcommunity = (params: any) => async (dispatch: any) => {
  try {
    const response = await getCommunity(params);
    if (response) dispatch(getcommunity(response.data));
  } catch (error: any) {
    return null;
  }
};


export const fetchCommunityMessages = (params: any) => async (dispatch: any) => {
  try {
    const response = await getMessage(params);
    if (response) dispatch(getMessages(response.data));
  } catch (error: any) {
    return null;
  }
};


export const GetCommunityMessageThunks = (id: string) => async (dispatch: any) => {
  try {
    const response = await getCommunityMessage(id);
    console.log("Fetched community message in thunk:", response);
    dispatch(getCommunityMessage(response)); // store in reducer
  } catch (error) {
    console.log("Error in IndividualStaffTicket thunk:", error);
  }
};