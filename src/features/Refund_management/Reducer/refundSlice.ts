import { createSlice } from "@reduxjs/toolkit";

const refundSlice = createSlice({
  name: "refund",

  initialState: {
    data: [],
    loading: false,
    error: null,
    course: [],
    batch: [],
    student: [],
    fee: [],
  },
  reducers: {
    setRefundLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRefundError: (state, action) => {
      state.error = action.payload;
    },
    setRefundData: (state, action) => {
      state.data = action.payload;
    },
    addRefund: (state: any, action) => {
      state.data.push(action.payload);
    },
    updateRefundInState: (state: any, action) => {
      const index = state.data.findIndex(
        (item: any) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteRefundInState: (state: any, action) => {
      state.data = state.data.filter(
        (item: any) => item._id !== action.payload
      );
    },
    getBranchCourse: (state, action) => {
      state.course = action.payload;
    },

    getbatchwith_id: (state, action) => {
      state.batch = action.payload;
    },
    getstudent: (state, action) => {
      state.student = action.payload;
    },
    getfee: (state, action) => {
      state.fee = action.payload;
    },
  },
});

export const {
  setRefundLoading,
  setRefundError,
  setRefundData,
  addRefund,
  updateRefundInState,
  deleteRefundInState,
  getBranchCourse,
  getbatchwith_id,
  getstudent,
  getfee,
} = refundSlice.actions;

export default refundSlice.reducer;
