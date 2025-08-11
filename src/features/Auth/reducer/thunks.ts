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
        dispatch(setUSerDetails(response.data))
        return response.institute_id
    } catch (error) {
        console.log(error)
    }
}

export const GetBranchThunks = (institute: { uuid: string }) => async (dispatch: any) => {
    try {
        const response = await getAllBranches(institute)
        StoreLocalStorage('selectedBranchId', response?.data?.[0]?.uuid)
        dispatch(setAllBranch(response?.data))
    } catch (error) {
        console.log(error)
    }
}