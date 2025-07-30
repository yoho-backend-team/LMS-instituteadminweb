// src/pages/Courses.tsx
import React from 'react';
import CourseCard from '../../../components/Coursemanagement/CourseCard'

const Courses: React.FC = () => {
  const courses = [
    {
      title: 'Mern Stack 2025',
      category: 'Web Development',
      price: '₹500,000',
      image: 'https://via.placeholder.com/300x180.png?text=MERN+Stack',
    },
    {
      title: 'Manual Testing Basic',
      category: 'Manual Testing',
      price: '₹1,00,000',
      image: 'https://via.placeholder.com/300x180.png?text=Manual+Testing',
    },
  ];

  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Admin User</h1>
      </div>
	  <div className="flex justify-between items-center mb-6">
		<button className="bg-[#1BBFCA] text-cyan-800 px-4 py-2 rounded-md text-sm ">Show Filter</button>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm">
          + Add New Category
        </button>
      </div>

      <div className="flex gap-6 flex-wrap">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>      	
  );
};

export default Courses;
