import { getAllUsers } from "../service"
import { setLoading, setUsers } from "./slice"

export const fetchAllUsers = (data:any) =>  async (dispatch:any) => {
    try {
        dispatch(setLoading(true));
        const response = await getAllUsers(data);
        dispatch(setUsers(response))
    } catch (error) {
        console.log(error)
    }finally{
        dispatch(setLoading(false))
    }
}