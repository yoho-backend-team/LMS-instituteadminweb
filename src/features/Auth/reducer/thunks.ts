/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLocalStorage, RemoveLocalStorage, StoreLocalStorage } from "../../../utils/localStorage"
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
<<<<<<< HEAD
        const response = await getAllBranches('')
        console.log(response?.data[0], "branck")
        StoreLocalStorage('selectedBranchId', response?.data?.[0]?.uuid)
=======
        const response = await getAllBranches(institute)
        const branch = GetLocalStorage('selectedBranchId')
        if (!branch) {
            StoreLocalStorage('selectedBranchId', response?.data?.[0]?.uuid)
        }
>>>>>>> 792d31db2b2bf76980698f6521db8f6f92e2e697
        dispatch(setAllBranch(response?.data))
    } catch (error) {
        console.log(error)
    }
}