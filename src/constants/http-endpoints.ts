// src/constants/http-endpoints.ts
export const HTTP_END_POINTS = {
  branch: {
    getAll: (instituteId: string) => `/api/institutes/${instituteId}/branches/`,
    create: (instituteId: string) => `/api/institutes/${instituteId}/branches/`,
    delete: (instituteId: string, branchId: string) => `/api/institutes/${instituteId}/branches/${branchId}`,
    updateStatus: (instituteId: string, branchId: string) => `/api/institutes/${instituteId}/branches/${branchId}/status`
  }
};
