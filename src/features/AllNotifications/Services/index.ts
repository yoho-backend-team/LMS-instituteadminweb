import Client from "../../../apis/index";

export const getAllNotificationsService = async (params: any) => {
    try{
        const response = await Client.notification.institute.get_institute_notification(params);
        if (response) {
            return response;
        } 
    }  
        catch (error) {
            console.error("Error in getAllNotificationsService:", error);
            return null;
        }
    }