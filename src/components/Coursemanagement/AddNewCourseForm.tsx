import React, { useRef, useState } from "react";
import cloud from "../../assets/cloud.png";

interface AddNewCourseFormProps {
  onBack: () => void;
  onSubmit: (course: any) => void;
}

const AddNewCourseForm: React.FC<AddNewCourseFormProps> = ({
  onBack,
  onSubmit,
}) => {
  const courseImageInputRef = useRef<HTMLInputElement>(null);
  const bannerImageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    actualPrice: "",
    price: "",
    rating: "",
    review: "",
    branch: "",
    category: "",
    format: "",
    overview: "",
    description: "",
    thumbnail: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloudClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file.name }));
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.price) {
      alert("Please fill in required fields.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-[#1BBFCA] text-lg font-semibold mb-6">
        Add New Course
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Course Name</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Course Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value=""></option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Actual Price</label>
          <input
            name="actualPrice"
            value={formData.actualPrice}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Current Price</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Star Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value=""></option>
            <option>1 Star</option>
            <option>2 Stars</option>
            <option>3 Stars</option>
            <option>4 Stars</option>
            <option>5 Stars</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Total Review</label>
          <input
            name="review"
            value={formData.review}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Select Branches</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value=""></option>
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Select Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value=""></option>
            <option>Web Development</option>
            <option>Testing</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Learning Format</label>
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value=""></option>
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>

        <div></div>

        <div>
          <label className="text-sm text-gray-600">Course Overview</label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Course Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Thumbnail</label>
          <div
            className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
            onClick={() => handleCloudClick(courseImageInputRef)}
          >
            <img src={cloud} alt="cloud" className="mx-auto w-8 mb-2" />
            <p className="text-sm text-gray-500">
              {formData.thumbnail || "Choose File"}
            </p>
            <input
              ref={courseImageInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "thumbnail")}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Main Image</label>
          <div
            className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
            onClick={() => handleCloudClick(bannerImageInputRef)}
          >
            <img src={cloud} alt="cloud" className="mx-auto w-8 mb-2" />
            <p className="text-sm text-gray-500">
              {formData.image || "Choose File"}
            </p>
            <input
              ref={bannerImageInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "image")}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          className="bg-[#E8F8FA] text-[#1BBFCA] px-4 py-2 rounded-md text-sm"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddNewCourseForm;
