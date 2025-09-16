import { getAllAdminTickets } from "./service";
import { setTickets } from "./slice";

export const fetchAdminTicketsThunk = (params: any) => async (dispatch: any) => {
  try {
    const response = await getAllAdminTickets(params);
    dispatch(setTickets(response.data.data));
   
  } catch (error) {
    console.error("Failed to fetch admin tickets:", error);
  }
};