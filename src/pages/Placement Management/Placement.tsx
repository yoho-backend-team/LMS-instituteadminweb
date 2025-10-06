import { useEffect, useState, useRef } from "react";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import PlacementForm from "./PlacementForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlacementThunk,
  getAllPlacemetsThunk,
} from "../../features/placementManagement/Reducer/thunk";
import { GetLocalStorage } from "../../utils/localStorage";
import { GetImageUrl } from "../../utils/helper";
import { X } from "lucide-react";
import {
  deletePlacement,
  updatePlacement,
} from "../../features/placementManagement/Services/Placement";

// Skeleton Loader Row
const SkeletonRow = () => (
  <TableRow>
    {[...Array(5)].map((_, i) => (
      <TableCell key={i} className="px-3 sm:px-4 md:px-6 py-4">
        <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
      </TableCell>
    ))}
  </TableRow>
);

// Mobile Card View for smaller screens
const PlacementCard = ({ placement, onEdit, onDelete, actionRef, openAction, setOpenAction }: any) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
          {placement?.company?.name ?? "N/A"}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          {placement?.company?.email ?? "N/A"}
        </p>
      </div>
      <div ref={actionRef} className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            setOpenAction((prev: any) =>
              prev === placement._id ? null : placement._id
            );
          }}
        >
          <FaEllipsisV className="h-4 w-4" />
        </Button>
        {openAction === placement._id && (
          <div className="absolute right-0 z-20 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 border border-gray-300 overflow-hidden">
            <Button
              variant="ghost"
              onClick={(e: any) => {
                e.stopPropagation();
                onEdit();
                setOpenAction(null);
              }}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150"
            >
              <FaEdit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              onClick={(e: any) => {
                e.stopPropagation();
                onDelete();
                setOpenAction(null);
              }}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors border-t border-gray-100"
            >
              <FaTrash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        )}
      </div>
    </div>
    <div className="space-y-2 text-xs sm:text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Role:</span>
        <span className="font-medium text-gray-900">{placement?.job?.name ?? "N/A"}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Date:</span>
        <span className="font-medium text-gray-900">
          {placement?.schedule?.interviewDate
            ? new Date(placement.schedule.interviewDate).toLocaleDateString()
            : "N/A"}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Venue:</span>
        <span className="font-medium text-gray-900 text-right">{placement?.schedule?.venue ?? "N/A"}</span>
      </div>
    </div>
  </div>
);

// Skeleton Card for mobile view
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 animate-pulse rounded w-1/2"></div>
      </div>
      <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-300 animate-pulse rounded"></div>
      <div className="h-3 bg-gray-300 animate-pulse rounded"></div>
      <div className="h-3 bg-gray-300 animate-pulse rounded"></div>
    </div>
  </div>
);

