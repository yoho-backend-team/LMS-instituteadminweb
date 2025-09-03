/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../../apis/index";


export const GetAllSalary = async (params: any) => {
  const response = await Client.payment.staff_salary.getall(params)
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
  return response.data;
};

export const updateSalary = async (data: any) => {
  const response = await Client.payment.staff_salary.update(data);
  console.log("Salary edit successfully", response.data);
  return response.data;
};

export const DeleteSalary = async (data: any) => {
  const response = await Client.payment.staff_salary.delete(data);
  console.log("Salary delete successfully", response.data);
  return response.data;
};

export const GetStaffName_Branch = async (branch: string) => {
  const response = await Client.TeachingStaff.getWithBranch(branch);
  return response.data;
};







