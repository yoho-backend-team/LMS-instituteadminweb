/* eslint-disable @typescript-eslint/no-explicit-any */
// thunks/feeThunks.ts
import {
	creatFees,
	DeleteAll,
	EditStudent,
	GetAllfees,
	GetBatch,
	GetBranch,
	GetBranchCourse,
	StudentsWithBatch,
} from '../services';
import {
	deletestudent,
	editstudent,
	getallfees,
	getbatchwith_id,
	getBranchCourse,
	getBranches,
	getcreat,
	getstudent,
	setLoading,
} from './moduleSlice';

export const CreateFeesThunks = (params: any) => async (dispatch: any) => {
	try {
		const response = await creatFees(params);
		dispatch(getcreat(response.data));
		return { payload: response.data };
	} catch (error) {
		console.log('Error in CreateFeesThunks:', error);
	}
};

export const GetBranchThunks = (params: any) => async (dispatch: any) => {
	try {
		const result = await GetBranch(params);
		dispatch(getBranches(result.data));
		return result.data;
	} catch (error) {
		console.error('Error in GetBranchThunks', error);
	}
};

export const GetBranchCourseThunks =
	(branchname: any) => async (dispatch: any) => {
		try {
			const response = await GetBranchCourse(branchname);
			dispatch(getBranchCourse(response.data));
			return response;
		} catch (error) {
			console.error('Error fetching branch courses in thunk', error);
		}
	};

export const GetBatchThunks = (courseId: any) => async (dispatch: any) => {
	try {
		const response = await GetBatch(courseId);
		dispatch(getbatchwith_id(response.data));
		return response;
	} catch (error) {
		console.error('Error fetching batches in thunk', error);
	}
};

export const GetStudentsWithBatchThunks =
	(params: any) => async (dispatch: any) => {
		try {
			const response = await StudentsWithBatch(params);
			dispatch(getstudent(response.data));
			return response;
		} catch (error) {
			console.error('Error fetching students with batch in thunk', error);
		}
	};

export const GetAllFeesThunks = (params: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await GetAllfees(params);
		dispatch(getallfees(response));
		dispatch(setLoading(false));
		return response;
	} catch (error) {
		console.log('Error in getallfees Thunks:', error);
	} finally {
		dispatch(setLoading(false));
	}
};

export const DeleteAllThunks = (params: any) => async (dispatch: any) => {
	try {
		const response = await DeleteAll(params);
		dispatch(deletestudent(response));
		
		return response;
	} catch (error) {
		console.log('Error in getallfees Thunks:', error);
	}
};

export const EditStudentthunks = (params: any) => async (dispatch: any) => {
	try {
		const response = await EditStudent(params);
		dispatch(editstudent(response));
		
		return response;
	} catch (error) {
		console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa', error);
	}
};
