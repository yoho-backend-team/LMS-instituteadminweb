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
  const courseImageInputRef = useRef<HTMLInputElement | null>(null);
  const bannerImageInputRef = useRef<HTMLInputElement | null>(null);

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
    status: "", // 🔹 Added status field
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloudClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  // 🔹 Upload file to backend when selected
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "thumbnail" | "image"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);

      try {
        setUploading(true);
        const upload = await Client.file.upload(data);
        const uploadedUrl = upload?.data?.file;

        setFormData((prev) => ({ ...prev, [field]: uploadedUrl }));
      } catch (err) {
        console.error("File upload failed", err);
        alert("File upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.price) {
      alert("Please fill in required fields.");
      return;
    }
    onSubmit(formData);
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

      {/* Inputs (kept same) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Name */}
        <div>
          <label className="text-sm text-gray-600">Course Name</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Course Duration */}
        <div>
          <label className="text-sm text-gray-600">Course Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value=""></option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
          </select>
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
            className="border rounded-md p-2 w-full"
            placeholder="Enter actual price"
          />
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
            className="border rounded-md p-2 w-full"
            placeholder="Enter current price"
          />
        </div>

        {/* Star Rating */}
        <div>
          <label className="text-sm text-gray-600">Star Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value=""></option>
            <option>1 Star</option>
            <option>2 Stars</option>
            <option>3 Stars</option>
            <option>4 Stars</option>
            <option>5 Stars</option>
          </select>
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
            className="border rounded-md p-2 w-full"
            placeholder="Enter total reviews"
          />
        </div>

        {/* Branch */}
        <div>
          <label className="text-sm text-gray-600">Select Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select Branch</option>
            {branches.map((br) => (
              <option key={br.uuid} value={br.uuid}>
                {br.branch_identity}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-gray-600">Select Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select Category</option>
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <option key={cat.uuid} value={cat.uuid}>
                  {cat.category_name}
                </option>
              ))}
          </select>
        </div>

        {/* Format */}
        <div>
          <label className="text-sm text-gray-600">Learning Format</label>
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value=""></option>
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>

        {/* 🔹 Status Field */}
        <div>
          <label className="text-sm text-gray-600">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Overview */}
        <div>
          <label className="text-sm text-gray-600">Course Overview</label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-600">Course Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Thumbnail</label>
          <div
            className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
            onClick={() =>
              handleCloudClick(courseImageInputRef as React.RefObject<HTMLInputElement>)
            }
          >
            <img src={cloud} alt="cloud" className="mx-auto w-8 mb-2" />
            <p className="text-sm text-gray-500">
              {uploading
                ? "Uploading..."
                : formData.thumbnail
                ? "Uploaded"
                : "Choose File"}
            </p>
            <input
              ref={courseImageInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "thumbnail")}
            />
          </div>
        </div>

        {/* Main Image Upload */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Main Image</label>
          <div
            className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
            onClick={() =>
              handleCloudClick(bannerImageInputRef as React.RefObject<HTMLInputElement>)
            }
          >
            <img src={cloud} alt="cloud" className="mx-auto w-8 mb-2" />
            <p className="text-sm text-gray-500">
              {uploading
                ? "Uploading..."
                : formData.image
                ? "Uploaded"
                : "Choose File"}
            </p>
            <input
              ref={bannerImageInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "image")}
            />
          </div>
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
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddNewCourseForm;
