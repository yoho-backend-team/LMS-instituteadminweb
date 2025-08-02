import { getAllStudentsAttendances } from "../service";
import { setLoading, setStudentAttendance } from "./slice"

export const fetchAllStudentAttendances = (data: any) => async(dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const response = await getAllStudentsAttendances(data);
        dispatch(setStudentAttendance(response))
    } catch (error) {
        console.log(error)
    }finally{
        dispatch(setLoading(false))
    }
}