import { getAllStudentTicketService, getByIDStudentTicketService } from "../Services";
import { getStudentTicketById, getStudentTickets } from "./slices";



export const getStudentTicket = (params:any) => async(dispatch:any)  =>
    {
        try {
            const response = await getAllStudentTicketService(params);
            if (response) {
                dispatch(getStudentTickets(response?.data));
            }      
        } catch (error) {
            console.log(error);
            return null;
        }
}



export const StudentTicketByID = (params:any) => async(dispatch:any)  =>
    {
        try {
            const response = await getByIDStudentTicketService(params);
            if (response) {
                dispatch(getStudentTicketById(response?.ticket));
            }      
        } catch (error) {
            console.log(error);
            return null;
        }
}