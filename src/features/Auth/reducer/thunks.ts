/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetProfileDetail } from "../service"
import { setAuthData, setUSerDetails } from "./slice"

export const AuthThunks = (data: any) => async (dispatch: any) => {
    try {
        dispatch(setAuthData(data))
    } catch (error) {
        console.log(error)
    }
}

export const GetProfileThunk = () => async (dispatch: any) => {
    try {
        const response = await GetProfileDetail()
        console.log(response)
        dispatch(setUSerDetails(response.data))
    } catch (error) {
        console.log(error)
    }
}