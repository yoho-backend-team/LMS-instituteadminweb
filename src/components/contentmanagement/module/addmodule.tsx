
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";

interface Props {
    onClose: () => void;
}

const Addmodule = ({ onClose }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative text-[#716F6F] p-3 h-full ">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold ">Add Modules</h2>
                <button
                    onClick={onClose}
                    className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
                >
                    <IoMdClose size={16} />
                </button>
            </div>

            {/* Form */}
            <form
                className="flex flex-col gap-4 mt-2 overflow-y-auto h-[75vh] scrollbar-hide"
            >
                {/* File Upload */}
                <div
                    onClick={handleUploadClick}
                    className="flex items-center gap-2 border p-5 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition"
                >
                    <BiSolidCloudUpload size={40} className="text-[#1BBFCA]" />
                    <span className="text-gray-600">Drop File Here Or Click To Upload</span>
                    <input type="file" ref={fileInputRef} className="hidden" />
                </div>

                {/* Branch Dropdown */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="branch">Branch</label>
                    <select id="branch" className="border p-2 rounded h-10">
                        <option value="">Select Branch</option>
                        <option value="branch1">Branch 1</option>
                        <option value="branch2">Branch 2</option>
                    </select>
                </div>

                {/* Course Dropdown */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="course">Select Course</label>
                    <select id="course" className="border p-2 rounded h-10">
                        <option value="">Select Course</option>
                        <option value="course1">Course 1</option>
                        <option value="course2">Course 2</option>
                    </select>
                </div>

                {/* Title Input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" className="border p-2 rounded h-10" />
                </div>

                {/* Description Textarea */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className="border p-2 rounded h-10 resize-none"
                    ></textarea>
                </div>

                {/* Confirm Dropdown */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirm">Video URI</label>
                    <input id="title" type="text" className="border p-2 rounded h-10" />

                </div>

                {/* Buttons */}
                <div className="flex justify-end items-center gap-4">
                    <button
                        className="text-[#1BBFCA] border border-[#1BBFCA] px-4 py-1 rounded font-semibold"
                        onClick={onClose}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#1BBFCA] text-white px-4 py-1 rounded font-semibold"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Addmodule;


