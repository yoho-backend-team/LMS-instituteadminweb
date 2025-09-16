import Client from '../../../apis/index'


export const getAllAdminTickets = async (params: any) => {
  try {
    const response = await Client.ticket.admin.get_all(params);
    
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const createTicket = async (data: any) => {
  try {
    const response = await Client.ticket.admin.create_ticket(data);
  
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create ticket");
  }
};

export const updateTicket = async (data: any, id: any) => {
    try{
        const response = await Client.ticket.admin.update_ticket(data, id);
        
        return response;
    }catch(error: any){
        throw new error(error.response);
    }
}