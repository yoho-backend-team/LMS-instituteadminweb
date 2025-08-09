import Client from "../../../apis/index";


export const getAllStudentTicketService = async (params:any) => {
    try{
        const response = await Client.ticket.student_tickets(params);
        if (response) {
            return response;
        } 
    }  
        catch (error) {
            console.error("Error in getallstudentticketService:", error);
            return null;
        }
    }



    export const getByIDStudentTicketService = async (params:any) => {
    try{
        const response = await Client.ticket.student_ticket_with_id(params);
        if (response) {
            return response;
        } 
    }  
        catch (error) {
            console.error("Error in getallstudentticketService:", error);
            return null;
        }
    }




        export const updateStudentTicketService = async (params:any) => {
    try{
        const response = await Client.ticket.update_student_status_ticket(params);
        if (response) {
            return response;
        } 
    }  
        catch (error) {
            console.error("Error in updatestudentticketService:", error);
            return null;
        }
    }