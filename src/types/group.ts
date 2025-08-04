// types/group.ts
export type PermissionLevel = "Read" | "Create" | "Update" | "Delete" | "";

export interface CreateGroupParams {
  name: string;
  permissions: Record<string, PermissionLevel>;
  administrator_access: boolean;
}
