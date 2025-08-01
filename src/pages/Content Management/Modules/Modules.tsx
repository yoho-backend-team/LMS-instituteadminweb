
import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import { useState } from "react";
import AddModule from "../../../components/contentmanagement/addmodule/addmodule";
import EditModule from "../../../components/contentmanagement/editmodule/editmodule";
import { FaFileAlt, FaGraduationCap, FaEllipsisV } from 'react-icons/fa';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ViewModule from "../../../components/contentmanagement/viewmodule/viewmodule"
interface ModuleCardProps {
	title: string;
	courseName: string;
	description: string;
	isActive: boolean;
	fileUrl: string;
	fileName: string;
	branch: string;
}



const Modules = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showPanel, setShowPanel] = useState(false);
	const [showEditPanel, setShowEditPanel] = useState(false);
	const [openCardId, setOpenCardId] = useState<number | null>(null);
	const [showViewModule, setShowViewModule] = useState(false);
	const [selectedModule, setSelectedModule] = useState<ModuleCardProps | null>(null);


	const handleViewClick = (card: any) => {
		setSelectedModule(card);
		setShowViewModule(true);
	};


	const cardDatas = [
		{ id: 1, fileName: 'RVR', courseName: 'Manual Testing Basic', isActive: true },
		{ id: 2, fileName: 'ABC', courseName: 'Automation Testing', isActive: false },
	];

	const [cardData, setCardData] = useState(cardDatas);

	const handleToggle = (id: number) => {
		const updatedData = cardData.map((card) =>
			card.id === id ? { ...card, isActive: !card.isActive } : card
		);
		setCardData(updatedData);
	};

	return (
		<div className="relative flex flex-col h-fit max-h-fit w-full gap-6">

			{showPanel && (
				<div className="fixed inset-0 z-40 flex justify-end backdrop-blur-sm bg-black/20" onClick={() => setShowPanel(false)}>
					<div className="h-[95%] mt-4 w-1/3 bg-white shadow-xl rounded-xl z-50" onClick={(e) => e.stopPropagation()}>
						<AddModule
							onClose={() => setShowPanel(false)}
							onSubmit={(newModule) => {
								setCardData((prev) => [
									...prev,
									{
										id: prev.length + 1,
										fileName: newModule.fileName,
										courseName: newModule.course,
										isActive: true,
									},
								]);
								setShowPanel(false);
							}}
						/>
					</div>
				</div>
			)}


			{showEditPanel && (
				<div className="fixed inset-0 z-40 flex justify-end backdrop-blur-sm bg-black/20" onClick={() => setShowEditPanel(false)}>
					<div className="h-[95%] mt-4 w-1/3 bg-white shadow-xl rounded-xl z-50" onClick={(e) => e.stopPropagation()}>
						<EditModule onClose={() => setShowEditPanel(false)} />
					</div>
				</div>
			)}


			<div className="flex flex-col gap-4">
				<h3 className="text-xl font-semibold">Module</h3>

				<div className="w-full flex justify-between gap-4 items-center text-lg font-semibold">
					<div className="bg-[#1BBFCA] text-white p-3 rounded-xl flex gap-4 justify-center items-center">
						<BsSliders size={20} />
						<button
							onClick={() => setShowFilter((prev) => !prev)}
							className="bg-transparent focus:outline-none"
						>
							{showFilter ? "Hide Filter" : "Show Filter"}
						</button>
					</div>

					<div className="bg-[#1BBFCA] text-white flex items-center justify-center p-3 rounded-xl">
						<button className="flex items-center gap-3 bg-transparent focus:outline-none"
							onClick={() => setShowPanel(true)}>
							<GoPlus size={20} />
							Add Modules
						</button>
					</div>
				</div>
			</div>

			{showFilter && (
				<div className="flex gap-5 bg-white p-4 justify-between shadow-[4px_4px_24px_0px_#0000001A] rounded-xl">
					<div className="flex-1 p-1 flex flex-col gap-2">
						<label htmlFor="status1">Status</label>
						<select id="status1" className="border h-10 rounded-lg px-2">
							<option value="">Select Status</option>
							<option value="dummy">Dummy</option>
						</select>
					</div>

					<div className="flex-1 p-1 flex flex-col gap-2">
						<label htmlFor="status2">Courses</label>
						<select id="status2" className="border h-10 rounded-lg px-2">
							<option value="">Select Status</option>
							<option value="dummy">Dummy</option>
						</select>
					</div>
				</div>
			)}

			{showViewModule && selectedModule && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6  max-w-3xl relative">
						<button
							onClick={() => setShowViewModule(false)}
							className="absolute top-2 right-2 text-gray-600 hover:text-black"
						>
							✕
						</button>

						<ViewModule
							branch={selectedModule.branch}
							courseName={selectedModule.courseName}
							description={selectedModule.description}
							fileName={selectedModule.fileName}
							fileUrl={selectedModule.fileUrl}
							isActive={selectedModule.isActive}
							title={selectedModule.title}
						/>
					</div>
				</div>
			)}




			<div className="flex flex-wrap gap-4">
				{cardData.map((card) => (
					<div
						key={card.id}
						className="relative w-80 p-4 border rounded-lg shadow-[4px_4px_24px_0px_#0000001A] bg-white"
					>
						<div className="flex justify-end text-gray-400 cursor-pointer">
							<FaEllipsisV onClick={() => setOpenCardId(openCardId === card.id ? null : card.id)} />
						</div>

						<div className="flex items-center gap-2 bg-gray-100 p-3 rounded mt-5">
							<FaFileAlt className="text-gray-600 text-lg" />
							<span className="text-sm font-medium text-gray-700">{card.fileName}</span>
						</div>

						<div className="mt-4 flex items-center gap-2">
							<FaGraduationCap className="text-gray-600 text-xl" />
							<span className="text-base font-semibold text-gray-700">{card.courseName}</span>
						</div>

						<div className="mt-4 flex justify-between items-center">
							<div
								className={`flex items-center gap-1 font-medium ${card.isActive ? 'text-green-500' : 'text-red-500'}`}
							>
								<span className="text-sm">{card.isActive ? 'Active' : 'Inactive'}</span>
								<span
									className={`w-2 h-2 rounded-full ${card.isActive ? 'bg-green-500' : 'bg-red-500'}`}
								/>
							</div>

							<label className="relative inline-block w-11 h-6 cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={card.isActive}
									onChange={() => handleToggle(card.id)}
								/>
								<div className="w-full h-full bg-gray-200 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
								<div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-2.5" />
							</label>
						</div>

						{openCardId === card.id && (
							<div className="absolute top-10 right-4 z-10 w-32 bg-white shadow-md rounded-xl p-2">
								<button
									className="flex items-center gap-2 w-full px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600"
									onClick={() => handleViewClick(card)}
								>
									<FaEye />
									View
								</button>


								<button
									onClick={() => setShowEditPanel(true)}
									className="flex items-center gap-2 w-full px-4 py-2 mt-2 border rounded-md hover:bg-gray-100 text-gray-700"
								>
									<FaEdit />
									Edit
								</button>

								<button
									onClick={() => {
										setCardData((prev) => prev.filter((c) => c.id !== card.id));
										setOpenCardId(null);
									}}
									className="flex items-center gap-2 w-full px-4 py-2 mt-2 border rounded-md hover:bg-red-100 text-gray-700"
								>
									<FaTrash />
									Delete
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Modules;
