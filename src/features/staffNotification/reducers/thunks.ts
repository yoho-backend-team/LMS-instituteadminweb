
import { getStaffNotifications } from "../services";
import { selectStaffNotification } from "./slices";

export const getAllStaffNotifications = (query:any) => async(dispatch:any)  =>
    {
        try {
            const response = await getStaffNotifications(query);
            if (response) {
                dispatch(selectStaffNotification(response));
            }    
        } catch (error) {
            console.log(error);
            return null;
        }
}