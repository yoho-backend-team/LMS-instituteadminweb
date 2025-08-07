import React, { useState } from "react";

function CategoryUploader() {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!categoryName || !imageFile) {
      alert("Please provide both category name and image.");
      return;
    }

    try {
      setUploading(true);

      // 1. Upload Image
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch(
        "https://lms-node-backend-v1.onrender.com/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData?.path) {
        throw new Error("Image upload failed");
      }

      const imagePath = uploadData.path; // e.g., staticfiles/lms/xxx.png

      // 2. Create category
      const categoryRes = await fetch(
        "https://lms-node-backend-v1.onrender.com/api/institutes/973195c0-66ed-47c2-b098-d8989d3e4529/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_name: categoryName,
            image: imagePath,
          }),
        }
      );

      const categoryData = await categoryRes.json();

      if (categoryRes.ok) {
        alert("Category created successfully!");
        setCategoryName("");
        setImageFile(null);
        setPreviewUrl(null);
      } else {
        console.error("Error creating category:", categoryData);
        alert("Failed to create category.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>

      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
      )}

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="mt-4 w-full bg-[#1BBFCA] text-white py-2 rounded hover:bg-[#16a7b2]"
      >
        {uploading ? "Uploading..." : "Create Category"}
      </button>
    </div>
  );
}

export default CategoryUploader;
