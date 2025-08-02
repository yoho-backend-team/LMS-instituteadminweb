import { useEffect, useState } from "react"
import { HeaderActions } from "./HeaderAction"
import { FilterSection } from "./FilterSection"

import { NoteModal } from "./StudyModal"
import { IoMdAdd } from "react-icons/io"

import fileIcon from '../../assets/icons/FileIcon.svg'
import titleIcon from '../../assets/icons/Mask group (2).svg'
import uploadIcon from '../../assets/icons/upload (2).svg'
import filterIcon from '../../assets/icons/filter.png'
import StudyDetailModal from "./StudyDetailModal"
import { NoteCard } from "./StudyMaterialCard"
import { useDispatch, useSelector } from "react-redux"
import { selectStudyMaterials } from "../../features/StudyMaterials/selector"
import { fetchStudyMaterialsThunk } from "../../features/StudyMaterials/thunk"


interface Note {
  id: number
  title: string
  description: string
  course: string
  branch: string
  status: "Active" | "Completed"
  file?: File
  video?: string
}

const NotesManagement = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [selectedNote, setSelectedNote] = useState<null | Note>(null)
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "React",
      description: "Introduction to React components and JSX",
      course: "React Full Stack",
      branch: "CSE",
      status: "Active",
      file: undefined,
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
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ])

   const dispatch = useDispatch<any>();
  const studyMaterials = useSelector(selectStudyMaterials);

  useEffect(() => {
   const paramsData = {branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4", page: 1}
    dispatch(fetchStudyMaterialsThunk(paramsData));
  }, [dispatch]);

  const [filterValues, setFilterValues] = useState({
    status: "",
    course: "",
  })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    branch: "",
    password: "",
    video: "",
  })

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const filterOptions = [
    { label: "Status", value: "status", options: ["","Active", "Completed"] },
    { label: "Course", value: "course", options: ["","React", "Node.js"] },
  ]

  const formFields = [
    { label: "Branch", key: "branch", type: "select" as const, options: ["","CSE", "ECE"] },
    { label: "Course", key: "course", type: "select" as const, options: ["", "React", "Node"] },
    { label: "Title", key: "title", type: "input" as const },
    { label: "Description", key: "description", type: "input" as const },
    { label: "Video URL", key: "video", type: "input" as const },
  ]

  const handleSubmit = () => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                ...formData,
                file: uploadedFile || note.file,
                video: formData.video,
              }
            : note
        )
      )
    } else {
      const newNote: Note = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        course: formData.course,
        branch: formData.branch,
        status: "Active",
        file: uploadedFile || undefined,
        video: formData.video,
      }
      setNotes((prev) => [newNote, ...prev])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      course: "",
      branch: "",
      password: "",
      video: "",
    })
    setUploadedFile(null)
    setEditingNote(null)
    setShowModal(false)
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      description: note.description,
      course: note.course,
      branch: note.branch,
      password: "",
      video: note.video || "",
    })
    setUploadedFile(note.file || null)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  const handleAddClick = () => {
    setShowModal(true)
    setEditingNote(null)
    setFormData({
      title: "",
      description: "",
      course: "",
      branch: "",
      password: "",
      video: "",
    })
    setUploadedFile(null)
  }
  console.log("study", studyMaterials)

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

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
          {filteredNotes.map((note: any) => (
            <NoteCard
              key={note.id}
              note={note}
              onView={(note: any) => setSelectedNote(note)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              fileIcon={fileIcon}
              titleIcon={titleIcon}
            />
          ))}
        </div>

        <NoteModal
          isOpen={showModal}
          isEditing={!!editingNote}
          formData={formData}
          uploadedFile={uploadedFile}
          uploadIcon={uploadIcon}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          onFormChange={(key, value) => setFormData({ ...formData, [key]: value })}
          onFileChange={setUploadedFile}
          fields={formFields}
        />

        {selectedNote && (
          <StudyDetailModal
            isOpen={!!selectedNote}
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
          />
        )}
      </div>
    </div>
  )
}

export default NotesManagement
