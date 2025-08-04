import { getGroupcard, getViewcard } from "../reducers/Slice";
import { GetAllGroupCard, GetViewCard } from "./service";

export const GetGroupCardthunks = (params: any) => async (dispatch: any) => {
    
  try {
    const response = await GetAllGroupCard(params); // service call
    dispatch(getGroupcard(response.data ?? response)); // extract actual payload
    console.log(response, "Card response");
  } catch (error) {
    console.log(error);
  }
};
export const GetViewGroupthunks = (params:any) => async (dispatch:any) =>{
  try{
      const response = await GetViewCard(params);
      dispatch(getViewcard(response.data?? response));
      console.log(response,"View Group");
  }catch (error) {
    console.log(error);

  }
}