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
import { X } from "lucide-react";
import {
  deletePlacement,
  updatePlacement,
} from "../../features/placementManagement/Services/Placement";
import { useNavigate } from "react-router-dom";

// Skeleton Loader Row
const SkeletonRow = () => (
  <TableRow>
    {[...Array(5)].map((_, i) => (
      <TableCell key={i} className="px-6 py-4">
        <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
      </TableCell>
    ))}
  </TableRow>
);

const Placements = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // 👈 loading state
 const navigate = useNavigate();
  const placements = useSelector((state: any) => state.placements.placements);
  const dispatch = useDispatch<any>();
  const instituteId = GetLocalStorage("instituteId");
  console.log(placements,"placements")

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

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Placements</h2>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingPlacement(null);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Placement
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto relative">
            <Button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setEditingPlacement(null);
              }}
              variant="ghost"
              size="icon"
              className="h-8 w-8 absolute top-10 right-12 text-gray-600 hover:text-gray-900 text-xl font-bold"
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

      <div className="border border-gray-400 shadow-2xl rounded-2xl p-2">
        <Table className="overflow-auto">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="px-6 py-3 font-medium">
                Company Name
              </TableHead>
              <TableHead className="px-6 py-3 font-medium">
                Interview Date
              </TableHead>
              <TableHead className="px-6 py-3 font-medium">Role</TableHead>
              <TableHead className="px-6 py-3 font-medium">Venue</TableHead>
              <TableHead className="px-6 py-3 font-medium text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />) // 👈 show 5 skeleton rows
              : placements.map((placement: any) => (
                  <TableRow
                    key={placement?._id}
                    className="hover:bg-gray-50"
                    onClick={() => navigate("/placementview",{ state: { placement } })} 
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{placement?.company?.name ?? "N/A"}</span>
                        <span>{placement?.company?.email ?? "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {placement?.schedule?.interviewDate
                        ? new Date(
                            placement.schedule.interviewDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {placement?.job?.name ?? "N/A"}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {placement?.schedule?.venue ?? "N/A"}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative group">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                        title="Actions"
                        aria-label="Actions menu"
                      >
                        <FaEllipsisV className="h-4 w-4" />
                      </Button>

                      <div className="hidden group-hover:block absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 border border-gray-400 focus:outline-none overflow-hidden">
                        <Button
                          variant="ghost"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            setEditingPlacement(placement);
                            setIsFormOpen(true);
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
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full transition-colors duration-150 ease-in-out border-t border-gray-100"
                          aria-label="Delete"
                        >
                          <FaTrash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Placements;
