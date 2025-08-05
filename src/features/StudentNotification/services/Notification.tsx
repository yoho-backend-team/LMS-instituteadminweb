import Client from '../../../apis/index.js';
export const getstudentnotificationdata = async (query: any) => {
    const response = await Client.notification.student.get_student_notification(query)
    if (response) {
        return response;
    }
};
export const createstudentnotificationdata = async (data: any) => {
    const response = await Client.notification.student.add_student_notification(data)
    if (response) {
        return response;
    }
};
export const getcoursedata = async (data: any) => {
    const response = await Client.course.get_course_data(data)
    if (response) {
        return response;
    }
};