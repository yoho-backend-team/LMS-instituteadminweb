import { GetIndividualStaffTicketService, GetStaffTicketServices } from "../services";
import { getindividualStaffdata, getstaffticket } from "./moduleSlice";

export const GetStaffTicketServicesThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await GetStaffTicketServices(params);
    dispatch(getstaffticket(response.data)); 
    console.log(response.data, "Staff Ticket Services in thunk");
  } catch (error) {
    console.log("Error in StaffTicketServices thunk:", error);
  }
};



export const GetIndividualStaffTicketThunks = (id: string) => async (dispatch: any) => {
  try {
    const response = await GetIndividualStaffTicketService(id);
    console.log("Fetched individual staff ticket in thunk:", response);
    dispatch(getindividualStaffdata(response)); // store in reducer
  } catch (error) {
    console.log("Error in IndividualStaffTicket thunk:", error);
  }
};


