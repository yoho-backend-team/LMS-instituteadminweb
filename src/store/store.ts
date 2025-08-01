import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/ContentMangement/Notes/Reducer/noteSlice';
import staffattendance from '../features/teachingstaffAttendance/slice';
import ModuleSlice from '../features/Content_Management/reducers/moduleSlice';
import IdcardSlice from '../features/StudentIdCard/reducers/IdcardSlice';
import StaffIDcardSlice from '../features/StaffIdCard/reducers/IdcardSlice';
import DashboardSlice from '../features/Dashboard/reducers/DashboardSlice';

const store = configureStore({
  reducer: {
    staffAttendace: staffattendance,
    IdcardSlice: IdcardSlice,
    ModuleSlice: ModuleSlice,
    note: noteReducer,
    StaffIDcardSlice: StaffIDcardSlice,
    DashboardSlice: DashboardSlice,
  },
});

export default store;
