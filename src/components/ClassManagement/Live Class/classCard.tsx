import { Link, MoreVertical } from "lucide-react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "../../ui/card";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import DeleteConfirmationModal from "../../BatchManagement/deleteModal";
import { Button } from "../../ui/button";
import EditLiveClass from "./editLiveClass";
import { GetImageUrl } from "../../../utils/helper";
import { deleteLiveClass } from "../../../features/Class Management/Live Class/services";
import toast from "react-hot-toast";

interface BatchCardProps {
  title: string;
  data: any;
  fetchAllLiveClasses?: () => void;
}

export const LiveClassCard: React.FC<BatchCardProps> = ({
  title,
  data,
  fetchAllLiveClasses,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteLiveClass({ uuid: data?.uuid });
      if (response) {
        toast.success("Live class deleted successfully");
        if (fetchAllLiveClasses) {
          fetchAllLiveClasses();
        }
        closeDeleteModal();
      } else {
        toast.success("Live class deleted successfully");
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Error deleting live class:", error);
    } finally {
      closeDeleteModal();
      if (fetchAllLiveClasses) {
        fetchAllLiveClasses();
      }
    }
  };

  const getFormattedTime = (timeString: string) => {
    const time = new Date(timeString);
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHour}.${minutes} ${ampm}`;
  };

  const displayTimeRange = `${getFormattedTime(
    data?.start_time
  )} - ${getFormattedTime(data?.end_time)}`;

  return (
    <Card className="rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.08)] w-full bg-white">
      <CardContent className="p-4 pb-2 relative">
        <div className="flex justify-between items-start border-b border-gray-200 pb-2">
          <div className="flex justify-between w-full px-4">
            <div className="flex flex-col items-center gap-2">
              <p style={{ ...FONTS.heading_09 }}>
                {data?.batch?.student?.length}{" "}
                {data?.batch?.student?.length === 1 ? "student" : "students"}
              </p>
              <div className="flex gap-1">
                {data?.batch?.student?.slice(0, 3)?.map((studentImg: any) => (
                  <img
                    key={studentImg?._id}
                    src={GetImageUrl(studentImg?.image) ?? undefined}
                    alt={studentImg?.full_name}
                    title={studentImg?.full_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p style={{ ...FONTS.heading_09 }}>
                {data?.instructors?.length}{" "}
                {data?.instructors?.length === 1 ? "instructor" : "instructors"}
              </p>
              <div className="flex gap-1">
                {data?.instructors?.slice(0, 3)?.map((studentImg: any) => (
                  <img
                    key={studentImg?._id}
                    src={GetImageUrl(studentImg?.image) ?? undefined}
                    alt={studentImg?.full_name}
                    title={studentImg?.full_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ))}
              </div>
            </div>
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
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/live-classes/${data?.uuid}`, {
                    state: {
                      data,
                    },
                  })
                }
                className="group border border-gray-300 text-black font-semibold text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer"
                onMouseEnter={(e: any) =>
                  (e.currentTarget.style.backgroundColor = "#1BBFCA")
                }
                onMouseLeave={(e: any) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
              >
                <Eye className="w-4 h-4 text-black group-hover:text-white" />
                <span className="group-hover:text-white">View</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer"
                onClick={openEditModal}
                onMouseEnter={(e: any) =>
                  (e.currentTarget.style.backgroundColor = "#1BBFCA")
                }
                onMouseLeave={(e: any) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
              >
                <Pencil className="w-4 h-4 text-black group-hover:text-white" />
                <span className="group-hover:text-white">Edit</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={openDeleteModal}
                className="group border border-gray-300 text-black font-medium text-sm rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#1BBFCA]"
                onMouseEnter={(e: any) =>
                  (e.currentTarget.style.backgroundColor = "#1BBFCA")
                }
                onMouseLeave={(e: any) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
              >
                <Trash2 className="w-4 h-4 text-black group-hover:text-white" />
                <span className="group-hover:text-white">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="pr-12">
          <div>
            <p
              className=" mt-4"
              style={{ ...FONTS.heading_05_bold, color: COLORS.gray_dark_02 }}
            >
              {`${title.substring(0, 35)}${title.length > 35 ? "..." : ""}`}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p
              className=""
              style={{ ...FONTS.heading_07_bold, color: COLORS.gray_dark_01 }}
            >
              {`${data?.batch?.student?.length} ${
                data?.batch?.student?.length === 1 ? "student" : "students"
              } on this Class`}
            </p>
          </div>

          <div className="mt-2 flex gap-2 items-center">
            <div>
              <CalendarDays color={COLORS.gray_light} className="w-5 h-5" />
            </div>
            <p style={{ ...FONTS.heading_08_bold, color: COLORS.gray_light }}>
              {data?.start_date?.split("T")[0]} | {displayTimeRange}
            </p>
          </div>

          <div className="mt-3 flex gap-2 items-center">
            <div>
              <Link color={COLORS.blue} />
            </div>
            <a
              href={data?.video_url}
              style={{ ...FONTS.heading_08_bold, color: COLORS.blue }}
              className="cursor-pointer underline"
              target="_blank"
            >
              {`${data?.video_url.substring(0, 35)} ${
                data?.video_url?.length > 35 ? "..." : ""
              }`}
            </a>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button
            onClick={() =>
              navigate(`/live-classes/${data?.uuid}`, {
                state: {
                  data,
                },
              })
            }
            className="bg-[#3ABE65] p-3 text-white hover:bg-[#3ABE65]"
            style={{ ...FONTS.heading_07 }}
          >
            View More
          </Button>
        </div>
      </CardContent>
      <EditLiveClass
        data={data}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        fetchAllLiveClasses={fetchAllLiveClasses}
      />

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirmDelete={handleConfirmDelete}
      />
    </Card>
  );
};
