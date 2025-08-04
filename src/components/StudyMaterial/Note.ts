export interface Note {
  id: number;
  uuid: string; 
  title: string;
  description: string;
  course: string;
  branch: string;
  status: "Active" | "Completed";
  file?: File;
  video?: string;
}
