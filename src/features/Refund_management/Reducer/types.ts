// type.ts

export interface RefundData {
  id?: string;
  course_id?: string;      // Add this
  batch_id?: string;       // Add this
  studentfees?: number;    // Add this
  branch_name?: string;    // Add this
  institute_id?: string;   // Add this
  
  // Keep all your existing fields here too
  refund_amount?: number;
  reason?: string;
  status?: string;
  created_at?: string;
}
export interface BranchType {
  id: string;
  name: string;
}

export interface CourseType {
  id: string;
  title: string;
}

export interface BatchType {
  id: string;
  label: string;
}
