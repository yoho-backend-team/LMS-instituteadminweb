import React from "react";

interface AddNewCourseFormProps {
  onBack: () => void;
}

const AddNewCourseForm: React.FC<AddNewCourseFormProps> = ({ onBack }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-[#1BBFCA] text-lg font-semibold mb-6">
        Add New Course
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Row 1 */}
        <input
          type="text"
          placeholder="Course Name"
          className="border rounded-md p-2"
        />
        <select className="border rounded-md p-2">
          <option>Course Duration</option>
          <option>1 Month</option>
          <option>3 Months</option>
        </select>

        {/* Row 2 */}
        <input
          type="text"
          placeholder="Actual Price"
          className="border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Current Price"
          className="border rounded-md p-2"
        />

        {/* Row 3 */}
        <input
          type="text"
          placeholder="Star Rating"
          className="border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Total Review"
          className="border rounded-md p-2"
        />

        {/* Row 4 */}
        <select className="border rounded-md p-2">
          <option>Select Branches</option>
          <option>Chennai</option>
          <option>Bangalore</option>
        </select>
        <select className="border rounded-md p-2">
          <option>Select Category</option>
          <option>Web Development</option>
          <option>Testing</option>
        </select>

        {/* Row 5 */}
        <select className="border rounded-md p-2">
          <option>Learning Format</option>
          <option>Online</option>
          <option>Offline</option>
        </select>
        <div></div>

        {/* Row 6 */}
        <textarea
          placeholder="Course Overview"
          className="border rounded-md p-2 h-24"
        ></textarea>
        <textarea
          placeholder="Course Description"
          className="border rounded-md p-2 h-24"
        ></textarea>

        {/* Row 7 - Uploads */}
        <div className="border rounded-md p-4 flex flex-col items-center justify-center">
          <div className="text-[#1BBFCA] text-2xl mb-2">⬆️</div>
          <label className="cursor-pointer">
            <input type="file" className="hidden" />
            <div className="text-sm text-[#1BBFCA] font-medium">
              Choose File
            </div>
          </label>
        </div>

        <div className="border rounded-md p-4 flex flex-col items-center justify-center">
          <div className="text-[#1BBFCA] text-2xl mb-2">⬆️</div>
          <label className="cursor-pointer">
            <input type="file" className="hidden" />
            <div className="text-sm text-[#1BBFCA] font-medium">
              Choose File
            </div>
          </label>
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
        <button className="bg-[#1BBFCA] text-white px-4 py-2 rounded-md text-sm">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddNewCourseForm;
