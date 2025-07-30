import { useState } from "react"
import { HeaderActions } from "./HeaderAction"
import { FilterSection } from "./FilterSection"
import { NoteCard } from "./NoteCard"
import { NoteModal } from "./NoteModal"


import filter from '../../assets/Mask group.svg'
import add from '../../assets/Add.svg'
import upload from '../../assets/Upload.svg'
import fileIcon from '../../assets/File.svg'


interface Note {
  id: number
  title: string
  description: string
  course: string
  branch: string
  status: "Active" | "Completed"
  file?: File
}

const NotesManagement = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
   const [notes, setNotes] = useState<Note[]>([
  {
    id: 1,
    title: "React",
    description: "Introduction to React components and JSX",
    course: "React Full Stack",
    branch: "CSE",
    status: "Active",
    file: undefined,
  },
])

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
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)


  // Filter configuration
  const filterOptions = [
    {
      label: "Status",
      value: "status",
      options: ["Active", "Completed"],
    },
    {
      label: "Course",
      value: "course",
      options: ["React", "Node.js"],
    },
  ]

  // Form fields configuration
  const formFields = [
    { label: "Branch", key: "branch", type: "select" as const, options: ["CSE", "ECE"] },
    { label: "Course", key: "course", type: "select" as const, options: ["React", "Node"] },
    { label: "Title", key: "title", type: "input" as const },
    { label: "Description", key: "description", type: "input" as const },
    { label: "Confirm Password", key: "password", type: "password" as const },
  ]

  const handleSubmit = () => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id ? { ...note, ...formData, file: uploadedFile || note.file } : note,
        ),
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
      }
      setNotes((prev) => [newNote, ...prev])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", course: "", branch: "", password: "" })
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
    setFormData({ title: "", description: "", course: "", branch: "", password: "" })
    setUploadedFile(null)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

  const filteredNotes = notes.filter((note) => {
    const statusMatch = filterValues.status ? note.status === filterValues.status : true
    const courseMatch = filterValues.course ? note.course === filterValues.course : true
    return statusMatch && courseMatch
  })

  return (
    <div
      className="min-h-screen p-3 w-full bg-cover bg-center"

    >
      <div className="">
        <HeaderActions
          title="Notes"
          onFilterToggle={() => setShowFilter(!showFilter)}
          onAddClick={handleAddClick}
          filterIcon={filter}
          addIcon={add}
          addButtonText="Add Notes"
          showFilter={showFilter}
        />

        <FilterSection
          isVisible={showFilter}
          filters={filterOptions}
          values={filterValues}
          onChange={handleFilterChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-3 gap-6 pt-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} fileIcon={fileIcon} />
          ))}
        </div>

        <NoteModal
          isOpen={showModal}
          isEditing={!!editingNote}
          formData={formData}
          uploadedFile={uploadedFile}
          uploadIcon={upload}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          onFormChange={(key, value) => setFormData({ ...formData, [key]: value })}
          onFileChange={setUploadedFile}
          fields={formFields}
        />
      </div>
    </div>
  )
}

export default NotesManagement
