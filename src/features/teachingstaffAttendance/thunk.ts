/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStaffAttendaceAll } from "./service";
import { setStaffAttendance } from "./slice";

export const GetStaffAttendanceThunk = () => async (dispatch: any) => {
    try {
        const response = await getStaffAttendaceAll();
        dispatch(setStaffAttendance(response.data))
    } catch (error) {
        console.log(error)
    }
}