

import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import { useState } from "react";
import AddNotes from "../../../components/contentmanagement/module/addmodule";
import { FaFileAlt, FaGraduationCap, FaEllipsisV } from 'react-icons/fa';

const Modules = () => {

	const [showFilter, setShowFilter] = useState(false);
	const [showPanel, setShowPanel] = useState(false);




	const cardDatas = [
		{
			id: 1,
			fileName: 'RVR',
			courseName: 'Manual Testing Basic',
			isActive: true,
		},
		{
			id: 2,
			fileName: 'ABC',
			courseName: 'Automation Testing',
			isActive: false,
		},
		
	];

	const [cardData, setCardData] = useState(cardDatas);

	const handleToggle = (id:any) => {
		const updatedData = cardData.map((card) =>
			card.id === id ? { ...card, isActive: !card.isActive } : card
		);
		setCardData(updatedData);
	};





	return (
		<div className=" relative flex flex-col h-fit max-h-fit w-full gap-6">
			{showPanel && (
				<div
					className="absolute h-[85vh] inset-0 flex justify-end "
					onClick={() => setShowPanel(false)}
				>
					<div
						className="h-[85vh] w-1/3 bg-white shadow-xl rounded-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<AddNotes
							onClose={() => setShowPanel(false)}
						/>
					</div>
				</div>
			)}

			<div className="flex flex-col gap-4">
				<h3 className="text-xl font-semibold">Module</h3>

				<div className="w-full flex justify-between gap-4 items-center text-lg font-semibold">
					{/* Show Filter Button */}
					<div className="bg-[#1BBFCA] text-white p-3 rounded-xl flex gap-4 justify-center items-center ">
						<BsSliders size={20} />
						<button
							onClick={() => setShowFilter((prev) => !prev)}
							className="bg-transparent focus:outline-none"
						>
							{showFilter ? "Hide Filter" : "Show Filter"}
						</button>
					</div>

					{/* Add New Batch Button */}
					<div className="bg-[#1BBFCA] text-white flex items-center justify-center p-3 rounded-xl">
						<button className="flex items-center gap-3 bg-transparent focus:outline-none"
							onClick={() => setShowPanel(true)}>
							<GoPlus size={20} />
							Add Modules
						</button>
					</div>
				</div>
			</div>

			{/* Filter Section */}
			{showFilter && (
				<div className="flex gap-5 bg-white p-4 justify-between shadow-xl rounded-xl">
					{/* First Filter */}
					<div className="flex-1 p-1 flex flex-col gap-2">
						<label htmlFor="status1">Status</label>
						<select id="status1" className="border h-10 rounded-lg px-2">
							<option value="">Select Status</option>
							<option value="dummy">Dummy</option>
						</select>
					</div>

					{/* Second Filter */}
					<div className="flex-1 p-1 flex flex-col gap-2">
						<label htmlFor="status2">Courses</label>
						<select id="status2" className="border h-10 rounded-lg px-2">
							<option value="">Select Status</option>
							<option value="dummy">Dummy</option>
						</select>
					</div>
				</div>
			)}


			<div className="flex flex-wrap gap-4">
				{cardData.map((card) => (
					<div key={card.id} className="relative w-80 p-4 border rounded-lg shadow-sm bg-white">
						{/* 3-dot menu */}
						<div className="absolute top-2 right-2 text-gray-400 cursor-pointer">
							<FaEllipsisV />
						</div>

						{/* File row */}
						<div className="flex items-center gap-2 bg-gray-100 p-3 rounded">
							<FaFileAlt className="text-gray-600 text-lg" />
							<span className="text-sm font-medium text-gray-700">{card.fileName}</span>
						</div>

						{/* Course name */}
						<div className="mt-4 flex items-center gap-2">
							<FaGraduationCap className="text-gray-600 text-xl" />
							<span className="text-base font-semibold text-gray-700">{card.courseName}</span>
						</div>

						{/* Footer row */}
						<div className="mt-4 flex justify-between items-center">
							<div
								className={`flex items-center gap-1 font-medium ${card.isActive ? 'text-green-500' : 'text-red-500'
									}`}
							>
								<span className="text-sm">
									{card.isActive ? 'Active' : 'Inactive'}
								</span>
								<span
									className={`w-2 h-2 rounded-full ${card.isActive ? 'bg-green-500' : 'bg-red-500'
										}`}
								/>
							</div>

							{/* Toggle switch */}
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={card.isActive}
									onChange={() => handleToggle(card.id)}
								/>
								<div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 transition duration-300" />
								<div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition duration-300" />
							</label>
						</div>
					</div>
				))}
			</div>

		</div>
	)
};

export default Modules;

