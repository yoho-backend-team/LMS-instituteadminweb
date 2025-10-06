/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../apis/index";

export const createRefund = async (data: any) => {
  try {
    const response = await Client.refund.create(data);
    return response;
  } catch (error) {
    console.log("Create Refund Error:", error);
    throw error;
  }
};


export const getAllRefunds = async (params: any) => {
  const response = await Client.refund.getAll(params)
  return response
};



export const updateRefund = async (data: any) => {
  try {
    const res = await Client.refund.update(data);
   
    return res;
  } catch (error) {
    console.log("Update Servier", error)
    throw error;
  }
};




export const deleteRefund = async (refundId: string) => {
  const res = await Client.refund.delete({ _id: refundId });
  return res;
};



export const getRefundByID = async (data: any) => {
  const res = await Client.refund.getByID(data);
 
  return res
};



export const GetBranchCourse = async (data: any) => {
  try {
    const response = await Client.course.get_course_data(data.branchId);
    return response;
  } catch (error: any) {
    console.error("Error in GetBranchCourse:", error.response?.data || error.message);
    throw error;
  }
};


export const GetBatch = async (courseId: any) => {
  const response = await Client.batch.getWithCourseId(courseId);
 
  if (response) {
    return response;
  }
};


export const StudentsWithBatch = async (params: any) => {
  if (!params || !params.batch_id || !params.branch_id || !params.institute_id) {
    throw new Error("Missing required parameters to fetch students.");
  }

  const response = await Client.users.getStudentsWithBatch(params);
 
  return response;
};

export const StudentWithFee = async (id: string) => {
  const res = await Client.payment.student_fee.get({ id });
 
  return res;
};


