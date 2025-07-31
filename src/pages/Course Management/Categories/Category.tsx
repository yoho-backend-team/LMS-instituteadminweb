// DashboardCards.tsx
import React, { useState } from 'react';

type CardProps = {
  title: string;
  imageSrc: string;
  status: string;
  onStatusChange: (title: string, newStatus: string) => void;
};

const Card: React.FC<CardProps> = ({ title, imageSrc, status, onStatusChange }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={imageSrc} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <select
        value={status}
        onChange={(e) => onStatusChange(title, e.target.value)}
        className="mt-2 w-full border border-gray-300 rounded px-2 py-1"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  </div>
);

export const DashboardCards: React.FC = () => {
  const [categories, setCategories] = useState([
    { title: 'Web Development', imageSrc: '/src/assets/navbar/webimage.png', status: 'Status' },
    { title: 'MERN Stack Development', imageSrc: '/src/assets/navbar/mernimage.png', status: 'Status' },
  ]);

  const handleStatusChange = (title: string, newStatus: string) => {
    setCategories(categories.map(cat => 
      cat.title === title ? { ...cat, status: newStatus } : cat
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Admin User</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
          Add New Category
        </button>
      </div>

      <button className="mb-4 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-400">
        Show Filter
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.title}
            title={cat.title}
            imageSrc={cat.imageSrc}
            status={cat.status}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};