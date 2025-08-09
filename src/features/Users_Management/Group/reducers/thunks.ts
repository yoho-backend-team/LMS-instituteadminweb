import { getGroupcard, getViewcard } from "../reducers/Slice";
import { deleteGroup, GetAllGroupCard, GetViewCard } from "./service";

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
export const deleteGroupThunk = (uuid: any) => async (dispatch: any) => {
  try {
    await deleteGroup(uuid);

    // Refresh the group list after deletion
    dispatch(
      GetGroupCardthunks({
        branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4", // same branch ID you used before
        page: 1,
      })
    );
  } catch (error: any) {
    console.error("Group delete failed:", error.message);
    throw error;
  }
};