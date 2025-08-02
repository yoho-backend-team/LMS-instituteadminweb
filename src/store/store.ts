import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/ContentMangement/Notes/Reducer/noteSlice';
import staffattendance from '../features/teachingstaffAttendance/slice';
import ModuleSlice from '../features/Content_Management/reducers/moduleSlice';
import IdcardSlice from '../features/StudentIdCard/reducers/IdcardSlice';
import StaffIDcardSlice from '../features/StaffIdCard/reducers/IdcardSlice';
import DashboardSlice from '../features/Dashboard/reducers/DashboardSlice';
import OfflineClassSlice from '../features/Class Management/offlineClass/redures/slice'
import liveClassReducer from '../features/Class Management/Live Class/reducers/slices';
import batchReducer from '../features/batchManagement/reducers/slices';
import studentAttendance from '../features/Attendance_Managemenet/Student_Attendance/redux/slice'
import auth from '../features/Auth/reducer/slice'
import studyMaterial from "../features/StudyMaterials/slice"
import addQuestion from "../features/HelpManagement/AddQuestion/slice"
import GroupCardSlice from "../features/Users_Management/Group/reducers/Slice"


const store = configureStore({
  reducer: {
    staffAttendace: staffattendance,
    IdcardSlice: IdcardSlice,
    ModuleSlice: ModuleSlice,
    note: noteReducer,
    StaffIDcardSlice: StaffIDcardSlice,
    DashboardSlice: DashboardSlice,
    liveClassReducer: liveClassReducer,
    OfflineClassSlice: OfflineClassSlice,
    batchReducer: batchReducer,
    studentAttendance: studentAttendance,
    authuser: auth,
    studyMaterial: studyMaterial,
    addQuestion: addQuestion,
    GroupCardSlice: GroupCardSlice,
  },
})


export default store;
