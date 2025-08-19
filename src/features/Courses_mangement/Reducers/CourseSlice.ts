import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const CoursesSlice = createSlice({
  name: "Courses",
  initialState,
  reducers: {
     setCCourses: (state, action) => {
      state.data = action.payload;
    },
    addCourse: (state:any, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setCCourses, addCourse } = CoursesSlice.actions;
export default CoursesSlice.reducer;
