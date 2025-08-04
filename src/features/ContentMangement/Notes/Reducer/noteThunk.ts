import {
  setLoading,
  setError,
  setNotes,
  addNote,
  EditsNote,
  deleteNote,
  setBranches,
  setCourses,
} from "./noteSlice";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote as deleteNoteApi,
  uploadFile,
  BranchDrop,
  CourseDrop,
} from "../Services/index";

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
      payload.file = uploadRes.data?.data?.file;
      delete payload.fileName;
    }
    payload.slug = payload.title;
    payload.institute = "67f3a26df4b2c530acd16419";
    payload.is_active = true;
    delete payload.isActive;

    const response = await createNote(payload);
    dispatch(addNote(response.data.data));
  } catch (error: any) {
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
export const fetchBranchesThunk = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await BranchDrop({});
    const branches = response?.data?.branch ?? [];

    dispatch(setBranches(branches));
  } catch (error: any) {
    dispatch(setError("Failed to fetch branches"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCoursesByBranchThunk =
  (payload: { branchId: string; instituteId: string }) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const response = await CourseDrop({
        branch_id: payload.branchId,
        institute_id: payload.instituteId,
      });
      const courses = response?.data ?? [];
      dispatch(setCourses(courses));
    } catch (error: any) {
      dispatch(setError("Failed to fetch courses"));
    } finally {
      dispatch(setLoading(false));
    }
  };
