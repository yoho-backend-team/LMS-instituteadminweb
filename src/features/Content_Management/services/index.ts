import Client from "../../../apis/index"
export const GetAllModule=async(params:any)=>{
    const response=await Client.course_module.getAll(params);
    console.log("Module data getting",response)
    if(response){
        return response;
    }
}

// export const CreatModule=async(params:any)=>{
//     const response=await Client.course_module.create(params);
//     console.log("Module data adding",response)
//     if(response){
//         return response;
//     }
// }