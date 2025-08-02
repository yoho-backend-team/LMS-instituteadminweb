export interface Note {
  id: string;
  title: string;
  course: string;
  branch: string;
  confirm: string;
  description: string;
  file?: File | string;  
  fileName?: string;    
  isActive: boolean;
}
