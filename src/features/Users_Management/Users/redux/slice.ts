import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: true
    },
    reducers:{
        setUsers: (state, action) => {
            state.data = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setUsers, setLoading} = usersSlice.actions;
export default usersSlice.reducer