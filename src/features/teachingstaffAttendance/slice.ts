import { createSlice } from '@reduxjs/toolkit'

const staffAttendance = createSlice({
    name: 'staffAttendance',
    initialState: {
        data: [],
        selectStaff: {},
        attendance: [],
    },
    reducers: {
        setStaffAttendance: (state, action) => {
            state.data = action.payload
        },
        setSelectStaff: (state, action) => {
            state.selectStaff = action.payload
        },
        setSelectStaffAttendance: (state, action) => {
            state.attendance = action.payload
        },
        setSelectStaffAttendanceUpdate: (state, action) => {
            const data = action.payload
            state.attendance.push(data)
        }
    }
})

export const { setStaffAttendance, setSelectStaff, setSelectStaffAttendance } = staffAttendance.actions

export default staffAttendance.reducer