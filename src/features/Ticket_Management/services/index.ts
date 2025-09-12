import Client from "../../../apis/index";

export const GetStaffTicketServices = async (data: any) => {
  try {
    const response = await Client.ticket.staff_ticket(data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching staff ticket services:", error);
    throw error;
  }
};

export const GetIndividualStaffTicketService = async (id: string) => {
  try {
    const response = await Client.ticket.staff_ticket_with_id({ id });
   
    return response.ticket;
  } catch (error) {
    console.error("Error fetching individual staff ticket:", error);
    throw error;
  }
};


export const updateStaffTicketService = async (id: string) => {
  try {
    const response = await Client.ticket.staff_ticket_update({ id });
   
    return response.ticket;
  } catch (error) {
    console.error("Error updating staff ticket:", error);
    throw error;
  }
};

