import Client from "../../../apis/index";

export const GetStaffTicketServices = async (data: any) => {
  try {
    const response = await Client.ticket.staff_ticket(data);
    console.log("Fetched staff ticket services successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff ticket services:", error);
    throw error;
  }
};

export const GetIndividualStaffTicketService = async (id: string) => {
  try {
    const response = await Client.ticket.staff_ticket_with_id({ id });
    console.log("Fetched individual staff ticket successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching individual staff ticket:", error);
    throw error;
  }
};

