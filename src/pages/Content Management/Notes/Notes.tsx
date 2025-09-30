import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusLg, BsSliders } from "react-icons/bs";
import CustomDropdown from "../../../components/ContentMangement/Notes/CoustomDropdown/CustomDropdown";
import AddNotes from "../../../components/ContentMangement/Notes/AddNotes";
import NoteCard from "../../../components/ContentMangement/Notes/NotesCards";
import EditNotes from "../../../components/ContentMangement/Notes/EditNotes";
import ViewNoteModal from "../../../components/ContentMangement/Notes/Viewnotes";
import {
  fetchNotesThunk,
  createNoteThunk,
  updateNoteThunk,
  deleteNoteThunk,
  UpdateModuleStatusThunk,
} from "../../../features/ContentMangement/Notes/Reducer/noteThunk";
import {
  selectNote,
  selectLoading,
} from "../../../features/ContentMangement/Notes/Reducer/selectors";
import toast from "react-hot-toast";
import ContentLoader from "react-content-loader";

const statusfilteroption = ["Active", "InActive"];
const courseOptions = ["Course 1", "Course 2"];

const Notes = () => {
  const dispatch = useDispatch<any>();
  const notes = useSelector(selectNote);
  const [showFilter, setShowFilter] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [editNote, setEditNote] = useState<any>(null);
  const [viewNote, setViewNote] = useState<any>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const loading = useSelector(selectLoading);
  const [toggleStatusMap, setToggleStatusMap] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const params = {
      branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
      page: 1,
    };
    dispatch(fetchNotesThunk(params));
  }, [dispatch]);


  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    setToggleStatusMap((prev) => ({
      ...prev,
      [id]: newStatus,
    }));

    dispatch(
      UpdateModuleStatusThunk({
        id,
        is_active: newStatus ? true : false
      })
    );
  };

  const handleNoteSubmit = (data: any) => {
    if (editNote) {
      dispatch(updateNoteThunk(data))
        .then(() => toast.success("Note updated"))
        .catch(() => toast.error("Update failed"));
    } else {
      dispatch(createNoteThunk(data))
        .then(() => toast.success("Note added"))
        .catch(() => toast.error("Add failed"));
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

  const handleDeleteNote = (noteId: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this note?</span>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 bg-gray-400 rounded hover:bg-gray-300 hover:text-black text-sm"
              onClick={() => toast.dismiss(t.id)}
              >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const response = await dispatch(deleteNoteThunk(noteId)).unwrap();
                  if(response){
                    toast.success("Notes deleted successfully");
                    setShowFilter(false);
                    setOpenIndex(null);
                  }
                } catch (error) {
                  // toast.error("Failed to delete note");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
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
      {/* Side panel */}
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

      {/* Top bar */}
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
          <BsPlusLg size={20} />
          <span>Add New Note</span>
        </div>
      </div>

      {/* Filters */}
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

      {/* Notes Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

                <rect x="0" y="36" rx="10" ry="10" width="100%" height="120" />

                <rect x="0" y="170" rx="6" ry="6" width="60%" height="20" />

                <rect x="0" y="200" rx="4" ry="4" width="80" height="16" />
                <rect x="280" y="200" rx="4" ry="4" width="60" height="20" />

                <rect x="0" y="240" rx="6" ry="6" width="100" height="32" />

                <rect x="260" y="240" rx="6" ry="6" width="80" height="32" />
              </ContentLoader>
            ))}
          </div>
        ) : (
          notes.map((note: any, index: number) => (
            <NoteCard
              key={note.uuid || index}
              id={note.uuid}
              title={note.title}
              course={note.course}
              isActive={note.is_active}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              onEdit={() => handleEditClick(note)}
              onDelete={() => handleDeleteNote(note.uuid)}
              onView={() => setViewNote(note)}
              toggleStatusMap={toggleStatusMap}
              onToggleStatus={handleToggleStatus}
            />
          ))
        )}

        {/* View Modal */}
        {viewNote && (
          <ViewNoteModal
            isOpen={true}
            note={{
              title: viewNote.title,
              course: viewNote.course?.course_name ?? "N/A",
              description: viewNote.description ?? "",
              file: viewNote.file instanceof File ? viewNote.file : undefined,
              fileName:
                typeof viewNote.fileName === "string"
                  ? viewNote.fileName
                  : undefined,
              status: viewNote.is_active?"Active":"Inactive",
            }}
            onClose={() => setViewNote(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Notes;
