import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";

interface Note {
  title: string;
  course: string;
  description: string;
  status: "Active" | "Inactive";
  file?: File;
  fileName?: string;
  videoUrl?: string;
}

interface NoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

const getFileTypeFromName = (name: string): string => {
  const extension = name.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "application/pdf";
  if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) return "image/";
  if (["mp4", "webm", "ogg", "mov"].includes(extension || "")) return "video/";
  return "unknown";
};

const ViewNoteModal: React.FC<NoteDetailModalProps> = ({ isOpen, onClose, note }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("unknown");

  useEffect(() => {
    if (note.file) {
      const url = URL.createObjectURL(note.file);
      setPreviewUrl(url);
      setFileType(note.file.type);
      return () => URL.revokeObjectURL(url);
    } else if (note.fileName) {
      setPreviewUrl(note.fileName);
      setFileType(getFileTypeFromName(note.fileName));
    } else {
      setPreviewUrl(null);
      setFileType("unknown");
    }
  }, [note]);

  if (!isOpen) return null;

  const renderPreview = () => {
    if (note.videoUrl) {
      const isYoutube = note.videoUrl.includes("youtube.com") || note.videoUrl.includes("youtu.be");
      return (
        <div className="w-full h-60 bg-gray-200 rounded-md mb-4 flex items-center justify-center overflow-hidden">
          {isYoutube ? (
            <iframe
              src={note.videoUrl}
              className="w-full h-full rounded"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <video src={note.videoUrl} controls className="w-full h-full rounded" />
          )}
        </div>
      );
    }

    if (!previewUrl) {
      return (
        <div className="w-full h-60 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
          No file uploaded
        </div>
      );
    }

    if (fileType.startsWith("image/")) {
      return (
        <img src={previewUrl} alt="Preview" className="w-full h-60 object-contain rounded-md mb-4" />
      );
    }

    if (fileType === "application/pdf") {
      return (
        <iframe src={`${previewUrl}#view=fitH`} className="w-full h-60 rounded-md mb-4" />
      );
    }

    if (fileType.startsWith("video/")) {
      return <video src={previewUrl} controls className="w-full h-60 rounded-md mb-4" />;
    }

    return (
      <div className="w-full h-60 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
        {note.fileName?.split("/").pop() || "File"}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-2/5 shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-xl hover:text-red-500"
        >
          <IoMdClose size={24} />
        </button>

        {renderPreview()}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-1 text-gray-800">
            {note.title} <FaStar className="text-yellow-400" />
          </h2>
          <span
            className={`w-20 text-center py-1 rounded-lg text-white ${
              note.status === "Active" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {note.status}
          </span>
        </div>

        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex">
            <span className="font-semibold">Title :</span>
            <span className="px-2">{note.title}</span>
          </div>
          <div className="flex">
            <span className="font-semibold">Course Name :</span>
            <span className="px-2">{note.course}</span>
          </div>
          <div className="flex">
            <span className="font-semibold">Description :</span>
            <span className="px-2">{note.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNoteModal;
