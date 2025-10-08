import { useEffect, useState } from "react";
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
import { Plus, X } from "lucide-react";
import {
  deletePlacement,
  updatePlacement,
} from "../../features/placementManagement/Services/Placement";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Skeleton Loader Row
const SkeletonRow = () => (
  <TableRow>
    {[...Array(5)].map((_, i) => (
      <TableCell key={i} className="px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4">
        <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
      </TableCell>
    ))}
  </TableRow>
);

const Placements = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const placements = useSelector((state: any) => state.placements.placements);
  const dispatch = useDispatch<any>();
  const instituteId = GetLocalStorage("instituteId");
  const [, setOpenMenuId] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(false);




  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getAllPlacemetsThunk({}));
      } catch (error) {
        console.error("Error fetching placements:", error);
        toast.error("Failed to load placements");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
      setLoading(true);
      await dispatch(createPlacementThunk(payload));
      // Add a small delay to ensure state updates
      await new Promise(resolve => setTimeout(resolve, 300));
      await dispatch(getAllPlacemetsThunk({}));
      setIsFormOpen(false);
      toast.success("Placement created successfully! 🎉");
    } catch (err) {
      console.error("Failed to add placement", err);
      toast.error("Failed to create placement. Please try again.");
    }
  };

  const handleUpdatePlacement = async (data: any) => {
    const payload = {
      uuid: editingPlacement?.uuid,
      student: data.selectedStudents.map((s: any) => s.value),
      institute: instituteId,
    };

    try {
      setLoading(true);
      await updatePlacement(payload);
      // Add a small delay to ensure state updates
      await new Promise(resolve => setTimeout(resolve, 300));
      await dispatch(getAllPlacemetsThunk({}));
      setIsFormOpen(false);
      setEditingPlacement(null);
      toast.success("Placement updated successfully! ✅");
    } catch (error) {
      console.error("Failed to update placement", error);
      toast.error("Failed to update placement. Please try again.");
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      setLoading(true);
      await deletePlacement(uuid);
      // Add a small delay to ensure state updates
      await new Promise(resolve => setTimeout(resolve, 300));
      await dispatch(getAllPlacemetsThunk({}));
      toast.success("Placement deleted successfully! 🗑️");
    } catch (error) {
      console.error("Failed to delete placement", error);
      toast.error("Failed to delete placement. Please try again.");
    }
  };

  const toggleMenu = (placementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === placementId ? null : placementId);
  };

  const handleMenuAction = (action: string, placement: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(null);

    switch (action) {
      case "view":
        navigate("/placementview", { state: { placement } });
        break;
      case "edit":
        setEditingPlacement(placement);
        setIsFormOpen(true);
        break;
      case "delete":
        handleDelete(placement.uuid);
        break;
    }
  };

  // Mobile Card View
  const MobilePlacementCard = ({ placement }: { placement: any }) => (
    <div
      className="bg-white rounded-lg shadow-sm border p-4 mb-3"
      onClick={() => navigate("/placementview", { state: { placement } })}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">
              {placement?.company?.name ?? "N/A"}
            </h3>
            <p className="text-sm text-gray-600">
              {placement?.company?.email ?? "N/A"}
            </p>
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={(e:any) => toggleMenu(placement._id, e)}
            >
              <FaEllipsisV className="h-4 w-4" />
            </Button>
            {activeMenu === placement._id && (
              <div className="absolute right-0 mt-1 w-36 bg-white shadow-lg rounded-lg border z-10">
                {/* VIEW */}
                <Button
                  variant="ghost"
                  onClick={(e:any) => handleMenuAction("view", placement, e)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full justify-start"
                >
                  <FaEdit className="mr-2 h-4 w-4" />
                  <span>View</span>
                </Button>

                {/* EDIT */}
                <Button
                  variant="ghost"
                  onClick={(e:any) => handleMenuAction("edit", placement, e)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full justify-start border-t"
                >
                  <FaEdit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Button>

                {/* DELETE */}
                <Button
                  variant="ghost"
                  onClick={(e:any) => handleMenuAction("delete", placement, e)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full justify-start border-t"
                >
                  <FaTrash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Interview:</span>
            <p>
              {placement?.schedule?.interviewDate
                ? new Date(
                    placement.schedule.interviewDate
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <span className="font-medium">Role:</span>
            <p>{placement?.job?.name ?? "N/A"}</p>
          </div>
          <div className="col-span-2">
            <span className="font-medium">Venue:</span>
            <p>{placement?.schedule?.venue ?? "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 p-3 sm:p-4 min-h-screen bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Placements
        </h2>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingPlacement(null);
          }}
          className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex flex-row gap-2 text-sm sm:text-base"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Add Placement</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto relative">
            <Button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setEditingPlacement(null);
              }}
              variant="ghost"
              size="icon"
              className="h-6 w-6 sm:h-8 sm:w-8 absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 z-10"
              aria-label="Close"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
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

      <div className="border border-gray-300 sm:border-gray-400 shadow-sm sm:shadow-2xl rounded-lg sm:rounded-2xl p-2 sm:p-4 bg-white">
        {isMobile ? (
          // Mobile Card View
          <div className="space-y-3">
            {loading
              ? [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm border p-4 mb-3"
                  >
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-300 animate-pulse rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-gray-300 animate-pulse rounded w-2/3"></div>
                    </div>
                  </div>
                ))
              : placements && placements.length > 0 ? (
                placements.map((placement: any) => (
                  <MobilePlacementCard
                    key={placement?._id}
                    placement={placement}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No placements found</p>
                </div>
              )}
          </div>
        ) : (
          // Desktop Table View
          <Table className="w-full">
            <TableHeader className="bg-gray-100 sm:bg-gray-200">
              <TableRow>
                <TableHead className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3 font-medium text-xs sm:text-sm">
                  Company Name
                </TableHead>
               <TableHead
  className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3 font-medium text-xs sm:text-sm cursor-pointer select-none"
  onClick={() => setSortAsc(prev => !prev)}
>
  Interview Date{" "}
  <span className="ml-1">{sortAsc ? "↑" : "↓"}</span>
</TableHead>


                <TableHead className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3 font-medium text-xs sm:text-sm">
                  Role
                </TableHead>
                <TableHead className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3 font-medium text-xs sm:text-sm">
                  Venue
                </TableHead>
                <TableHead className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3 font-medium text-xs sm:text-sm text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                : placements.map((placement: any) => (
                    <TableRow
                      key={placement?._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        navigate("/placementview", { state: { placement } })
                      }
                    >
                      <TableCell className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {placement?.company?.name ?? "N/A"}
                          </span>
                          <span className="text-xs text-gray-600">
                            {placement?.company?.email ?? "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-sm">
                        {placement?.schedule?.interviewDate
                          ? new Date(
                              placement.schedule.interviewDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-sm">
                        {placement?.job?.name ?? "N/A"}
                      </TableCell>
                      <TableCell className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-sm">
                        {placement?.schedule?.venue ?? "N/A"}
                      </TableCell>
                      <TableCell className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                          title="Actions"
                          aria-label="Actions menu"
                          onClick={(e:any) => toggleMenu(placement._id, e)}
                        >
                          <FaEllipsisV className="h-4 w-4" />
                        </Button>

                        {activeMenu === placement._id && (
                          <div className="absolute right-8 z-10 mt-1 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 border border-gray-400 overflow-hidden">
                            {/* VIEW */}
                            <Button
                              variant="ghost"
                              onClick={(e:any) => handleMenuAction("view", placement, e)}
                              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150 ease-in-out"
                            >
                              <FaEdit className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </Button>

                            {/* EDIT */}
                            <Button
                              variant="ghost"
                              onClick={(e:any) => handleMenuAction("edit", placement, e)}
                              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full border-t transition-colors duration-150 ease-in-out"
                            >
                              <FaEdit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Button>

                            {/* DELETE */}
                            <Button
                              variant="ghost"
                              onClick={(e:any) => handleMenuAction("delete", placement, e)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full border-t transition-colors duration-150 ease-in-out"
                            >
                              <FaTrash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Placements;