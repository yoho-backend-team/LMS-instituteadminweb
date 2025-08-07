// src/services/branchService.ts
import Client from "../../../apis/index";

// Simulate API calls with localStorage for now

export const fetchBranches =   async (params: any) => {
   try {
     const response = await Client.branch.getAll(params); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };
export const fetchBranchesid =   async (params: any) => {
   try {
     const response = await Client.branch.getByid(params); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };


export const addBranch = async (params: any) => {
    try {
     const response = await Client.branch.create(params); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };

export const updateBranch = async (params: any) => {
   try {
     const response = await Client.branch.updatestatus(params); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };
export const deleteBranch = async (params: any) => {
   try {
     const response = await Client.branch.delete(params); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };









