/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { HeaderActions } from "./HeaderAction";
import { FilterSection } from "./FilterSection";

import { NoteModal } from "./StudyModal";

import fileIcon from "../../assets/icons/FileIcon.svg";
import titleIcon from "../../assets/icons/Mask group (2).svg";
import uploadIcon from "../../assets/icons/upload (2).svg";
import filterIcon from "../../assets/icons/filter.png";
import { NoteCard } from "./StudyMaterialCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBranches,
  selectCourses,
  selectLoading,
  selectStudyMaterials,
} from "../../features/StudyMaterials/selector";
import {
  createStudyMaterialThunk,
  deleteStudyMaterialThunk,
  fetchStudyMaterialsThunk,
  GetBranchThunks,
  GetCourseThunks,
  updateStudyMaterialThunk,
} from "../../features/StudyMaterials/thunk";
import { updateStudyMaterialStatus } from "../../features/StudyMaterials/service";
// import SkeletonCard from '../../components/shared/SkeletonCard/SkeletonCard';
import ContentLoader from "react-content-loader";
import { GetLocalStorage } from "../../utils/localStorage";
import type { AppDispatch } from "../../store/store";
import { UploadFile } from "../../features/Content_Management/services";

interface Note {
  id: number;
  title: string;
  uuid: string;
  description: string;
  course: string;
  branch: string;
  status: "Active" | "Completed";
  file?: File;
  video?: string;
}

const NotesManagement = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [, setSelectedNote] = useState<null | Note>(null);
  const dispatch = useDispatch<AppDispatch>();
  const studyMaterials = useSelector(selectStudyMaterials);
  const loading = useSelector(selectLoading);
  const branches = useSelector(selectBranches);
  const courses = useSelector(selectCourses);

  useEffect(() => {
    const params = {
      branch: GetLocalStorage("selectedBranchId"),
    };
    dispatch(GetBranchThunks(params));
    dispatch(GetCourseThunks(params));
  }, [dispatch]);

  useEffect(() => {
    if (branches && branches.length > 0) {
      const firstBranchId = branches[0].uuid || branches[0].branch_identity;

      const params = {
        branch_id: firstBranchId,
      };

      dispatch(GetCourseThunks(params));
    }
  }, [dispatch, branches]);

  useEffect(() => {
    const paramsData = {
      branch: GetLocalStorage("selectedBranchId"),
      page: 1,
    };
    dispatch(fetchStudyMaterialsThunk(paramsData));
  }, [dispatch]);

  const [filterValues, setFilterValues] = useState({
    status: "",
    course: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    branch: "",
    password: "",
    institute: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const courseNameToIdMap = courses.reduce((acc: any, course: any) => {
    acc[course.course_name] = course._id;
    return acc;
  }, {});

  const filterOptions = [
    {
      label: "Status",
      value: "status",
      options: ["", "Active", "Completed"],
    },
    {
      label: "Course",
      value: "course",
      options: ["", ...courses.map((course: any) => course.course_name)],
    },
  ];

  const formFields = [
    {
      label: "Branch",
      key: "branch",
      type: "select" as const,
      options:
        branches?.map((branch: any) => ({
          label: branch.branch_identity,
          value: branch.uuid,
        })) || [],
    },
    {
      label: "Course",
      key: "course",
      type: "select" as const,
      options:
        courses?.map((course: any) => ({
          label: course.course_name,
          value: course._id,
        })) || [],
    },
    { label: "Title", key: "title", type: "input" as const },
    { label: "Description", key: "description", type: "input" as const },
  ];

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await UploadFile(formData)
    console.log(response, 'res')


    return response?.file || "";
  };

  const handleSubmit = async () => {
    try {
      let filePath = "";

      if (uploadedFile instanceof File) {
        filePath = await uploadFile(uploadedFile);
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        course: formData.course,
        branch: formData.branch,
        institute: GetLocalStorage("instituteId"),
        file: filePath,
      };

      if (editingNote) {
        const updatedData = {
          ...editingNote,
          ...payload,
          uuid: (editingNote as any).uuid,
        };

        await dispatch(updateStudyMaterialThunk(updatedData));
      } else {
        await dispatch(createStudyMaterialThunk(payload));
      }

      const paramsData = {
        branch: GetLocalStorage("selectedBranchId"),
        page: 1,
      };
      dispatch(fetchStudyMaterialsThunk(paramsData));

      resetForm();
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      course: "",
      branch: "",
      password: "",
      institute: "",
    });
    setUploadedFile(null);
    setEditingNote(null);
    setShowModal(false);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      description: note.description,
      course: note.course,
      branch: note.branch,
      password: "",
      institute: "",
    });
    setUploadedFile(note.file || null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteStudyMaterialThunk(id));

      const paramsData = {
        branch: GetLocalStorage("selectedBranchId"),
        page: 1,
      };
      dispatch(fetchStudyMaterialsThunk(paramsData));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleAddClick = () => {
    setShowModal(true);
    setEditingNote(null);
    setFormData({
      title: "",
      description: "",
      course: "",
      branch: "",
      password: "",
      institute: "",
    });
    setUploadedFile(null);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleStatus = async (
    uuid: string,
    currentStatus: "Active" | "Completed"
  ) => {
    try {
      const toggledStatus = currentStatus === "Active" ? true : false;

      const payload = {
        id: uuid,
        is_active: toggledStatus,
      };

      await updateStudyMaterialStatus(payload);

      dispatch(
        fetchStudyMaterialsThunk({
          branch: GetLocalStorage("selectedBranchId"),
          page: 1,
        })
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const filteredNotes = Array.isArray(studyMaterials)
    ? studyMaterials.filter((note: any) => {
      let statusMatch = true;
      if (filterValues.status) {
        if (note.status) {
          statusMatch = note.status === filterValues.status;
        } else if (typeof note.is_active === "boolean") {
          statusMatch =
            filterValues.status === "Active"
              ? note.is_active === true
              : note.is_active === false;
        } else if (typeof note.active === "boolean") {
          statusMatch =
            filterValues.status === "Active"
              ? note.active === true
              : note.active === false;
        } else if (note.status === "active" || note.status === "inactive") {
          statusMatch =
            (filterValues.status === "Active" && note.status === "active") ||
            (filterValues.status === "Completed" &&
              note.status === "inactive");
        }
      }

      let courseMatch = true;
      if (filterValues.course) {
        if (note.course_name) {
          courseMatch = note.course_name === filterValues.course;
        } else if (note.course) {
          const filterCourseId = courseNameToIdMap[filterValues.course];
          courseMatch =
            note.course === filterCourseId ||
            note.course === filterValues.course;
        } else if (note.courseName) {
          courseMatch = note.courseName === filterValues.course;
        }
      }
      return statusMatch && courseMatch;
    })
    : [];

  return (
    <div className="min-h-screen p-3 w-full bg-cover bg-center">
      <div>
        <HeaderActions
          title="Study Material"
          onFilterToggle={() => setShowFilter(!showFilter)}
          onAddClick={handleAddClick}
          filterIcon={filterIcon}
          addButtonText="Add Study Material"
          showFilter={showFilter}
        />

        <FilterSection
          isVisible={showFilter}
          filters={filterOptions}
          values={filterValues}
          onChange={handleFilterChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 gap-6 pt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-5 col-span-3">
              {[...Array(6)].map((_, index) => (
                <ContentLoader
                  speed={1}
                  width="100%"
                  height="100%"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                  className="w-full h-[210px] p-4 rounded-2xl border shadow-md"
                  key={index}
                >
                  <rect x="0" y="0" rx="6" ry="6" width="100" height="24" />
                  <rect x="270" y="0" rx="6" ry="6" width="80" height="24" />

                  <rect
                    x="0"
                    y="36"
                    rx="10"
                    ry="10"
                    width="100%"
                    height="120"
                  />

                  <rect x="0" y="170" rx="6" ry="6" width="60%" height="20" />

                  <rect x="0" y="200" rx="4" ry="4" width="80" height="16" />
                  <rect x="280" y="200" rx="4" ry="4" width="60" height="20" />

                  <rect x="0" y="240" rx="6" ry="6" width="100" height="32" />

                  <rect x="260" y="240" rx="6" ry="6" width="80" height="32" />
                </ContentLoader>
              ))}
            </div>
          ) : filteredNotes.length > 0 ? (
            filteredNotes?.map((note: any) => {
              return (
                <NoteCard
                  key={note?.id || note?.uuid}
                  note={note}
                  onEdit={handleEdit}
                  onView={(note: any) => setSelectedNote(note)}
                  onToggleStatus={handleToggleStatus}
                  onDelete={() => handleDelete(note?.uuid)}
                  fileIcon={fileIcon}
                  titleIcon={titleIcon}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                {filterValues.status || filterValues.course
                  ? "No study materials match the current filters"
                  : "No study materials found"}
              </p>
            </div>
          )}
        </div>

        <NoteModal
          isOpen={showModal}
          isEditing={!!editingNote}
          formData={formData}
          uploadedFile={uploadedFile}
          uploadIcon={uploadIcon}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          onFormChange={(key, value) =>
            setFormData({ ...formData, [key]: value })
          }
          onFileChange={setUploadedFile}
          fields={formFields}
        />
      </div>
    </div>
  );
};

export default NotesManagement;
