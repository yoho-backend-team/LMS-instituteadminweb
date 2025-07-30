import type React from "react"
import { DropdownMenu } from "./DropdownMenu"
import active from '../../assets/Frame 427321284.svg'

interface Note {
  id: number
  title: string
  description: string
  course: string
  branch: string
  status: "Active" | "Completed"
  file?: File
}

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: number) => void
  fileIcon: string
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete, fileIcon }) => {
  return (
    <div className="bg-white text-[#716F6F] rounded-xl p-4 shadow-2xl relative min-h-[150px] flex flex-col">
      <div className="absolute right-3 top-3">
        <DropdownMenu onEdit={() => onEdit(note)} onDelete={() => onDelete(note.id)} />
      </div>

      {note.file && (
        <div className="mt-4 flex gap-2">
          <img src={fileIcon || "/placeholder.svg"} alt="file" />
          <a
            href={URL.createObjectURL(note.file)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 mt-1 text-sm"
          >
            {note.file.name}
          </a>
        </div>
      )}

      <h2 className="text-lg font-semibold mt-4 ">{note.title}</h2>
      <p className="text-sm  mt-3">{note.course}</p>

      {note.status === "Active" && (
        <div className="flex items-center mt-3 gap-1 text-green-600 font-medium text-sm">
          <div>
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Active
        </div>
        <div className="ml-auto">
          <img src={active} alt="" />
          </div>
        </div>
      )}
    </div>
  )
}
