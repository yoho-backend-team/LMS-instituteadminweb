
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
        video: string;
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
        video: "",
        file: null as File | null,
    });

    useEffect(() => {
        if (existingModule) {
            setFormData({
                _id: (existingModule as any)._id || "",
                uuid: existingModule.uuid,
                title: existingModule.title || "",
                description: existingModule.description || "",
                video: existingModule.video || "",
                file: null,
            });
        }

        const payload = {
            v: "BSJa1UytM8w",
            list: "RDBSJa1UytM8w",
            start_radio: "1",
        };

        const youtubeURL = `https://www.youtube.com/embed/${payload.v}?list=${payload.list}&index=${payload.start_radio}`;
        setFormData(prev => ({
            ...prev,
            video: youtubeURL,
        }));
    }, [existingModule]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const videoURL = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                file,
                video: videoURL,
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let finalVideoUri = formData.video;

        try {
            if (formData.file) {
                const formDataToSend = new FormData();
                formDataToSend.append("file", formData.file);

                const response = await dispatch(Upload_addFileThunks(formDataToSend));
                console.log(response, 'res');
            }

            const payload = {
                _id: formData._id,
                uuid: formData.uuid,
                title: formData.title,
                description: formData.description,
                video: finalVideoUri,
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
                    {formData.video.includes("youtube.com") ? (
                        <iframe
                            src={formData.video}
                            className="w-full h-60 rounded shadow"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    ) : formData.video ? (
                        <video
                            src={formData.video}
                            controls
                            className="w-full rounded shadow"
                        />
                    ) : (
                        <>
                            <BiSolidCloudUpload size={40} />
                            <p>Click to upload video</p>
                        </>
                    )}
                </div>

                <input
                    type="file"
                    accept="video/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />

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
                    <label htmlFor="video">Video URI</label>
                    <input
                        id="video"
                        type="text"
                        value={formData.video}
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
