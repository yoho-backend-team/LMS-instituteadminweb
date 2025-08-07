import EditmodulePage from "../../../components/contentmanagement/editmodule/editmodule";
import {
  AddModule,
  DeleteModule,
  EditModule,
  GetAllModule,
  GetBranch,
  GetBranchCourse,
  ToggleModuleStatus,
  UploadFile,
} from "../services/index";
import {
  addModules,
  deleteModule,
  getBranchCourse,
  getBranches,
  getModule,
  updateModuleStatus,
  upload_editdata,
} from "./moduleSlice";

export const GetallModuleThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await GetAllModule(params);
    dispatch(getModule(response.data.data));

  } catch (error) {
    console.log("error in thunks", error);
  }
};

export const DeletemoduleThunks =
  (params: { id: string, uuid: string }) => async (dispatch: any) => {
    try {
      await DeleteModule(params);
      dispatch(deleteModule(params.id));
    } catch (error) {
      console.error("Error in thunks", error);
    }
  };




export const EditModuleThunks = (params: any) => async (dispatch: any) => {
  try {
    const updatedData = await EditModule(params);
    dispatch(EditmodulePage(updatedData));
  } catch (error) {
    console.log("Error in edit thunk", error);
  }
};

export const Upload_addFileThunks =
  (params: FormData) => async (dispatch: any) => {
    try {
      const uploadedData = await UploadFile(params);
      dispatch(upload_editdata(uploadedData));
      return uploadedData;
    } catch (error) {
      console.log("Error in upload thunk", error);
    }
  };

export const UpdateModuleStatusThunk = (data: any) => async (dispatch: any) => {
  try {
    const updated = await ToggleModuleStatus(data);
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

export const AddModuleThunks = (data: any) => async (dispatch: any) => {
  try {
    const result = await AddModule(data);
    dispatch(addModules(result));
    return result
  } catch (error) {
    console.error("Error in AddModuleThunks", error);
  }
};



export const GetBranchThunks =
  (params: any) => async (dispatch: any) => {
    try {
      const result = await GetBranch(params);
      dispatch(getBranches(result.data));
      return result.data;
    } catch (error) {
      console.error("Error in GetBranchThunks", error);
    }
  };



export const GetBranchCourseThunks = (branchname: string) => async (dispatch: any) => {
  try {
    const response = await GetBranchCourse(branchname);
    dispatch(getBranchCourse(response.data));
  } catch (error) {
    console.error("Error fetching branch courses in thunk", error);
  }
};





