import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import {
  GetBranchThunks,
  GetBranchCourseThunks,
} from "../../../features/Content_Management/reducers/thunks";
import {
  Branch,
  BranchCourse,
} from "../../../features/Content_Management/reducers/selectors";
import { createNoteThunk } from "../../../features/ContentMangement/Notes/Reducer/noteThunk";
import { uploadFile } from "../../../features/ContentMangement/Notes/Services";

type AddNotesProps = {
  onClose: () => void;
  onSubmit: (data: any) => void;
};

const AddNotes: React.FC<AddNotesProps> = ({ onClose, onSubmit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<any>();

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    file: "",
    branch: "",
    course: "",
    description: "",
  });

  const branches = useSelector(Branch);
  const courses = useSelector(BranchCourse);

  const instituteId = useSelector((state: any) => state.authuser?.user?.institute_id?.uuid);

  useEffect(() => {
    dispatch(GetBranchThunks([]));
  }, [dispatch]);

  useEffect(() => {
    if (selectedBranch) {
      dispatch(GetBranchCourseThunks(selectedBranch));
    }
  }, [selectedBranch, dispatch]);

  const validateForm = () => {
    const newErrors = {
      title: !title.trim() ? "Title is required." : "",
      file: !uploadedFile ? "File is required." : "",
      branch: !selectedBranch ? "Branch is required." : "",
      course: !selectedCourse ? "Course is required." : "",
      description: !description.trim() ? "Description is required." : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      let uploadedFileUrl = "";

      if (uploadedFile instanceof File) {
        if (uploadedFile.size > 5 * 1024 * 1024) {
          setErrors((prev) => ({
            ...prev,
            file: "File size should be under 5MB.",
          }));
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", uploadedFile);

        const fileUploadResponse = await uploadFile(formData);

        if (fileUploadResponse?.data?.file) {
          uploadedFileUrl = fileUploadResponse.data.file;
        } else {
          throw new Error("File upload failed");
        }
      }

      const payload = {
        title,
        description,
        course: selectedCourse,
        branch: selectedBranch,
        file: uploadedFileUrl,
        institute: instituteId,
      };

      await dispatch(createNoteThunk(payload));
      onSubmit(payload);

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedBranch("");
      setSelectedCourse("");
      setUploadedFile(null);
      setFilePreviewUrl(null);
      setErrors({ title: "", file: "", branch: "", course: "", description: "" });
    } catch (error) {
      console.error("Failed to add note", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative text-[#716F6F] p-3 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Note</h2>
        <button
          onClick={onClose}
          className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
        >
          <IoMdClose size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto h-[85vh] scrollbar-hide">

        {/* File Upload */}
        {!uploadedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 border p-5 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition"
          >
            <BiSolidCloudUpload size={40} className="text-[#1BBFCA]" />
            <span>Drop File Here Or Click To Upload</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (
                  file &&
                  [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ].includes(file.type)
                ) {
                  setUploadedFile(file);
                  setFilePreviewUrl(URL.createObjectURL(file));
                  setErrors((prev) => ({ ...prev, file: "" }));
                } else {
                  setUploadedFile(null);
                  setFilePreviewUrl(null);
                  setErrors((prev) => ({
                    ...prev,
                    file: "Only PDF, DOC, or DOCX files are allowed.",
                  }));
                }
              }}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
          </div>
        ) : (
          <div className="relative border p-3 rounded-md">
            <button
              type="button"
              onClick={() => {
                setUploadedFile(null);
                setFilePreviewUrl(null);
              }}
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
            >
              <IoMdClose size={14} />
            </button>
            {uploadedFile?.type === "application/pdf" ? (
              <iframe src={filePreviewUrl!} className="w-full h-64 border rounded-md" title="PDF Preview" />
            ) : (
              <div className="text-sm text-blue-600">
                DOC/DOCX file selected. Preview not supported.
              </div>
            )}
            <p className="mt-2 text-sm text-green-600">{uploadedFile.name}</p>
          </div>
        )}

        {/* Branch Dropdown */}
        <div className="flex flex-col p-1">
          <label htmlFor="branch">Branch</label>
          <select
            id="branch"
            className="border p-2 rounded"
            value={selectedBranch}
            onChange={(e) => {
              const branchId = e.target.value;
              setSelectedBranch(branchId);
              setSelectedCourse(""); // reset course
            }}
          >
            <option value="">Select Branch</option>
            {Array.isArray(branches) &&
              branches.map((b: any) => (
                <option key={b.uuid} value={b.uuid}>
                  {b.branch_identity}
                </option>
              ))}
          </select>
          {errors.branch && <p className="text-sm text-red-500">{errors.branch}</p>}
        </div>

        {/* Course Dropdown */}
        <div className="flex flex-col p-1">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            className="border p-2 rounded h-10"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            disabled={!selectedBranch}
          >
            <option value="">Select Course</option>
            {Array.isArray(courses) &&
              courses.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.course_name}
                </option>
              ))}
          </select>
          {errors.course && <p className="text-sm text-red-500">{errors.course}</p>}
        </div>

        {/* Title Input */}
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded h-10 w-full"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded h-20 resize-none w-full"
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="text-[#1BBFCA] border border-[#1BBFCA] px-4 py-1 rounded font-semibold"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#1BBFCA] text-white px-4 py-1 rounded font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
