import React, { useState, useRef, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

type CardProps = {
  title: string;
  imageSrc: string;
  status: string;
  onStatusChange: (title: string, newStatus: string) => void;
  onEdit: () => void;
  onDelete: () => void;
};

const Card: React.FC<CardProps> = ({ title, imageSrc, status, onStatusChange, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-500 hover:text-[#1BBFCA]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit();
                      setShowMenu(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full text-left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete();
                      setShowMenu(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#1BBFCA] hover:text-white w-full text-left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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
};

export const DashboardCards: React.FC = () => {
  const [categories, setCategories] = useState([
    { title: 'Mern', imageSrc: '/src/assets/navbar/webimage.png', status: 'Status' },
    { title: 'Mern', imageSrc: '/src/assets/navbar/mernimage.png', status: 'Status' },
  ]);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState<null | { title: string, index: number, imageSrc: string }>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoad, setisLoad] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setisLoad(false)
    }, 1500);
  }, []);

  const handleStatusChange = (title: string, newStatus: string) => {
    setCategories(categories.map(cat =>
      cat.title === title ? { ...cat, status: newStatus } : cat
    ));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      setCategories([...categories, {
        title: categoryName,
        imageSrc: selectedImage || '/src/assets/navbar/default-image.png',
        status: 'Active'
      }]);
      setShowAddCategoryModal(false);
      setCategoryName('');
      setSelectedImage(null);
    }
  };

  const handleEditCategory = (index: number) => {
    setEditingCategory({
      title: categories[index].title,
      index,
      imageSrc: categories[index].imageSrc
    });
    setCategoryName(categories[index].title);
    setSelectedImage(categories[index].imageSrc);
    setShowEditModal(true);
  };

  const handleUpdateCategory = () => {
    if (categoryName.trim() && editingCategory) {
      const updatedCategories = [...categories];
      updatedCategories[editingCategory.index] = {
        ...updatedCategories[editingCategory.index],
        title: categoryName,
        imageSrc: selectedImage || editingCategory.imageSrc
      };
      setCategories(updatedCategories);
      setShowEditModal(false);
      setCategoryName('');
      setSelectedImage(null);
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6">Add Category</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <div
                className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer"
                onClick={triggerFileInput}
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="h-32 mx-auto object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-32">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 mt-2">Drag & drop your image here or click to browse</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter category name"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddCategoryModal(false);
                  setSelectedImage(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <p className="text-gray-600 mb-6">Edit Course Category Details</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter category name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <div
                className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer"
                onClick={triggerFileInput}
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="h-32 mx-auto object-cover" />
                ) : (
                  <img src={editingCategory.imageSrc} alt="Current" className="h-32 mx-auto object-cover" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: 388x300 Pixels<br />
                Accepted Formats: PNG, JPG, JPEG
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedImage(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                className="px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA]"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold mb-4">Admin User</h2>
        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA]"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? 'Hide' : 'Show Filter'}
          </button>
          <button
            className="px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA] flex items-center"
            onClick={() => setShowAddCategoryModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Category
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1BBFCA] text-sm"
              />
              <svg
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700">Status</label>
              <select className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm">
                <option value="">Filter by status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700">Filter by Course</label>
              <select className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm">
                <option value="">Filter by course</option>
                <option value="Web Development">Web Development</option>
                <option value="MERN Stack Development">MERN Stack Development</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {
        isLoad &&
        <div className="grid gap-6 justify-start"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {
            Array(8).fill(null).map((_, index) => (
              <ContentLoader
                speed={1}
                width="100%"
                height="100%"
                viewBox="0 0 390 330"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="w-full h-[310px] rounded-lg"
                key={index}
              >
                <rect x="0" y="0" rx="10" ry="10" width="400" height="200" />

                <rect x="0" y="220" rx="8" ry="8" width="60%" height="20" />
                <rect x="0" y="250" rx="8" ry="8" width="100%" height="28" />
                <rect x="0" y="290" rx="8" ry="8" width="30%" height="58" />
              </ContentLoader>
            ))
          }
        </div>
      }

      <div className="grid gap-6 justify-start"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {!isLoad && filteredCategories.map((cat, index) => (
          <Card
            key={index}
            title={cat.title}
            imageSrc={cat.imageSrc}
            status={cat.status}
            onStatusChange={handleStatusChange}
            onEdit={() => handleEditCategory(index)}
            onDelete={() => handleDeleteCategory(index)}
          />
        ))}
      </div>
    </div>
  );
};