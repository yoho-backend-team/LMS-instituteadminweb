import { useRef, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";
import CustomDropdown from "./CoustomDropdown/CustomDropdown";

interface NoteData {
  title: string;
  course: string;
  branch: string;
  confirm: string;
  description: string;
  isActive?: boolean;
  fileName?: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (data: NoteData) => void;
  noteData?: NoteData;
}

const branchOptions = ["Branch 1", "Branch 2"];
const courseOptions = ["Course 1", "Course 2"];
const confirmOptions = ["Confirm 1", "Confirm 2"];

const AddNotes = ({ onClose, onSubmit, noteData }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedConfirm, setSelectedConfirm] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [titleError, setTitleError] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (noteData) {
      setSelectedBranch(noteData.branch);
      setSelectedCourse(noteData.course);
      setSelectedConfirm(noteData.confirm);
      setTitle(noteData.title);
      setDescription(noteData.description);
      setUploadedFileName(noteData.fileName || "");
    }
  }, [noteData]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Only PDF, DOC, or DOCX files are allowed.");
        setUploadedFileName("");
        setUploadedFile(null);
      } else {
        setFileError("");
        setUploadedFileName(file.name);
        setUploadedFile(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!title.trim()) {
      setTitleError("Title is required.");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!uploadedFileName) {
      setFileError("Please upload a valid document file.");
      valid = false;
    } else {
      setFileError("");
    }

    if (!valid) return;

    onSubmit({
      title,
      course: selectedCourse,
      branch: selectedBranch,
      confirm: selectedConfirm,
      description,
      isActive: noteData?.isActive ?? true,
      fileName: uploadedFileName,
    });

    onClose();
  };

  return (
    <div className="relative text-[#716F6F] p-3 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {noteData ? "Edit Note" : "Add Note"}
        </h2>
        <button
          onClick={onClose}
          className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
        >
          <IoMdClose size={16} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-between overflow-y-auto h-[85vh] scrollbar-hide"
      >
        <div className="flex flex-col gap-4">
          {/* File Upload Box */}
          <div
            onClick={() => !uploadedFile && handleUploadClick()}
            className="relative flex items-center gap-2 border p-5 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition text-center"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />

            {uploadedFile ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                    setUploadedFileName("");
                  }}
                  className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 p-1 rounded-full"
                  type="button"
                >
                  <IoMdClose size={16} />
                </button>

                {uploadedFile.type === "application/pdf" ? (
                  <iframe
                    src={URL.createObjectURL(uploadedFile)}
                    title="PDF Preview"
                    className="w-full h-48 border rounded"
                  ></iframe>
                ) : (
                  <p className="text-blue-600 mt-2">
                    Preview not supported for Word files. File is ready to
                    upload.
                  </p>
                )}
                <p className="text-sm mt-2 text-green-600">
                  {uploadedFileName}
                </p>
              </>
            ) : (
              <>
                <BiSolidCloudUpload size={40} className="text-[#1BBFCA]" />
                <span>Drop File Here Or Click To Upload</span>
              </>
            )}

            {fileError && (
              <p className="text-sm mt-1 text-red-500">{fileError}</p>
            )}
          </div>

          {/* Branch */}
          <div className="flex flex-col gap-2">
            <label>Branch</label>
            <CustomDropdown
              options={branchOptions}
              value={selectedBranch}
              onChange={setSelectedBranch}
              placeholder="Select Branch"
              width="w-full"
            />
          </div>

          {/* Course */}
          <div className="flex flex-col gap-2">
            <label>Course</label>
            <CustomDropdown
              options={courseOptions}
              value={selectedCourse}
              onChange={setSelectedCourse}
              placeholder="Select Course"
              width="w-full"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border p-2 rounded h-10"
            />
            {titleError && (
              <p className="text-sm text-red-500">{titleError}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded h-20 resize-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label>Confirm Password</label>
            <CustomDropdown
              options={confirmOptions}
              value={selectedConfirm}
              onChange={setSelectedConfirm}
              placeholder="Select Option"
              width="w-full"
            />
          </div>
        </div>

        {/* Submit/Cancel Buttons */}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
