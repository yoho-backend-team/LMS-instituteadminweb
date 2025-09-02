import Client from '../../../../apis/index'

export const getAllStudentsAttendances = async(data: any) => {
    try {
        const response = await Client.attedence.get_all_student_attedence(data)
        console.log(response,"student response")
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const getStudentAttendance = async (data:any) => {
    try {
        const response = await Client.attedence.get_with_id(data);
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const updateStudentAttendanceStatus = async (data:any) => {
    try {
        const response = await Client.attedence.mark_attedence(data);
        return response;
    } catch (error) {
        console.log(error)
    }
}