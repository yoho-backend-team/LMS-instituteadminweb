import { createSlice } from "@reduxjs/toolkit";

const StaffNotificationSlice = createSlice({
    name :"staffNotificationSlice",
   initialState : {
      staffNotification : []

   }, reducers:{
    selectStaffNotification:(state,actions)=>{
        state.staffNotification = actions.payload;
    }
   }


});

export const {selectStaffNotification} =  StaffNotificationSlice.actions;
export default StaffNotificationSlice.reducer;