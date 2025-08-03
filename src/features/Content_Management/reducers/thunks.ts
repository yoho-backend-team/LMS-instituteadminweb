import EditmodulePage from "../../../components/contentmanagement/editmodule/editmodule";
import {
  AddModule,
  DeleteModule,
  EditModule,
  GetAllModule,
  ToggleModuleStatus,
  UploadFile,
} from "../services/index";
import {
  addModules,
  deleteModule,
  getModule,
  updateModuleStatus,
  upload_editdata,
} from "./moduleSlice";

export const GetallModuleThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await GetAllModule(params);
    dispatch(getModule(response.data.data));
    console.log(response.data.data, "Module Slice in thunks");
  } catch (error) {
    console.log("error in thunks", error);
  }
};

export const DeletemoduleThunks =
  (params: { id: string }) => async (dispatch: any) => {
    try {
      await DeleteModule(params); // no response expected
      dispatch(deleteModule(params.id)); // pass just the ID to reducer
      console.log("Deleted module ID:", params.id);
    } catch (error) {
      console.error("Error in thunks", error);
    }
  };

 
export const AddModuleThunks =
  (data: any) => async (dispatch: any) => {
    try {
      const result = await AddModule(data); 
      dispatch(addModules(result)); 
      console.log("Added module:", result);
    } catch (error) {
      console.error("Error in AddModuleThunks", error);
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

export const Upload_addFileThunks =
  (params: FormData) => async (dispatch: any) => {
    try {
      const uploadedData = await UploadFile(params);
      dispatch(upload_editdata(uploadedData));
      console.log("Uploaded file:", uploadedData);
      return uploadedData;
    } catch (error) {
      console.log("Error in upload thunk", error);
    }
  };

export const UpdateModuleStatusThunk = (data: any) => async (dispatch: any) => {
  try {
    const updated = await ToggleModuleStatus(data);
    console.log("API response in Thunk:", updated);
    dispatch(
      updateModuleStatus({
        module_id: data.module_id,
        status: data.status,
      })
    );
  } catch (error) {
    console.error("Error toggling status:", error);
  }
};
