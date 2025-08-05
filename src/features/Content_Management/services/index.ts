import Client from "../../../apis/index";
export const GetAllModule = async (params: any) => {
  const response = await Client.course_module.getAll(params);
  console.log("Module data getting", response);
  if (response) {
    return response;
  }
};

export const DeleteModule = async ({ id }: { id: string }) => {
  const response = await Client.course_module.delete(id); 
  console.log("Data deleted completely", response.data);
  return response.data;
};

export const EditModule = async (data: { uuid: string; [key: string]: any }) => {
  const response = await Client.course_module.update(data); 
  console.log("Module updated successfully", response.data);
  return response.data;
};

export const UploadFile = async (data: FormData) => {
  const response = await Client.file.upload(data);
  console.log("File uploaded successfully", response.data);
  return response.data;
};





// export const CreatModule=async(params:any)=>{
//     const response=await Client.course_module.create(params);
//     console.log("Module data adding",response)
//     if(response){
//         return response;
//     }
// }
