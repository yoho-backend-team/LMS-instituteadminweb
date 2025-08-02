import Addmodule from "../../../components/contentmanagement/addmodule/addmodule";
import { CreatModule, GetAllModule } from "../services/index";
import {getModule} from "./moduleSlice";

export const GetallModuleThunks=(params:any)=>async(dispatch:any)=>{
    try {
         const response=await GetAllModule(params); 
         dispatch(getModule(response.data.data));
         console.log(response.data.data,"Module Slice in thunks")
    } catch (error) {
        console.log("error in thunks",error)
    }
}

// export const AddModuleThunks=(params:any)=>async(dispatch:any)=>{
//     try {
//          const response=await CreatModule(params); 
//         dispatch(Addmodule(params))
//          console.log(response,"Module Slice in thunks")
//     } catch (error) {
//         console.log("error in thunks",error)
//     }
// }