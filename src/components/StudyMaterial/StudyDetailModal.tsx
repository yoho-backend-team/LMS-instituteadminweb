import React, { useEffect, useState } from "react";
import cancel from "../../assets/icons/Cancel.png";

interface Note {
  id: number;
  title: string;
  description: string;
  course: string;
  branch: string;
  status: "Active" | "Completed";
  file?: File | { name: string; type: string }; // handles File or fetched object
  video?: string;
}

interface NoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
}

const StudyDetailModal: React.FC<NoteDetailModalProps> = ({
  isOpen,
  onClose,
  note,
}) => {
  const [fileURL, setFileURL] = useState<string | null>(null);

  useEffect(() => {
    if (!note || !note.file) return;

    if (note.file instanceof File) {
      const url = URL.createObjectURL(note.file);
      setFileURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (typeof note.file === "object" && "name" in note.file) {
      // Assume it's already uploaded and accessible
      setFileURL(`/uploads/${note.file.name}`);
    }
  }, [note]);

  if (!isOpen || !note) return null;

  const renderFilePreview = () => {
    if (!note.file || !fileURL) {
      return (
        <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
          No file uploaded
        </div>
      );
    }

    const fileType = note.file instanceof File ? note.file.type : note.file.type;

    if (fileType.startsWith("image/")) {
      return (
        <img
          src={fileURL}
          alt="Uploaded Preview"
          className="w-full h-60 object-contain rounded mb-4"
        />
      );
    }

    if (fileType.startsWith("video/")) {
      return (
        <video
          src={fileURL}
          controls
          className="w-full h-60 rounded mb-4 object-cover"
        />
      );
    }

    if (fileType === "application/pdf") {
      return (
        <div
          className="w-full rounded mb-4 cursor-pointer group"
          onClick={() =>
            window.open(fileURL, "_blank", "noopener,noreferrer")
          }
        >
          <div className="relative w-full bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center relative">
              <iframe
                src={`${fileURL}`}
                className="w-full h-full border-0 pointer-events-none"
                title="PDF Preview"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors flex items-center justify-center">
                <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  Click to open full PDF
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {note.title}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  PDF
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-40 bg-gray-100 rounded mb-4 flex items-center gap-3 px-4">
        <img src="/file-icon.svg" alt="file" className="w-6 h-6" />
        <div className="flex flex-col">
          <span className="text-sm text-gray-800">
            {note.file instanceof File ? note.file.name : note.file.name}
          </span>
          <a
            href={fileURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-sm"
          >
            Open in new tab
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 text-[#716F6F] flex items-center justify-center">
      <div className="bg-white grid rounded-2xl p-12 w-2/5 h-4/5 relative shadow-xl overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:text-black"
        >
          <img src={cancel} alt="close" />
        </button>

        {renderFilePreview()}

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            {note.description}
            <span className="text-yellow-400">★</span>
          </h1>
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              note.status === "Active"
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {note.course}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-medium">Title :</span> {note.title}
          </p>
          <p>
            <span className="font-medium">Course Name :</span> {note.course}
          </p>
          <p>
            <span className="font-medium">Description :</span> {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyDetailModal;
