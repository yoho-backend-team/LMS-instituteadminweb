import { getCommunity } from "../services/index";
import { getcommunity } from "./CommunitySlice";

// Async thunk for fetching timeline
export const fetchcommunity = (params: any) => async (dispatch: any) => {
    try {
      const response = await getCommunity(params);
      if(response) dispatch(getcommunity(response.data))
    } catch (error: any) {
      return null
    }
  }