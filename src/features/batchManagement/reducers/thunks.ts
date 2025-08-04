import { getWithIdBatchService } from "../services";
import { getwithIdBatch } from "./slices";




export const getwithIdBatches = (params:any) => async(dispatch:any)  =>
    {
        try {
            const response = await getWithIdBatchService(params);
            if (response) {
                dispatch(getwithIdBatch(response));
            }      
        } catch (error) {
            console.log(error);
            return null;
        }
}