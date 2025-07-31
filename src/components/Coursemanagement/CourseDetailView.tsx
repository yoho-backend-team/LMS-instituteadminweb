import React from "react";
import card1 from '../../assets/navbar/card1.png'

interface CourseDetailViewProps {
  course: {
    title: string;
    category: string;
    price: string;
    image: string;
  };
  onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack }) => {
  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <div className="bg-white shadow rounded-lg p-4">
        <img src={card1} alt={course.title} className="rounded w-full h-64 object-cover" />
        <div className="flex justify-between mt-4 items-center">
          <span className="text-sm text-gray-600">Mon–Fri 10AM - 8PM</span>
          <span className="text-lg font-semibold">{course.price}</span>
        </div>
        <div className="flex justify-end">
  <button className="bg-[#1BBFCA] text-white rounded px-4 py-1 mt-2">
    Delete
  </button>
</div>


        <div className="mt-6">
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <div className="bg-green-500 text-white px-4 py-2 w-1/2 text-center">
              Study Materials
            </div>
            <div className="px-4 py-2 w-1/2 text-center text-gray-500">Notes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;
