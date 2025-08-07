import React, { useState } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { MdToggleOn, MdToggleOff, MdClose } from "react-icons/md";
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

// View Modal Component
const ViewModal: React.FC<{
  note: Note;
  isOpen: boolean;
  onClose: () => void;
  titleIcon: string;
}> = ({ note, isOpen, onClose, titleIcon }) => {
  if (!isOpen) return null;

  console.log("Note object in ViewModal:", note);
  console.log("Note file:", note.file);
  console.log("Note file type:", typeof note.file);
  console.log("Is File object:", note.file instanceof File);

  const renderFilePreview = () => {
    if (!note.file) {
      console.log("No file found");
      return (
        <div className="w-full h-60 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
          No file uploaded
        </div>
      );
    }

    let fileUrl: string;
    let fileName: string;
    let fileType: string = "";

    if (note.file instanceof File) {
      fileUrl = URL.createObjectURL(note.file);
      fileName = note.file.name;
      fileType = note.file.type;
      console.log("File object detected:", { fileName, fileType, fileUrl });
    } else {
      fileUrl = String(note.file);
      fileName = String(note.file);
      console.log("String URL detected:", fileUrl);
    }

    // Check if the file is a PDF
    const isPDF = () => {
      if (note.file instanceof File) {
        const result =
          note.file.type === "application/pdf" ||
          note.file.name.toLowerCase().endsWith(".pdf");
        console.log(
          "PDF check (File):",
          result,
          note.file.type,
          note.file.name
        );
        return result;
      }
      const fileStr = String(note.file);
      const result =
        fileStr.toLowerCase().includes(".pdf") ||
        fileStr.toLowerCase().includes("pdf");
      console.log("PDF check (String):", result, fileStr);
      return result;
    };

    // Check if it's an image
    const isImage = () => {
      if (note.file instanceof File) {
        const result = note.file.type.startsWith("image/");
        console.log("Image check (File):", result, note.file.type);
        return result;
      }
      const fileStr = String(note.file);
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".webp",
      ];
      const result = imageExtensions.some((ext) =>
        fileStr.toLowerCase().includes(ext)
      );
      console.log("Image check (String):", result, fileStr);
      return result;
    };

    const pdfCheck = isPDF();
    const imageCheck = isImage();

    console.log("File type checks:", { isPDF: pdfCheck, isImage: imageCheck });

    if (pdfCheck) {
      console.log("Rendering PDF with URL:", fileUrl);
      return (
        <div className="w-full h-96 bg-gray-100 rounded mb-4 border-2 border-gray-300">
          <div className="mb-2 text-sm text-gray-600 p-2">
            PDF File: {fileName}
          </div>
          <iframe
            src={fileUrl}
            className="w-full h-full rounded"
            title="PDF Preview"
            style={{
              border: "none",
              minHeight: "400px",
            }}
            onLoad={() => console.log("PDF iframe loaded successfully")}
            onError={() => console.log("PDF iframe failed to load")}
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-sm font-medium mb-2">
                Cannot display PDF in this browser
              </p>
              <a
                href={fileUrl}
                download={fileName}
                className="text-blue-500 hover:text-blue-700 underline"
              >
                Download PDF
              </a>
            </div>
          </iframe>
        </div>
      );
    }

    if (imageCheck) {
      console.log("Rendering Image with URL:", fileUrl);
      return (
        <div className="w-full h-60 bg-gray-100 rounded mb-4 flex items-center justify-center border-2 border-gray-300">
          <img
            src={fileUrl}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded"
            onLoad={() => console.log("Image loaded successfully")}
            onError={(e) => {
              console.log("Image failed to load");
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML = `
                <div class="text-center text-gray-500">
                  <p class="text-sm font-medium">Cannot load image</p>
                  <p class="text-xs mt-1">${fileName}</p>
                </div>
              `;
            }}
          />
        </div>
      );
    }

    console.log("Rendering generic file preview");
    return (
      <div className="w-full h-60 bg-gray-100 rounded mb-4 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
        <div className="text-center">
          <img
            src="/file-icon.svg"
            alt="file"
            className="w-12 h-12 mx-auto mb-2 opacity-50"
          />
          <p className="text-sm font-medium mb-2">File Preview</p>
          <p className="text-xs mb-3 text-gray-600 break-all">{fileName}</p>
          <p className="text-xs mb-3 text-gray-400">
            Type: {fileType || "Unknown"}
          </p>

          <div className="mb-3 p-2 bg-gray-50 rounded text-xs break-all">
            URL: {fileUrl}
          </div>

          <div className="space-y-2">
            <a
              href={fileUrl}
              download={fileName}
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
            >
              Download File
            </a>
            <br />
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
            >
              Open in New Tab
            </a>
          </div>
          <p className="text-xs mt-2 text-gray-400">File ID: {note.id}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 text-[#716F6F] flex items-center justify-center">
      <div className="bg-white grid rounded-2xl p-12 w-full max-w-4xl max-h-[90vh] relative shadow-xl overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:text-black z-10"
        >
          <MdClose />
        </button>

        {renderFilePreview()}

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <img src={titleIcon} alt="icon" className="w-5 h-5" />
            {note.title}
            <span className="text-yellow-400">★</span>
          </h1>
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              note?.is_active
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {note?.is_active ? "Active" : "Completed"}
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium">Title:</p>
            <p>{note.title || "No title available"}</p>
          </div>

          {note.description && (
            <div>
              <p className="font-medium">Description:</p>
              <p className="whitespace-pre-wrap">{note.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleToggle = () => {
    const newStatus = status === "Active" ? "Completed" : "Active";
    setStatus(newStatus);
    onToggleStatus?.(note.uuid, newStatus);
  };

  const handleView = () => {
    setIsViewModalOpen(true);
    onView(note);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
  };

  return (
    <>
      <div className="bg-white text-[#716F6F] rounded-2xl p-4 shadow-2xl relative min-h-[200px] flex flex-col">
        <div className="ml-auto mt-3 text-2xl right-3 top-3">
          <DropdownMenu
            onView={handleView}
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

      <ViewModal
        note={note}
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        titleIcon={titleIcon}
      />
    </>
  );
};
