import React, { useRef, useState } from "react";
import cloud from "../../assets/cloud.png";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import Client from "../../apis/index";

interface AddNewCourseFormProps {
  onBack: () => void;
  onSubmit: (course: any) => void;
  branches: any[];
  initialValues?: any;
  categories: any[];
}

const AddNewCourseForm: React.FC<AddNewCourseFormProps> = ({
  onBack,
  onSubmit,
  branches,
  categories = [],
}) => {
  const courseImageInputRef: any = useRef<HTMLInputElement>(null);
  const bannerImageInputRef: any = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    actualPrice: "",
    price: "",
    rating: "",
    review: "",
    branch: "",
    category: "",
    format: "",
    overview: "",
    description: "",
    thumbnail: "",
    image: "",
    status: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    thumbnail?: { fileName: string; success: boolean };
    image?: { fileName: string; success: boolean };
  }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on input
  };

  const handleCloudClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) ref.current.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "thumbnail" | "image"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      
      // Set uploading status with file name
      setUploadStatus((prev) => ({
        ...prev,
        [field]: { fileName: file.name, success: false }
      }));
      
      try {
        setUploading(true);
        const upload = await Client.file.upload(data);
        const uploadedUrl = upload?.data?.file;
        
        setFormData((prev) => ({ ...prev, [field]: uploadedUrl }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
        
        // Set success status
        setUploadStatus((prev) => ({
          ...prev,
          [field]: { fileName: file.name, success: true }
        }));
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setUploadStatus((prev) => ({
            ...prev,
            [field]: undefined
          }));
        }, 3000);
        
      } catch (err) {
        console.error("File upload failed", err);
        setUploadStatus((prev) => ({
          ...prev,
          [field]: { fileName: file.name, success: false }
        }));
        setErrors((prev) => ({ ...prev, [field]: "File upload failed" }));
      } finally {
        setUploading(false);
      }
    }
  };

  // ✅ Validate before submit
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Course name is required.";
    if (!formData.duration) newErrors.duration = "Duration is required.";
    if (!formData.actualPrice) newErrors.actualPrice = "Actual price is required.";
    if (!formData.price) newErrors.price = "Current price is required.";
    if (formData.price && Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0.";
    if (!formData.rating) newErrors.rating = "Rating is required.";
    if (!formData.review) newErrors.review = "Review count is required.";
    if (!formData.branch) newErrors.branch = "Branch is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.format) newErrors.format = "Format is required.";
    if (!formData.status) newErrors.status = "Status is required.";
    if (!formData.thumbnail) newErrors.thumbnail = "Thumbnail image is required.";
    if (!formData.image) newErrors.image = "Main image is required.";
    if (!formData.overview.trim()) newErrors.overview = "Overview is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    } else {
      alert("Please correct the highlighted fields.");
    }
  };

  // Helper function to get upload status message
  const getUploadMessage = (field: "thumbnail" | "image") => {
    const status = uploadStatus[field];
    if (!status) return null;

    if (uploading) {
      return (
        <p className="text-blue-500 text-xs mt-1">
          Uploading: {status.fileName}
        </p>
      );
    }

    if (status.success) {
      return (
        <p className="text-green-500 text-xs mt-1">
          ✓ Successfully uploaded: {status.fileName}
        </p>
      );
    }

    return (
      <p className="text-red-500 text-xs mt-1">
        ✗ Failed to upload: {status.fileName}
      </p>
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={onBack}
          className="flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={40} />
        </Button>
      </div>

      <h2 className="text-[#1BBFCA] text-lg font-semibold mb-6 mt-4">
        Add New Course
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Name */}
        <div>
          <label className="text-sm text-gray-600">Course Name</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.title ? "border-red-500" : ""
            }`}
            placeholder="Enter course name"
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm text-gray-600">Course Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.duration ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Duration</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
          </select>
          {errors.duration && <p className="text-red-500 text-xs">{errors.duration}</p>}
        </div>

        {/* Actual Price */}
        <div>
          <label className="text-sm text-gray-600">Actual Price</label>
          <input
            type="text"
            name="actualPrice"
            value={formData.actualPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData({ ...formData, actualPrice: value });
              }
            }}
            className={`border rounded-md p-2 w-full ${
              errors.actualPrice ? "border-red-500" : ""
            }`}
            placeholder="Enter actual price"
          />
          {errors.actualPrice && (
            <p className="text-red-500 text-xs">{errors.actualPrice}</p>
          )}
        </div>

        {/* Current Price */}
        <div>
          <label className="text-sm text-gray-600">Current Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData({ ...formData, price: value });
              }
            }}
            className={`border rounded-md p-2 w-full ${
              errors.price ? "border-red-500" : ""
            }`}
            placeholder="Enter current price"
          />
          {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm text-gray-600">Star Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.rating ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Rating</option>
            <option>1 Star</option>
            <option>2 Stars</option>
            <option>3 Stars</option>
            <option>4 Stars</option>
            <option>5 Stars</option>
          </select>
          {errors.rating && <p className="text-red-500 text-xs">{errors.rating}</p>}
        </div>

        {/* Reviews */}
        <div>
          <label className="text-sm text-gray-600">Total Review</label>
          <input
            type="text"
            name="review"
            value={formData.review}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData({ ...formData, review: value });
              }
            }}
            className={`border rounded-md p-2 w-full ${
              errors.review ? "border-red-500" : ""
            }`}
            placeholder="Enter total reviews"
          />
          {errors.review && <p className="text-red-500 text-xs">{errors.review}</p>}
        </div>

        {/* Branch */}
        <div>
          <label className="text-sm text-gray-600">Select Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.branch ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Branch</option>
            {branches.map((br) => (
              <option key={br.uuid} value={br.uuid}>
                {br.branch_identity}
              </option>
            ))}
          </select>
          {errors.branch && <p className="text-red-500 text-xs">{errors.branch}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-gray-600">Select Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.category ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.uuid} value={cat.uuid}>
                {cat.category_name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
        </div>

        {/* Format */}
        <div>
          <label className="text-sm text-gray-600">Learning Format</label>
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.format ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Format</option>
            <option>Online</option>
            <option>Offline</option>
          </select>
          {errors.format && <p className="text-red-500 text-xs">{errors.format}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="text-sm text-gray-600">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.status ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
        </div>

        {/* Overview */}
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Course Overview</label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.overview ? "border-red-500" : ""
            }`}
            placeholder="Enter course overview"
          />
          {errors.overview && <p className="text-red-500 text-xs">{errors.overview}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Course Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              errors.description ? "border-red-500" : ""
            }`}
            placeholder="Enter course description"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Thumbnail</label>
          <div
            className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
              errors.thumbnail ? "border-red-500" : "border-gray-300"
            } ${
              formData.thumbnail ? "border-green-500 bg-green-50" : ""
            }`}
            onClick={() => handleCloudClick(courseImageInputRef)}
          >
            <img src={cloud} alt="cloud" className="mx-auto w-8 mb-2" />
            <p className="text-sm text-gray-500">
              {uploading && uploadStatus.thumbnail 
                ? `Uploading: ${uploadStatus.thumbnail.fileName}`
                : formData.thumbnail
                ? "✓ Image Uploaded"
                : "Choose Thumbnail Image"}
            </p>
            <input
              ref={courseImageInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "thumbnail")}
              accept="image/*"
            />
          </div>
          {getUploadMessage("thumbnail")}
          {errors.thumbnail && !uploading && (
            <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>
          )}
        </div>

        {/* Main Image */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Main Image</label>
          <div
            className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
              errors.image ? "border-red-500" : "border-gray-300"
            } ${
              formData.image ? "border-green-500 bg-green-50" : ""
            }`}
            onClick={() => handleCloudClick(bannerImageInputRef)}
          >
            <img src={cloud} alt="cloud" className="mx-auto w-8 mb-2" />
            <p className="text-sm text-gray-500">
              {uploading && uploadStatus.image 
                ? `Uploading: ${uploadStatus.image.fileName}`
                : formData.image
                ? "✓ Image Uploaded"
                : "Choose Main Image"}
            </p>
            <input
              ref={bannerImageInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "image")}
              accept="image/*"
            />
          </div>
          {getUploadMessage("image")}
          {errors.image && !uploading && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          className="bg-[#E8F8FA] text-[#1BBFCA] px-4 py-2 rounded-md text-sm"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddNewCourseForm;