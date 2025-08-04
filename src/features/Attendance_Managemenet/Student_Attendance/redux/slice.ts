import { createSlice } from "@reduxjs/toolkit";

const studentAttendanceSlice = createSlice({
    name: 'studentAttendances',
    initialState: {
        data: [],
        loading: true
    },
    reducers:{
        setStudentAttendance : (state, action) => {
            state.data = action.payload
        },
        setLoading : (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setStudentAttendance, setLoading} = studentAttendanceSlice.actions;
export default studentAttendanceSlice.reducer;