// src/features/branch/branchTypes.ts

// API Response Branch Data Structure
export interface Branch {
  id: string;
  imageSrc: string;
  cityName: string;
  address: string;
  status: string;
  phoneNumber: string;
  alternateNumber: string;
  pinCode: string;
  landMark: string;
}

// Props for LocationCard Component
export interface LocationCardProps {
  id: string;
  imageSrc: string;
  cityName: string;
  address: string;
  status: string;
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange?: (newStatus: string) => void;
}

// Form Data Structure for Branch Create Form
export interface BranchFormData {
  branchName: string;
  phoneNumber: string;
  alternateNumber: string;
  address: string;
  pinCode: string;
  landMark: string;
  city: string;
  state: string;
}

// Slice State Type for Redux
export interface BranchState {
  branches: Branch[];
  loading: boolean;
  error: string | null;
}
