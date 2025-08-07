import Client from "../../../../../apis/index";


export const creatFees = async (params: any) => {
  const response = await Client.payment.student_fee.create(params);
  console.log("Fees data getting", response);
  if (response) {
    return response;
  }
};

export const GetBranch = async (params: any) => {
  const response = await Client.branch.getAll(params);
  console.log("Branch data getting", response);
  if (response) {
    return response;
  }
};

export const GetBranchCourse = async (branchname: string) => {
  try {
    const response = await Client.course.getWithBranch(branchname); 
    console.log("Branch course data getting in services", response);
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
  const response = await Client.users.getStudentsWithBatch(params);
  console.log("Student with batch-check services",response)
  if (response) {
    return response;
  }
};

export const GetAllfees = async (params: any) => {
  try {
    const response = await Client.payment.student_fee.get(params);
    console.log("Get All fees - Service Check:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching fees data:", error);
    throw error;
  }
};

export const DeleteAll = async (params: any) => {
  try {
    const response = await Client.payment.student_fee.delete(params);
    console.log("Delete Check:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in Delete:", error);
    throw error;
  }
};

export const EditStudent = async (params: any) => {
  try {
    const response = await Client.payment.student_fee.update(params);
    console.log("aaaaaaaaaaaaaaaaaaa comming", response);
    return response;
  } catch (error) {
    console.error("aaaaaaaaaaaaaaaaaaaaaaaaa:", error);
    throw error;
  }
};



