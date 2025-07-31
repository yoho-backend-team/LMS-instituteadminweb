/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StaffsAttendanceType } from "../../pages/Attendance Management/Staffs Attendance/StaffsAttendance";
import { GetStaffAttandaceByID, getStaffAttendaceAll } from "./service";
import { setSelectStaff, setSelectStaffAttendance, setStaffAttendance } from "./slice";

export const GetStaffAttendanceThunk = () => async (dispatch: any) => {
    try {
        const response = await getStaffAttendaceAll();
        dispatch(setStaffAttendance(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const SelectStaffAttendanceThunk = (data: StaffsAttendanceType) => async (dispatch: any) => {
    try {
        dispatch(setSelectStaff(data))
    } catch (error) {
        console.log(error)
    }
}

export const GetStaffAttendanceRerender = (data: string) => async (dispatch: any) => {
    try {
        const response = await getStaffAttendaceAll();
        const filter = response?.data?.filter((item: StaffsAttendanceType) => item.staff === data)
        dispatch(setSelectStaff(filter[0]))
    } catch (error) {
        console.log(error)
    }
}

export const GetAttendanceByIdThunk = (data: string) => async (dispatch: any) => {
    try {
        const response = await GetStaffAttandaceByID(data)
        dispatch(setSelectStaffAttendance(response?.data))
    } catch (error) {
        console.log(error)
    }
}