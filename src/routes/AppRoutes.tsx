import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../pages/Auth/AuthContext';
import LoginPage from '../pages/Auth/Login/LoginPage';
import OtpVerification from '../pages/Auth/OtpVerification/OtpVerification';
import ChangePassword from '../pages/Auth/Change Password/ChangePassword';
import Dashboard from '../pages/Dashboard/Dashboard';
import AllNotifications from '../pages/Notification Management/All Notifications/AllNotifications';
import StaffsNotifications from '../pages/Notification Management/Staffs/StaffsNotifications';
import StudentNotifications from '../pages/Notification Management/Students/StudentNotifications';
import Community from '../pages/Community/Community';
import BranchManagement from '../pages/Branch Management/BranchManagement';
import Users from '../pages/User Management/Users/Users';
import Group from '../pages/User Management/Group/Group';
import Courses from '../pages/Course Management/Courses/Courses';
import Categories from '../pages/Course Management/Categories/Categories';
import StudyMaterials from '../pages/Content Management/Study Materials/StudyMaterials';
import Notes from '../pages/Content Management/Notes/Notes';
import Modules from '../pages/Content Management/Modules/Modules';
import TeachingStaffs from '../pages/Staff Management/Teaching Staffs/TeachingStaffs';
import Students from '../pages/Student Management/Students/Students';
import BatchManagement from '../pages/Batch Management/BatchManagement';
import OfflineClasses from '../pages/Class Management/Offline Classes/OfflineClasses';
import LiveClasses from '../pages/Class Management/Live Classes/LiveClasses';
import StudentsAttendance from '../pages/Attendance Management/Students Attendance/StudentsAttendance';
import StudentFees from '../pages/Payment Management/Fees/StudentFees';
import StaffSalaries from '../pages/Payment Management/Salaries/StaffSalaries';
import Subscription from '../pages/Payment Management/Subscription/Subscription';
import RefundFees from '../pages/Refund Management/Fees/RefundFees';
import StudentCertificate from '../pages/Certificate Management/Student Certificate/StudentCertificate';
import StudentIDCard from '../pages/ID Card Management/Student ID Card/StudentIDCard';
import StaffIDCard from '../pages/ID Card Management/Staff ID Card/StaffIDCard';
import Placement from '../pages/Placement Management/Placement';
import HelpFAQs from '../pages/Help Center/Help FAQ/HelpFAQs';
import AddQuestions from '../pages/Help Center/Add Question/AddQuestions';
import StudentTickets from '../pages/Ticket Management/Student/StudentTickets';
import StaffTickets from '../pages/Ticket Management/Staff/StaffTickets';
import YourTicket from '../pages/Ticket Management/Your Ticket/YourTicket';
import FAQs from '../pages/FAQ Category/FAQs';
import Category from '../pages/FAQ Category/Category';
import { MainLayout } from '../layout/MainLayout';
import StaffsAttendance from '../pages/Attendance Management/Staffs Attendance/StaffsAttendance';
import MainPage from '../components/staff/MainPage';
import StudentDashboardMain from '../components/BatchManagement/viewBatch';
import ViewLiveClassId from '../components/ClassManagement/Live Class/viewLiveClassId';
import StudentClassBatch from '../components/class management/offlineClass/studentbatchcard';
import { Profile } from '../components/StudentManagement/Profile';
import StudentDetails from '../features/Attendance_Managemenet/Student_Attendance/components/StudentDetails';
import NotificationPage from '../pages/Notification/NotificationPage';
// import Home from '../pages/Notification/'
import Accountpf from '../components/Profile/AccProfile';
import EditUserInfo from '../components/Profile/EditUserInfo';
import SecureDelivery from '../components/HelpFAQ/SecureDelivery';
import FindMissingOrder from '../components/HelpFAQ/FindMissingOrder';
import TrackOrder from '../components/HelpFAQ/TrackOrder';

