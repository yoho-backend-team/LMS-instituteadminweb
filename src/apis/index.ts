/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpClient from "./httpClient";
import { HTTP_END_POINTS } from "./httpEndpoints";

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
      HttpClient.update(HTTP_END_POINTS.group.permissions,
        data),
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
    getAll: (params: string) =>
      HttpClient.get(HTTP_END_POINTS.branch.getAll, params),
    create: (params: string) =>
      HttpClient.post(HTTP_END_POINTS.branch.create, params),
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
    get: (data: any) => HttpClient.get(HTTP_END_POINTS.category.getAll, data),
    create: (data: any) =>
      HttpClient.post(HTTP_END_POINTS.category.create, data),
    update: (data: any) =>
      HttpClient.update(HTTP_END_POINTS.category.create + `/${data.id}`, data),
    delete: (data: any) =>
      HttpClient.delete(HTTP_END_POINTS.category.create + `/${data.id}`),
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
    update: (data: any) =>
      HttpClient.update(HTTP_END_POINTS.study_material.get + data.uuid, data),
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
        HTTP_END_POINTS.course.add + `${data.category}/courses/`,
        data,
        options
      );
    },
    getAll: async (data: any) => {
      return await HttpClient.get(HTTP_END_POINTS.course.getall, data)
    },
    getWithBranch: (data: any) =>
      HttpClient.get(HTTP_END_POINTS.course.withBranch + data + '/courses'),
    update: (data: any) =>
      HttpClient.update(
        HTTP_END_POINTS.course.add + `${data.category}/courses/${data.course}`,
        data
      ),
    delete: (data: any) =>
      HttpClient.delete(
        HTTP_END_POINTS.course.add + `${data.category}/courses/${data.id}`
      ),
    add_template: (data: any) =>
      HttpClient.post(HTTP_END_POINTS.course.template, data),
    get_course_data: (data: any) =>
      HttpClient.get(
        HTTP_END_POINTS.course.get, data),
  };
  batch = {
    // create: (data: any) => HttpClient.post(HTTP_END_POINTS.batch.create + `${data.branch_id}/courses/${data.course}/batches`, data),
    create: (data: any) => HttpClient.post(HTTP_END_POINTS.batch.create, data),
    getInstructors: (data: any) =>
      HttpClient.get(
        HTTP_END_POINTS.batch.create +
        `${data.branch_id}/instructors/${data.course_id}`
      ),
    getAll: (params: any) =>
      HttpClient.get(
        HTTP_END_POINTS.batch.getAll + params.branch_id + '/batches/all',
        params
      ),
    getWithId: (params: string) =>
      HttpClient.get(HTTP_END_POINTS.batch.getWithId, params),
    update: (data: any) =>
      HttpClient.update(
        HTTP_END_POINTS.batch.update.replace(':batchId', data?.uuid),
        data
      ),
    delete: (data: any) =>
      HttpClient.delete(
        HTTP_END_POINTS.batch.delete.replace(':batchId', data?.uuid),
        data
      ),
    getWithCourseId: (courseId: any) =>
      HttpClient.get(HTTP_END_POINTS.batch.getBatchwithCourse.replace(':courseId', courseId)),
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
      HttpClient.delete(HTTP_END_POINTS.online_class.create + '/' + data.id),
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
    studentRegister: (data: any, options: any) =>
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
        HTTP_END_POINTS.student.getWithBatch +
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
      get: (data: any) => HttpClient.get(HTTP_END_POINTS.payment.fee.getAllSalary, data),
      delete: (params: any) =>
        HttpClient.delete(HTTP_END_POINTS.payment.fee.delete + params.uuid),
      update: (data: any) =>
        HttpClient.update(HTTP_END_POINTS.payment.fee.update, data)
    },
    staff_salary: {
      getall: (params: any) =>
        HttpClient.get(HTTP_END_POINTS.payment.salary.getall, params),
      create: (data: any) =>
        HttpClient.post(HTTP_END_POINTS.payment.salary.create, data),
      update: (data: any) =>
        HttpClient.update(HTTP_END_POINTS.payment.salary.update + data._id, data),
      delete: (data: any) =>
        HttpClient.delete(HTTP_END_POINTS.payment.salary.delete + data.id)
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
        HTTP_END_POINTS.staff.getWithBranch + data.branch + '/teaching-staff/'
      ),
    getActivtiy: (params: any) =>
      HttpClient.get(HTTP_END_POINTS.staff.getActivtiy + params?.staff, params),
    getClasses: (params: any) =>
      HttpClient.get(HTTP_END_POINTS.staff.getClasses + params?.staff, params),
    update_staff: (data: any) =>
      HttpClient.update(HTTP_END_POINTS.staff.update + data?.staff, data),
  };
  staff = {
    get: (query: any) => HttpClient.get(HTTP_END_POINTS.staff.getWithName, query),
    getWithCourse: (params: any) => HttpClient.get(HTTP_END_POINTS.staff.getWithcourse, params),
    getWithId: (params: any) => HttpClient.get(HTTP_END_POINTS.staff.getWithid.replace(":staffId", params?.staffId)),
    getWithBranch: (data: any) => HttpClient.get(HTTP_END_POINTS.staff.getWithBranch, data),
    // getclasses: (params: any) => HttpClient.get(HTTP_END_POINTS.staff.getClasses, params),
    getclasses: (params: any) => HttpClient.get(HTTP_END_POINTS.staff.getClasses.replace(":id", params?.id), params),
    updatestatus: (params: any) => HttpClient.update(HTTP_END_POINTS.staff.updateStatus.replace(":staff", params?.staff), params),
    getactivity: (params: any) => HttpClient.get(HTTP_END_POINTS.staff.getActivtiy, params),
    create: (data: any) => HttpClient.post(HTTP_END_POINTS.staff.create, data),
    update: (data: any) => HttpClient.update(HTTP_END_POINTS.staff.update, data),
    delete: (query: any) => HttpClient.delete(HTTP_END_POINTS.staff.delete.replace(":staffId", query?.staffId)),
    getall: (params: any) =>
      HttpClient.get(
        HTTP_END_POINTS.staff.getWithBranch.replace(
          ':courseUUID',
          params?.uuid
        ),
        {}
      ),
    getCourse: (params: any) => HttpClient.get(HTTP_END_POINTS.staff.getWithcourse, params),
  };
  student = {
    activity: (data: any) =>
      HttpClient.get(HTTP_END_POINTS.student.activity + data.id),
    class: (data: any) =>
      HttpClient.get(HTTP_END_POINTS.student.classess, data),
    update: (data: any) =>
      HttpClient.update(HTTP_END_POINTS.student.update + data?.uuid, data),
    delete: (data: any) =>
      HttpClient.delete(HTTP_END_POINTS.student.delete + data.uuid),
    get: (data: any) => HttpClient.get(HTTP_END_POINTS.student.get + data.uuid),
    getLiveClass: (query: any) => HttpClient.get(HTTP_END_POINTS.student.liveClasses, query),
    getWithId: (params: any) =>
      HttpClient.get(HTTP_END_POINTS.student.getWithId + params?.uuid),
    getWithCourse: (params: any) =>
      HttpClient.get(HTTP_END_POINTS.student.getWithCourse, params),
    getall: (params: any) =>
      HttpClient.get(
        HTTP_END_POINTS.student.getall.replace(':courseUUID', params?.uuid),
        {}
      ),
  };
  community = {
    getAll: (data: any) =>
      HttpClient.get(
        HTTP_END_POINTS.community.all + '/all-community/'
      ),
    getCommunityMessage: (data: any) =>
      HttpClient.get(HTTP_END_POINTS.community.messages + data.chatId),
    getMessages: (data: any) =>
      HttpClient.get(
        HTTP_END_POINTS.community.get_all_messages + data.communityId
      ),
  };
  ticket = {
    student_tickets: (data: any) =>
      HttpClient.get(HTTP_END_POINTS.ticket.student_ticket, data),
    update_student_status_ticket: (params: any) =>
      HttpClient.update(
        HTTP_END_POINTS.ticket.update_student_status_ticket + params?.id
      ),
    update_student_ticket: (data: any) =>
      HttpClient.update(HTTP_END_POINTS.ticket.update + data?.uuid, data),
    student_ticket_with_id: (params: any) =>
      HttpClient.get(
        HTTP_END_POINTS.ticket.student_ticket_with_id + params?.id
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
      resend_student_notification: (params: any) => HttpClient.post(
        HTTP_END_POINTS.notification.student_notification_resend, params
      )
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
          HTTP_END_POINTS.notification.all_notification_resend, data),
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
          HTTP_END_POINTS.id_cards.staff.all,
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
    upgrade_request: ({ institute, body }: { institute: string, body: any }) =>
      HttpClient.update(
        HTTP_END_POINTS.subscription.upgrade_request +
        institute + '/request', body
      ),
  };
  activity = {
    get: (query: any) => HttpClient.get(HTTP_END_POINTS.activity.get, query),
  };
  reports = {
    get: (query: any) =>
      HttpClient.get(HTTP_END_POINTS.reports.get + query?.branch, query),
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
    getAll: (params: any) => HttpClient.get(HTTP_END_POINTS.certificate.get.replace(':certificateId', params?.certificateId), params),


  }


  helpcenter = {
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
      HttpClient.get(HTTP_END_POINTS.refund.getById.replace(":id", data._id)),

    update: (data: any) =>
      HttpClient.update(
        HTTP_END_POINTS.refund.update+data.uuid,
        data
      ),

    delete: (data: any) =>
      HttpClient.delete(
        HTTP_END_POINTS.refund.delete.replace(":_id", data._id),
        data
      ),
  };
}
export default new Client();