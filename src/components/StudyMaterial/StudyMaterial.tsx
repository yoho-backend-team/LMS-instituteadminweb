import { useEffect, useState } from "react";
import { HeaderActions } from "./HeaderAction";
import { FilterSection } from "./FilterSection";
import type { Note } from '../../components/StudyMaterial/Note';

import { NoteModal } from "./StudyModal";
import { IoMdAdd } from "react-icons/io";

import fileIcon from "../../assets/icons/FileIcon.svg";
import titleIcon from "../../assets/icons/Mask group (2).svg";
import uploadIcon from "../../assets/icons/upload (2).svg";
import filterIcon from "../../assets/icons/filter.png";
import StudyDetailModal from "./StudyDetailModal";
import { NoteCard } from "./StudyMaterialCard";
import { useDispatch, useSelector } from "react-redux";
import { selectStudyMaterials } from "../../features/StudyMaterials/selector";
import { fetchStudyMaterialsThunk } from "../../features/StudyMaterials/thunk";
import {
  createStudyMaterial,
  deleteStudyMaterial,
  updateStudyMaterial,
} from "../../features/StudyMaterials/service";

const NotesManagement = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<null | Note>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "React",
      description: "Introduction to React components and JSX",
      course: "React Full Stack",
      branch: "CSE",
      status: "Active",
      file: undefined,
      uuid: "",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Leo",
      description: "Introduction to React components and JSX",
      course: "React Full Stack",
      branch: "CSE",
      status: "Completed",
      file: undefined,
      uuid: "",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ]);

  const dispatch = useDispatch<any>();
  const studyMaterials = useSelector(selectStudyMaterials);

  useEffect(() => {
    const paramsData = {
      branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
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

  const filterOptions = [
    { label: "Status", value: "status", options: ["", "Active", "Completed"] },
    { label: "Course", value: "course", options: ["", "React", "Node.js"] },
  ];

  const formFields = [
    {
      label: "Branch",
      key: "branch",
      type: "select" as const,
      options: ["", "CSE", "ECE"],
    },
    {
      label: "Course",
      key: "course",
      type: "select" as const,
      options: ["", "React", "Node"],
    },
    { label: "Title", key: "title", type: "input" as const },
    { label: "Description", key: "description", type: "input" as const },
    { label: "Video URL", key: "video", type: "input" as const },
  ];

  const handleSubmit = async () => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                ...formData,
                file: uploadedFile || note.file,
              }
            : note
        )
      );
      resetForm();
    } else {
      try {
        let fileString = "";
        if (uploadedFile) {
          fileString = await toBase64(uploadedFile);
        }

        const payload = {
          title: formData.title,
          description: formData.description,
          course: formData.course,
          branch: formData.branch,
          institute: "973195c0-66ed-47c2-b098-d8989d3e4529",
          file: fileString,
        };

        console.log("Payload:", payload);

        const newNote = await createStudyMaterial(payload);

        setNotes((prev) => [newNote, ...prev]);
        resetForm();
      } catch (error) {
        console.error("Error creating study material:", error);
      }
    }
  };

  // helper to convert File to base64
  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
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

  const handleDelete = async (uuid?: string) => {
    if (!uuid) {
      console.error("Cannot delete: UUID is missing");
      return;
    }

    try {
      await deleteStudyMaterial(uuid);
      dispatch(
        fetchStudyMaterialsThunk({
          branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
          page: 1,
        })
      );
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
  console.log("study", studyMaterials);

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const filteredNotes = Array.isArray(studyMaterials)
    ? studyMaterials.filter((note: Note) => {
        const statusMatch = filterValues.status
          ? note.status === filterValues.status
          : true;
        const courseMatch = filterValues.course
          ? note.course === filterValues.course
          : true;
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
          {filteredNotes.map((note: any) => {
            console.log("Mapped Note:", note.uuid); 
            return (
              <NoteCard
                key={note.id}
                note={note}
                onView={(note: any) => setSelectedNote(note)}
                onEdit={(note) => setSelectedNote(note)}
                onDelete={() => handleDelete(note.uuid)}
                fileIcon={fileIcon}
                titleIcon={titleIcon}
              />
            );
          })}
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

        {selectedNote && (
  <StudyDetailModal
    isOpen={!!selectedNote}
    note={selectedNote} // ✅ pass single note
    onClose={() => setSelectedNote(null)}
  />
)}

      </div>
    </div>
  );
};

export default NotesManagement;
