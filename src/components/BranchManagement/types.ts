// src/types/branchTypes.ts
export interface Branch {
  id: string;
  cityName: string;
  address: string;
  status: "Active" | "Inactive";
  phoneNumber: string;
  alternateNumber?: string;
  pinCode: string;
  landMark?: string;
  city: string;
  state: string;
  imageSrc?: string;
}

export type BranchStatus = Branch['status'];