
import { MoreVertical} from "lucide-react";
import humaning from "../../../assets/humanimg.png";
import clock from "../../../assets/clock.png"

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "../../ui/card";
import { FONTS } from "../../../constants/uiConstants";
import EditOfflineClass from "./editOfflineClass";
// import DeleteConfirmationModal from "./deleteModal";





interface BatchCardProps {
  title: string;
  subtitle: string;
  students: number;
  startDate: string;
  endDate: string;
  status: string;
}

export const BatchClassCard: React.FC<BatchCardProps> = ({
  
  title,
  subtitle,
  students,
  startDate,
  endDate,
  
}) => {
 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  
       const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
//  const openDeleteModal = () => setIsDeleteModalOpen(true);
//   const closeDeleteModal = () => setIsDeleteModalOpen(false);

//   const handleConfirmDelete = () => {
//     console.log("Deleted:", name);
//   };

      const navigate = useNavigate();
  return (
    <Card className="rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.08)] w-[auto] bg-white">
      <CardContent className="p-4 pb-3 relative">
  
      
        <div className="flex justify-between items-start border-b border-gray-200 pb-2">
          <div>
            <h4 className=""style={{...FONTS.heading_03}}>{title}</h4>
            
          </div>
         <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button
      className="absolute top-2 right-2  "
      aria-label="More options"
    >
      <MoreVertical className="w-5 h-5 text-[#1BBFCA]" />
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="bg-white rounded-lg shadow-xl w-[120px] p-2 z-20 space-y-2">
    <DropdownMenuItem  onClick={() => navigate("/view-student")}
  className="group border border-gray-300 text-black font-semibold text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer"
  onMouseEnter={(e:any) => (e.currentTarget.style.backgroundColor = "#1BBFCA")}
  onMouseLeave={(e:any) => (e.currentTarget.style.backgroundColor = "")}
>
  
  <Eye className="w-4 h-4 text-black group-hover:text-white" />
  <span className="group-hover:text-white">View</span>
</DropdownMenuItem>


   <DropdownMenuItem
  className="group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer"
  onClick={openEditModal}
  onMouseEnter={(e:any) => (e.currentTarget.style.backgroundColor = "#1BBFCA")}
  onMouseLeave={(e:any) => (e.currentTarget.style.backgroundColor = "")}
>
  <Pencil className="w-4 h-4 text-black group-hover:text-white" />
  <span className="group-hover:text-white">Edit</span>
</DropdownMenuItem>

    <DropdownMenuItem
    // onClick={openDeleteModal} 
      className="group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#1BBFCA]"
     onMouseEnter={(e:any) => (e.currentTarget.style.backgroundColor = "#1BBFCA")}
  onMouseLeave={(e:any) => (e.currentTarget.style.backgroundColor = "")}>
      <Trash2 className="w-4 h-4 text-black group-hover:text-white" />
      <span className="group-hover:text-white">Delete</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>
        <div><p className=" mt-4"style={{...FONTS.heading_03,fontSize:"16px"}}>{subtitle}</p></div>
       {/* <div className="flex items-center justify-between mt-4">
          <div className="bg-[#1E1EFF]  px-6 py-[6px] rounded-md"style={{...FONTS.heading_03,fontSize:"14px"}}>
            {startDate}
          </div>
          <div className="flex items-center justify-center w-28 relative">
            <div className="absolute top-1/2 left-2 right-2 h-[2px] bg-[#1BBFCA] rounded-full -translate-y-1/2" />
            <div className="absolute w-2 h-2 bg-[#1BBFCA] rounded-full left-2 -translate-y-1/2 top-1/2" />
            <div className="absolute w-2 h-2 bg-[#1BBFCA] rounded-full right-2 -translate-y-1/2 top-1/2" />
          </div>
          <div className="bg-[#1E1EFF] px-6 py-[6px] rounded-md "style={{...FONTS.heading_03,fontSize:"14px"}}>
            {endDate}
          </div>
        </div> */}

        
        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <img src={humaning} className="w-3.5 h-3.5" />
            <span style={{...FONTS.heading_03}}>{students}  Students</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={clock}  className="w-3.5 h-3.5" />
            <span style={{...FONTS.heading_03}}>Days</span>
          </div>
        </div>

        
       <div className="mt-4 h-[60px] pt-2">
  



</div>



      </CardContent>
       <EditOfflineClass isOpen={isEditModalOpen} onClose={closeEditModal} />
       
      {/* <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirmDelete={handleConfirmDelete}
      />  */}
    </Card>
  );
};
