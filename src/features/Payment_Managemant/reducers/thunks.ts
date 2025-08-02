import Addmodule from "../../../components/contentmanagement/addmodule/addmodule";
import { CreatModule, GetAllModule } from "../services/index";
import {getModule} from "./moduleSlice";

export const GetallSalaryThunks=(params:any)=>async(dispatch:any)=>{
    try {
         const response=await GetAllMoe(params); 
         dispatch(getModule(response.data.data));
         console.log(response.data.data,"Module Slice in thunks")
    } catch (error) {
        console.log("error in thunks",error)
    }
}

