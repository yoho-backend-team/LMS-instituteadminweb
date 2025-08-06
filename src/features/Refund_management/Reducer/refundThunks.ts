import {
  setRefundLoading,
  setRefundError,
  setRefundData,
  addRefund,
  updateRefundInState,  
  deleteRefundInState,
  getbatchwith_idRefund,
  getCourseRefundSl,
} from "./refundSlice";

import {
  createRefund,
  getAllRefunds,
  updateRefund,
  deleteRefund,
  GetBatchwithCourseRefund,
  GetCourseRefund,
} from "../Service/index";

// CREATE
export const createRefundThunk = (data: any) => async (dispatch: any) => {
  dispatch(setRefundLoading(true));
  try {
    const response = await createRefund(data);
    dispatch(addRefund(response.data));
    dispatch(setRefundError(null));
    return response.data;
  } catch (error: any) {
    dispatch(setRefundError(error.response?.data?.message || "Create failed"));
    throw error;
  } finally {
    dispatch(setRefundLoading(false));
  }
};

// GET ALL
export const getAllRefundsThunk = (params: any) => async (dispatch: any) => {
  dispatch(setRefundLoading(true));
  try {
    const response = await getAllRefunds(params);
    dispatch(setRefundData(response.data));
    dispatch(setRefundError(null));
    return response.data;
  } catch (error: any) {
    dispatch(setRefundError(error.response?.data?.message || "Fetch failed"));
    throw error;
  } finally {
    dispatch(setRefundLoading(false));
  }
};

// UPDATE
export const updateRefundThunk = (data: any) => async (dispatch: any) => {
  dispatch(setRefundLoading(true));
  try {
    const response = await updateRefund(data);
    dispatch(updateRefundInState(response.data));
    dispatch(setRefundError(null));
    return response.data;
  } catch (error: any) {
    dispatch(setRefundError(error.response?.data?.message || "Update failed"));
    throw error;
  } finally {
    dispatch(setRefundLoading(false));
  }
};

// DELETE
export const deleteRefundThunk = (data: any) => async (dispatch: any) => {
  dispatch(setRefundLoading(true));
  try {
    await deleteRefund(data);
    dispatch(deleteRefundInState(data._id));
    dispatch(setRefundError(null));
  } catch (error: any) {
    dispatch(setRefundError(error.response?.data?.message || "Delete failed"));
    throw error;
  } finally {
    dispatch(setRefundLoading(false));
  }
};

// Get course
export const GetCourseThunks = (data:any) => async (dispatch: any) => {
  try {
    const response = await GetCourseRefund(data);
    dispatch(getCourseRefundSl(response?.data));
    console.log("course data in thunk", response.data);
    return response
  } catch (error) {
    console.error("Error fetching branch courses in thunk", error);
  }
};
//Get Batch by Course
export const GetBatchThunks = (
  instituteId: any,
  branchId: any,
  courseId: any
) => async (dispatch: any) => {
  try {
    const response = await GetBatchwithCourseRefund(instituteId, branchId, courseId);
    dispatch(getbatchwith_idRefund(response.data));
    console.log("Batch data in thunk", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching batches in thunk", error);
  }
};