import React, { useState } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import type { Note } from "../../components/StudyMaterial/Note";

interface NoteCardProps {
  note: Note;
  onView: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void; 
  
  onToggleStatus?: (uuid: string, status: "Active" | "Completed") => void;
  fileIcon: string;
  titleIcon: string;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onView,
  onToggleStatus,
  fileIcon,
  titleIcon,
}) => {
  const [status, setStatus] = useState<"Active" | "Completed">(note.status);

  const handleToggle = () => {
    const newStatus = status === "Active" ? "Completed" : "Active";
    setStatus(newStatus);
    onToggleStatus?.(note.uuid, newStatus); 
  };

  return (
    <div className="bg-white text-[#716F6F] rounded-2xl p-4 shadow-2xl relative min-h-[200px] flex flex-col">
      <div className="ml-auto mt-3 text-2xl right-3 top-3">
        <DropdownMenu
          onView={() => onView(note)}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note.id)} 
        />
      </div>

      {note.file && (
        <div className="flex gap-2 mt-2 bg-[#F7F7F7] h-12 text-xl items-center cursor-pointer rounded px-2">
          <img
            src={fileIcon || "/placeholder.svg"}
            alt="file"
            className="w-5 h-5"
          />
          <span className="text-sm">{note.id}</span>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-3 flex items-center">
        <img src={titleIcon} alt="icon" className="mr-2 w-5 h-5" />
        {note.title}
      </h2>

      <div className="flex items-center mt-4">
        {note?.is_active ? (
          <div className="flex items-center gap-1 text-green-600 font-medium text-lg">
            <span>Active</span>
            <span className="h-3 w-3 mt-1 ml-1 rounded-full bg-green-500 inline-block" />
          </div>
        ) : (
          <div className="flex items-center gap-1 text-gray-500 font-medium text-lg">
            <span>Completed</span>
            <span className="h-3 w-3 mt-1 rounded-full bg-gray-400 inline-block" />
          </div>
        )}

        <button onClick={handleToggle} className="ml-auto">
          {note?.is_active ? (
            <MdToggleOn className="text-green-500 text-5xl" />
          ) : (
            <MdToggleOff className="text-gray-400 text-5xl" />
          )}
        </button>
      </div>
    </div>
  );
};
