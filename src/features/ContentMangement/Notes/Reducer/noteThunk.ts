import {
  setLoading,
  setError,
  setNotes,
  addNote,
  EditsNote,
  deleteNote,
  setBranches,
  setCourses,
  updateNoteStatus,
} from "./noteSlice";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote as deleteNoteApi,
  uploadFile,
  CourseDrop,
  ToggleNoteStatus,
} from "../Services/index";
import { getBranch } from "./selectors";

// Fetch Notes
export const fetchNotesThunk = (params: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await getNotes(params);
    dispatch(setNotes(response.data.data));
    dispatch(setError(null));
  } catch (error: any) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch notes"
      )
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Create Note
export const createNoteThunk = (data: any) => async (dispatch: any) => {
  try {
    let payload = { ...data };
    if (payload.file instanceof File) {
      const uploadRes = await uploadFile(payload.file);
      if (uploadRes?.data?.file) {
        payload.file = uploadRes.data.file;
      } else {
        throw new Error("File upload failed");
      }
    }
    payload.slug = payload.title;
    payload.is_active = payload.isActive ?? true;
    const result = await createNote(payload);
    dispatch(addNote(result));
    console.log("Added Notes:", result);
    return result;
  } catch (error: any) {
    console.error(
      "Error in AddNoteThunks",
      error.response?.data || error.message || error
    );
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create note"
      )
    );
  }
};

// Update Note
export const updateNoteThunk = (data: any) => async (dispatch: any) => {
  try {
    let payload = { ...data };
    if (payload.file instanceof File) {
      const uploadRes = await uploadFile(payload.file);
      console.log(uploadRes, "upload");
      if (uploadRes) {
        payload.file = uploadRes.data?.file;
      } else {
        throw new Error("File upload failed");
      }
    }
    payload.slug = payload.title;
    payload.institute = "67f3a26df4b2c530acd16419";
    payload.is_active = payload.isActive ?? true;
    if (payload.file instanceof File) {
      delete payload.file;
    }
    const response = await updateNote(payload);
    console.log("update:", response);
    dispatch(EditsNote(response.data.data));
  } catch (error: any) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update note"
      )
    );
  }
};

// Delete Note
export const deleteNoteThunk = (id: string) => async (dispatch: any) => {
  try {
    await deleteNoteApi(id);
    dispatch(deleteNote(id));
  } catch (error: any) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete note"
      )
    );
  }
};

// Branch Dropdown
export const GetBranchThunks = (params: any) => async (dispatch: any) => {
  try {
    const result = await getBranch(params);
    dispatch(setBranches(result));
    return result.data;
  } catch (error: any) {
    console.error("Error fetching branches:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch branches"
    );
  }
};

//Course Dropodown
export const fetchCoursesByBranchThunk =
  (params: any) => async (dispatch: any) => {
    try {
      const result = await CourseDrop(params);
      dispatch(setCourses(result));
      return result.data;
    } catch (error: any) {
      console.error("Error fetching courses:", error.message || error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
  };


//Toggle Status Thuck
export const UpdateModuleStatusThunk = (data: any) => async (dispatch: any) => {
  try {
    const updated = await ToggleNoteStatus(data);
    console.log("API response in Thunk:", updated);
    dispatch(
      updateNoteStatus({
        uuid: data._id, 
        isActive: data.status === "active", 
      })
    );
  } catch (error) {
    console.error("Error toggling status:", error);
  }
};
