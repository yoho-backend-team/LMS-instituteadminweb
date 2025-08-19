import { getAllOfflineClass } from "../services"
import { setLoading, setOfflineClass } from "./slice"


export const getAllOffline = (params: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const response = await getAllOfflineClass(params)
        dispatch(setOfflineClass(response))
        dispatch(setLoading(true))
    }
    catch (error) {
        console.log(false)
    }
    finally{
        dispatch(setLoading(false))
    }
}

