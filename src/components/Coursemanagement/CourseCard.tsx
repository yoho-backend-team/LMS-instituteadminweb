// src/components/CourseCard.tsx
import React from 'react';
import card1 from '../../assets/navbar/card1.png'

interface CourseCardProps {
  title: string;
  category: string;
  price: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, category, price, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-90 h-50 border-2">
      <div className="flex justify-between mb-2">
        <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-md">{category}</span>
        <span className="text-xs bg-[#3ABE65] text-white px-2 py-1 rounded-md">Online</span>
      </div>
      <img src={card1} alt={title} className="rounded-md w-full h-40 object-cover" />
      <h2 className="mt-3 font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">1 Modules</p>
      <p className="font-bold text-lg mt-1">{price}</p>
      <div className="flex justify-between items-center mt-3">
        <button className="bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-md">Active ▼</button>
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded-md">View</button>
      </div>
    </div>
  );
};

export default CourseCard;
