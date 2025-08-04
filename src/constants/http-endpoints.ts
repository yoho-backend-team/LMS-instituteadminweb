// src/constants/http-endpoints.ts
export const HTTP_END_POINTS = {
  branch: {
    getAll: '/branches',
    getById: (id: string) => `/branches/${id}`,
    create: '/branches',
    update: (id: string) => `/branches/${id}`,
    updateStatus: (id: string) => `/branches/${id}/status`,
    delete: (id: string) => `/branches/${id}`,
  },
  // Add other endpoints as needed
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
};

// You can also export types if needed
export type ApiEndpoints = typeof HTTP_END_POINTS;