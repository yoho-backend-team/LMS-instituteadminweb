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
import subscriptionReducer from '../components/subscription/slice'
import StudentTicketReducer from '../features/StudentTicket/Reducers/slices';
import StaffNotificationSlice from '../features/staffNotification/reducers/slices'
import StudentNotificationSlice from '../features/StudentNotification/reducer/NotificationSlice';
import helpCenterFaqs from '../features/HelpCenter/slice'
import ticketAdmin from '../features/TicketManagement/YourTicket/slice'
import StaffSalary from "../features/Payment_Managemant/salary/reducers/moduleSlice"
import PlacementReducer from '../features/placementManagement/Reducer/slice'
import FaqsSlice from '../features/Faq/reducers/slice'
import faqCategory from '../features/Faq_Category/slice'
// import authUserReducer from '../features/Profile_Security/reducer/authUserSlice';
import timelineReducer from '../features/Profile_Security/reducer/timelineSlice';
import StaffTicket from "../features/Ticket_Management/reducers/moduleSlice"
import Studentfees from "../features/Payment_Managemant/salary/fees/reducers/moduleSlice"
import community from "../features/Community/Reducers/CommunitySlice";
import refundReducer from "../features/Refund_management/Reducer/refundSlice"
import CategoriesSlice from '../features/Course mangement/categories/reducers/slice'
import branchReducer from '../features/Branch_Management/reducers/branchSlice';



const store = configureStore({
	reducer: {
		staffAttendace: staffattendance,
		StudentSlice: StudentSlice,
		// authusers: authUserReducer,	
		refund: refundReducer,
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
		subscription: subscriptionReducer,
		StudentTicketReducer: StudentTicketReducer,
		StaffNotificationSlice: StaffNotificationSlice,
		StudentNotificationSlice: StudentNotificationSlice,
		helpCenterFaqs: helpCenterFaqs,
		ticketAdmin: ticketAdmin,
		StaffSalary: StaffSalary,
		placements: PlacementReducer,
		FaqsSlice: FaqsSlice,
		faqCategory: faqCategory,
		timelineReducer: timelineReducer,
		StaffTicket: StaffTicket,
		Studentfees: Studentfees,
		community: community,
		categoriesSlice: CategoriesSlice,
	   branches: branchReducer,


	},
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
