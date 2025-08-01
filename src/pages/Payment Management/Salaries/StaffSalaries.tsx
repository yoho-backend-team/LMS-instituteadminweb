import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import SalaryTable from "../../../components/paymentmanagement/salaries/salarytable/salarytable";
import Filtersalary from "../../../components/paymentmanagement/salaries/filtersalary/filtersalary";

const StaffSalaries = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showAddsalary, setAddsalary] = useState(false);

	const [filters, setFilters] = useState({
		search: "",
		branch: "",
		startDate: "",
		endDate: "",
	});

	const [cardData, setCardData] = useState([
		{
			id: 1,
			name: "Prakash",
			transactionId: "TXN123456",
			salaryAmount: 50000,
			paymentDate: "2025-07-31",
			status: "Active",
			image: "https://i.pravatar.cc/150?img=5",
			email: "john@example.com",
			branchId: "1",
		},
	]);

	const [newSalary, setNewSalary] = useState({
		branchId: "",
		staffType: "",
		name: "",
		paymentDate: "",
		transactionId: "",
		salaryAmount: "",
		balance: "",
	});

	const branches = [
		{ id: "1", name: "Chennai" },
		{ id: "2", name: "Bangalore" },
	];

	function handleFilterChange(updatedFilters: typeof filters) {
		setFilters(updatedFilters);
	}

	const handleCancel = () => {
		setAddsalary(false);
		setNewSalary({
			branchId: "",
			staffType: "",
			name: "",
			paymentDate: "",
			transactionId: "",
			salaryAmount: "",
			balance: "",
		});
	};

	const handleSubmitAndClose = (e: React.FormEvent) => {
		e.preventDefault();

		const newEntry = {
			id: cardData.length + 1,
			...newSalary,
			status: "Active",
			image: "https://i.pravatar.cc/150?img=7",
			email: `${newSalary.name.toLowerCase().replace(/\s/g, "")}@example.com`,
			salaryAmount: parseFloat(newSalary.salaryAmount),
		};

		setCardData([...cardData, newEntry]);
		alert("Form submitted successfully!");
		handleCancel();
	};

	return (
		<div>
			<p className="font-semibold text-2xl">Salaries</p>

			<div className="w-full flex justify-between gap-4 items-center text-lg font-semibold py-3">
				<div className="bg-[#1BBFCA] text-white p-1.5 rounded-xl flex gap-4 items-center">
					<BsSliders size={20} />
					<button onClick={() => setShowFilter((prev) => !prev)}>
						{showFilter ? "Hide Filter" : "Show Filter"}
					</button>
				</div>

				<div className="bg-[#1BBFCA] text-white flex items-center p-1.5 rounded-xl">
					<button
						className="flex items-center gap-3"
						onClick={() => setAddsalary(true)}
					>
						<GoPlus size={20} />
						Add Salaries
					</button>
				</div>
			</div>

			{showFilter && (
				<div className="mb-4">
					<Filtersalary branches={branches} onFilterChange={handleFilterChange} />
				</div>
			)}

			{showAddsalary && (
				<div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-15 backdrop-blur-sm z-50 flex justify-end">
					<div className="w-full xl:w-[35%] bg-white p-4 mt-4 h-[95%] overflow-y-auto shadow-lg">
						<p className="font-semibold text-2xl">Add Salary</p>

						<form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmitAndClose}>
							<div className="flex flex-col gap-2">
								<label>Select Branch</label>
								<select
									className="border p-2 rounded h-10"
									value={newSalary.branchId}
									onChange={(e) =>
										setNewSalary({ ...newSalary, branchId: e.target.value })
									}
								>
									<option value=""></option>
									<option value="1">Chennai</option>
									<option value="2">Madurai</option>
								</select>
							</div>

							<div className="flex flex-col">
								<label>Select Staff Type</label>
								<select
									className="border p-2 rounded h-10"
									value={newSalary.staffType}
									onChange={(e) =>
										setNewSalary({ ...newSalary, staffType: e.target.value })
									}
								>
									<option value=""></option>
									<option value="Teaching">Teaching</option>
									<option value="NonTeaching">Non Teaching</option>
								</select>
							</div>

							<div className="flex flex-col">
								<label>Staff Name</label>
								<input
									type="text"
									className="border p-2 rounded h-10"
									value={newSalary.name}
									onChange={(e) =>
										setNewSalary({ ...newSalary, name: e.target.value })
									}
								/>
							</div>

							<div className="flex flex-col">
								<label>Payment Date</label>
								<input
									type="date"
									className="border p-2 rounded h-10"
									value={newSalary.paymentDate}
									onChange={(e) =>
										setNewSalary({ ...newSalary, paymentDate: e.target.value })
									}
								/>
							</div>

							<div className="flex flex-col">
								<label>Transaction ID</label>
								<input
									type="text"
									className="border p-2 rounded h-10"
									value={newSalary.transactionId}
									onChange={(e) =>
										setNewSalary({ ...newSalary, transactionId: e.target.value })
									}
								/>
							</div>

							<div className="flex flex-col">
								<label>Salary Amount</label>
								<input
									type="text"
									className="border p-2 rounded h-10"
									value={newSalary.salaryAmount}
									onChange={(e) =>
										setNewSalary({ ...newSalary, salaryAmount: e.target.value })
									}
								/>
							</div>

							<div className="flex flex-col">
								<label>Balance</label>
								<textarea
									className="border p-2 rounded h-10 resize-none"
									value={newSalary.balance}
									onChange={(e) =>
										setNewSalary({ ...newSalary, balance: e.target.value })
									}
								></textarea>
							</div>

							<div className="flex justify-end items-center gap-4 mt-4">
								<button
									className="text-[#1BBFCA] border border-[#1BBFCA] px-4 py-1 rounded font-semibold"
									type="button"
									onClick={handleCancel}
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
				</div>
			)}

			<SalaryTable
				search={filters.search}
				branch={filters.branch}
				startDate={filters.startDate}
				endDate={filters.endDate}
				cardData={cardData}
				setCardData={setCardData}
			/>
		</div>
	);
};

export default StaffSalaries;
