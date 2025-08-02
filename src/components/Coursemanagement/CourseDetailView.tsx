import React, { useState } from "react";
import card1 from "../../assets/navbar/card1.png";
import editicon1 from "../../assets/editicon1.png";
import MaterialDetailModal from "./MaterialDetailModal";

interface CourseDetailViewProps {
  course: {
    title: string;
    duration: string;
    format: string;
    price: string;
    category: string;
    overview: string;
    description: string;
    thumbnail: string;
    mainImage: string;
  };
  onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  onBack,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseData, setCourseData] = useState(course);
  const [isMaterialModalOpen, setMaterialModalOpen] = useState(false);

  const handleFormSubmit = (updatedData: typeof course) => {
    setCourseData(updatedData);
    setIsEditMode(false);
    console.log("Course updated:", updatedData);
  };

  return (
    <div className="p-4">
      {/* Top Buttons */}
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

      {/* Conditional Rendering */}
      {isEditMode ? (
        // Your CourseEditForm component (not shown here)
        <div>Edit Form Component</div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4 border-2">
          <img
            src={card1}
            alt={courseData.title}
            className="rounded w-full h-64 object-cover"
          />

          <div className="flex justify-between mt-4 items-center">
            <span className="text-sm text-gray-600">Mon–Fri 10AM - 8PM</span>
            <span className="text-lg font-semibold">{courseData.price}</span>
          </div>

          <div className="mt-4 space-y-1">
            <p>
              <strong>Course:</strong> {courseData.title}
            </p>
            <p>
              <strong>Category:</strong> {courseData.category}
            </p>
            <p>
              <strong>Format:</strong> {courseData.format}
            </p>
            <p>
              <strong>Duration:</strong> {courseData.duration} months
            </p>
            <p>
              <strong>Overview:</strong> {courseData.overview}
            </p>
            <p>
              <strong>Description:</strong> {courseData.description}
            </p>
          </div>

          {/* Images */}
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

          {/* Delete Button */}
          <div className="flex justify-end">
            <button className="bg-[#1BBFCA] text-white rounded px-4 py-1 mt-4 hover:bg-red-600">
              Delete
            </button>
          </div>

          {/* Study Materials */}
          <div className="mt-6">
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <div className="bg-green-500 text-white px-4 py-2 w-1/2 text-center">
                Study Materials
              </div>
              <div className="px-4 py-2 w-1/2 text-center text-gray-500">
                Notes
              </div>
            </div>

            {/* Study Material Card (like RVR) */}
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

      {/* Modal */}
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
