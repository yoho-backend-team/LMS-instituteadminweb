import Client from "../../../../../apis/index";


export const creatFees = async (params: any) => {
  const response = await Client.payment.student_fee.create(params);
  if (response) {
    return response;
  }
};

export const GetBranch = async (params: any) => {
  const response = await Client.branch.getAll(params);
  if (response) {
    return response;
  }
};

export const GetBranchCourse = async (branchname: string) => {
  try {
    const response = await Client.course.getWithBranch(branchname);
    return response;
  } catch (error: any) {
    console.error("Error in GetBranchCourse:", error.response?.data || error.message);
    throw error;
  }
};

export const GetBatch = async (instituteId: any, branchId: any, courseId: any) => {
  const response = await Client.batch.getWithCourseId(instituteId, branchId, courseId);
  if (response) {
    return response;
  }
};

export const StudentsWithBatch = async (params: any) => {
  const response = await Client.users.getStudentsWithBatch(params);
  if (response) {
    return response;
  }
};

export const GetAllfees = async (params: any) => {
  try {
    const response = await Client.payment.student_fee.get(params);
    return response;
  } catch (error) {
    console.error("Error fetching fees data:", error);
    throw error;
  }
};



