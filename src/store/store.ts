import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/ContentMangement/Notes/Reducer/noteSlice';
import staffattendance from '../features/teachingstaffAttendance/slice';
import StudentSlice from "../features/StudentManagement/reducer/StudenSlicet"
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
import StaffSlice from '../features/staff/reducers/slices'
import AllNotificationReducer from '../features/AllNotifications/Reducers/slices';
import CertificateManagemetSlice from '../features/certificateManagement/reducers/slice'
import usersSlice from '../features/Users_Management/Users/redux/slice'
import Coursedata from '../features/StudentManagement/reducer/StudenSlicet'
import StaffSalary from"../features/Payment_Managemant/salary/reducers/moduleSlice"
// import authUserReducer from '../features/Profile_Security/reducer/authUserSlice';
import timelineReducer from '../features/Profile_Security/reducer/timelineSlice';


const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		StudentSlice: StudentSlice,
		// authusers: authUserReducer,	
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
		StaffSlice: StaffSlice,
		AllNotificationReducer: AllNotificationReducer,
		CertificateManagemetSlice: CertificateManagemetSlice,
		usersSlice: usersSlice,
		Coursedata: Coursedata,
		StaffSalary:StaffSalary,
        timelineReducer:timelineReducer,


	},
})




export default store;