const Placements = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const placements = useSelector((state: any) => state.placements.placements);
  const dispatch = useDispatch<any>();
  const instituteId = GetLocalStorage("instituteId");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getAllPlacemetsThunk({}));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const transformPlacementToFormData = (placement: any) => ({
    companyName: placement?.company?.name || "",
    companyAddress: placement?.company?.address || "",
    contactEmail: placement?.company?.email || "",
    contactNumber: String(placement?.company?.phone || ""),
    jobName: placement?.job?.name || "",
    jobDescription: placement?.job?.description || "",
    skills: placement?.job?.skils?.join(", ") || "",
    selectedStudents:
      placement?.student?.map((s: any) => ({
        value: s._id,
        label: s.full_name,
      })) || [],
    interviewDate: placement?.schedule?.interviewDate?.split("T")[0] || "",
    venue: placement?.schedule?.venue || "",
    address: placement?.schedule?.address || "",
    courseName: placement?.eligible?.courseName || "",
    education: placement?.eligible?.education?.join(", ") || "",
  });

  const handleAddPlacement = async (data: any) => {
    const payload = {
      company: {
        name: data.companyName,
        address: data.companyAddress,
        email: data.contactEmail,
        phone: data.contactNumber,
      },
      job: {
        name: data.jobName,
        description: data.jobDescription,
        skils: data.skills.split(",").map((s: any) => s.trim()),
      },
      student: data.selectedStudents.map((s: any) => s.value),
      schedule: {
        interviewDate: data.interviewDate,
        venue: data.venue,
        address: data.address,
      },
      eligible: {
        courseName: data.courseName,
        education: data.education.split(",").map((e: any) => e.trim()),
      },
      institute: instituteId,
    };

    try {
      await dispatch(createPlacementThunk(payload));
      await dispatch(getAllPlacemetsThunk({}));
      setIsFormOpen(false);
    } catch (err) {
      console.error("Failed to add placement", err);
    }
  };

  const handleUpdatePlacement = async (data: any) => {
    const payload = {
      uuid: editingPlacement?.uuid,
      student: data.selectedStudents.map((s: any) => s.value),
      institute: instituteId,
    };

    try {
      await updatePlacement(payload);
      await dispatch(getAllPlacemetsThunk({}));
      setIsFormOpen(false);
      setEditingPlacement(null);
    } catch (error) {
      console.error("Failed to update placement", error);
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      await deletePlacement(uuid);
      await dispatch(getAllPlacemetsThunk({}));
    } catch (error) {
      console.error("Failed to delete placement", error);
    }
  };

  const [openAction, setOpenAction] = useState<string | null>(null);
  const actionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (!openAction) return;
      const activeRef = actionRefs.current[openAction];
      if (activeRef && !activeRef.contains(e.target as Node)) {
        setOpenAction(null);
      }
    };

    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, [openAction]);

  return (
    <div className="space-y-4 p-2 sm:p-4">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Placements</h2>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingPlacement(null);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base whitespace-nowrap w-full sm:w-auto"
        >
          Add Placement
        </button>
      </div>

      {/* Modal - Responsive */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
            <Button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setEditingPlacement(null);
              }}
              variant="ghost"
              size="icon"
              className="h-8 w-8 absolute top-4 right-6 sm:top-10 sm:right-12 text-gray-600 hover:text-gray-900 text-xl font-bold z-10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>

            <PlacementForm
              mode={editingPlacement ? "edit" : "add"}
              onClose={() => {
                setIsFormOpen(false);
                setEditingPlacement(null);
              }}
              onSubmit={
                editingPlacement ? handleUpdatePlacement : handleAddPlacement
              }
              initialData={
                editingPlacement
                  ? transformPlacementToFormData(editingPlacement)
                  : undefined
              }
            />
          </div>
        </div>
      )}

      {/* Table View - Hidden on mobile (< 768px) */}
      <div className="hidden md:block border border-gray-400 shadow-2xl rounded-2xl p-2 overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="px-4 lg:px-6 py-3 font-medium text-sm lg:text-base">
                Company Name
              </TableHead>
              <TableHead className="px-4 lg:px-6 py-3 font-medium text-sm lg:text-base">
                Interview Date
              </TableHead>
              <TableHead className="px-4 lg:px-6 py-3 font-medium text-sm lg:text-base">Role</TableHead>
              <TableHead className="px-4 lg:px-6 py-3 font-medium text-sm lg:text-base">Venue</TableHead>
              <TableHead className="px-4 lg:px-6 py-3 font-medium text-right text-sm lg:text-base">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              : placements.map((placement: any) => (
                  <TableRow key={placement?._id} className="hover:bg-gray-50">
                    <TableCell className="px-4 lg:px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm lg:text-base">{placement?.company?.name ?? "N/A"}</span>
                        <span className="text-xs lg:text-sm text-gray-600">{placement?.company?.email ?? "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 lg:px-6 py-4 text-sm lg:text-base">
                      {placement?.schedule?.interviewDate
                        ? new Date(
                            placement.schedule.interviewDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="px-4 lg:px-6 py-4 text-sm lg:text-base">
                      {placement?.job?.name ?? "N/A"}
                    </TableCell>
                    <TableCell className="px-4 lg:px-6 py-4 text-sm lg:text-base">
                      {placement?.schedule?.venue ?? "N/A"}
                    </TableCell>
                    <TableCell className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <div
                        ref={(el) => {
                          if (placement?._id)
                            actionRefs.current[placement._id] = el;
                        }}
                        className="relative inline-block text-left"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                          title="Actions"
                          aria-label="Actions menu"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenAction((prev) =>
                              prev === placement._id ? null : placement._id
                            );
                          }}
                        >
                          <FaEllipsisV className="h-4 w-4" />
                        </Button>

                        {openAction === placement._id && (
                          <div className="absolute right-0 z-20 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 border border-gray-300 overflow-hidden">
                            <Button
                              variant="ghost"
                              onClick={(e: any) => {
                                e.stopPropagation();
                                setEditingPlacement(placement);
                                setIsFormOpen(true);
                                setOpenAction(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150 ease-in-out"
                              aria-label="Edit"
                            >
                              <FaEdit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Button>

                            <Button
                              variant="ghost"
                              onClick={(e: any) => {
                                e.stopPropagation();
                                handleDelete(placement.uuid);
                                setOpenAction(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150 ease-in-out border-t border-gray-100"
                              aria-label="Delete"
                            >
                              <FaTrash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Card View - Visible on mobile (< 768px) */}
      <div className="md:hidden">
        {loading
          ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
          : placements.map((placement: any) => (
              <PlacementCard
                key={placement?._id}
                placement={placement}
                onEdit={() => {
                  setEditingPlacement(placement);
                  setIsFormOpen(true);
                }}
                onDelete={() => handleDelete(placement.uuid)}
                actionRef={(el: any) => {
                  if (placement?._id) actionRefs.current[placement._id] = el;
                }}
                openAction={openAction}
                setOpenAction={setOpenAction}
              />
            ))}
      </div>
    </div>
  );
};

export default Placements;