import { getAllNotificationsService } from "../Services";
import { allNotification } from "./slices";




export const getAllNotifications = (params:any) => async(dispatch:any)  =>
    {
        try {
            const response = await getAllNotificationsService(params);
            if (response) {
                dispatch(allNotification(response));
            }      
        } catch (error) {
            console.log(error);
            return null;
        }
}