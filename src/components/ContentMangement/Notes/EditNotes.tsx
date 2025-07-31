import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";

interface NoteData {
  title: string;
  description: string;
  isActive?: boolean;
}

interface Props {
  noteData: NoteData;
  onClose: () => void;
  onSubmit: (data: NoteData) => void;
}

const EditNotes = ({ noteData, onClose, onSubmit }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(noteData.title);
  const [description, setDescription] = useState(noteData.description);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      isActive: noteData.isActive ?? true,
    });
    onClose();
  };

  return (
    <div className="relative text-[#716F6F] p-3 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Edit Study Material</h2>
        <button
          onClick={onClose}
          className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
        >
          <IoMdClose size={16} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4  overflow-y-auto h-[70vh] scrollbar-hide justify-between "
      >
        <div className="flex flex-col gap-4">
            <div
          onClick={handleUploadClick}
          className="flex items-center gap-2 border p-5 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition"
        >
          <BiSolidCloudUpload size={40} className="text-[#1BBFCA]" />
          <span className="text-gray-600">
            Drop File Here Or Click To Upload
          </span>
          <input type="file" ref={fileInputRef} className="hidden" />
        </div>

        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="border p-2 rounded h-10"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded h-30 resize-none"
          />
        </div>
        </div>

        <div className="flex justify-end items-center gap-4 bottom-0">
          <button
            className="text-[#1BBFCA] border border-[#1BBFCA] px-4 py-1 rounded font-semibold"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="bg-[#1BBFCA] text-white px-4 py-1 rounded font-semibold"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotes;
