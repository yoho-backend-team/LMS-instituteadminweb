export const selectRefundData = (state: any) => state.refund.data;
export const selectRefundLoading = (state: any) => state.refund.loading;
export const selectRefundError = (state: any) => state.refund.error;
export const BranchCourse = (state: any) => state.refund.course;
export const Batch=(state:any)=>state.refund.batch;
export const Student = (state: any) => state.refund.student || [];
export const Fees = (state: any) => state.refund.fee;

