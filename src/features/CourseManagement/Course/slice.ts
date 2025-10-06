/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  uuid: string;
  name: string;
  description?: string;
  // Add other fields based on your course model
}

interface CourseState {
  data: any[];
}

const initialState: CourseState = {
  data: [],
};

const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    addCourse: (state, action) => {
      state.data.unshift(action.payload);
    },
    updateCourse: (state, action) => {
      const updated = action.payload;
      const index = state.data.findIndex((item) => item.uuid === updated.uuid);
      if (index !== -1) {
        state.data[index] = updated;
      }
    },
    editCourse: (state, action) => {
      const updated = action.payload;
      const index = state.data.findIndex((item) => item.uuid === updated.uuid);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], is_active: updated?.is_active }
      }
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
  },
});

export const {
  setCourses,
  addCourse,
  updateCourse,
  editCourse,
  removeCourse,
} = CourseSlice.actions;

export default CourseSlice.reducer;
