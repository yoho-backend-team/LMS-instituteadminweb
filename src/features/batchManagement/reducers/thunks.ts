import { GetBranchById, getWithIdBatchService } from "../services";
import { getBranchId, getwithIdBatch, setLoading } from "./slices";

export const getwithIdBatches = (params:any) => async(dispatch:any)  =>
    {
        try {
            dispatch(setLoading(true))
            const response = await getWithIdBatchService(params);
            if (response) {
                dispatch(getwithIdBatch(response));
            } 
             dispatch(setLoading(false))     
        } catch (error) {
            console.log(error);
            return null;
        }
        finally{
             dispatch(setLoading(false))
        }
}

export const getBranchIdData = (params:any) => async(dispatch:any) => {
    try{
        const response = await GetBranchById(params);
        console.log("thunk res",response);
        dispatch(getBranchId(response));
    }
    catch(error) {
        console.log(error)
    }
}
