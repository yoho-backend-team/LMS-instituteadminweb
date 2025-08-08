// src/services/branchService.ts
import Client from "../../../apis/index";

// GET ALL BRANCHES
export const fetchBranches = async (params: { instituteId: string }) => {
   try {
     const response = await Client.branch.getAll(""); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };

// GET BRANCH BY ID
export const fetchBranchesid = async (params: { instituteId: string, branchId: string }) => {
   try {
     const response = await Client.branch.getByid(params.branchId); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };

// CREATE BRANCH
export const addBranch = async (params: { instituteId: string, data: any }) => {
    try {
     const response = await Client.branch.create(params.data); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };

// UPDATE BRANCH STATUS
export const updateBranch = async (params: { instituteId: string, branchId: string, data: any }) => {
   try {
     const response = await Client.branch.updatestatus(params.branchId, params.data); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };

// EDIT BRANCH
export const editBranch = async (params: { instituteId: string, branchId: string, data: any }) => {
   try {
     const response = await Client.branch.edit(params.data, params.branchId); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };

// DELETE BRANCH
export const deleteBranch = async (params: { instituteId: string, branchId: string }) => {
   try {
     const response = await Client.branch.delete(params.branchId); 
     return response;
   } catch (error: any) {
     throw new Error(error.message);
  }
 };









