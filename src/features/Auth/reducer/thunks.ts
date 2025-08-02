/* eslint-disable @typescript-eslint/no-explicit-any */
import { setAuthData } from "./slice"

export const AuthThunks = (data: any) => async (dispatch: any) => {
    try {
        dispatch(setAuthData(data))
    } catch (error) {
        console.log(error)
    }
}