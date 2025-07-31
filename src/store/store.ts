import { configureStore } from '@reduxjs/toolkit'
import staffattendance from '../features/teachingstaffAttendance/slice'

const store = configureStore({
    reducer: {
        staffAttendace: staffattendance,
    }
})

export default store