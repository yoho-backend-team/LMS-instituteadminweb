import React, { useState } from 'react';
import card1 from '../../assets/navbar/card1.png';
import arr from '../../assets/navbar/arrow.png';
import dots from '../../assets/navbar/dots.png';

interface CourseCardProps {
  title: string;
  category: string;
  price: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, category, price, image }) => {
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleStatusChange = (newStatus: 'Active' | 'Inactive') => {
    setStatus(newStatus);
    setShowDropdown(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-[22rem] border border-gray-200 flex flex-col gap-y-4">
      
      {/* Category and Badge */}
      <div className="flex justify-between items-center">
        <span className="bg-[#1BBFCA33] text-[#1BBFCA] text-sm font-medium px-3 py-1 rounded-md">
          {category}
        </span>
        <span className="bg-[#3ABE65] text-white text-sm font-medium px-3 py-1 rounded-md">
          Online
        </span>
      </div>

      {/* Image */}
      <img
        src={card1}
        alt={title}
        className="rounded-md w-full h-30 object-cover"
      />

      {/* Title & Info */}
      <div className="flex flex-col gap-y-1">
  <h2 className="text-lg font-semibold text-[#1BBFCA]">{title}</h2>
  
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <img src={dots} alt="dot" className="w-4 h-" />
      <p className="text-sm text-gray-600">1 Module</p>
    </div>
    <p className="text-lg font-bold">{price}</p>
  </div>
</div>


      {/* Buttons with Dropdown */}
      <div className="flex justify-between items-center relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-[#1BBFCA] text-white px-3 py-1 rounded-md inline-block"
          >
            <span className="align-middle">{status}</span>
            <img src={arr} alt="arrow" className="inline-block w-3 h-3 ml-1 align-middle" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
              <div
                onClick={() => handleStatusChange('Active')}
                className={`block px-4 py-2 text-sm cursor-pointer rounded-t-md ${
                  status === 'Active' ? 'bg-[#1BBFCA] text-white' : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                Active
              </div>
              <div
                onClick={() => handleStatusChange('Inactive')}
                className={`block px-4 py-2 text-sm cursor-pointer rounded-b-md ${
                  status === 'Inactive' ? 'bg-[#1BBFCA] text-white' : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                Inactive
              </div>
            </div>
          )}
        </div>

        <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-5 py-1.5 rounded-md">
          View
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
