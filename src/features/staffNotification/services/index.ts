import Client from "../../../apis/index";

export const getStaffNotifications = async (query: any) => {
    try{
        const response = await Client.notification.staff.get_staff_notification(query)
        if (response) {
            return response;
        } 
    }  
        catch (error) {
            console.error("Error in getAllNotificationsService:", error);
            return null;
        }
    }

export const createStaffNotifications = async (data: any) => {
    try{
        const response = await Client.notification.staff.add_staff_notification(data)
        if (response) {
            return response;
        } 
    }  
        catch (error) {
            console.error("Error in getAllNotificationsService:", error);
            return null;
        }
    }
