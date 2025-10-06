import { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { BsSliders } from "react-icons/bs";
import SalaryTable from "../../../components/paymentmanagement/salaries/salarytable/salarytable";
import Filtersalary from "../../../components/paymentmanagement/salaries/filtersalary/filtersalary";
import {
  AddSalaryThunks,
  GetBranchThunks,
} from "../../../features/Payment_Managemant/salary/reducers/thunks";
import { useDispatch } from "react-redux";
import { GetStaffName_Branch } from "../../../features/Payment_Managemant/salary/services/index";
import Viewsalary from "../../../components/paymentmanagement/salaries/ViewSalary/viewsalary";
import { GetLocalStorage } from "../../../utils/localStorage";
import { X } from "lucide-react";

const StaffSalaries = () => {
  const dispatch = useDispatch<any>();
  const panelRef = useRef<HTMLDivElement>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddsalary, setAddsalary] = useState(false);
  // const [cardData, setCardData] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<any | null>(null);
  // const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    branch: "",
    startDate: "",
    endDate: "",
  });

  const [newSalary, setNewSalary] = useState({
    institute_id: "",
    branch_id: "",
    staff_type: "",
    staff: "",
    payment_date: "",
    transaction_id: "",
    salary_amount: "",
    balance: "",
  });

  // const fetchData = async () => {
  // 	try {
  // 		setLoading(true);
  // 		const result = await dispatch(GetAllSalaryThunks({}));
  // 		if (result?.payload && Array.isArray(result.payload)) {
  // 			setCardData(result.payload);
  // 		}
  // 		setLoading(false);
  // 	} catch (error) {
  // 		console.log(error);
  // 	} finally {
  // 		setLoading(false);
  // 	}
  // };

  const fetchBranches = async () => {
    const branchRes = await dispatch(GetBranchThunks({}));
    if (branchRes?.payload && Array.isArray(branchRes.payload)) {
      setBranches(branchRes.payload);
    }
  };

  useEffect(() => {
    // fetchData();
    fetchBranches();
  }, [dispatch]);

  const fetchStaffNamesByBranch = async (branchId: string) => {
    try {
      const res = await GetStaffName_Branch({branch: branchId});
      if (Array.isArray(res)) {
        setStaffList(res);
      } else {
        setStaffList([]);
      }
    } catch (error) {
      console.error("Failed to fetch staff names:", error);
      setStaffList([]);
    }
  };

  const handleCancel = () => {
    setAddsalary(false);
    setNewSalary({
      institute_id: "973195c0-66ed-47c2-b098-d8989d3e4529",
      branch_id: "",
      staff_type: "",
      staff: "",
      payment_date: "",
      transaction_id: "",
      salary_amount: "",
      balance: "",
    });
    setStaffList([]);
  };

  const handleSubmitAndClose = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newSalary.institute_id) {
      alert("Institute ID missing. Please select a branch again.");
      return;
    }

    const payload = {
      institute_id: GetLocalStorage("instituteId"),
      branch_id: newSalary.branch_id,
      staff_type: newSalary.staff_type,
      staff: newSalary.staff,
      payment_date: newSalary.payment_date,
      transaction_id: newSalary.transaction_id,
      salary_amount: parseFloat(newSalary.salary_amount),
      balance: newSalary.balance,
    };

    const result = await dispatch(AddSalaryThunks(payload));

    if (result?.payload) {
      // setCardData((prev) => [...prev, result.payload]);
      alert("Salary added successfully!");
      handleCancel();
    } else {
      alert("Failed to add salary.");
    }
  };

  function handleFilterChange(updatedFilters: typeof filters) {
    setFilters(updatedFilters);
  }
  const handleClosePanel = () => {
    setShowPanel(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        handleClosePanel();
      }
    };
    if (showPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel]);

  const handleViewSalary = (salary: any) => {
    setSelectedSalary(salary);
    setShowPanel(true);
  };

  return (
    <div className="relative flex flex-col gap-6">
      {/* Side Panel for Add Salary */}
      {showPanel && selectedSalary && (
        <div className="fixed inset-0 z-50 flex justify-end items-center backdrop-blur-sm">
          <div
            ref={panelRef}
            className="bg-white shadow-xl rounded-xl w-[500px] max-w-full h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Viewsalary onClose={handleClosePanel} salary={selectedSalary} />
          </div>
        </div>
      )}

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
          <Filtersalary
            branches={branches}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      {showAddsalary && (
        <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-15 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full xl:w-[35%] bg-white p-4 mt-4 h-[95%] overflow-y-auto shadow-lg rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-2xl">Add Salary</p>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <X size={25}/>
              </button>
            </div>

            <form
              className="flex flex-col gap-4 mt-2"
              onSubmit={handleSubmitAndClose}
            >
              <div className="flex flex-col gap-2">
                <label>Select Branch</label>
                <select
                  className="border p-2 rounded h-10"
                  value={newSalary.branch_id}
                  onChange={(e) => {
                    const branchId = e.target.value;
                    const selectedBranch = branches.find(
                      (b) => b.uuid === branchId
                    );
                    const instituteId = selectedBranch?.institute_id || "";
                    setNewSalary({
                      ...newSalary,
                      branch_id: branchId,
                      institute_id: instituteId,
                    });
                    fetchStaffNamesByBranch(branchId);
                  }}
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.uuid}>
                      {branch.branch_identity}
                    </option>
                  ))}
                </select>
              </div>

              {/* Staff Type */}
              <div className="flex flex-col">
                <label>Select Staff Type</label>
                <select
                  className="border p-2 rounded h-10"
                  value={newSalary.staff_type}
                  onChange={(e) =>
                    setNewSalary({ ...newSalary, staff_type: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Teaching">Teaching</option>
                  <option value="NonTeaching">Non Teaching</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label>Select Staff Name</label>
                <select
                  className="border p-2 rounded h-10"
                  value={newSalary.staff}
                  onChange={(e) =>
                    setNewSalary({ ...newSalary, staff: e.target.value })
                  }
                >
                  <option value="">Select Staff</option>
                  {staffList.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label>Payment Date</label>
                <input
                  type="date"
                  className="border p-2 rounded h-10"
                  value={newSalary.payment_date}
                  onChange={(e) =>
                    setNewSalary({ ...newSalary, payment_date: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label>Transaction ID</label>
                <input
                  type="text"
                  className="border p-2 rounded h-10"
                  value={newSalary.transaction_id}
                  onChange={(e) =>
                    setNewSalary({
                      ...newSalary,
                      transaction_id: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label>Salary Amount</label>
                <input
                  type="number"
                  className="border p-2 rounded h-10"
                  value={newSalary.salary_amount}
                  onChange={(e) =>
                    setNewSalary({
                      ...newSalary,
                      salary_amount: e.target.value,
                    })
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

      {/* Table */}
      <SalaryTable
        search={filters.search}
        branch={filters.branch}
        startDate={filters.startDate}
        endDate={filters.endDate}
        // cardData={cardData}
        // setCardData={setCardData}
        onView={handleViewSalary}
        // loading={loading}
      />
    </div>
  );
};

export default StaffSalaries;
