import { createSlice } from '@reduxjs/toolkit'

const AdminSlice = createSlice({
    name: 'adminslice',
    initialState: {
        user: {},
        permissions: [],
        userId: '',
        branches: [],
        institute: {},
        data: [],
    },
    reducers: {
        setAuthData: (state, action) => {
            state.data = action.payload
        },
    }
})

export const { setAuthData } = AdminSlice.actions

export default AdminSlice.reducer