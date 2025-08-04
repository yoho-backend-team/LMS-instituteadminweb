
import EditmodulePage from "../../../components/contentmanagement/editmodule/editmodule"
import {  DeleteModule, EditModule, GetAllModule, UploadFile } from "../services/index";
import { deleteModule, getModule, upload_editdata } from "./moduleSlice";

export const GetallModuleThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await GetAllModule(params);
    dispatch(getModule(response.data.data));
    console.log(response.data.data, "Module Slice in thunks");
  } catch (error) {
    console.log("error in thunks", error);
  }
};

export const DeletemoduleThunks = (params: any) => async (dispatch: any) => {
  try {
    await DeleteModule(params); // { id }
    dispatch(deleteModule(params.id)); // plain id
    console.log("Deleted module ID:", params.id);
  } catch (error) {
    console.log("Error in thunks", error);
  }
};


export const EditModuleThunks = (params: any) => async (dispatch: any) => {
  try {
    const updatedData = await EditModule(params);
    dispatch(EditmodulePage(updatedData)); 
    console.log("Edited module:", updatedData);
  } catch (error) {
    console.log("Error in edit thunk", error);
  }
};

export const Upload_addFileThunks = (params: FormData) => async (dispatch: any) => {
  try {
    const uploadedData = await UploadFile(params); 
    dispatch(upload_editdata(uploadedData)); 
    console.log("Uploaded file:", uploadedData);
    return uploadedData
  } catch (error) {
    console.log("Error in upload thunk", error);
  }
};



