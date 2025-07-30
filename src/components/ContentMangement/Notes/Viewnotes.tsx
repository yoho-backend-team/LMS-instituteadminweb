import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";


interface Note {
  title: string;
  course: string;
  description: string;
  status: "Active" | "Completed";
  file?: File;
  fileName?: string; // ✅ support URL string
}

interface NoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

// ✅ Helper to determine file type from URL
const getFileTypeFromURL = (url: string): string => {
  if (url.endsWith(".pdf")) return "application/pdf";
  if (url.match(/\.(jpg|jpeg|png|gif)$/)) return "image/";
  if (url.match(/\.(mp4|webm|ogg)$/)) return "video/";
  return "unknown";
};

const ViewNoteModal: React.FC<NoteDetailModalProps> = ({
  isOpen,
  onClose,
  note,
}) => {
  const [fileURL, setFileURL] = useState<string | null>(null);

  useEffect(() => {
    if (note.file) {
      const url = URL.createObjectURL(note.file);
      setFileURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (note.fileName) {
      setFileURL(note.fileName); // just set the string
    }
  }, [note]);

  if (!isOpen) return null;

  const renderFilePreview = () => {
    if (!fileURL) {
      return (
        <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
          No file uploaded
        </div>
      );
    }

    const fileType = note.file?.type || getFileTypeFromURL(fileURL);

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
          onClick={() => window.open(fileURL, "_blank", "noopener,noreferrer")}
        >
          <div className="relative w-full bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center relative">
              <iframe
                src={fileURL}
                className="w-full h-full border-0 pointer-events-none"
                title="PDF Preview"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors flex items-center justify-center">
                <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Click to open full PDF
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {note.file?.name || "PDF Document"}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">PDF</span>
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
            {note.file?.name || note.fileName}
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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:text-black"
        >
           <IoMdClose size={16} />
        </button>

        {/* File Preview */}
        {renderFilePreview()}

        {/* Title + Status */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            {note.title}
            <span className="text-yellow-400">★</span>
          </h1>
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              note.status === "Active"
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {note.status}
          </span>
        </div>

        {/* Details */}
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-medium">Title :</span> {note.title}
          </p>
          <p>
            <span className="font-medium">Course Name :</span> {note.course}
          </p>
          <p>
            <span className="font-medium">Description :</span>{" "}
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewNoteModal;
