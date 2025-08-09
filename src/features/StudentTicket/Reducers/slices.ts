

import { createSlice } from "@reduxjs/toolkit";




const StudentTicketSlice = createSlice({
    name :"StudentTicketSlice",
    initialState : {
        StudentTicket: [],
        StudentTicketById: [],
    }, 
    reducers:{
        getStudentTickets: (state,actions) => {
            state.StudentTicket = actions.payload;
        },
        getStudentTicketById: (state, actions) => {
            state.StudentTicketById = actions.payload;
        }
    }


});

export const {getStudentTickets, getStudentTicketById } =  StudentTicketSlice.actions;
export default StudentTicketSlice.reducer;