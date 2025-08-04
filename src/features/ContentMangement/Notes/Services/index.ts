import Client from '../../../../apis/index';

// For Get ALL
export const getNotes = async (params: any) => {
  try {
    const response = await Client.notes.get(params);
  return response;
  } catch (error) {
    console.log("Getting Note",error)
    throw error;
  }
  
};

//For ADD Notes
export const createNote = async (data: any) => {
  try {
    const response = await Client.notes.create(data);
    return response
  } catch (error) {
    console.log("Adding Note",error)
    throw error;
  }
  
};

//For Updating Notes
export const updateNote = async (params: any) => {
  try {
    const response= await Client.notes.update(params);
    return response
  } catch (error) {
    console.log("Updating Note",error)
    throw error;
  }
  
};

//For Deleting Notes
export const deleteNote = async (id: string) => {
  try {
    const response =await Client.notes.delete({ id });
    return response
  } catch (error) {
    console.log("Delete Note",error)
    throw error;
  }
 
};

//For Upload Files
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await Client.file.upload(formData);
    return response;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};

//For branch Dropdown
export const BranchDrop =async(params:any)=>{
  try {
    const response = await Client.branch.getAll(params);
    return response
  } catch (error) {
    console.log("Branch Dorpdown",error)
  }
};

//For Course Dropdown
export const CourseDrop=async(data:any)=>{
  try {
    const response= await Client.course.getWithBranch(data);
    return response
  } catch (error) {
    console.log("Course Dorpdown",error)
    throw error;    
  }
}



//  notes = {
    //     get: (params: string) => HttpClient.get(HTTP_END_POINTS.notes.index, params),
    //     create: (data: any) => HttpClient.post(HTTP_END_POINTS.notes.index, data),
    //     update: (data: any) => HttpClient.update(HTTP_END_POINTS.notes.index + `/update/${data.uuid}`, data),
    //     update_status: (data: any) => HttpClient.update(HTTP_END_POINTS.notes.update_status + data.id, data),
    //     delete: (data: any) => HttpClient.delete(HTTP_END_POINTS.notes.index + '/' + data.id)
    // };
//  file = {
//         upload: (data: any) => {
//             return HttpClient.uploadFile(HTTP_END_POINTS.file.upload, data);
//         }
//     };
// batch = {
//         getAll: (params: any) => HttpClient.get(HTTP_END_POINTS.batch.getAll + params.branch_id + '/batches/all', params),
//     };
// course = {
//         getWithBranch: (data: any) => HttpClient.get(HTTP_END_POINTS.course.withBranch + data.branch_id + '/courses'),
//     };