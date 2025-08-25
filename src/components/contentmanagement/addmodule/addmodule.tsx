
import { useEffect,  useState } from "react";
import { IoMdClose } from "react-icons/io";
// import { BiSolidCloudUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
	AddModuleThunks,
	GetBranchCourseThunks,
	GetBranchThunks,
} from "../../../features/Content_Management/reducers/thunks";
import {
	Branch,
	BranchCourse,
} from "../../../features/Content_Management/reducers/selectors";

interface Props {
	onClose: () => void;
	onSubmit: (data: {
		branch: string;
		course: string;
		description: string;
		title: string;
		video: string;
	}) => void;
}

const Addmodule = ({ onClose, onSubmit }: Props) => {
	// const fileInputRef = useRef<HTMLInputElement>(null);
	// const [file, setFile] = useState<File | null>(null);
	const [branch, setBranch] = useState("");
	const [course, setCourse] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();

	const branches = useSelector(Branch);
	const courses = useSelector(BranchCourse);
	const [video, setVideo] = useState("");


	useEffect(() => {
		dispatch(GetBranchThunks([]) as any);
	}, [dispatch]);


	useEffect(() => {
		if (branch) {
			dispatch(GetBranchCourseThunks(branch) as any);
		}
	}, [branch]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const moduleData = {
			branch,
			course,
			title,
			description,
			video
		};

		try {
			await dispatch(AddModuleThunks(moduleData) as any);
			onSubmit(moduleData);
			onClose();
		} catch (error) {
			console.error("Failed to add module", error);
		}
	};

	return (
		<div className="text-[#716F6F] p-3 h-full shadow-[4px_4px_24px_0px_#0000001A]">
			{/* Header */}
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold">Add Modules</h2>
				<button
					onClick={onClose}
					className="text-white bg-gray-500 rounded-full p-1 hover:bg-red-500"
				>
					<IoMdClose size={16} />
				</button>
			</div>


			<form
				className="flex flex-col gap-4 mt-2 overflow-y-auto h-[75vh] scrollbar-hide"
				onSubmit={handleSubmit}
			>

					<div className="flex flex-col gap-2">
					<label htmlFor="branch">Branch</label>
					<select
						id="branch"
						className="border p-2 rounded h-10"
						value={branch}
						onChange={(e) => {
							setBranch(e.target.value);
							setCourse("");
						}}
					>
						<option value="">Select Branch</option>
						{Array.isArray(branches) &&
							branches.map((b: any) => (
								<option key={b.id} value={b.uuid}>
									{b.branch_identity}
								</option>
							))}
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
						disabled={!branch}
					>
						<option value="">Select Course</option>
						{Array.isArray(courses) &&
							courses.map((c: any) => (
								<option key={c.uuid} value={c.uuid}>
									{c.course_name}
								</option>
							))}
					</select>
				</div>


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


				<div className="flex flex-col gap-2">
					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						className="border p-2 rounded h-20 resize-none"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="videoURL">Video URL</label>
					<input
						type="url"
						id="videoURL"
						className="border p-2 rounded"
						value={video}
						onChange={(e) => setVideo(e.target.value)}
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

export default Addmodule;



