/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpClient from './httpClient';
import { HTTP_END_POINTS } from './httpEndpoints';
import { getInstituteDetails, getSelectedBranchId } from './httpEndpoints';

class Client {
	admin = {
		me: () => HttpClient.get(HTTP_END_POINTS.admin.me),
		change_password: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.admin.change_password, data),
		forget_password: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.admin.forget_password, data),
		verfiy_otp: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.admin.verfiy_otp, data),
		reset_password: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.admin.reset_password, data),
		login: (data: any) => HttpClient.post(HTTP_END_POINTS.admin.login, data),
		logout: (data: any) => HttpClient.post(HTTP_END_POINTS.admin.logout, data),
		update: (params: string, data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.admin.update.replace(':userId', params),
				data
			),
	};
	permission = {
		getAll: () => HttpClient.get(HTTP_END_POINTS.permission.getAll),
		update: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.permission.update, data),
	};
	group = {
		create: (data: any) => HttpClient.post(HTTP_END_POINTS.group.create, data),
		getAll: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.group.getAll + data.institute_id),
		permissionWithRole: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.group.permissions, data),
		permissionWithRoleEdit: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.group.permissions, data),
		updateStatus: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.group.update_status, data),
		delete: (data: any) =>
			HttpClient.delete(HTTP_END_POINTS.group.delete + data?.id),
	};
	user = {
		add: (data: any) => HttpClient.post(HTTP_END_POINTS.user.add, data),
		getAll: (data: any) => HttpClient.get(HTTP_END_POINTS.user.all, data),
		getWithId: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.user.getWihtId + data.id),
		getWithRoleName: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.user.getWithRoleName, data),
		update: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.user.update + data?.userId, data),
		delete: (data: any) =>
			HttpClient.delete(HTTP_END_POINTS.user.delete + data?.userId),
	};
	branch = {
		getdash: () =>
			HttpClient.get(
				HTTP_END_POINTS.branch.getDash.replace(
					':instituteid',
					getInstituteDetails()
				)
			),
		getAll: (params: string) =>
			HttpClient.get(
				HTTP_END_POINTS.branch.getAll
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				params
			),
		create: (params: any) =>
			HttpClient.post(
				HTTP_END_POINTS.branch.create.replace(
					':instituteid',
					getInstituteDetails()
				),
				params
			),
		edit: (data: any, params: string) =>
			HttpClient.patch(
				HTTP_END_POINTS.branch.edit
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params),
				data
			),
		delete: (params: string, uuid: string) =>
			HttpClient.delete(
				HTTP_END_POINTS.branch.delete
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params),
				uuid
			),
		updatestatus: (params: string, data?: any) =>
			HttpClient.update(
				HTTP_END_POINTS.branch.updatestatus
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params),
				data
			),
		updatestatusNew: (params: string, data?: any) =>
			HttpClient.patch(
				HTTP_END_POINTS.branch.updatestatus
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params),
				data
			),
		getByid: (params: string) =>
			HttpClient.get(
				HTTP_END_POINTS.branch.getByBranchId
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params)
			),
	};
	file = {
		upload: (data: any) => {
			return HttpClient.uploadFile(HTTP_END_POINTS.file.upload, data);
		},
	};
	faq = {
		create: (data: any) => HttpClient.post(HTTP_END_POINTS.faq.create, data),
		getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.faq.getAll, params),
		delete: (data: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.faq.delete.replace(':uuid', data.uuid),
				data
			),
		update: (uuid: string, data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.faq.update.replace(':uuid', uuid),
				data
			),
		statusupdate: (uuid: string, data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.faq.update.replace(':uuid', uuid),
				data
			),
	};
	faq_category = {
		create: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.faq_category.create, data),
		getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.faq_category.getAll, params),
		delete: (data: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.faq_category.delete.replace(':uuid', data.uuid),
				data
			),
		update: (uuid: string, data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.faq_category.update.replace(':uuid', uuid),
				data
			),
	};

	category = {
		get: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.category.getAll.replace(
					':instituteid',
					getInstituteDetails()
				),
				data
			),
		create: (data: any) =>
			HttpClient.post(
				HTTP_END_POINTS.category.create.replace(
					':instituteid',
					getInstituteDetails()
				),
				data
			),
		update: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.category.create.replace(
					':instituteid',
					getInstituteDetails()
				) + `/${data.id}`,
				data
			),
		delete: (data: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.category.create.replace(
					':instituteid',
					getInstituteDetails()
				) + `/${data.uuid}`
			),
	};
	course_module = {
		getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.course_module.get, params),
		create: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.course_module.get, data),
		update: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.course_module.update + data.uuid, data),
		update_status: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.course_module.update_status + data.module_id,
				data
			),
		delete: (data: any) =>
			HttpClient.delete(HTTP_END_POINTS.course_module.get + data.uuid),
	};
	study_material = {
		getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.study_material.get, params),
		create: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.study_material.get, data),
		update: (data: any, uuid: string) =>
			HttpClient.update(HTTP_END_POINTS.study_material.get + uuid, data),
		delete: (data: any) =>
			HttpClient.delete(HTTP_END_POINTS.study_material.get + data.id),
		update_status: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.study_material.update_status + data.id,
				data
			),
	};
	notes = {
		get: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.notes.index, params),
		create: (data: any) => HttpClient.post(HTTP_END_POINTS.notes.index, data),
		update: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.notes.index + `/update/${data.uuid}`,
				data
			),
		update_status: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.notes.update_status + data.id, data),
		delete: (data: any) =>
			HttpClient.delete(HTTP_END_POINTS.notes.index + '/' + data.id),
	};
	course = {
		create: (data: any, options: any) => {
			return HttpClient.post(
				HTTP_END_POINTS.course.add
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) +
					`${data.category}/courses/`,
				data,
				options
			);
		},
		getAll: async (data: any) => {
			return await HttpClient.get(
				HTTP_END_POINTS.course.getall
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				data
			);
		},
		getWithBranch: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.course.withBranch
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) +
					// data?.branch_id +
					'/courses'
			),
		update: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.course.add
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) +
					`${data.category}/courses/${data.course}`,
				data
			),
		delete: (data: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.course.add
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) +
					`${data.category}/courses/${data.id}`
			),
		add_template: (data: any) =>
			HttpClient.post(
				HTTP_END_POINTS.course.template
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				data
			),
		get_course_data: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.course.get
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				data
			),
	};
	batch = {
		// create: (data: any) => HttpClient.post(HTTP_END_POINTS.batch.create + `${data.branch_id}/courses/${data.course}/batches`, data),
		create: (params: any, data: any) =>
			HttpClient.post(
				HTTP_END_POINTS.batch.create
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params?.branch_id)
					.replace(':courseid', params?.course),
				data
			),
		getInstructors: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.batch.create
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) +
					`${data.branch_id}/instructors/${data.course_id}`
			),
		getAll: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.batch.getAll
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) +
					params.branch_id +
					'/batches/all',
				params
			),
		getWithId: (params: string) =>
			HttpClient.get(
				HTTP_END_POINTS.batch.getWithId
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				params
			),
		update: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.batch.update
					.replace(':instituteid', getInstituteDetails())
					.replace(':batchId', data?.uuid)
					.replace(':branchid', getSelectedBranchId()),
				data
			),
		delete: (data: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.batch.delete
					.replace(':instituteid', getInstituteDetails())
					.replace(':batchId', data?.uuid)
					.replace(':branchid', getSelectedBranchId()),
				data
			),
		getWithCourseId: (courseId: any) =>
			HttpClient.get(
				HTTP_END_POINTS.batch.getBatchwithCourse
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId())
					.replace(':courseId', courseId?.course)
					.replace(':branchid', courseId?.branch)
			),
	};
	online_class = {
		getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.online_class.getAll, params),
		getWithId: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.online_class.getWithId + data.class_id),
		create: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.online_class.create, data),
		update: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.online_class.update.replace(':classId', data?.uuid),
				data
			),
		delete: (data: any) =>
			HttpClient.delete(HTTP_END_POINTS.online_class.create + '/' + data.uuid),
	};
	offline_class = {
		create: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.offline_class.create, data),
		getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.offline_class.getAll, params),
		getWithId: (params: any) =>
			HttpClient.get(HTTP_END_POINTS.offline_class.getWithId + params?.id),
		update: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.offline_class.update + data?.uuid,
				data
			),
		delete: (data: any) =>
			HttpClient.delete(HTTP_END_POINTS.offline_class.delete + data.uuid),
	};
	users = {
		verifyOtp: (data: any, options: any) =>
			HttpClient.post(HTTP_END_POINTS.users.valiateOtp, data, options),
		studentRegister: (data: any, options?: any) =>
			HttpClient.post(HTTP_END_POINTS.users.studentRegister, data, options),
		studentsAll: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.get + `${params.branch_id}/students`,
				params
			),
		getStudentWithId: (params: any) =>
			HttpClient.get(HTTP_END_POINTS.student.getWithId + params.student_id),
		getnonstaffWithId: (params: any) =>
			HttpClient.get(HTTP_END_POINTS.nonstaff.getWithId + params.nonstaff_id),
		getstaffWithId: (params: any) =>
			HttpClient.get(HTTP_END_POINTS.staff.getWithid + params.staff_id),
		getStudentsWithCourse: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.getWithCourse + `${data.course_id}/students`
			),
		getStudentsWithBatch: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.getWithBatch.replace(
					':instituteid',
					getInstituteDetails()
				) +
					data.branch_id +
					'/batches/batch-students',
				data
			),
		getStudentsWithCourses: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.getWithCourse +
					`${data.branch_id}/${data.course_id}/students`
			),
		logout: (data: any) => HttpClient.post(HTTP_END_POINTS.users.logout, data),
	};
	payment = {
		student_fee: {
			create: (data: any) =>
				HttpClient.post(HTTP_END_POINTS.payment.fee.create, data),
			get: (data: any) =>
				HttpClient.get(
					HTTP_END_POINTS.payment.fee.getAllSalary.replace(
						':branchid',
						getSelectedBranchId()
					),
					data
				),
			delete: (params: any) =>
				HttpClient.delete(HTTP_END_POINTS.payment.fee.delete + params.uuid),
			update: (data: any) =>
				HttpClient.update(
					HTTP_END_POINTS.payment.fee.update.replace(
						':uuid',
						data?.student?.uuid
					),
					data
				),
		},
		staff_salary: {
			getall: (params: any) =>
				HttpClient.get(HTTP_END_POINTS.payment.salary.getall, params),
			create: (data: any) =>
				HttpClient.post(HTTP_END_POINTS.payment.salary.create, data),
			update: (data: any) =>
				HttpClient.update(
					HTTP_END_POINTS.payment.salary.update + data._id,
					data
				),
			delete: (data: any) =>
				HttpClient.delete(HTTP_END_POINTS.payment.salary.delete + data.id),
		},
	};
	nonTeachingStaff = {
		get: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.get + data.branch_id + '/non-teaching-staff'
			),
	};
	TeachingStaff = {
		get: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.get + data.branch_id + '/teaching-staff'
			),
		getWithBranch: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getWithBranch.replace(':branchid', data?.branch)
			),
		getActivtiy: (params: any) =>
			HttpClient.get(HTTP_END_POINTS.staff.getActivtiy + params?.staff, params),
		getClasses: (params: any) =>
			HttpClient.get(HTTP_END_POINTS.staff.getClasses + params?.staff, params),
		update_staff: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.staff.update + data?.staff, data),
	};
	staff = {
		get: (query: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getWithName
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				query
			),
		getWithCourse: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getWithcourse
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params)
			),
		getWithId: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getWithid
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId())
					.replace(':staffId', params?.staffId)
			),
		getWithBranch: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getWithBranch
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				data
			),
		// getclasses: (params: any) => HttpClient.get(HTTP_END_POINTS.staff.getClasses, params),
		getclasses: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getClasses
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId())
					.replace(':id', params?.id),
				params
			),
		updatestatus: (params: any) =>
			HttpClient.update(
				HTTP_END_POINTS.staff.updateStatus
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId())
					.replace(':staff', params?.staff),
				params
			),
		getactivity: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getActivtiy
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				params
			),
		create: (data: any) =>
			HttpClient.post(
				HTTP_END_POINTS.staff.create
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				data
			),
		update: (params: any, data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.staff.update +
					params.staffId
						.replace(':instituteid', getInstituteDetails())
						.replace(':branchid', getSelectedBranchId()),
				data
			),
		delete: (query: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.staff.delete
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) + query?.staffId
			),
		getall: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getWithBranch
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params?.uuid),
				{}
			),
		getCourse: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.staff.getWithcourse
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', params?.branch),
				params
			),
	};
	student = {
		activity: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.activity
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) + data.id
			),
		class: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.classess
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				data
			),
		update: (data: any) =>
			HttpClient.update(
				HTTP_END_POINTS.student.update
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) + data?.uuid,
				data
			),
		delete: (data: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.student.delete
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) + data.uuid
			),
		get: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.get
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) + data.uuid
			),
		getWithBranch: () =>
			HttpClient.get(
				HTTP_END_POINTS.student.get
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId())
			),
		getLiveClass: (query: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.liveClasses
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				query
			),
		getWithId: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.getWithId
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) + params?.uuid
			),
		getWithCourse: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.getWithCourse
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()),
				params
			),
		getall: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.getall
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId())
					.replace(':courseUUID', params?.uuid),
				{}
			),
		activitylog: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.activitylog.replace(
					':studentId',
					params?.studentId
				),
				params
			),
		studentclass: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.student.studentclass.replace(
					':studentid',
					params?.studentid
				),
				params
			),
	};
	community = {
		getAll: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.community.all
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId()) + '/all-community/',
				data
			),
		getCommunityMessage: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.community.messages + data.chatId),
		getMessages: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.community.get_all_messages + data.group),
		getByid: (params: string) =>
			HttpClient.get(
				HTTP_END_POINTS.community.getById.replace(':batchId', params)
			),
	};
	ticket = {
		student_tickets: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.ticket.student_ticket, data),
		update_student_status_ticket: (params: any) =>
			HttpClient.update(
				HTTP_END_POINTS.ticket.update_student_status_ticket + params?.uuid,
				params
			),
		update_student_ticket: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.ticket.update + data?.uuid, data),
		student_ticket_with_id: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.ticket.student_ticket_with_id + params?.uuid
			),
		staff_ticket: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.ticket.staff_ticket, data),
		staff_ticket_with_id: (params: any) =>
			HttpClient.get(HTTP_END_POINTS.ticket.staff_ticket_with_id + params?.id),
		staff_ticket_update: (params: any) =>
			HttpClient.update(
				HTTP_END_POINTS.ticket.update_staff_ticket + params?.id
			),
		admin: {
			create_ticket: (data: any) =>
				HttpClient.post(HTTP_END_POINTS.ticket.admin.create_ticket, data),
			get_all: (params: string) =>
				HttpClient.get(HTTP_END_POINTS.ticket.admin.get_all, params),
			get_with_id: (params: any) =>
				HttpClient.get(
					HTTP_END_POINTS.ticket.admin.get_with_id + params?.id,
					params
				),
			update_ticket: (params: any, data: any) =>
				HttpClient.update(
					HTTP_END_POINTS.ticket.admin.update + params?.id,
					data
				),
		},
	};
	attedence = {
		get_all_student_attedence: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.attedence.student_all, data),
		get_with_id: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.attedence.get_with_id + data?.id),
		mark_attedence: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.attedence.student_mark, data),
		mark_staff_attedence: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.attedence.staff_mark, data),
		mark_non_staff_attedence: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.attedence.non_staff_mark, data),
		get_all_staff_attedence: (params?: any) =>
			HttpClient.get(HTTP_END_POINTS.attedence.staff_all, params),
		get_all_non_staff_attedence: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.attedence.non_teaching_all, params),
		get_staff_attedence_with_id: (params: string) =>
			HttpClient.get(
				HTTP_END_POINTS.attedence.get_staff_attedence_with_id + params
			),
		get_non_staff_with_id: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.attedence.get_non_staff_with_id + params?.id
			),
	};
	notification = {
		student: {
			add_student_notification: (data: any) =>
				HttpClient.post(
					HTTP_END_POINTS.notification.student_notification_get,
					data
				),
			get_student_notification: (query: any) =>
				HttpClient.get(
					HTTP_END_POINTS.notification.student_notification,
					query
				),
			resend_student_notification: (params: any) =>
				HttpClient.post(
					HTTP_END_POINTS.notification.student_notification_resend,
					params
				),
		},
		staff: {
			add_staff_notification: (data: any) =>
				HttpClient.post(
					HTTP_END_POINTS.notification.create_staff_notification,
					data
				),
			resend_staff_notification: (params: any) =>
				HttpClient.post(
					HTTP_END_POINTS.notification.staff_notification_resend,
					params
				),
			get_staff_notification: (query: any) =>
				HttpClient.get(HTTP_END_POINTS.notification.staff_notification, query),
		},
		institute: {
			add_institute_notification: (data: any) =>
				HttpClient.post(
					HTTP_END_POINTS.notification.institute_notification,
					data
				),
			get_institute_notification: (query: any) =>
				HttpClient.get(
					HTTP_END_POINTS.notification.institute_notification,
					query
				),

			resend_all_notification: (data: any) =>
				HttpClient.post(
					HTTP_END_POINTS.notification.all_notification_resend,
					data
				),
		},
	};
	institute_notification = {
		get_institute_notification: (data: any, query: any) =>
			HttpClient.get(
				HTTP_END_POINTS.institute_notification.get_all +
					data.institute_id +
					'/all',
				query
			),
		update_institute_notification: (data: any, body: any) =>
			HttpClient.update(
				HTTP_END_POINTS.institute_notification.update + data.id,
				body
			),
		resend_institute_notification: (data: any) =>
			HttpClient.get(
				HTTP_END_POINTS.notification.institute_notification_resend,
				data
			),
	};
	id_cards = {
		student: {
			get_all: (data: any) =>
				HttpClient.get(HTTP_END_POINTS.id_cards.student.all, data),
		},
		staff: {
			getAll: (params: any) =>
				HttpClient.get(
					HTTP_END_POINTS.id_cards.staff.all
						.replace(':instituteid', getInstituteDetails())
						.replace(':branchid', getSelectedBranchId()),
					params
				),
		},
	};
	subscription = {
		get_all_plans: () => HttpClient.get(HTTP_END_POINTS.subscription.all_plans),
		get_subscription: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.subscription.institute_subscription + params?.institute
			),
		get_subscription_status: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.subscription.status_check + params.institute
			),
		upgrade_request: ({ institute, body }: { institute: string; body: any }) =>
			HttpClient.update(
				HTTP_END_POINTS.subscription.upgrade_request + institute + '/request',
				body
			),
		cancel_request: ({ body }: { institute: string; body: any }) =>
			HttpClient.update(
				HTTP_END_POINTS.subscription.cancel_request.replace(
					':instituteId',
					getInstituteDetails()
				),
				body
			),
	};
	activity = {
		get: (query: any) => HttpClient.get(HTTP_END_POINTS.activity.get, query),
	};
	reports = {
		get: (query: any) =>
			HttpClient.get(
				HTTP_END_POINTS.reports.get.replace(
					':instituteid',
					getInstituteDetails()
				) + (query?.branchid ?? getSelectedBranchId()),
				query
			),
	};
	placements = {
		getAll: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.placements.getAll, data),
		create: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.placements.create, data),
		update: (params: string) =>
			HttpClient.update(HTTP_END_POINTS.placements.update, params),
		getById: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.placements.getById, params),
		delete: (params: any) =>
			HttpClient.delete(HTTP_END_POINTS.placements.delete + params),
	};
	notificatinsubscription = {
		post: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.notificationSubscription.post, data),
	};
	certificate = {
		getAll: (params: any) =>
			HttpClient.get(
				HTTP_END_POINTS.certificate.get
					.replace(':instituteid', getInstituteDetails())
					.replace(':branchid', getSelectedBranchId())
					.replace(':certificateId', params?.certificateId),
				params
			),
		update: (params: any) =>
			HttpClient.update(
				HTTP_END_POINTS.certificate.put.replace(
					':certificateid',
					params?.certificateid
				),
				params
			),
		create: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.certificate.create, data),
		delete: (data: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.certificate.delete.replace(
					':certificateid',
					data?.certificateid
				),
				data
			),
	};

	helpcenter = {
		get: (data: any) => HttpClient.get(HTTP_END_POINTS.helpcenter.get, data),
		getall: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.helpcenter.getall, data),
		post: (data: any) =>
			HttpClient.post(HTTP_END_POINTS.helpcenter.getall, data),
		delete: (id: string) =>
			HttpClient.delete(`${HTTP_END_POINTS.helpcenter.delete}${id}`),
		update: (data: any, id: string) =>
			HttpClient.update(`${HTTP_END_POINTS.helpcenter.update}${id}`, data),
	};

	refund = {
		getAll: (params: any) =>
			HttpClient.get(HTTP_END_POINTS.refund.getAll, params),

		create: (data: any) => HttpClient.post(HTTP_END_POINTS.refund.create, data),

		getByID: (data: any) =>
			HttpClient.get(HTTP_END_POINTS.refund.getById.replace(':id', data._id)),

		update: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.refund.update + data.uuid, data),

		delete: (data: any) =>
			HttpClient.delete(
				HTTP_END_POINTS.refund.delete.replace(':_id', data._id),
				data
			),
	};
}
export default new Client();
