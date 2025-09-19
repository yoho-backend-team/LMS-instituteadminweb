/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import card1 from "../../assets/navbar/card1.png";
import editicon1 from "../../assets/editicon1.png";
import MaterialDetailModal from "./MaterialDetailModal";
import {
  deleteCourse,
  updateCourse,
} from "../../features/CourseManagement/Course/service";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { removeCourse } from "../../features/CourseManagement/Course/slice";

interface CourseFormData {
  uuid: string;
  course_name: string;
  actual_price: number;
  title: string;
  duration: string;
  format: string;
  price: string;
  category:
  | {
    uuid: string;
    name?: string;
    [key: string]: any;
  }
  | string;
  overview: string;
  description: string;
  thumbnail: string;
  mainImage: string;
}

// interface CategoryData{
//   uuid: string;
// }

interface CourseDetailViewProps {
  course: CourseFormData;
  courses: any[];
  categories: any[];
  onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  onBack,
  categories,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseData, setCourseData] = useState(course);
  const [isMaterialModalOpen, setMaterialModalOpen] = useState(false);

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>()

  const getStringValue = (value: any): string => {
    if (typeof value === "string") return value;
    if (typeof value === "object" && value !== null) {
      if (value.name) return value.name;
      if (value.category_name) return value.category_name;
      if (value.title) return value.title;

      return JSON.stringify(value);
    }
    return String(value || "");
  };

  // Get category UUID from category object or string
  const getCategoryUuid = (category: any): string => {
    if (typeof category === "string") return category;
    if (typeof category === "object" && category !== null) {
      return category.uuid || category.id || "";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  // Special handler for category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUuid = e.target.value;
    setCourseData((prev) => ({ ...prev, category: selectedUuid }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "thumbnail" | "mainImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCourseData((prev) => ({ ...prev, [field]: imageUrl }));
    }
  };

  const handleUploadClick = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.click();
    }
  };


  const handleDelete = async () => {
    const courseUuid = courseData.uuid;

    const categoryUuid =
      typeof courseData.category === "object"
        ? courseData.category.uuid || courseData.category.id
        : courseData.category;

    if (!categoryUuid || !courseUuid) {
      return;
    }

    try {
      await deleteCourse(categoryUuid, courseUuid);
      dispatch(removeCourse(courseUuid))
      onBack();
    } catch (error: any) {
      console.error("Error deleting course:", error);
    }
  };

  const handleSubmit = async () => {
    const courseUuid = courseData.uuid;

    const categoryUuid =
      typeof courseData.category === "object"
        ? courseData.category.uuid || courseData.category.id
        : courseData.category;

    if (!categoryUuid || !courseUuid) {
      alert("Missing course or category UUID.");
      return;
    }

    try {
      const payload = {
        ...courseData,
        course: courseUuid,
        category: categoryUuid,
        price: courseData.actual_price,
      };



      await updateCourse(payload);

      setIsEditMode(false);
    } catch (error: any) {
      alert("Failed to update course.");
      console.error("Update error:", error);
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="  px-4 py-1 rounded text-sm inline-block text-[#1BBFCA]"
        >
          ← Back
        </button>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="bg-[#1BBFCA] text-white px-6 py-2 rounded text-sm hover:bg-[#17a5b0] items-center gap-2 flex "
        >
          <img src={editicon1} alt="Edit" className="w-5 h-5" />
          {isEditMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditMode ? (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto border-2">
          <h2 className="w-full bg-[#1BBFCA] text-white text-center text-lg font-semibold py-3 rounded-md mb-6">
            Edit Course
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                name="course_name"
                value={getStringValue(courseData.course_name)}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">
                Course Duration
              </label>
              <input
                type="text"
                name="duration"
                value={getStringValue(courseData.duration)}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">
                Learning Format
              </label>
              <select
                name="format"
                value={getStringValue(courseData.format)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Price</label>
              <input
                type="text"
                name="actual_price"
                value={getStringValue(courseData.actual_price)}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={getCategoryUuid(courseData.category)}
                onChange={handleCategoryChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select Category</option>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.uuid} value={category.uuid}>
                      {category.name ||
                        category.category_name ||
                        category.title ||
                        "Unnamed Category"}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No categories available
                  </option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Overview
              </label>
              <textarea
                name="overview"
                value={getStringValue(courseData.overview)}
                onChange={handleChange}
                className="border rounded-md p-2 w-full h-24"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={getStringValue(courseData.description)}
                onChange={handleChange}
                className="border rounded-md p-2 w-full h-24"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Thumbnail Image
              </label>
              <input
                ref={thumbnailRef}
                type="file"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "thumbnail")}
              />
              <button
                onClick={() => handleUploadClick(thumbnailRef)}
                className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 rounded text-sm"
              >
                Update Thumbnail
              </button>
              {courseData.thumbnail && (
                <img
                  src={courseData.thumbnail}
                  alt="Thumbnail"
                  className="mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Main Image
              </label>
              <input
                ref={mainImageRef}
                type="file"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "mainImage")}
              />
              <button
                onClick={() => handleUploadClick(mainImageRef)}
                className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 rounded text-sm"
              >
                Update Main Image
              </button>
              {courseData.mainImage && (
                <img
                  src={courseData.mainImage}
                  alt="Main"
                  className="mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              className="bg-[#E8F8FA] text-[#1BBFCA] px-4 py-2 rounded text-sm"
              onClick={() => setIsEditMode(false)}
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
      ) : (
        <div className="bg-white shadow rounded-lg p-4 border-2">
          <img
            src={courseData.mainImage || card1}
            alt={getStringValue(courseData.title) || "Course"}
            className="rounded w-full h-64 object-cover"
          />

          <div className="flex justify-between mt-4 items-center">
            <span className="text-sm text-gray-600">Mon–Fri 10AM - 8PM</span>
            <span className="text-lg font-semibold">
              {getStringValue(courseData.actual_price) || "Price not available"}
            </span>
          </div>

          <div className="mt-4 space-y-1">
            <p>
              <strong>Course:</strong>{" "}
              {getStringValue(courseData.course_name) || "N/A"}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {getStringValue(courseData.category) || "N/A"}
            </p>
            {/* <p><strong>Format:</strong> {getStringValue(courseData.format) || 'N/A'}</p> */}
            <p>
              <strong>Duration:</strong>{" "}
              {getStringValue(courseData.duration) || "N/A"}
            </p>
            <p>
              <strong>Overview:</strong>{" "}
              {getStringValue(courseData.overview) || "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {getStringValue(courseData.description) || "N/A"}
            </p>
          </div>

          <div className="mt-4 flex gap-4">
            {courseData.thumbnail && (
              <img
                src={courseData.thumbnail}
                alt="Thumbnail"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            {courseData.mainImage && (
              <img
                src={courseData.mainImage}
                alt="Main"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded px-4 py-1 mt-4 hover:bg-red-600"
            >
              Delete
            </button>
          </div>

          <div className="mt-6">
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <div className="bg-green-500 text-white px-4 py-2 w-1/2 text-center">
                Study Materials
              </div>
              <div className="px-4 py-2 w-1/2 text-center text-gray-500">
                Notes
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg shadow border flex flex-col gap-2">
              <button
                onClick={() => setMaterialModalOpen(true)}
                className="flex items-center gap-2 text-left"
              >
                <div className="bg-gray-600 w-6 h-6 rounded flex items-center justify-center text-white text-sm font-bold">
                  📄
                </div>
                <span className="font-semibold">RVR</span>
              </button>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-medium">
                  Manual Testing Basic
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMaterialModalOpen && (
        <MaterialDetailModal
          onClose={() => setMaterialModalOpen(false)}
          material={{
            title: "Mern",
            courseName: getStringValue(courseData.title) || "MEAN STACK 2024",
            description: "Mern Tech",
            isActive: true,
          }}
        />
      )}
    </div>
  );
};

export default CourseDetailView;
