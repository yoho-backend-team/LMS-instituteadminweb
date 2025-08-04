import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/ContentMangement/Notes/Reducer/noteSlice';
import staffattendance from '../features/teachingstaffAttendance/slice';
import PaymentSlice from "../features/Payment_Management/Reducer/paymentSlice"

const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		PaymentSlice:PaymentSlice,

	},
});

export default store;
