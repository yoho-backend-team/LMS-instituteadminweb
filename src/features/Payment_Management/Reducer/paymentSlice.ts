import { createSlice } from '@reduxjs/toolkit';

const   PaymentSlice = createSlice({
    name: 'PaymentSlice',
    initialState: {
        data: [],
        
    },
    reducers: {
     
        createpaymentdeatils: (state,action) =>{
            state.data = action.payload;
        }
        
    },
});

export const {  createpaymentdeatils } = PaymentSlice.actions;
export default PaymentSlice.reducer;