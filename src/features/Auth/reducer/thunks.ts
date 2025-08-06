/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreLocalStorage } from "../../../utils/localStorage"
import { getAllBranches } from "../../Class Management/Live Class/services"
import { GetProfileDetail } from "../service"
import { setAllBranch, setAuthData, setUSerDetails } from "./slice"

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

export const GetBranchThunks = () => async (dispatch: any) => {
    try {
        const response = await getAllBranches({})
        console.log(response.data[0], "branck")
        StoreLocalStorage('selectedBranchId', response?.data?.[0]?.uuid)
        dispatch(setAllBranch(response?.data))
    } catch (error) {
        console.log(error)
    }
}