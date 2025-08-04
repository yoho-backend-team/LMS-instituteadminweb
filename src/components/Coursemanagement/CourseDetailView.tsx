import React, { useState, useRef } from "react";
import card1 from "../../assets/navbar/card1.png";
import editicon1 from "../../assets/editicon1.png";
import MaterialDetailModal from "./MaterialDetailModal";

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

interface CourseDetailViewProps {
  course: CourseFormData;
  onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseData, setCourseData] = useState(course);
  const [isMaterialModalOpen, setMaterialModalOpen] = useState(false);

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
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

  const handleUploadClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const handleSubmit = () => {
    console.log("Course updated:", courseData);
    setIsEditMode(false);
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="bg-gray-300 text-black px-4 py-1 rounded text-sm inline-block hover:bg-gray-400"
        >
          ← Back
        </button>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="bg-[#1BBFCA] text-white px-4 py-1 rounded text-sm inline-block hover:bg-[#17a5b0] flex items-center gap-2"
        >
          <img src={editicon1} alt="Edit" className="w-4 h-4" />
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
              <label className="block text-sm text-gray-700 mb-1">Course Name</label>
              <input type="text" name="title" value={courseData.title} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">Course Duration</label>
              <input type="text" name="duration" value={courseData.duration} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">Learning Format</label>
              <select name="format" value={courseData.format} onChange={handleChange} className="border rounded-md p-2 w-full">
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
              <input type="text" name="price" value={courseData.price} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Category</label>
              <input type="text" name="category" value={courseData.category} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Overview</label>
              <textarea name="overview" value={courseData.overview} onChange={handleChange} className="border rounded-md p-2 w-full h-24" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Description</label>
              <textarea name="description" value={courseData.description} onChange={handleChange} className="border rounded-md p-2 w-full h-24" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Thumbnail Image</label>
              <input ref={thumbnailRef} type="file" className="hidden" onChange={(e) => handleImageUpload(e, "thumbnail")} />
              <button onClick={() => handleUploadClick(thumbnailRef)} className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 rounded text-sm">Update Thumbnail</button>
              {courseData.thumbnail && <img src={courseData.thumbnail} alt="Thumbnail" className="mt-2 w-32 h-20 object-cover rounded" />}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Main Image</label>
              <input ref={mainImageRef} type="file" className="hidden" onChange={(e) => handleImageUpload(e, "mainImage")} />
              <button onClick={() => handleUploadClick(mainImageRef)} className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 rounded text-sm">Update Main Image</button>
              {courseData.mainImage && <img src={courseData.mainImage} alt="Main" className="mt-2 w-32 h-20 object-cover rounded" />}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button className="bg-[#E8F8FA] text-[#1BBFCA] px-4 py-2 rounded text-sm" onClick={() => setIsEditMode(false)}>Cancel</button>
            <button className="bg-[#1BBFCA] text-white px-4 py-2 rounded text-sm" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4 border-2">
          <img src={card1} alt={courseData.title} className="rounded w-full h-64 object-cover" />

          <div className="flex justify-between mt-4 items-center">
            <span className="text-sm text-gray-600">Mon–Fri 10AM - 8PM</span>
            <span className="text-lg font-semibold">{courseData.price}</span>
          </div>

          <div className="mt-4 space-y-1">
            <p><strong>Course:</strong> {courseData.title}</p>
            <p><strong>Category:</strong> {courseData.category}</p>
            <p><strong>Format:</strong> {courseData.format}</p>
            <p><strong>Duration:</strong> {courseData.duration} months</p>
            <p><strong>Overview:</strong> {courseData.overview}</p>
            <p><strong>Description:</strong> {courseData.description}</p>
          </div>

          <div className="mt-4 flex gap-4">
            {courseData.thumbnail && <img src={courseData.thumbnail} alt="Thumbnail" className="w-32 h-20 object-cover rounded border" />}
            {courseData.mainImage && <img src={courseData.mainImage} alt="Main" className="w-32 h-20 object-cover rounded border" />}
          </div>

          <div className="flex justify-end">
            <button className="bg-[#1BBFCA] text-white rounded px-4 py-1 mt-4 hover:bg-red-600">Delete</button>
          </div>

          <div className="mt-6">
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <div className="bg-green-500 text-white px-4 py-2 w-1/2 text-center">Study Materials</div>
              <div className="px-4 py-2 w-1/2 text-center text-gray-500">Notes</div>
            </div>

            <div className="mt-4 p-4 rounded-lg shadow border flex flex-col gap-2">
              <button onClick={() => setMaterialModalOpen(true)} className="flex items-center gap-2 text-left">
                <div className="bg-gray-600 w-6 h-6 rounded flex items-center justify-center text-white text-sm font-bold">📄</div>
                <span className="font-semibold">RVR</span>
              </button>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-medium">Manual Testing Basic</p>
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
            courseName: "MEAN STACK 2024",
            description: "Mern Tech",
            isActive: true,
          }}
        />
      )}
    </div>
  );
};

export default CourseDetailView;
