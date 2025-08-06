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
    const res=await Client.refund.update(data);
    console.log("update",res)
    return res
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

export const getStudentsWithCourse = async (params: any) => {
  try {
    const res = await Client.users.getStudentsWithCourse(params);
    console.log("Students with Course:", res);
    return res;
  } catch (error) {
    console.error("getStudentsWithCourse error:", error);
    throw error;
  }
};

export const getStudentsWithBatch = async (params: any) => {
  try {
    const res = await Client.users.getStudentsWithBatch(params);
    console.log("Students with Batch:", res);
    return res;
  } catch (error) {
    console.error("getStudentsWithBatch error:", error);
    throw error;
  }
};


export const GetCourseRefund = async (data: any) => {
  try {
    const response = await Client.course.get(data); 
    console.log("Branch course data getting in services", response);
    return response;
  } catch (error: any) {
    console.error("Error in GetBranchCourse:", error.response?.data || error.message);
    throw error;
  }
};



export const GetBatchwithCourseRefund = async (
  instituteId: any,
  branchId: any,
  courseId: any
): Promise<any> => {
  try {
    const response = await Client.batch.getWithCourseId(instituteId, branchId, courseId);
    console.log("Batch data getting", response);
    return response.data; 
  } catch (error) {
    console.error("Error in GetBatchwithCourseRefund:", error);
    throw error;
  }
};
