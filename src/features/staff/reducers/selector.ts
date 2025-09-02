export const selectStaff = (state: any) => state.StaffSlice.allData;
export const selectStaffId = (state: any) => state.StaffSlice.singleData;
export const selectClass = (state: any) => state.StaffSlice.classData;
export const selectActivity = (state: any) => state.StaffSlice.activityData;
export const selectBranch = (state: any) => state.StaffSlice.branchData;
export const selectLoading = (state: any) => state.StaffSlice.loading;
