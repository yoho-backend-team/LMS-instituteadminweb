export interface Note {
  is_active: any;
  id: number;
  uuid: string; 
  title: string;
  description: string;
  course: string;
  branch: string;
  status: "Active" | "Inactive";
  file?: File;
  video?: string;
}
