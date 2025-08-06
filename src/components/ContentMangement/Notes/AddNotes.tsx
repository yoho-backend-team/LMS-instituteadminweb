import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";
import CustomDropdown from "./CoustomDropdown/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  
  fetchCoursesByBranchThunk,
  GetBranchThunks,
} from "../../../features/ContentMangement/Notes/Reducer/noteThunk";
import { getBranch } from "../../../features/ContentMangement/Notes/Reducer/selectors";

type AddNotesProps = {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
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

  const [errors, setErrors] = useState({
    title: "",
    file: "",
    branch: "",
    course: "",
    description: "",
  });

  const noteState = useSelector((state: any) => state?.noteSlice || {});
  const branchOptions =
    noteState?.branches?.map((b: any) => ({
      label: b.branch_identity,
      value: b.uuid,
    })) || [];
  const courseOptions =
    noteState?.courses?.map((c: any) => ({
      label: c.course_name,
      value: c.uuid,
    })) || [];

    const branches = useSelector(getBranch)

    console.log("branches",branches)

 useEffect(() => {
    const params = {
      branch: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
    };
    dispatch(GetBranchThunks(params));
   
  }, [dispatch]);


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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("course", selectedCourse);
    formData.append("branch", selectedBranch);
    formData.append("description", description);
    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }

    onSubmit(formData);
    onClose();
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

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 overflow-y-auto h-[85vh] scrollbar-hide"
      >
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
              <iframe
                src={filePreviewUrl!}
                className="w-full h-64 border rounded-md"
                title="PDF Preview"
              />
            ) : (
              <div className="text-sm text-blue-600">
                DOC/DOCX file selected. Preview not supported.
              </div>
            )}
            <p className="mt-2 text-sm text-green-600">{uploadedFile.name}</p>
          </div>
        )}

        {/* Branch Dropdown */}
        <div>
          <label>Branch</label>
          <CustomDropdown
            options={branchOptions}
            value={selectedBranch}
            onChange={(value) => {
              setSelectedBranch(value);
              setSelectedCourse("");
              dispatch(fetchCoursesByBranchThunk({ branchId: value }));
            }}
            placeholder="Select Branch"
            width="w-full"
          />
          {errors.branch && <p className="text-sm text-red-500">{errors.branch}</p>}
        </div>

        {/* Course Dropdown */}
        <div>
          <label>Course</label>
          <CustomDropdown
            options={courseOptions}
            value={selectedCourse}
            onChange={setSelectedCourse}
            placeholder="Select Course"
            width="w-full"
          />
          {errors.course && <p className="text-sm text-red-500">{errors.course}</p>}
        </div>

        {/* Title */}
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

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded h-20 resize-none w-full"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Action Buttons */}
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
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
