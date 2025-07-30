import { MoreVertical } from 'lucide-react';
import humaning from '../../assets/humanimg.png';
import clock from '../../assets/clock.png';

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditBatchModal from "./editBatch";
import { useNavigate } from "react-router-dom";
import wave from '../../assets/wave (2).png'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Card, CardContent } from "../ui/card";
import { COLORS, FONTS } from "../../constants/uiConstants";
import DeleteConfirmationModal from "./deleteModal";





interface BatchCardProps {
	title: string;
	subtitle: string;
	students: number;
	startDate: string;
	endDate: string;
	status: string;
}

export const BatchCard: React.FC<BatchCardProps> = ({
	title,
	subtitle,
	students,
	startDate,
	endDate,
}) => {
	const [status, setStatus] = useState<string>('');
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const openEditModal = () => setIsEditModalOpen(true);
	const closeEditModal = () => setIsEditModalOpen(false);
	const openDeleteModal = () => setIsDeleteModalOpen(true);
	const closeDeleteModal = () => setIsDeleteModalOpen(false);

	const handleConfirmDelete = () => {
		console.log('Deleted:', name);
	};

      const navigate = useNavigate();
  return (
    <Card className="rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.08)] w-[auto] bg-white">
      <CardContent className="p-4 pb-3 relative">
  
      
        <div className="flex justify-between items-start border-b border-gray-200 pb-2">
          <div>
            <h4 style={{...FONTS.heading_06_bold,color:COLORS.gray_dark_02}}>{title}</h4>
            
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

						<DropdownMenuContent className='bg-white rounded-lg shadow-xl w-[120px] p-2 z-20 space-y-2'>
							<DropdownMenuItem
								onClick={() => navigate('/view-batch')}
								className='group border border-gray-300 text-black font-semibold text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer'
								onMouseEnter={(e: any) =>
									(e.currentTarget.style.backgroundColor = '#1BBFCA')
								}
								onMouseLeave={(e: any) =>
									(e.currentTarget.style.backgroundColor = '')
								}
							>
								<Eye className='w-4 h-4 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>View</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								className='group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer'
								onClick={openEditModal}
								onMouseEnter={(e: any) =>
									(e.currentTarget.style.backgroundColor = '#1BBFCA')
								}
								onMouseLeave={(e: any) =>
									(e.currentTarget.style.backgroundColor = '')
								}
							>
								<Pencil className='w-4 h-4 text-black group-hover:text-white' />
								<span className='group-hover:text-white'>Edit</span>
							</DropdownMenuItem>

    <DropdownMenuItem
     onClick={openDeleteModal} 
      className="group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#1BBFCA]"
     onMouseEnter={(e:any) => (e.currentTarget.style.backgroundColor = "#1BBFCA")}
  onMouseLeave={(e:any) => (e.currentTarget.style.backgroundColor = "")}>
      <Trash2 className="w-4 h-4 text-black group-hover:text-white" />
      <span className="group-hover:text-white">Delete</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>
        <div><p className=" mt-4"style={{...FONTS.heading_07_bold,color:COLORS.gray_dark_02}}>{subtitle}</p></div>
       <div className="flex items-center justify-between mt-4">
          <div className="bg-[#1E1EFF]  px-6 py-[6px] rounded-md"style={{...FONTS.heading_08_bold,color:COLORS.white}}>
            {startDate}
          </div>
          <div className="flex items-center justify-center w-28 relative mt-2">
            <div className="absolute -top-[3px] left-2 right-2 h-[2px] bg-[#1BBFCA] rounded-full -translate-y-1/2" />
            <div className="absolute w-2 h-2 bg-[#1BBFCA] rounded-full left-2 -translate-y-1/2 top-1/2" />
            <div className="absolute w-2 h-2 bg-[#1BBFCA] rounded-full right-2 -translate-y-1/2 top-1/2" />
          </div>
          <div className="bg-[#1E1EFF] px-6 py-[6px] rounded-md "style={{...FONTS.heading_08_bold,color:COLORS.white}}>
            {endDate}
          </div>
        </div>

        
        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <img src={humaning} className="w-3.5 h-3.5" />
            <span style={{...FONTS.heading_08_bold,color:COLORS.gray_light}}>{students} Students</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={clock}  className="w-3.5 h-3.5" />
            <span style={{...FONTS.heading_08_bold,color:COLORS.gray_light}}>Days</span>
          </div>
        </div>

				<div className='mt-4 h-[60px] pt-2'>
					{/* <svg
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="waveGradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1BBFCA" />
        <stop offset="90%" stopColor="#BDC2C7BF" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <path
      d="M0,40 C20,10 40,10 60,25 C80,40 100,10 120,25 C140,40 160,10 180,25 C190,30 200,35 200,40"
      stroke="url(#waveGradient)"
      strokeWidth="2"
      fill="none"
      opacity="0.9"
    />
  </svg> */}

					<img src={wave} />
				</div>


      
        <div className="flex justify-end mt-12">
           <Select onValueChange={(value:any) => setStatus(value)}>
            <SelectTrigger
              className={`w-[100px] h-[40px] border border-gray px-2 bg-transparent shadow-none ${
                status && "px-0 [&>svg]:hidden "
              }`}
            >
              {status ? (
                <div className="w-[111px] h-[40px] bg-[#1BBFCA]  border rounded-md flex items-center justify-center relative" style={{...FONTS.heading_09,color:COLORS.white}}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              ) : (
                <SelectValue placeholder="Status" />
              )}
            </SelectTrigger>

            <SelectContent
              className="bg-white rounded-md shadow-md p-2 space-y-2 absolute -top-20 -left-20 z-10"
              side="bottom"
              align="start"
            >
              <SelectItem
                value="active"
                className="bg-[#1BBFCA] rounded-md px-4 py-2 text-sm font-medium 
                data-[highlighted]:bg-[#1BBFCA] hover:bg-[#1BBFCA] focus:bg-[#1BBFCA]" style={{...FONTS.heading_09, color:COLORS.white}}
              >
                Active
              </SelectItem>
              <SelectItem
                value="inactive"
                className="bg-[#1BBFCA] mt-2 rounded-md px-4 py-2 text-sm font-medium 
                data-[highlighted]:bg-[#1BBFCA] hover:bg-[#1BBFCA] focus:bg-[#1BBFCA]" style={{...FONTS.heading_09, color:COLORS.white}}
              >
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
       <EditBatchModal isOpen={isEditModalOpen} onClose={closeEditModal} />
       
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirmDelete={handleConfirmDelete}
      />
    </Card>
  );
};
