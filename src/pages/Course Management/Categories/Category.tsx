/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllCategoriesThunk } from '../../../features/Course mangement/categories/reducers/thunks';
import { selectCategories } from '../../../features/Course mangement/categories/reducers/slice';
import { GetImageUrl } from '../../../utils/helper';
import { CreateCategories, deleteCategories, UpdateCategories } from '../../../features/Course mangement/categories/service';

type CardProps = {
  category_name: string;
  image: string;
  is_active: boolean;
  onStatusChange: (uuid: string, newStatus: "Active" | "Inactive") => void;
  onEdit: () => void;
  onDelete: () => void;
  uuid: string;
};

const Card: React.FC<CardProps> = ({
  category_name,
  image,
  is_active,
  uuid,
  onStatusChange,
  onEdit,
  onDelete
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md relative">
      <img src={GetImageUrl(image) ?? undefined} alt={category_name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{category_name}</h3>
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
              <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-10">
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
          value={is_active ? "Active" : "Inactive"}
          onChange={(e) => onStatusChange(uuid, e.target.value as "Active" | "Inactive")}
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
  const [categories, setCategories] = useState<any>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState<null | {
    category_name: string,
    uuid: string,
    image: string
  }>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoad, setisLoad] = useState(true);
  const [selecteduuid, setSelecteduuid] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  const instituteId = "973195c0-66ed-47c2-b098-d8989d3e4529";
  const branchId = "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4";
  const page = 1;

  const categoriess = useSelector(selectCategories);
  console.log('fetched data', categoriess);

  useEffect(() => {
    dispatch(
      getAllCategoriesThunk({ institute_id: instituteId, branch_id: branchId, page }) as any
    );
  }, [dispatch, instituteId, branchId, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoad(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = async (uuid: string, newStatus: "Active" | "Inactive") => {
    try {
      const payload = {
        id: uuid,
        is_active: newStatus === "Active",
      };

      console.log("Status Update Payload:", payload);

      await UpdateCategories(payload);

      setCategories((prevCategories: any[]) =>
        prevCategories.map((cat) =>
          cat.uuid === uuid ? { ...cat, is_active: payload.is_active } : cat
        )
      );

      console.log(`Status updated successfully for category ${uuid}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("https://lms-node-backend-v1.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });

      const response = await uploadRes.json();
      console.log(response, 'upload img');

      if (response) {
        setSelectedImage(response.data.file);
      } else {
        console.error("Upload response missing path:", response.data.file);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      const payload = {
        category_name: categoryName,
        image: selectedImage,
      };

      console.log(payload, 'payload');

      const createdCategory = await CreateCategories(payload);

      setCategories([...categories, {
        category_name: createdCategory.category_name,
        image: createdCategory.image,
        is_active: true,
        uuid: createdCategory.uuid
      }]);

      setShowAddCategoryModal(false);
      setCategoryName('');
      setSelectedImage(null);
    } catch (err) {
      console.error("Error creating category", err);
    }
  };

  const handleEditCategory = (cat: any) => {
    setEditingCategory({
      category_name: cat?.category_name,
      uuid: cat?.uuid,
      image: cat?.image
    });
    setCategoryName(cat?.category_name);
    setSelectedImage(cat?.image);
    setSelecteduuid(cat?.uuid);
    setShowEditModal(true);
  };

  const handleUpdateCategory = async () => {
    if (!categoryName.trim() || !editingCategory) return;

    const payload = {
      id: selecteduuid,
      category_name: categoryName,
      image: selectedImage || editingCategory.image,
    };

    try {
      const updatedCategory = await UpdateCategories(payload);

      console.log(updatedCategory, 'updated');

      setCategories((prevCategories: any[]) =>
        prevCategories.map((cat) =>
          cat.uuid === selecteduuid ? {
            ...cat,
            category_name: updatedCategory.category_name,
            image: updatedCategory.image,
          } : cat
        )
      );

      setShowEditModal(false);
      setCategoryName('');
      setSelectedImage(null);
      setEditingCategory(null);
      setSelecteduuid(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (uuid: string) => {
    console.log(uuid, "uuid")
    console.log(instituteId, "institutteId")
    try {
      await deleteCategories(instituteId, uuid);
      setCategories((prev: any) => prev.filter((cat: any) => cat.uuid !== uuid));
      console.log("Category deleted");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const filteredCategories = categories?.filter((cat: any) =>
    cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCategories(categoriess);
  }, [categoriess]);

  // Enhanced Image Upload Component
  const ImageUploadComponent = ({ currentImage }: { currentImage?: string }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${isDragOver
          ? 'border-[#1BBFCA] bg-blue-50'
          : selectedImage || currentImage
            ? 'border-gray-300'
            : 'border-gray-300 hover:border-gray-400'
          }`}
        onClick={triggerFileInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1BBFCA]"></div>
            <p className="text-gray-500 mt-2">Uploading...</p>
          </div>
        ) : selectedImage ? (
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="h-32 w-32 mx-auto object-cover rounded-lg shadow-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
              title="Remove image"
            >
              ×
            </button>
          </div>
        ) : currentImage ? (
          <div className="relative">
            <img
              src={currentImage}
              alt="Current"
              className="h-32 w-32 mx-auto object-cover rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <p className="text-white text-sm">Click to change image</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mt-2 text-sm">Drag & drop your image here or click to browse</p>
            <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
      {(selectedImage || currentImage) && (
        <div className="mt-2 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6">Add Category</h2>

            <ImageUploadComponent />

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
                disabled={isUploading}
                className="px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Save Changes'}
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

            <ImageUploadComponent currentImage={editingCategory.image} />

            <p className="text-xs text-gray-500 mb-4">
              Recommended: 388x300 Pixels<br />
              Accepted Formats: PNG, JPG, JPEG
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedImage(null);
                  setSelecteduuid(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                disabled={isUploading}
                className="px-4 py-2 bg-[#1BBFCA] text-white rounded hover:bg-[#1BBFCA] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Update Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header section */}
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

      {isLoad && (
        <div className="grid gap-6 justify-start"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {Array(8).fill(null).map((_, index) => (
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
          ))}
        </div>
      )}

      {/* Categories grid */}
      <div className="grid gap-6 justify-start"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {!isLoad && filteredCategories?.map((cat: any, index: any) => (
          <Card
            key={cat.uuid || index}
            uuid={cat.uuid}
            category_name={cat.category_name}
            image={cat.image}
            is_active={cat.is_active}
            onStatusChange={handleStatusChange}
            onEdit={() => handleEditCategory(cat)}
            onDelete={() => handleDeleteCategory(cat.uuid)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCards