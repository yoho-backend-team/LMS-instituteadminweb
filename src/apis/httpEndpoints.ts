/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLocalStorage } from '../utils/localStorage';

export const getInstituteDetails = () => {
	const institute: any = GetLocalStorage('instituteId');
	return institute ?? undefined;
};

export const getSelectedBranchId = () => {
	const branch: any = GetLocalStorage('selectedBranchId');
	return branch ?? undefined;
};

const generateEndpoints = () => {
	const instituteId = getInstituteDetails();
	const branchId = getSelectedBranchId();

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
			getDash: `/api/institutes/:instituteid/branches/`,
			getAll: `/api/institutes/:instituteid/branches/`,
			create: `/api/institutes/:instituteid/branches/`,
			getByBranchId: `/api/institutes/:instituteid/branches/:branchuuid`,
			edit: `/api/institutes/:instituteid/branches/:branchuuid`,
			delete: `/api/institutes/:instituteid/branches/:branchuuid`,
			updatestatus: `/api/institutes/:instituteid/branches/:branchuuid`,
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
			getall: `/api/institutes/:instituteid/branches/:branchid/courses`,
			get: `/api/institutes/:instituteid/:branchid/course/:courseId`,
			update: `/api/institutes/:instituteid/categories/`,
			withBranch: `/api/institutes/:instituteid/branches/`,
			add: `/api/institutes/:instituteid/categories/`,
			template: `/api/institutes/:instituteid/branches/:branchid/course-template`,
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
			create: `/api/institutes/:instituteid/branches/`,
			getAll: `/api/institutes/:instituteid/branches/`,
			// getWithId: `/api/institutes/:instituteid/branches/${branchId}/batches/all`,
			getWithId: `/api/institutes/973195c0-66ed-47c2-b098-d8989d3e4529/branches/90c93163-01cf-4f80-b88b-4bc5a5dd8ee4/batches/all`,
			update: `/api/institutes/973195c0-66ed-47c2-b098-d8989d3e4529/branches/90c93163-01cf-4f80-b88b-4bc5a5dd8ee4/update/:batchId`,
			// update: `/api/institutes/:instituteid/branches/${branchId}/update/`,
			delete: `/api/institutes/:instituteid/branches/${branchId}/batches/:batchId`,
			getBatchwithCourse: `/api/institutes/:instituteid/branches/:branchid/courses/:courseId/batches`,
		},
		online_class: {
			getAll: `/api/institutes/class/online/all`,
			getWithId: `/api/institutes/class/online/`,
			create: `/api/institutes/class/online`,
			update: `/api/institutes/class/online/update/:classId`,
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
			get: `/api/institutes/:instituteid/branches/:branchid/students`,
			getWithId: `/api/institutes/auth/student/:instituteid/students/`,
			getall: `/api/institutes/:instituteid/branches/:branchid/:courseUUID/students`,
			getWithBatch: `/api/institutes/:instituteid/branches/`,
			getWithCourse: `/api/institutes/:instituteid/branches/`,
			update: `/api/institutes/:instituteId/students/update/`,
			delete: `/api/institutes/student/student/`,
			activity: `/api/institutes/:instituteid/students/student/activity/`,
			liveClasses: `/api/institutes/class/online/all/`,
			// classess: `/api/institutes/973195c0-66ed-47c2-b098-d8989d3e4529/branches/90c93163-01cf-4f80-b88b-4bc5a5dd8e e4/students/`,
			classess: `/api/institutes/:instituteid/branches/:branchid/students`,
		},
		payment: {
			fee: {
				create: '/api/institutes/payments/student-fee/create',
				getAllSalary: `/api/institutes/payments/student-fee/all/?branch_id=:branchid`,
				delete: '/api/institutes/payments/student-fee/',
				update: '/api/institutes/payments/student-fee/update',
			},
			salary: {
				getall: '/api/institutes/payments/staff-salary/all',
				create: '/api/institutes/payments/staff-salary',
				update: '/api/institutes/payments/staff-salary/update/',
				delete: '/api/institutes/payments/staff-salary/',
			},
		},
		id_cards: {
			student: {
				all: '/api/institute/student/id_cards/all',
			},
			staff: {
				all: `/api/staffidcard/:instituteid/:branchid/`,
			},
		},
		staff: {
			get: `/api/institutes/${instituteId}/Non-teaching-staff/`,
			getWithName: `/api/institutes/973195c0-66ed-47c2-b098-d8989d3e4529/branches/90c93163-01cf-4f80-b88b-4bc5a5dd8ee4/teaching-staff`,
			getWithId: `/api/institutes/${instituteId}/staff/`,
			getWithcourse: `/api/institutes/${instituteId}/branches/${branchId}/courses/`,
			getWithBranch: `/api/institutes/${instituteId}/branches/`,
			getWithid: `/api/institutes/973195c0-66ed-47c2-b098-d8989d3e4529/branches/90c93163-01cf-4f80-b88b-4bc5a5dd8ee4/staff/:staffId`,
			getActivtiy:
				'/api/institutes/user/activity/staff/67f3bebeb8d2634300cc8aec',
			getClasses: '/api/institutes/class/staff/:id',
			update: `/api/institutes/${instituteId}/branches/${branchId}/teaching-staff/update/`,
			updateStatus: `api/institutes/${instituteId}/branches/${branchId}/teaching-staff/update/:staff`,
			create: 'api/institutes/auth/teaching-staff/register',
			delete:
				'api/institutes/973195c0-66ed-47c2-b098-d8989d3e4529/branches/90c93163-01cf-4f80-b88b-4bc5a5dd8ee4/teaching-staff/',
		},
		nonstaff: {
			getWithId: `/api/institutes/${instituteId}/branches/${branchId}/nonstaff/`,
		},
		community: {
			all: `/api/institutes/community/:instituteid/branches/:branchid`,
			messages: `/api/institutes/community/messages/`,
			get_all_messages: `/api/institutes/community/messages/all/`,
		},
		ticket: {
			student_ticket: `/api/institutes/student-ticket/getalll`,
			update_student_status_ticket: `/api/institutes/student-ticket/update/`,
			update: `/api/institutes/student-ticket/update/`,
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
			student_notification_resend: `/api/notification/student-notification-resend`,
			staff_notification: `/api/institutes/staff/notifications/all`,
			staff_notification_resend: `/api/notification/staff-notification-resend`,
			create_staff_notification: `/api/institutes/staff/notifications/`,
			institute_notification: `/api/institutes/branch/notifications`,
			all_notification_resend: `api/notification/student-notification-resend`,
			institute_notification_resend: `/api/notification/institute/resend-notification`,
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
			get: `/api/institutes/:instituteid/report/`,
		},
		placements: {
			create: `/api/placements/create`,
			getAll: `/api/placements/all`,
			update: `/api/placements/update`,
			getById: `/api/placements/fetch`,
			delete: `/api/placements/delete/`,
		},
		refund: {
			create: `/api/institutes/payments/refund/create`,
			getAll: `/api/institutes/payments/refund/all`,
			getById: `/api/institutes/payments/refund/:id`,
			update: `/api/institutes/payments/refund/update/`,
			delete: `/api/institutes/payments/refund/:_id`,
			query: `/api/institutes/payments/refund/:query`,
		},
		notificationSubscription: {
			post: '/notification/subscribe',
		},
		certificate: {
			get: `/api/certificate/:instituteid/:branchid/`,
			put: '/api/certificate/update/:certificateid',
			create: '/api/certificate/create',
			delete: '/api/certificate/delete/:certificateid',
		},
		helpcenter: {
			getall: '/api/helpcenter/',
			delete: '/api/helpcenter/delete/',
			update: '/api/helpcenter/update/',
		},
	};
};

export const HTTP_END_POINTS = generateEndpoints();
