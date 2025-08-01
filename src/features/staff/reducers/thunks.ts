import { getStaffData } from "../services";
import { getStaffDetails } from "./slices";

export const getStaffDetailsData = (query:any) => async(dispatch: any) => {
    try{
        const response = await getStaffData(query);
        dispatch(getStaffDetails(response));
    }
    catch (error) {
		console.log(error);
	}
};
