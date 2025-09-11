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
        setUSerDetails: (state, action) => {
            state.user = action.payload
        },
        setAllBranch: (state, action) => {
            state.branches = action.payload
        },
        setUpdateData: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        }
    }
})

export const { setAuthData, setUSerDetails, setAllBranch, setUpdateData } = AdminSlice.actions

export default AdminSlice.reducer