import Client from "../../../../apis/index";



export const GetAllSalary = async (params: any) => {
  const response = await Client.payment.staff_salary.getall(params)
  console.log("Salary data getting", response);
  if (response) {
    return response;
  }
};







