import React from "react";

interface MaterialDetailModalProps {
  onClose: () => void;
  material: {
    title: string;
    courseName: string;
    description: string;
    isActive: boolean;
  };
}

const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({ onClose, material }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl relative w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <div className="bg-gray-200 h-40 w-full rounded mb-4"></div>

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{material.title}
          <span className="text-yellow-500">⭐</span></h2>
          <span className="border-2 px-2  rounded-2xl bg-green-500 text-white">Active</span>
        </div>

        <p><strong>Title:</strong> {material.title}</p>
        <p><strong>Course Name:</strong> {material.courseName}</p>
        <p><strong>Description:</strong> {material.description}</p>

      </div>
    </div>
  );
};

export default MaterialDetailModal;
