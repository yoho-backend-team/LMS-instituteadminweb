import { createSlice } from "@reduxjs/toolkit";




const allNotificationSlice = createSlice({
    name :"allNotificationSlice",
   initialState : {
      allNotification : []

   }, reducers:{
    allNotification:(state,actions)=>{
        state.allNotification = actions.payload;
    }
   }


});

export const {allNotification} =  allNotificationSlice.actions;
export default allNotificationSlice.reducer;