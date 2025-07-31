

import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BiSolidCloudUpload } from "react-icons/bi";

interface Props {
	onClose: () => void;
	onSubmit: (data: {
		branch: string;
		course: string;
		description: string;
		fileName: string;
		title: string;
		videoUri: string;
	}) => void;
}

const Addmodule = ({ onClose, onSubmit }: Props) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [branch, setBranch] = useState("");
	const [course, setCourse] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [videoUri, setVideoUri] = useState("");

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = e.target.files?.[0];
		if (uploadedFile) {
			setFile(uploadedFile);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const moduleData = {
			fileName: file?.name || "",
			branch:branch,
			course,
			title,
			description,
			videoUri,
			
		};
		console.log(moduleData,"Module Data")
		onSubmit(moduleData);
	};

	return (
		<div className=" text-[#716F6F] p-3 h-full shadow-[4px_4px_24px_0px_#0000001A]">
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
				onSubmit={handleSubmit}
			>
				{/* File Upload */}
				<div
					onClick={handleUploadClick}
					className="flex items-center gap-2 border p-5 rounded-lg flex-col justify-center cursor-pointer hover:bg-gray-100 transition"
				>
					<BiSolidCloudUpload size={40} className="text-[#1BBFCA]" />
					<span className="text-gray-600">
						{file ? file.name : "Drop File Here Or Click To Upload"}
					</span>
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileChange}
					/>
				</div>

				{/* Branch Dropdown */}
				<div className="flex flex-col gap-2">
					<label htmlFor="branch">fileName</label>
					<select
						id="branch"
						className="border p-2 rounded h-10"
						value={branch}
						onChange={(e) => setBranch(e.target.value)}
					>
						<option value="">File Name</option>
						<option value="RVR">RVR</option>
						<option value="ABC">ABC</option>
					</select>
				</div>

				{/* Course Dropdown */}
				<div className="flex flex-col gap-2">
					<label htmlFor="course">Select Course</label>
					<select
						id="course"
						className="border p-2 rounded h-10"
						value={course}
						onChange={(e) => setCourse(e.target.value)}
					>
						<option value="">Select Course</option>
						<option value="manual testing">manual testing</option>
						<option value="automation testing">automation testing</option>
					</select>
				</div>

				{/* Title Input */}
				<div className="flex flex-col gap-2">
					<label htmlFor="title">Title</label>
					<input
						id="title"
						type="text"
						className="border p-2 rounded h-10"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				{/* Description Textarea */}
				<div className="flex flex-col gap-2">
					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						className="border p-2 rounded h-10 resize-none"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>

				{/* Video URI */}
				<div className="flex flex-col gap-2">
					<label htmlFor="videoUri">Video URI</label>
					<input
						id="videoUri"
						type="text"
						className="border p-2 rounded h-10"
						value={videoUri}
						onChange={(e) => setVideoUri(e.target.value)}
					/>
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
