import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Note {
  title: string;
  course: string;
  description: string;
  status: "Active" | "Inactive";
  file?: File;
  fileName?: string;
}

interface NoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

const getFileTypeFromName = (name: string): string => {
  const extension = name.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') return "application/pdf";
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return "image/";
  if (['mp4', 'webm', 'ogg', 'mov'].includes(extension || '')) return "video/";
  return "unknown";
};

const ViewNoteModal: React.FC<NoteDetailModalProps> = ({
  isOpen,
  onClose,
  note,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("unknown");

  useEffect(() => {
    if (note.file) {
      const url = URL.createObjectURL(note.file);
      setPreviewUrl(url);
      setFileType(note.file.type);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (note.fileName) {
      setPreviewUrl(note.fileName);
      setFileType(getFileTypeFromName(note.fileName));
    } else {
      setPreviewUrl(null);
      setFileType("unknown");
    }
  }, [note]);

  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) {
      window.open(previewUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!isOpen) return null;

  const renderFilePreview = () => {
    if (!previewUrl) {
      return (
        <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
          No file uploaded
        </div>
      );
    }

    const fileName = note.file?.name || note.fileName?.split('/').pop() || "Document";

    if (fileType.startsWith("image/")) {
      return (
        <div className="w-full rounded mb-4">
          <div className="relative w-full bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{fileName}</span>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">Image</span>
              </div>
              <button
                onClick={handleOpenInNewTab}
                className="mt-2 text-blue-500 underline text-sm hover:text-blue-700"
              >
                Open in new tab
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (fileType.startsWith("video/")) {
      return (
        <div className="w-full rounded mb-4">
          <div className="relative w-full bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center relative">
              <video
                src={previewUrl}
                controls
                className="w-full h-full object-contain"
              />
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{fileName}</span>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">Video</span>
              </div>
              <button
                onClick={handleOpenInNewTab}
                className="mt-2 text-blue-500 underline text-sm hover:text-blue-700"
              >
                Open in new tab
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (fileType === "application/pdf") {
      return (
        <div className="w-full rounded mb-4">
          <div className="relative w-full bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center relative">
              <iframe
                src={`${previewUrl}#view=fitH`}
                className="w-full h-full border-0"
                title="PDF Preview"
              />
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{fileName}</span>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">PDF</span>
              </div>
              <button
                onClick={handleOpenInNewTab}
                className="mt-2 text-blue-500 underline text-sm hover:text-blue-700"
              >
                Open in new tab
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full rounded mb-4">
        <div className="relative w-full bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="w-full h-40 bg-gray-100 flex items-center gap-3 px-4">
            <img src="/file-icon.svg" alt="file" className="w-6 h-6" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-800">{fileName}</span>
              <button
                onClick={handleOpenInNewTab}
                className="text-blue-500 underline text-sm hover:text-blue-700 text-left"
              >
                Open in new tab
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 text-[#716F6F] flex items-center justify-center">
      <div className="bg-white grid rounded-2xl p-12 w-2/5 h-4/5 relative shadow-xl overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:text-red-500"
        >
          <IoMdClose size={24} />
        </button>

        {renderFilePreview()}

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