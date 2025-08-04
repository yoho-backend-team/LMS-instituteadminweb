import Client from "../../../../apis/index"
export const GetAllSalary=async(params:any)=>{
    const response=await Client.course_module.getAll(params);
    console.log("Salary data getting",response)
    if(response){
        return response;
    }
}
