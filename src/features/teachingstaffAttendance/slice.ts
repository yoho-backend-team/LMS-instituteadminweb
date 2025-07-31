import { createSlice } from '@reduxjs/toolkit'

const staffAttendance = createSlice({
    name: 'staffAttendance',
    initialState: {
        data: []
    },
    reducers: {
        setStaffAttendance: (state, action) => {
            state.data = action.payload
        },
    }
})

export const { setStaffAttendance } = staffAttendance.actions

export default staffAttendance.reducer