import React, { useState, useRef } from "react";

interface CourseFormData {
  title: string;
  duration: string;
  format: string;
  price: string;
  category: string;
  overview: string;
  description: string;
  thumbnail: string;
  mainImage: string;
}

interface CourseEditFormProps {
  initialData: CourseFormData;
  onCancel: () => void;
  onSubmit: (updatedData: CourseFormData) => void;
}

const CourseEditForm: React.FC<CourseEditFormProps> = ({
  initialData,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CourseFormData>(initialData);

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "thumbnail" | "mainImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [field]: imageUrl }));
    }
  };

  const handleUploadClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto border-2">
      <h2 className="w-full bg-[#1BBFCA] text-white text-center text-lg font-semibold py-3 rounded-md mb-6">
  Add New Course
</h2>

      {/* First Row - Inline */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1">Course Name</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1">Course Duration (in Month)</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1">Learning Format</label>
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select Format</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Remaining Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Course Priced</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Course Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Course Over View</label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            className="border rounded-md p-2 w-full h-25"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-md p-2 w-full h-25"
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Thumbnail Image</label>
          
          <input
            ref={thumbnailRef}
            type="file"
            className="hidden"
            onChange={(e) => handleImageUpload(e, "thumbnail")}
          />
          <button
            type="button"
            onClick={() => handleUploadClick(thumbnailRef)}
            className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 rounded text-sm"
          >
            Update Thumbnail
          </button>
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Thumbnail"
              className="mt-2 w-32 h-20 object-cover rounded"
            />
          )}
        </div>

        {/* Main Image Upload */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Main Image</label>
          <input
            ref={mainImageRef}
            type="file"
            className="hidden"
            onChange={(e) => handleImageUpload(e, "mainImage")}
          />
          <button
            type="button"
            onClick={() => handleUploadClick(mainImageRef)}
            className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 rounded text-sm"
          >
            Update Main Image
          </button>
          {formData.mainImage && (
            <img
              src={formData.mainImage}
              alt="Main"
              className="mt-2 w-32 h-20 object-cover rounded"
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          className="bg-[#E8F8FA] text-[#1BBFCA] px-4 py-2 rounded text-sm"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded text-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CourseEditForm;
