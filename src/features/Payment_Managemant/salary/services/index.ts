import Client from "../../../../apis/index";


export const GetAllSalary = async (params: any) => {
  const response = await Client.payment.staff_salary.getall(params)
  console.log("Salary data getting", response);
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



export const AddSalary = async (data: any) => {
  const response = await Client.payment.staff_salary.create(data); 
  console.log("Salary added successfully", response.data);
  return response.data;
};

export const GetStaffName_Branch = async (branch: string) => {
  const response = await Client.TeachingStaff.getWithBranch(branch);
  console.log("Teaching staff fetched successfully:", response.data);
  return response.data;
};







