import { getBranchData, getDataActivity, getDataClasses, getStaffData, getStaffDataId } from "../services";
import { getActivity, getBranch, getClass, getStaffDetails, getStaffDetailsId, } from "./slices";

export const getStaffDetailsData = (query:any) => async(dispatch: any) => {
    try{
        const response = await getStaffData(query);
        dispatch(getStaffDetails(response));
    }
    catch (error) {
		console.log(error);
	}
};

export const getStaffDetailsDataId = (params:any) => async(dispatch: any) => {
    try{
        const response = await getStaffDataId(params);
        dispatch(getStaffDetailsId(response));
    }
    catch (error) {
		console.log(error);
	}
};

export const getClassesData = (params: any) => async(dispatch: any) => {
    try{
        const response = await getDataClasses(params);
        dispatch(getClass(response));
    }
    catch (error) {
        console.log(error);
    }
}

export const getActivityData = (params: any) => async(dispatch: any) => {
    try{
        const response = await getDataActivity(params);
        dispatch(getActivity(response));
    }
    catch (error) {
        console.log(error);
    }
}

export const getBranchDetailsData = (data: any) => async(dispatch: any) => {
    try{
        const response = await getBranchData(data);
        dispatch(getBranch(response));
    }
    catch (error) {
		console.log(error);
	}
};