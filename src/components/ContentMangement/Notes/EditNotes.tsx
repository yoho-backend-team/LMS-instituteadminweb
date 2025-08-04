import { useRef, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";

interface NoteData {
  title: string;
  description: string;
  isActive?: boolean;
  file?: File;
  fileName?: string;
  uuid?: string;
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
  const [file, setFile] = useState<File | undefined>();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (noteData.fileName) {
      const fullUrl = `https://lms-node-backend-v1.onrender.com/${noteData.fileName}`;
      setFilePreview(fullUrl);
      const ext = noteData.fileName.split(".").pop() || "";
      if (ext === "pdf") setFileType("application/pdf");
      else if (["doc", "docx"].includes(ext)) setFileType("application/msword");
      else setFileType(null);
    }
  }, [noteData.fileName]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setFileType(selectedFile.type);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...noteData,
      title,
      description,
      file, 
      fileName: noteData.fileName, 
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
        className="flex flex-col gap-4 overflow-y-auto h-[85vh] scrollbar-hide justify-between"
      >
        <div className="flex flex-col gap-4">
          {/* File Upload or Preview */}
          <div className="flex flex-col gap-2">
            {!filePreview ? (
              <div
                onClick={handleUploadClick}
                className="flex items-center gap-2 border p-5 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition"
              >
                <BiSolidCloudUpload size={40} className="text-[#1BBFCA]" />
                <span className="text-gray-600">
                  Drop File Here Or Click To Upload
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative border p-3 rounded-md bg-gray-50">
                <button
                  type="button"
                  onClick={() => {
                    setFile(undefined);
                    setFilePreview(null);
                    setFileType(null);
                  }}
                  className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                >
                  <IoMdClose size={14} />
                </button>

                {fileType === "application/pdf" ? (
                  <iframe
                    src={filePreview}
                    className="w-full h-64 border rounded-md"
                    title="PDF Preview"
                  />
                ) : fileType?.includes("word") ? (
                  <div className="text-sm text-blue-600">
                    DOC/DOCX file selected. Preview not supported.
                  </div>
                ) : (
                  <div className="text-sm">Unknown file type.</div>
                )}

                <p className="mt-2 text-sm text-green-600">
                  {file?.name || noteData.fileName?.split("/").pop()}
                </p>
              </div>
            )}
          </div>

          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border p-2 rounded h-10"
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded h-30 resize-none"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end items-center gap-4">
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
