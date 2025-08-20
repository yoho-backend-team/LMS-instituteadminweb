import { getWithIdBatchService } from "../services";
import { getwithIdBatch, setLoading } from "./slices";




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