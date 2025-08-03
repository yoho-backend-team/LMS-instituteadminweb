

import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";
import {
    EditModuleThunks,
    GetallModuleThunks,
    Upload_addFileThunks,
} from "../../../features/Content_Management/reducers/thunks";

interface Props {
    onClose: () => void;
    existingModule: {
        _id?: string;
        uuid: string;
        title: string;
        description: string;
        video_uri: string;
        file?: File | null;
    };
}

const EditmodulePage = ({ onClose, existingModule }: Props) => {
    const dispatch = useDispatch<any>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        _id: "",
        uuid: "",
        title: "",
        description: "",
        video_uri: "",
        file: null as File | null,
    });

    const [uploadedFileUri, setUploadedFileUri] = useState<string>("");

    useEffect(() => {
        if (existingModule) {
            setFormData({
                _id: (existingModule as any)._id || "",
                uuid: existingModule.uuid,
                title: existingModule.title || "",
                description: existingModule.description || "",
                video_uri: existingModule.video_uri || "",
                file: null,
            });
        }
    }, [existingModule]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, file }));
            // removed upload logic here
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    //     const handleSubmit = async (e: React.FormEvent) => {
    //         e.preventDefault();

    //         let finalVideoUri = formData.video_uri;

    //         if (formData.file) {
    //             const formDataToSend = new FormData();
    //             formDataToSend.append("file", formData.file);

    //             try {
    //                 const response = await dispatch(Upload_addFileThunks(formDataToSend));
    //                 console.log(response, 'res')

    //                 if (response) {
    //                      const payload = {
    //             file: response?.file,
    //             _id: formData._id,
    //             uuid: formData.uuid,
    //             title: formData.title,
    //             description: formData.description,
    //             video_uri: finalVideoUri,
    //         };

    //         const paramsData = {
    //             branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
    //             institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
    //             page: 1,
    //         };

    //         await dispatch(EditModuleThunks(payload));
    //         onClose(); // close the sidebar
    //         dispatch(GetallModuleThunks(paramsData));
    //                 } else {
    //                     console.warn("No file_uri in upload response");
    //                 }
    //             } catch (error) {
    //                 console.error("Upload failed", error);
    //             }
    //     };
    // }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let finalVideoUri = formData.video_uri;
        let uploadedFile = null;

        try {
            if (formData.file) {
                const formDataToSend = new FormData();
                formDataToSend.append("file", formData.file);

                const response = await dispatch(Upload_addFileThunks(formDataToSend));
                console.log(response, 'res');

                if (response?.file) {
                    uploadedFile = response.file;
                } else {
                    console.warn("No file returned from upload.");
                }
            }

            const payload = {
                file: uploadedFile, // may be null if no new file uploaded
                _id: formData._id,
                uuid: formData.uuid,
                title: formData.title,
                description: formData.description,
                video_uri: finalVideoUri,
            };

            const paramsData = {
                branch_id: "90c93163-01cf-4f80-b88b-4bc5a5dd8ee4",
                institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
                page: 1,
            };

            await dispatch(EditModuleThunks(payload));
            onClose();
            dispatch(GetallModuleThunks(paramsData));
        } catch (error) {
            console.error("Error in module update:", error);
        }
    };


    return (
        <div className="relative text-[#716F6F] p-3 h-full shadow-[4px_4px_24px_0px_#0000001A]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Modules</h2>
                <button
                    onClick={onClose}
                    className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
                >
                    <IoMdClose size={16} />
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-2 overflow-y-auto h-[75vh] scrollbar-hide"
            >
                <div
                    onClick={handleUploadClick}
                    className="flex items-center gap-2 border p-5 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition"
                >
                    <BiSolidCloudUpload size={40} className="text-[#1BBFCA]" />
                    <span className="text-gray-600">Drop File Here Or Click To Upload</span>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {formData.file && (
                        <span className="text-sm text-green-600">
                            {formData.file.name} selected
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 rounded h-10"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded h-10 resize-none"
                    ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="video_uri">Video URI</label>
                    <input
                        id="video_uri"
                        type="text"
                        value={uploadedFileUri || formData.video_uri}
                        onChange={handleChange}
                        className="border p-2 rounded h-10"
                    />
                </div>

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

export default EditmodulePage;
