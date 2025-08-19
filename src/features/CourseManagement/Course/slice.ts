import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  uuid: string;
  name: string;
  description?: string;
  // Add other fields based on your course model
}

interface CourseState {
  data: Course[];
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
    addCourse: (state, action: PayloadAction<Course>) => {
      state.data.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const updated = action.payload;
      const index = state.data.findIndex((item) => item.uuid === updated.uuid);
      if (index !== -1) {
        state.data[index] = updated;
      }
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
  },
});

export const {
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} = CourseSlice.actions;

export default CourseSlice.reducer;
