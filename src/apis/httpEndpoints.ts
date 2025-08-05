import secureLocalStorage from 'react-secure-storage';
import { GetLocalStorage } from '../utils/localStorage';

export const getInstituteDetails = () => {
	if (typeof secureLocalStorage !== 'undefined') {
		const institute = GetLocalStorage('instituteId');
		return institute;
	} else {
		return null;
	}
};

export const getSelectedBranchId = () => {
	if (typeof secureLocalStorage !== 'undefined') {
		const branch = GetLocalStorage('selectedBranchId');
		return branch;
	} else {
		return null;
	}
};

const generateEndpoints = () => {
	const instituteId = getInstituteDetails()
	const branchId = getSelectedBranchId()

	return {
		admin: {
			me: `/api/institutes/auth/admin/me`,
			change_password: '/api/institutes/auth/admin/change-password',
			forget_password: `/api/institutes/auth/admin/forget-password`,
			validate_otp: `/api/institutes/auth/admin/validate-otp`,
			verfiy_otp: '/api/institutes/auth/admin/verify-otp/',
			reset_password: `/api/institutes/auth/admin/update-password`,
			login: '/api/institutes/auth/admin/login/',
			logout: '/api/institutes/admin/institute-user/logout',
		},
		permission: {
			getAll: `/api/admin/institutes/permissions/all`,
			update: `/api/admin/institutes/groups/permissions`,
		},
		group: {
			create: '/api/admin/institutes/role',
			getAll: '/api/admin/institutes/groups/all/',
			permissions: '/api/lms/institutes/groups/permissions/',
			update_status: '/api/admin/institutes/groups/update-status/',
			delete: '/api/admin/institutes/group/delete/',
		},
		user: {
			add: '/api/institutes/auth/admin/register',
			all: '/api/institutes/auth/admin/users/all',
			getWihtId: '/api/institutes/auth/admin/user/',
			update: '/api/institutes/auth/admin/user/update/',
			delete: '/api/institutes/auth/admin/user/delete/',
			getWithRoleName: '/api/institutes/attedance/user-list/',
		},
		branch: {
			// getAll: `/api/institutes/${instituteId}/branches/`,
			getAll: `/api/institutes/${instituteId}/branches/`,
			create: `/api/institutes/${instituteId}/branches/`,
		},
		faq: {
			create: `/api/institutes/faq`,
			getAll: `/api/institutes/faq/all`,
			delete: `/api/institutes/faq/delete/:uuid`,
			update: `/api/institutes/faq/update/:uuid`,
		},
		faq_category: {
			create: `/api/institutes/faq/category`,
			getAll: `/api/institutes/faq/category`,
			update: `/api/institutes/faq/category/update/:uuid`,
			delete: `/api/institutes/faq/category/delete/:uuid`,
		},
		category: {
			getAll: `/api/institutes/${instituteId}/categories/`,
			create: `/api/institutes/${instituteId}/categories`,
			update: `/api/institutes/faq/category/update/:uuid`,
			delete: `/api/institutes/faq/category/delete/:uuid`,
		},
		course: {
			get: `/api/institutes/${instituteId}/branches/`,
			update: `/api/institutes/${instituteId}/categories/`,
			withBranch: `/api/institutes/${instituteId}/branches/`,
			add: `/api/institutes/${instituteId}/categories/`,
			template: `/api/institutes/${instituteId}/branches/${branchId}/course-template`,
		},
		course_module: {
			get: '/api/institutes/course-module/',
			update_status: '/api/institutes/course-module/update-status/',
			update: '/api/institutes/course-module/update/',
		},
		study_material: {
			get: 'api/institutes/study-material/',
			update_status: '/api/institutes/study-material/',
		},
		notes: {
			index: '/api/institutes/course/note',
			update_status: '/api/institutes/course/note/update/',
		},
		batch: {
			create: `/api/institutes/${instituteId}/branches/`,
			getAll: `/api/institutes/${instituteId}/branches/`,
			// getWithId: `/api/institutes/${instituteId}/branches/${branchId}/batches/all`,
			getWithId: `/api/institutes/${instituteId}/branches/${branchId}/batches/all`,
			update: `/api/institutes/${instituteId}/branches/${branchId}/update/:batchId`,
			// update: `/api/institutes/${instituteId}/branches/${branchId}/update/`,
			delete: `/api/institutes/${instituteId}/branches/${branchId}/batches/:batchId`
		},
		online_class: {
			getAll: `/api/institutes/class/online/all`,
			getWithId: `/api/institutes/class/online/`,
			create: `/api/institutes/class/online`,
			update: `/api/institutes/class/online/update/:classId`,
			delete: `/api/institutes/class/online/`,
		},
		offline_class: {
			create: `/api/institutes/class/offline`,
			getAll: `/api/institutes/class/offline/all`,
			getWithId: `/api/institutes/class/offline/`,
			update: `/api/institutes/class/offline/update/`,
			delete: `/api/institutes/class/offline/`,
		},
		file: {
			upload: `/api/upload/`,
		},
		users: {
			valiateOtp: `/api/institutes/auth/admin/verify-otp/`,
			studentRegister: '/api/institutes/auth/student/register',
			logout: `/api/institutes/auth/admin/logout`,
		},
		student: {
			// get: `/api/institutes/${instituteId}/branches/${branchId}/students`,
			get: `/api/institutes/${instituteId}/branches/${branchId}/students`,
			getall: `/api/institutes/${instituteId}/branches/${branchId}/:courseUUID/students`,
			getWithId: `/api/institutes/auth/student/${instituteId}/students/`,
			getWithBatch: `/api/institutes/${instituteId}/branches/`,
			getWithCourse: `/api/institutes/${instituteId}/branches/`,
			update: `/api/institutes/${instituteId}/students/update/`,
			delete: `/api/institutes/student/student/`,
			activity: `/api/institutes/${instituteId}/students/student/activity/`,
			// classess: `/api/institutes/:instituteId/students/student/classes/`
			classess: `/api/institutes/${instituteId}/branches/${branchId}/students/`
		},
		payment: {
			fee: {
				create: '/api/institutes/payments/student-fee/create',
			},
			salary: {
				getall: '/api/institutes/payments/staff-salary/all',
				create: '/api/institutes/payments/staff-salary',
			}
		},
		id_cards: {
			student: {
				all: `/api/institute/student/id_cards/all`,
			},
			staff: {
				all: `/api/staffidcard/${instituteId}/${branchId}/`,
			},
		},
		staff: {
			get: `/api/institutes/${instituteId}/Non-teaching-staff/`,
			getWithName: `/api/institutes/${instituteId}/branches/${branchId}/teaching-staff`,
			getWithId: `/api/institutes/${instituteId}/staff/`,
			getWithcourse: `/api/institutes/${instituteId}/branches/${branchId}/courses/`,
			getWithBranch: `/api/institutes/${instituteId}/branches/`,
			getWithid: `/api/institutes/${instituteId}/branches/${branchId}/staff/:staffId`,
			// getActivtiy: "/api/institutes/user/activity/staff/",
			getActivtiy: "/api/institutes/user/activity/staff/67f3bebeb8d2634300cc8aec",
			getClasses: "/api/institutes/class/staff/67f3bebeb8d2634300cc8aec",
			update: `/api/institutes/${instituteId}/branches/${branchId}/teaching-staff/update/:staffId`,
			create: 'api/institutes/auth/teaching-staff/register',
			delete: `api/institutes/${instituteId}/branches/${branchId}/teaching-staff/:staffId`
		},
		nonstaff: {
			getWithId: `/api/institutes/${instituteId}/branches/${branchId}/nonstaff/`,
		},
		community: {
			all: `/api/institutes/community/${instituteId}/branches/`,
			messages: `/api/institutes/community/messages/`,
			get_all_messages: `/api/institutes/community/messages/all/`,
		},
		ticket: {
			student_ticket: `/api/institutes/student-ticket/getalll`,
			update_student_status_ticket: `/api/institutes/student-ticket/update/`,
			// update: `/api/institutes/student-ticket/update/`,
			student_ticket_with_id: `/api/institutes/student-ticket/`,
			staff_ticket: `/api/institutes/staff/ticket/all`,
			staff_ticket_with_id: `/api/institutes/staff/ticket/`,
			update_staff_ticket: `/api/institutes/staff/ticket/updatestatus/`,
			admin: {
				create_ticket: `/api/institutes/admin/ticket`,
				get_all: `/api/institutes/admin/ticket/all`,
				get_with_id: `/api/institutes/admin/ticket/`,
				update: `/api/institutes/admin/ticket/update/`,
			},
		},
		attedence: {
			student_all: `/api/institutes/attedance/students`,
			get_with_id: `/api/institutes/attedance/student/`,
			student_mark: `/api/institutes/attedance/student/mark-attedence`,
			staff_mark: `/api/institutes/attedance/staff/attedence`,
			non_staff_mark: `/api/institutes/non-attedence/non-teaching-staff/attedence`,
			staff_all: `/api/institutes/attedance/staff/attedence`,
			non_teaching_all: `/api/institutes/non-attedence/non-teaching-staff/attedence`,
			get_staff_attedence_with_id: `/api/institutes/attedance/staff/`,
			get_non_staff_with_id: `/api/institutes/non-attedence/non_teaching_staff/`,
		},
		notification: {
			student_notification: `/api/institutes/students/notifications/all`,
			student_notification_get: `/api/institutes/students/notifications`,
			staff_notification: `/api/institutes/staff/notifications/all`,
			create_staff_notification: `/api/institutes/staff/notifications/`,
			institute_notification: `/api/institutes/branch/notifications`,
			all_notification_resend: `api/notification/student-notification-resend`
		},
		institute_notification: {
			get_all: `/api/notification/institute/`,
			update: `/api/notification/institute/update/`,
		},
		subscription: {
			all_plans: `/api/institutes/payments/subscription/all`,
			institute_subscription: `/api/institutes/payments/subscription/`,
			status_check: `/api/subscription/institute-subscription/status/`,
			upgrade_request: `/api/subscription/institute/upgrade-subscription/`,
		},
		activity: {
			get: '/api/institutes/user/activities/',
		},
		reports: {
			get: `/api/institutes/${instituteId}/report/`,
		},
		placements: {
			create: `/api/placements/create`,
			getAll: `/api/placements/all`,
			update: `/api/placements/update`,
			getById: `/api/placements/fetch`,
		},
		notificationSubscription: {
			post: '/notification/subscribe',
		},
		certificate: {
			// get :'/api/certificate/973195c0-66ed-47c2-b098-d8989d3e4529/%2290c93163-01cf-4f80-b88b-4bc5a5dd8ee4%22',
			get: `/api/certificate/${instituteId}/${branchId}/`,
			put: '/api/certificate/update/:certificateid',
			create: '/api/certificate/create',
			delete: '/api/certificate/delete/:certificateid'
		}
	};
};

export const HTTP_END_POINTS = generateEndpoints();
