import { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import CustomDropdown from "../../../components/ContentMangement/Notes/CoustomDropdown/CustomDropdown";
import AddNotes from "../../../components/ContentMangement/Notes/AddNotes";
import NoteCard from "../../../components/ContentMangement/Notes/NotesCards";
import EditNotes from "../../../components/ContentMangement/Notes/EditNotes";
import ViewNoteModal from "../../../components/ContentMangement/Notes/Viewnotes";

const statusfilteroption = ["Active", "Offline"];
const courseOptions = ["Course 1", "Course 2"];

const Notes = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [editNote, setEditNote] = useState<any>(null);
  const [viewNote, setViewNote] = useState<any>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState([
    {
      title: "RVR",
      fileName: "dummy.pdf",
      course: "Course 1",
      branch: "Branch 1",
      confirm: "Confirm 1",
      description: "Description 1",
      isActive: true,
    },
    {
      title: "ABC",
      fileName: "abc_content.pdf",
      course: "Course 2",
      branch: "Branch 2",
      confirm: "Confirm 2",
      description: "Description 2",
      isActive: false,
    },
  ]);

  const handleNoteSubmit = (data: any) => {
    if (editNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.title === editNote.title ? { ...note, ...data } : note
        )
      );
    } else {
      setNotes((prev) => [...prev, data]);
    }
    setEditNote(null);
    setShowPanel(false);
  };

  const handleEditClick = (note: any) => {
    setEditNote(note);
    setShowPanel(true);
    setShowFilter(false);
    setOpenIndex(null);
  };

  const handleDeleteClick = (note: any) => {
    setNotes((prev) => prev.filter((n) => n.title !== note.title));
    setShowFilter(false);
    setOpenIndex(null);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setShowPanel(false);
        setEditNote(null);
      }
    };

    if (showPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel]);

  return (
    <div className="relative flex flex-col gap-6">
      {showPanel && (
        <div
          className="fixed inset-0 z-50 flex justify-end items-center backdrop-blur-sm"
          onClick={() => {
            setShowPanel(false);
            setEditNote(null);
          }}
        >
          <div
            ref={panelRef}
            className="bg-white shadow-xl rounded-xl w-[500px] max-w-full h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {editNote ? (
              <EditNotes
                noteData={editNote}
                onClose={() => {
                  setShowPanel(false);
                  setEditNote(null);
                }}
                onSubmit={handleNoteSubmit}
              />
            ) : (
              <AddNotes
                onClose={() => {
                  setShowPanel(false);
                  setEditNote(null);
                }}
                onSubmit={handleNoteSubmit}
              />
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="bg-[#1BBFCA] text-white p-2 rounded-xl flex gap-2 items-center">
          <BsSliders size={20} />
          <button onClick={() => setShowFilter((prev) => !prev)}>
            {showFilter ? "Hide Filter" : "Show Filter"}
          </button>
        </div>

        <div
          className="bg-[#1BBFCA] text-white p-2 rounded-xl flex gap-2 items-center cursor-pointer"
          onClick={() => {
            setEditNote(null);
            setShowPanel(true);
            setShowFilter(false);
          }}
        >
          <GoPlus size={20} />
          <span>Add New Note</span>
        </div>
      </div>

      {showFilter && (
        <div className="flex gap-5 bg-white p-2 rounded-lg shadow-lg">
          <div className="flex-1 p-1 flex flex-col gap-2">
            <label className="text-[#716F6F] font-medium">Status</label>
            <CustomDropdown
              options={statusfilteroption}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Select Status"
              width="w-full"
            />
          </div>
          <div className="flex-1 p-1 flex flex-col gap-2">
            <label className="text-[#716F6F] font-medium">Courses</label>
            <CustomDropdown
              options={courseOptions}
              value={selectedCourse}
              onChange={setSelectedCourse}
              placeholder="Select Course"
              width="w-full"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            {...note}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            onEdit={() => handleEditClick(note)}
            onDelete={() => handleDeleteClick(note)}
            onView={() => setViewNote(note)}
          />
        ))}
        {viewNote && (
          <ViewNoteModal
            isOpen={true}
            note={{
              title: viewNote.title,
              course: viewNote.course,
              description: viewNote.description,
              file: viewNote.file,
              fileName: viewNote.fileName,
              status: viewNote.isActive ? "Active" : "Completed",
            }}
            onClose={() => setViewNote(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Notes;
