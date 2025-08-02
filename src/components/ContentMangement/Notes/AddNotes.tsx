import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";
import CustomDropdown from "./CoustomDropdown/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBranchesThunk,
  fetchCoursesByBranchThunk,
} from "../../../features/ContentMangement/Notes/Reducer/noteThunk";

interface Props {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const AddNotes = ({ onClose, onSubmit }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const [titleError, setTitleError] = useState("");
  const [fileError, setFileError] = useState("");
  const [branchError, setBranchError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const dispatch = useDispatch<any>();
  const noteState = useSelector((state: any) => state?.noteSlice || {});
  const instituteId = useSelector(
    (state: any) => state?.auth?.user?.institute?._id
  );

  const branchOptions =
    noteState?.branches?.data?.map((b: any) => ({
      label: b.branch_identity,
      value: b.uuid,
    })) || [];

  const courseOptions =
    noteState?.courses?.data?.map((c: any) => ({
      label: c.course_name,
      value: c.uuid,
    })) || [];

  useEffect(() => {
    dispatch(fetchBranchesThunk());
  }, [dispatch]);

  const handleUploadClick = () => fileInputRef.current?.click();

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
        setUploadedFile(null);
        setFilePreviewUrl(null);
      } else {
        setFileError("");
        setUploadedFile(file);
        setFilePreviewUrl(URL.createObjectURL(file));
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

    if (!uploadedFile) {
      setFileError("Please upload a valid document file.");
      valid = false;
    } else {
      setFileError("");
    }

    if (!selectedBranch) {
      setBranchError("Branch is required.");
      valid = false;
    } else {
      setBranchError("");
    }

    if (!selectedCourse) {
      setCourseError("Course is required.");
      valid = false;
    } else {
      setCourseError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required.");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (!valid) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("course", selectedCourse);
    formData.append("branch", selectedBranch);
    formData.append("description", description);
    if (uploadedFile) formData.append("file", uploadedFile);

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
        className="flex flex-col gap-4 justify-between overflow-y-auto h-[85vh] scrollbar-hide"
      >
        <div className="flex flex-col gap-4">
          {!uploadedFile ? (
            <div
              onClick={handleUploadClick}
              className="flex items-center gap-2 border p-5 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition"
            >
              <BiSolidCloudUpload size={40} className="text-[#1BBFCA]" />
              <span>Drop File Here Or Click To Upload</span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
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
              ) : uploadedFile?.type.includes("word") ? (
                <div className="text-sm text-blue-600">
                  DOC/DOCX file selected. Preview not supported.
                </div>
              ) : (
                <div className="text-sm">Unknown file type.</div>
              )}
              <p className="mt-2 text-sm text-green-600">{uploadedFile.name}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label>Branch</label>
            <CustomDropdown
              options={branchOptions}
              value={selectedBranch}
              onChange={(value) => {
                setSelectedBranch(value);
                setSelectedCourse("");
                dispatch(
                  fetchCoursesByBranchThunk({
                    branchId: value,
                    instituteId, 
                  })
                );
              }}
              placeholder="Select Branch"
              width="w-full"
            />

            {branchError && (
              <p className="text-sm text-red-500">{branchError}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>Course</label>
            <CustomDropdown
              options={courseOptions}
              value={selectedCourse}
              onChange={setSelectedCourse}
              placeholder="Select Course"
              width="w-full"
            />
            {courseError && (
              <p className="text-sm text-red-500">{courseError}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border p-2 rounded h-10"
            />
            {titleError && <p className="text-sm text-red-500">{titleError}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded h-20 resize-none"
            />
            {descriptionError && (
              <p className="text-sm text-red-500">{descriptionError}</p>
            )}
          </div>
        </div>

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
