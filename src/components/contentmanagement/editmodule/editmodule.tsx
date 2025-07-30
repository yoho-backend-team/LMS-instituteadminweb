
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";

interface Props {
    onClose: () => void;
}

const Editmodule = ({ onClose }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative text-[#716F6F] p-3 h-full shadow-[4px_4px_24px_0px_#0000001A]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold ">Edit Modules</h2>
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

export default Editmodule;


