import Client from '../../../apis';
import { Branch } from '../components/BranchManagement/types';

/**
 * Branch Service - Handles API calls for Branches (GetAll, Create)
 */
export const branchService = {
  /**
   * Get All Branches for an Institute
   * @param instituteId Institute UUID
   * @param params Optional query parameters (search, pagination)
   * @returns Promise of Branch[]
   */
  getAll: (instituteId: string, params?: any): Promise<Branch[]> =>
    Client.branch.getAll({ institute_id: instituteId, ...params }),

  /**
   * Create a New Branch for an Institute
   * @param instituteId Institute UUID
   * @param branchData Data to create the branch
   * @returns Promise of created Branch
   */
  create: (instituteId: string, branchData: Partial<Branch>): Promise<Branch> =>
    Client.branch.create({ institute_id: instituteId, ...branchData }),
};
