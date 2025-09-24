import {
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
} from './refundSlice';

import {
	createRefund,
	getAllRefunds,
	updateRefund,
	deleteRefund,
	GetBranchCourse,
	GetBatch,
	StudentsWithBatch,
	StudentWithFee,
} from '../Service/index';

//  Get all refunds
export const GetAllRefundsThunk = (params?: any) => async (dispatch: any) => {
	try {
		dispatch(setRefundLoading(true));
		const res = await getAllRefunds(params);
		dispatch(setRefundData(res.data));
	} catch (error: any) {
		dispatch(setRefundError(error.message || 'Failed to fetch refunds'));
	} finally {
		dispatch(setRefundLoading(false));
	}
};

//  Create refund
export const CreateRefundThunk = (payload: any) => async (dispatch: any) => {
	try {
		dispatch(setRefundLoading(true));
		
		const res = await createRefund(payload);
		

		dispatch(addRefund(res.data));

		dispatch(GetAllRefundsThunk());

		return res;
	} catch (error: any) {
		console.error('Failed to create refund:', error);
		dispatch(
			setRefundError(
				error.response?.data?.error ||
					error.message ||
					'Failed to create refund'
			)
		);
		throw error;
	} finally {
		dispatch(setRefundLoading(false));
	}
};

//  Update refund
export const UpdateRefundThunk = (payload: any) => async (dispatch: any) => {
	try {
		dispatch(setRefundLoading(true));
		const res: any = await updateRefund(payload);
		
		dispatch(updateRefundInState(res?.data));
	} catch (error: any) {
		console.log('update thunk', error);
		dispatch(setRefundError(error.message || 'Failed to update refund'));
	} finally {
		dispatch(setRefundLoading(false));
	}
};

// Delete refund
export const DeleteRefundThunk =
	(refundId: string) => async (dispatch: any) => {
		try {
			dispatch(setRefundLoading(true));
			console.log('Thunk deleting refund ID:', refundId);
			await deleteRefund(refundId);
			dispatch(deleteRefundInState(refundId));
		} catch (error: any) {
			dispatch(setRefundError(error.message || 'Failed to delete refund'));
		} finally {
			dispatch(setRefundLoading(false));
		}
	};

// Get Course by Branch
export const GetCourseThunk = (branchId: string) => async (dispatch: any) => {
	try {
		dispatch(setRefundLoading(true));
		const res: any = await GetBranchCourse(branchId);
		dispatch(getBranchCourse(res));
	} catch (error: any) {
		dispatch(setRefundError(error.message || 'Failed to fetch courses'));
	} finally {
		dispatch(setRefundLoading(false));
	}
};

//  Get Batch by Course ID
export const GetBatchThunk = (courseId: any) => async (dispatch: any) => {
	try {
		dispatch(setRefundLoading(true));
		const res = await GetBatch(courseId);
		dispatch(getbatchwith_id(res?.data));
	} catch (error: any) {
		dispatch(setRefundError(error.message || 'Failed to fetch batches'));
	} finally {
		dispatch(setRefundLoading(false));
	}
};

// Get Students by Batch
export const GetStudentsWithBatchThunks =
	(params: any) => async (dispatch: any) => {
		try {
			const response = await StudentsWithBatch(params);
			dispatch(getstudent(response?.data));
			return response;
		} catch (error) {
			console.error('Error fetching students with batch in thunk', error);
		}
	};

//get student Fee
export const GetStudentFeeThunks =
	(studentId: string) => async (dispatch: any) => {
		try {
			const response = await StudentWithFee(studentId);
			dispatch(getfee(response?.data));
			return response;
		} catch (error) {
			console.log('Error in fetching student Fee', error);
		}
	};
