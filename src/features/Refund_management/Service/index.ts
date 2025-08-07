import Client from "../../../apis/index";

export const createRefund = async (data: any) => {
  try {
    const response = await Client.refund.create(data);
    console.log("Create Refund:", response);
    return response;
  } catch (error) {
    console.log("Create Refund Error:", error);
    throw error;
  }
};


export const getAllRefunds = async (params: any) => {
  try {
    const response = await Client.refund.getAll(params);;
    console.log("Refund response:", response);
    return await response
  } catch (error) {
    throw error;
  }
};



export const updateRefund = async (data: any) => {
  try {
    const res = await Client.refund.update(data); 
    console.log("update", res);
    return res;
  } catch (error) {
    throw error;
  }
};



export const deleteRefund = async (data: any) => {
  try {
    const res =await Client.refund.delete(data);
    console.log("delete",res)
    return res

  } catch (error) {
    throw error;
  }
};


export const getRefundByID = async (data: any) => {
  try {
    const res=await Client.refund.getByID(data);
    console.log("BYID",res)
    return res
  } catch (error) {
    throw error;
  }
};



export const GetBranchCourse = async (data: any) => {
  try {
    const response= await Client.course.get( data.branchId); 
    console.log(" Branch course data getting in services", response);
    return response;
  } catch (error: any) {
    console.error("Error in GetBranchCourse:", error.response?.data || error.message);
    throw error;
  }
};


export const GetBatch = async (instituteId: any, branchId: any, courseId: any) => {
  const response = await Client.batch.getWithCourseId(instituteId, branchId, courseId);
  console.log("Batch data getting", response);
  if (response) {
    return response;
  }
};


export const StudentsWithBatch = async (params: any) => {
  if (!params || !params.batch_id || !params.branch_id || !params.institute_id) {
    throw new Error("Missing required parameters to fetch students.");
  }

  const response = await Client.users.getStudentsWithBatch(params);
  console.log("Student with batch-check services", response);
  return response;
};

export const StudentWithFee = async (id: string) => {
  try {
    const res = await Client.payment.student_fee.get({ id }); 
    console.log("Refund fee", res);
    return res;
  } catch (error) {
    throw error;
  }
};


