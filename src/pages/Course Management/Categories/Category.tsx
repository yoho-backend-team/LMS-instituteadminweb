import React, { useState, useRef } from 'react';

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
          <h3 className="text-lg font-medium text-[#1BBFCA]">{title}</h3>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-[#1BBFCA] hover:text-[#0AA2AC]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit();
                      setShowMenu(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#0AA2AC] hover:text-white w-full text-left bg-white rounded mx-1 my-1"
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
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#0AA2AC] hover:text-white w-full text-left bg-white rounded mx-1 my-1"
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
        <div className="text-xs text-[#6C6C6C] mt-2">Status</div>
        <select
          value={status}
          onChange={(e) => onStatusChange(title, e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-1 text-xs text-white"
          style={{ 
            backgroundColor: '#1BBFCA',
            borderRadius: '6px',
            padding: '4px 8px'
          }}
        >
          <option value="Active" className="rounded border border-gray-200">Active</option>
          <option value="Inactive" className="rounded border border-gray-200">Inactive</option>
        </select>
      </div>
    </div>
  );
};

const DashboardCards: React.FC = () => {
  const [categories, setCategories] = useState([
    { title: 'Mern', imageSrc: '/src/assets/navbar/webimage.png', status: 'Active' },
    { title: 'Mern', imageSrc: '/src/assets/navbar/mernimage.png', status: 'Inactive' },
  ]);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState<null | {title: string, index: number, imageSrc: string}>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => {
                setShowAddCategoryModal(false);
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-medium text-[#3B3939] mb-1">Add Category</h2>
            <p className="text-sm text-[#6C6C6C] mb-4 pb-4 border-b border-gray-200">Create A New Course Category With An Image</p>
            
            <div className="mb-4 mt-4">
              <label className="block text-sm font-medium text-[#3B3939] mb-2">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3B3939]"
                placeholder=""
              />
            </div>

            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="inline-flex items-center px-4 py-2 bg-[#1BBFCA] text-white rounded-md text-sm"
                style={{ borderRadius: '8px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Image
              </button>
              <p className="text-xs text-[#6C6C6C] mt-2">
                Recommended: 388x300 Pixels<br />
                Accepted Formats: PNG, JPG, JPEG
              </p>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddCategoryModal(false);
                  setSelectedImage(null);
                }}
                className="px-4 py-2 border border-[#1BBFCA] rounded-md text-sm text-[#1BBFCA] bg-white"
                style={{ borderWidth: '1px', borderRadius: '8px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-[#1BBFCA] text-white rounded-md text-sm"
                style={{ borderRadius: '8px' }}
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal - Updated to match the screenshot */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => {
                setShowEditModal(false);
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-normal text-[#3B3939] mb-1">Edit Category</h2>
            
            {selectedImage && (
              <div className="my-4">
                <img src={selectedImage} alt="Preview" className="w-full h-40 object-cover rounded" />
              </div>
            )}
            
            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="inline-flex items-center px-4 py-2 bg-[#1BBFCA] text-white rounded text-xs"
                style={{ borderRadius: '8px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Image
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-xs font-medium text-[#3B3939] mb-1">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-[#3B3939]"
                placeholder=""
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedImage(null);
                }}
                className="px-4 py-2 border border-[#1BBFCA] rounded text-xs text-[#1BBFCA] bg-white"
                style={{ borderRadius: '8px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                className="px-4 py-2 bg-[#1BBFCA] text-white rounded text-xs"
                style={{ borderRadius: '8px' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold text-[#3B3939] mb-4">Admin User</h2>
        <div className="flex justify-between items-center">
          <button 
            className="px-4 py-2 bg-[#1BBFCA] text-white rounded text-xs"
            onClick={() => setShowFilter(!showFilter)}
            style={{ borderRadius: '8px' }}
          >
            {showFilter ? 'Hide' : 'Show Filter'}
          </button>
          <button 
            className="px-4 py-2 bg-[#1BBFCA] text-white rounded text-xs flex items-center"
            onClick={() => setShowAddCategoryModal(true)}
            style={{ borderRadius: '8px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Category
          </button>
        </div>
      </div>

      {/* Filter Section */}
      {showFilter && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-1/4 p-2 border border-[#1BBFCA] rounded focus:outline-none text-xs text-[#7D7D7D] font-medium"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#7D7D7D]">Status</label>
              <select className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs text-[#7D7D7D]">
                <option value="">Filter by status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#7D7D7D]">Filter by Course</label>
              <select className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs text-[#7D7D7D]">
                <option value="">Filter by course</option>
                <option value="Web Development">Web Development</option>
                <option value="MERN Stack Development">MERN Stack Development</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid gap-6 justify-start"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {filteredCategories.map((cat, index) => (
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

export default DashboardCards;