// import SecurityProfile from '../components/Profile/Secprofile';
const AppRoutes = () => {
	// const { isAuthenticated, isLoading } = useAuth();
	const isAuthenticated = true;

	// if (isLoading) return null;

	const AuthRoutes = () => (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/otp-verify' element={<OtpVerification />} />
			<Route path='/reset-password' element={<ChangePassword />} />
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);

	const AdminRoutes = () => (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Dashboard />} />
				{/* Profile Management */}
				
				<Route path="noti/msg" element={<NotificationPage />} />
				{/* <Route path="/" element={<HomePage />} /> */}

				{/* <Route path='profile' element={<SecurityProfile />} /> */}
				<Route path='profile' element={<Accountpf />} />
				<Route path='Editprof' element={<EditUserInfo />} />
				{/* Notifications Management */}
				<Route path='notifications' element={<AllNotifications />} />
				<Route path='staff-notifications' element={<StaffsNotifications />} />
				<Route
					path='student-notifications'
					element={<StudentNotifications />}
				/>
				<Route path='community' element={<Community />} />

				{/* Branch Management */}
				<Route path='branch' element={<BranchManagement />} />

				{/* User Management */}
				<Route path='users' element={<Users />} />
				<Route path='group' element={<Group />} />

				{/* Course Management */}
				<Route path='courses' element={<Courses />} />
				<Route path='categories' element={<Categories />} />

				{/* Content Management */}
				<Route path='study-materials' element={<StudyMaterials />} />
				<Route path='notes' element={<Notes />} />
				<Route path='modules' element={<Modules />} />

				{/* Staff Management */}
				<Route path='staffs' element={<TeachingStaffs />} />
				<Route path='staffs-details' element={<MainPage />} />

				{/* Student Management */}
				<Route path='students' element={<Students />} />
				<Route path='students/Profile' element={<Profile />} />

				{/* Batch Management */}
				<Route path='batch' element={<BatchManagement />} />
				<Route path='/view-batch' element={<StudentDashboardMain />} />

				{/* Class Management */}
				<Route path='offine-classes' element={<OfflineClasses />} />
				<Route path='/view-student' element={<StudentClassBatch />} />
				<Route path='live-classes' element={<LiveClasses />} />
				<Route path='live-classes/:id' element={<ViewLiveClassId />} />

				{/* Attendance Management */}
				<Route path='students-attendance' element={<StudentsAttendance />} />
				<Route path='students-attendance/details' element={<StudentDetails />} />
				<Route path='staffs-attendance' element={<StaffsAttendance />} />

				{/* Refund Management */}
				<Route path='refund-fees' element={<RefundFees />} />

				{/* Certificate Management */}
				<Route path='students-certificate' element={<StudentCertificate />} />

				{/* Placement Management */}
				<Route path='placement' element={<Placement />} />

				{/* ID Card Management */}
				<Route path='students-id_card' element={<StudentIDCard />} />
				<Route path='staffs-id_card' element={<StaffIDCard />} />

				{/* Help Center */}
				<Route path='help-faqs' element={<HelpFAQs />} />
				<Route path='add-questions' element={<AddQuestions />} />
				<Route path='secure-delivery' element={<SecureDelivery />} />
				<Route path='find-missingpackage' element={<FindMissingOrder />} />
				<Route path='track-order' element={<TrackOrder />} />

				{/* Payment Management */}
				<Route path='student-fees' element={<StudentFees />} />
				<Route path='staff-salaries' element={<StaffSalaries />} />
				<Route path='subscriptions' element={<Subscription />} />

				{/* Ticket Management */}
				<Route path='student-tickets' element={<StudentTickets />} />
				<Route path='staff-tickets' element={<StaffTickets />} />
				<Route path='your-tickets' element={<YourTicket />} />

				{/* FAQ */}
				<Route path='faq-category' element={<Category />} />
				<Route path='faqs' element={<FAQs />} />
				

				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);

	return isAuthenticated ? <AdminRoutes /> : <AuthRoutes />;
};

export default AppRoutes;
